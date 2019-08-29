import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import DrinkTable from "../components/DrinkTable";

export default function ContentArea() {
	const [drinkData, getData] = useState([]);
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
	return (
		<div>
			{drinkData.length ? (
				<Container fixed>
					<DrinkTable drinkData={drinkData} />
				</Container>
			) : (
				<h2>loading..</h2>
			)}
		</div>
	);
}
