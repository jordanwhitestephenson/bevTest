const express = require( 'express' );
const bodyParser = require( 'body-parser' )
const csv = require( 'csv-parser' );
const fs = require( 'fs' );
const app = express()
const cors = require( 'cors' )
var csvWriter = require( 'csv-write-stream' )

const sqlite3 = require( 'sqlite3' ).verbose();

const db = new sqlite3.Database( "./itemdata.sqlite" )

app.use( cors() )
app.listen( process.env.PORT || 8080 )
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

app.get( '/api/drinks', function ( req, res ) {
    db.all( "SELECT ID, Description, Volume, Cost, Category FROM item_master", function ( err, rows ) {
        res.send( rows )
    } );
} )

app.delete( '/api/drinks', function ( req, res ) {
    const body = req.body.map( id => parseInt( id.match( /\d+/ ) ) ) 
    const dbQuery =  (id) => db.run( `DELETE FROM item_master WHERE ID=?`, id, function (res ) {
        console.log(this.changes)
    });
    body.map( item => dbQuery(item))
    


} )



app.get( '/test', function ( req, res ) {
    db.all( "SELECT ID, Description, Volume, Cost, Category FROM item_master", function ( err, rows ) {
        console.log( rows )
        //rows contain values while errors, well you can figure out.
    } );
} );

