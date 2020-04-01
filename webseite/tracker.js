const express = require('express');
const path = require('path');
const { Client } = require('pg');
const fs = require('fs');
const config = require('../config/tracker');

const app = express();

const client = new Client(config)

client.connect();

app.use(express.static(path.join(__dirname, 'public')));

// write into data.json
// get every value on a single date

app.get('/graph/:date', async (req, res) => {

    // requirement: date has form yyyy-mm-dd TODO: check

    const query = await client.query(`select value, acquisition_time from vollmondkristall where date(acquisition_time) = to_date('${req.params.date}', 'yyyy-mm-dd') order by acquisition_time asc`);

    let data = [];

    for(let i=0; i<query.rowCount; i++) {

        data.push(query.rows[i]);
    }
    
    fs.writeFile('./public/data.json', JSON.stringify({data: data}), (err) => {

        if (err) {
            console.log("Could not write into data.json");
            throw err;
        }
        res.status(200).json({ msg: "Data fetched into data.json", data});
    });
});

// entry point for index.html

app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));
    res.end();

});

// get every year

app.get('/dates', async (req, res) => {

    const query = await client.query(`select distinct date(acquisition_time) from vollmondkristall order by date(acquisition_time) desc limit 20`);

    let data = [];

    for(let i=0; i<query.rowCount; i++) {

        data.push(query.rows[i].date);
    }
    
    fs.writeFile('./public/dates.json', JSON.stringify({data: data}), (err) => {

        if (err) {
            console.log("Could not write into dates.json");
            throw err;
        }
        res.status(200).json({ msg: "Dates", data});
    });
})

const PORT = process.env.PORT || 80;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));