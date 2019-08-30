import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/LibraryAdd";
import TextField from "@material-ui/core/TextField";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";



const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1,
		display: "none",
		[theme.breakpoints.up("sm")]: {
			display: "block"
		}
	},
	white: {
		color: "#fff"
	},
	buttonContainer: {
		display: "flex",
		justifyContent: "flex-end",
		padding: 16
	}
}));

export default function Navigation() {
	const classes = useStyles();
	const [open, setAddOpen] = React.useState(false);
	const [category, handleCategory] = React.useState("");
	const [volume, handleVolume] = React.useState("");
	const [cost, handleCost] = React.useState("");
	const [description, handleDescription] = React.useState("");

	const handleSubmit = () => {
		const resultObject = {
			Description: description,
			Volume: volume,
			Cost: cost,
			Category: category
		};
		fetch(`/api/drinks/`, {
			method: "POST",
			body: JSON.stringify(resultObject),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(setAddOpen(false));   
	};
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => setAddOpen(true)}
						className={classes.button}>
						Add
						<Add className={classes.rightIcon} />
					</Button>
					<Typography className={classes.title} variant='h6' noWrap>
						Beverage Metrics
					</Typography>
				</Toolbar>

				<Drawer open={open} anchor='top' onClose={() => setAddOpen(false)}>
					<form>
						<List
							aria-labelledby='nested-list-subheader'
							className={classes.root}>
							<ListItem>
								<TextField
									required
									fullWidth
									id='outlined-name'
									label='Description'
									className={classes.textField}
									margin='normal'
									value={description}
									variant='outlined'
									onChange={(e) => handleDescription(e.target.value)}
								/>
							</ListItem>
							<ListItem style={{ justifyContent: "space-between" }}>
								<TextField
									id='outlined-name'
									required
									value={volume}
									label='Volume'
									className={classes.textField}
									margin='normal'
									variant='outlined'
									onChange={(e) => handleVolume(e.target.value)}
								/>
								<TextField
									id='outlined-name'
									label='Cost'
									required
									value={cost}
									className={classes.textField}
									margin='normal'
									variant='outlined'
									type='number'
									onChange={(e) => handleCost(e.target.value)}
								/>
								<TextField
									id='outlined-name'
									label='Category'
									value={category}
									className={classes.textField}
									margin='normal'
									required
									variant='outlined'
									type='text'
									onChange={(e) => handleCategory(e.target.value)}
								/>
							</ListItem>
						</List>
						<div className={classes.buttonContainer}>
							<Button
								type='submit'
								variant='contained'
								disabled={!cost || !description || !volume || !category}
								color='secondary'
								onClick={() => handleSubmit()}
								className={classes.button}>
								Submit
								<Add className={classes.rightIcon} />
							</Button>
						</div>
					</form>
				</Drawer>
			</AppBar>
		</div>
	);
}
