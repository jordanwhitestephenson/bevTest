import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import DrinkTable from "../components/DrinkTable";
import EditItem from "../views/EditItem";

export default function ContentArea() {
	const [drinkData, getData] = useState([]);
	const [editForm, showEdit] = useState( false );
	const [editID, sendEditID] = useState("");
	useEffect(() => {
		const loadData = async () => {
			fetch("/api/drinks")
				.then((res) => res.json())
				.then((result) => {
					getData(result);
				});
		};
		loadData();
	}, [drinkData]);

	const showEditForm = ( id ) =>
	{
		sendEditID(id)
		showEdit(true);
	};
	const handleGoBack = () =>
	{
		showEdit(false)
	}
	return (
		<div>
			{drinkData.length ? (
				<Container fixed>
					{editForm ? (
						<EditItem handleGoBack={handleGoBack} editID={editID}/>
					) : (
						<DrinkTable drinkData={drinkData} showEditForm={showEditForm} />
					)}
				</Container>
			) : (
				<h2>loading..</h2>
			)}
		</div>
	);
}
