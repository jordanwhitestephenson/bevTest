import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import DrinkTable from "../components/DrinkTable";
import EditItem from "../views/EditItem";

export default function ContentArea() {
	const [drinkData, getData] = useState([]);
	const [editForm, showEdit] = useState(false);
	const [editID, sendEditID] = useState("");

	const fetchData = async () => {
		fetch("/api/drinks")
			.then((res) => res.json())
			.then((result) => {
				getData(result);
			});
	};

	useEffect(() => {
		fetchData(drinkData);
	}, [editForm]);


	const showEditForm = (id) => {
		sendEditID(id);
		showEdit(true);
	};
	const handleGoBack = () => {
		showEdit(false);
	};
	return (
		<div>
			{drinkData.length ? (
				<Container fixed>
					{editForm ? (
						<EditItem
							handleGoBack={handleGoBack}
							editID={editID}
							editForm={editForm}
						/>
					) : (
						<DrinkTable
							drinkData={drinkData}
							showEditForm={showEditForm}
							updateAction={!editForm}
						/>
					)}
				</Container>
			) : (
				<h2>loading..</h2>
			)}
		</div>
	);
}
