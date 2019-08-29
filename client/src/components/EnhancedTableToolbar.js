import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import FilterList from "./FilterList";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Cached from "@material-ui/icons/Cached";
import Drawer from "@material-ui/core/Drawer";
import Search from './Search'

const useToolbarStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1)
	},
	highlight:
		theme.palette.type === "light"
			? {
					color: theme.palette.secondary.main,
					backgroundColor: lighten(theme.palette.secondary.light, 0.85)
			  }
			: {
					color: theme.palette.text.primary,
					backgroundColor: theme.palette.secondary.dark
			  },
	spacer: {
		flex: "1 1 100%"
	},
	actions: {
		color: theme.palette.text.secondary
	},
	title: {
		flex: "0 0 auto"
	}
}));

const EnhancedTableToolbar = (props) => {
	const classes = useToolbarStyles();
    const {
			numSelected,
			deleteArray,
			filterResult,
			deleteResult,
			handleSearch,
			handleRefresh
		} = props;
	const [filterShow, filterClick] = React.useState(false);
    
	const handleFilterClick = (event) => {
		filterClick(event.currentTarget);
	};
	const handleFilterClose = () => {
		filterClick(null);
	};

	const handleDeleteClick = (id) => {       
		fetch(`/api/drinks/`, {
			method: "delete",
			body: JSON.stringify(deleteArray),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(deleteResult());   
	};

	return (
		<Toolbar
			className={clsx(classes.root, {
				[classes.highlight]: numSelected > 0
			})}>
			<div className={classes.title}>
				{numSelected > 0 ? (
					<Typography color='inherit' variant='subtitle1'>
						{numSelected} selected
					</Typography>
				) : (
					<Typography variant='h6' id='tableTitle'>
						Beverage Managment
					</Typography>
				)}
			</div>
			<div className={classes.spacer} />
			<div className={classes.actions}>
				{numSelected > 0 ? (
					<Tooltip title='Delete'>
						<IconButton
							onClick={() => handleDeleteClick(numSelected)}
							aria-label='delete'>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				) : (
					<div style={{ display: "flex" }}>
						<IconButton onClick={handleRefresh} aria-label='delete'>
							<Cached />
						</IconButton>
						<Search handleSearch={handleSearch} />
						<Tooltip title='Filter list'>
							<IconButton aria-label='filter list' onClick={handleFilterClick}>
								<FilterListIcon />
							</IconButton>
						</Tooltip>
						<Drawer
							anchor='right'
							open={Boolean(filterShow)}
							onClose={handleFilterClose}>
							<FilterList filterResult={filterResult} />
						</Drawer>
					</div>
				)}
			</div>
		</Toolbar>
	);
};

EnhancedTableToolbar.propTypes = {
	numSelected: PropTypes.number.isRequired
};

export default EnhancedTableToolbar;
