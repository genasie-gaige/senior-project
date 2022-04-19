const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'userAuth'
})

//user database
app.post('/create', (req, res) => {
    const userId = req.body.userId
    const password = req.body.password
    const userName = req.body.userName
    const applianceKey = req.body.applianceKey

    db.query('INSERT INTO users (userId, password, userName, applianceKey) VALUES (?,?,?,?)',
        [userId, password, userName, applianceKey],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('complete')
            }
        })
})

app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

//meds database
app.post('/addMed', (req, res) => {
    const idMeds = req.body.idMeds
    const user = req.body.user
    const med = req.body.med
    const curWeight = req.body.curWeight
    const startWeight = startWeight

    db.query('INSERT INTO meds (idMeds, user, med, curWeight, startWeight) VALUES (?,?,?,?,?)',
        [idMeds, user, med, curWeight, startWeight],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send('complete')
            }
        })
})

app.get('/meds', (req, res) => {
    db.query('SELECT * FROM meds', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.listen(3002, () => {
    console.log("Server connected");
})
