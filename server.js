const express = require("express");
const bodyParser = require("body-parser");
const csv = require("csv-parser");
const fs = require("fs");
const app = express();
const cors = require("cors");
var csvWriter = require("csv-write-stream");

const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./itemdata.sqlite");

app.use(cors());
app.listen(process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/drinks", function(req, res) {
	db.all(
		"SELECT ID, Description, Volume, Cost, Category FROM item_master",
		function(err, rows) {
			res.send(rows);
		}
	);
} );

app.get( "/api/drinks/:id", function ( req, res )
{
	const id = req.params.id
	db.all(
		"SELECT ID, Description, Volume, Cost, Category FROM item_master WHERE ID=?", id,
		function(err, rows) {
			res.send(rows);
		}
	);
});

app.delete("/api/drinks", function(req, res) {
	const body = req.body.map((id) => parseInt(id.match(/\d+/)));
	const dbQuery = (id) =>
		db.run(`DELETE FROM item_master WHERE ID=?`, id, function(res) {
			console.log(this.changes);
		});
	body.map((item) => dbQuery(item));
});

app.post("/api/drinks", function(req, res) {
    const body = req.body;
    const id =
			Math.random()
				.toString(36)
				.substring(2, 15) +
			Math.random()
				.toString(36)
				.substring(2, 15);
    db.run(`INSERT INTO item_master(ID, Description, Volume, Cost, Category) VALUES (?, ?, ?, ?, ?)`, [id, body.Description, body.Volume, body.Cost, body.Category],
		function(err) {
			if (err) {
				return console.log(err.message);
			}
			// get the last insert id
			console.log(`A row has been inserted with rowid ${this.lastID}`);
		}
	);
} );

app.put("/api/drinks/:id", function(req, res) {
	const id = req.params.id;
	const body = req.body
	db.run(`UPDATE item_master SET Description = ? WHERE ID = ?`, [body.Description, id], function(res) {
		console.log(this.changes);
	});
});

