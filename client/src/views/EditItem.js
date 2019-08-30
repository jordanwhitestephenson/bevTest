import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/LibraryAdd";
import TextField from "@material-ui/core/TextField";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import Check from "@material-ui/icons/Check";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	},
	buttonContainer: {
		display: "flex",
		justifyContent: "space-between",
		marginTop: "2em"
	},
	editItemContainer: {
		marginTop: 30
	}
}));
const EditItem = ({ handleGoBack, editID }) => {
	const [edit, editData] = useState("");
	const [description, editDescription] = useState("");
	const [category, editCategory] = useState("");
	const [volume, editVolume] = useState("");
	const [cost, editCost] = useState("");
	const classes = useStyles();
	useEffect(() => {
		const loadData = async () => {
			fetch(`/api/drinks/${editID}`)
				.then((res) => res.json())
				.then((result) => {
					editDescription(result[0].Description);
					editCategory(result[0].Category);
					editVolume(result[0].Volume);
					editCost(result[0].Cost);
				});
		};
		loadData();
	}, []);
	const handleEditSubmit = () => {
		const resultObject = {
			Description: description,
			Volume: volume,
			Cost: cost,
			Category: category
		};
		fetch(`/api/drinks/${editID}`, {
			method: "PUT",
			body: JSON.stringify(resultObject),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(console.log("handleEdit"));
		
	};
	return (
		<div className={classes.editItemContainer}>
			<Paper>
				<form className={classes.container} noValidate autoComplete='off'>
					<TextField
						id='standard-name'
						label='Description'
						className={classes.textField}
						value={description}
						onChange={(e) => editDescription(e.target.value)}
						margin='normal'
					/>
					<TextField
						id='standard-Category'
						label='Category'
						className={classes.textField}
						value={category}
						onChange={(e) => editCategory(e.target.value)}
						margin='normal'
					/>
					<TextField
						id='standard-Category'
						label='Cost'
						className={classes.textField}
						type='number'
						value={cost}
						onChange={(e) => editCost(e.target.value)}
						margin='normal'
					/>
					<TextField
						id='standard-Category'
						label='Volume'
						className={classes.textField}
						value={volume}
						onChange={(e) => editVolume(e.target.value)}
						margin='normal'
					/>
				</form>
			</Paper>
			<div className={classes.buttonContainer}>
				<Button
					color='primary'
					onClick={() => handleGoBack()}
					className={classes.button}>
					Go Back
					<NavigateBefore className={classes.rightIcon} />
				</Button>
				<Button
					variant='contained'
					color='primary'
					onClick={() => handleEditSubmit()}
					className={classes.button}>
					Save
					<Check className={classes.rightIcon} />
				</Button>
			</div>
		</div>
	);
};

export default EditItem;
