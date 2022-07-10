const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');
const config = {
    user          : "",
    password      : "",
    connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = )(PORT = ))(CONNECT_DATA = (SERVER = DEDICATED) (SID= )))"
}

// const home = require('./routes/home');
// const validate = require('./routes/validate');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())



app.get('/', function (req, res,next) {
    res.send('nodejs API');
    res.end();
})


app.get('/validate/:omang', async function (req, res) {
    const omang = req.params['omang'];
    let conn;
    try {
        conn = await oracledb.getConnection(config)

        const result = await conn.execute(
            'select * from BWA'
        )

        console.log(result.rows[0])
    } catch (err) {
        console.log('Ouch!', err)
    } finally {
        if (conn) { // conn assignment worked, need to close
            await conn.close()
        }
    }
})

module.exports = app;
