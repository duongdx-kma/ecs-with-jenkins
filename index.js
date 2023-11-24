import express from 'express'
import os from 'os'
import bodyParser from 'body-parser';
import {MongoClient} from 'mongodb'
import * as dotenv from 'dotenv';
dotenv.config();

const app = express()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (request, response) => {
    const clientIp = request.header('x-forwarded-for');
    const elbIp = request.socket.remoteAddress;
    const containerIp = request.socket.localAddress;
    const containerName = os.hostname();
    console.log('hello root')
    response.json({
        service: "Duongdx-root-service v2 - use code commit v11111",
        contact: "xuanduong.kma@gmail.com",
        clientIp: clientIp,
        elbIp: elbIp,
        containerIp: containerIp,
        containerName: containerName,
        message: `hello world from Ha Noi, the VietNam's capital`
    })
})

// use when starting application locally
let mongoUrlLocal = process.env.MONGODB_URL;

// pass these options to mongo client connect request to avoid DeprecationWarning for current Server Discovery and Monitoring engine
let mongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// "user-account" in demo with docker. "my-db" in demo with docker-compose
let databaseName = process.env.DATABASE_NAME;

app.post('/update-profile', function (req, res) {
    let userObj = req.body;

    MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
        if (err) {
            console.log('Connect error')
            throw err;
        }

        let db = client.db(databaseName);
        userObj['userid'] = 1;

        let myquery = { userid: 1 };
        let newvalues = { $set: userObj };

        db.collection("users").updateOne(myquery, newvalues, {upsert: true}, function(err, res) {
            if (err) throw err;
            client.close();
        });

    });
    // Send response
    res.send(userObj);
});

app.get('/get-profile', function (req, res) {
    console.log(11111, mongoUrlLocal);
    console.log(mongoUrlLocal)
    let response = {};
    // Connect to the db
    MongoClient.connect(mongoUrlLocal, mongoClientOptions, function (err, client) {
        if (err) {
            console.log('Connect error')
            throw err;
        }

        let db = client.db(databaseName);

        let myquery = { userid: 1 };

        db.collection("users").findOne(myquery, function (err, result) {
            if (err) throw err;
            response = result;
            client.close();

            // Send response
            res.send(response ? response : {});
        });
    });
});

app.listen(process.env.EXPRESS_PORT, () => {
    console.log('app started successfully')
})