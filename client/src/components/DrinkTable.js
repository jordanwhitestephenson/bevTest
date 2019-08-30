import React, { useEffect } from "react";
import PropTypes from "prop-types";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import { headRows } from "../constants/constants";

import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Edit from "@material-ui/icons/Edit";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
	return order === "desc"
		? (a, b) => desc(a, b, orderBy)
		: (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
	const {
		classes,
		onSelectAllClick,
		order,
		orderBy,
		numSelected,
		rowCount,
		onRequestSort
	} = props;
	const createSortHandler = (property) => (event) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				<TableCell padding='checkbox'>
					<Checkbox
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{ "aria-label": "select all desserts" }}
					/>
				</TableCell>
				{headRows.map((row) => (
					<TableCell
						key={row.id}
						align={row.numeric ? "right" : "left"}
						padding={row.disablePadding ? "none" : "default"}
						sortDirection={orderBy === row.id ? order : false}>
						<TableSortLabel
							active={orderBy === row.id}
							direction={order}
							onClick={createSortHandler(row.id)}>
							{row.label}
							{orderBy === row.id ? (
								<span className={classes.visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

EnhancedTableHead.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.oneOf(["asc", "desc"]).isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(3)
	},
	paper: {
		width: "100%",
		marginBottom: theme.spacing(2)
	},
	table: {
		minWidth: 750
	},
	tableWrapper: {
		overflowX: "auto"
	},
	visuallyHidden: {
		border: 0,
		clip: "rect(0 0 0 0)",
		height: 1,
		margin: -1,
		overflow: "hidden",
		padding: 0,
		position: "absolute",
		top: 20,
		width: 1
	}
}));

export default function DrinkTable({ drinkData, showEditForm }) {
	const classes = useStyles();
	const [rows, setRows] = React.useState(drinkData);

	const fetchData = async () => {
		setRows(drinkData);
	};

	useEffect(() => {
		fetchData(drinkData);
	}, [drinkData]);

	const [order, setOrder] = React.useState("asc");
	const [orderBy, setOrderBy] = React.useState("Description");
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	function handleRequestSort(event, property) {
		const isDesc = orderBy === property && order === "desc";
		setOrder(isDesc ? "asc" : "desc");
		setOrderBy(property);
	}

	function handleSelectAllClick(event) {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.name);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	}

	function handleClick(event, name) {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}
		setSelected(newSelected);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	const filterResult = (tableHead, type) => {
		setRows(rows.filter((row) => row[tableHead] === type));
	};
	const handleRefresh = () => {
		setRows(drinkData);
	};
	const handleSearch = (searchTerm) => {
		const newArray = rows.filter(
			(item) =>
				(item.Description &&
					item.Description.toLowerCase().includes(
						searchTerm.toString().toLowerCase()
					)) ||
				(item.Volume && item.Volume.includes(searchTerm.toString())) ||
				(item.Category &&
					item.Category.toLowerCase().includes(
						searchTerm.toString().toLowerCase()
					)) ||
				(item.Cost && item.Cost.includes(searchTerm.toString()))
		);
		if (searchTerm.length > 2) {
			setRows(newArray);
		} else {
			setRows(drinkData);
		}
	};

	const deleteResult = () => {
		setRows(rows.filter((f) => !selected.includes(f.ID)));
		setSelected([]);
	};
	const isSelected = (name) => selected.indexOf(name) !== -1;

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					handleRefresh={handleRefresh}
					deleteResult={deleteResult}
					deleteArray={selected}
					filterResult={filterResult}
					handleSearch={handleSearch}
				/>
				<div className={classes.tableWrapper}>
					<Table
						className={classes.table}
						aria-labelledby='tableTitle'
						size={"medium"}>
						<EnhancedTableHead
							classes={classes}
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>

						<TableBody>
							{stableSort(rows, getSorting(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.ID);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											role='checkbox'
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.ID}
											selected={isItemSelected}>
											<TableCell padding='checkbox'>
												<Checkbox
													onClick={(event) => handleClick(event, row.ID)}
													checked={isItemSelected}
													inputProps={{
														"aria-labelledby": labelId
													}}
												/>
											</TableCell>
											<TableCell
												component='th'
												id={labelId}
												scope='row'
												padding='none'>
												{row.Description}
											</TableCell>
											<TableCell align='left'>{row.Category}</TableCell>
											<TableCell align='right'>{row.Volume}</TableCell>
											<TableCell align='right'>{row.Cost}</TableCell>
											<TableCell align='right'>
												<IconButton onClick={() => showEditForm(row.ID)}>
													<Edit />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow style={{ height: 49 * emptyRows }}>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component='div'
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					backIconButtonProps={{
						"aria-label": "previous page"
					}}
					nextIconButtonProps={{
						"aria-label": "next page"
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
				/>
			</Paper>
		</div>
	);
}
