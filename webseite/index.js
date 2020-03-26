const express = require('express');
const path = require('path');
const { Client } = require('pg');
const fs = require('fs');

const app = express();

const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: '3wbn945Z6',
    port: 5432
})

client.connect();

app.use(express.static(path.join(__dirname, 'public')));

// write into data.json

app.get('/graph/:date', async (req, res) => {

    // requirement: date has form dd.mm.yyyy

    const query = await client.query(`select value from vollmondkristall where acquisition_date = to_date('${req.params.date}', 'dd.mm.yyyy') order by acquisition_time asc`);

    let data = [];

    for(let i=0; i<query.rowCount; i++) {

        data.push(query.rows[i].value);
    }
    
    /*fs.writeFile('./public/data.json', JSON.stringify({data: data}), (err) => {

        if (err) {
            console.log("Could not write into data.json");
            throw err;
        }
        res.status(200).json({ msg: "Data fetched into data.json", data});
    });*/
	res.status(200).json({});
});

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));
    res.end();

});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));