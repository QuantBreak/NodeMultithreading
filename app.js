'use strict'

require('dotenv').config();

const App = require('express')();
const http = require('http');
const Utilities = require('./utilities');
const WorkerCon = require('./worker-pool/controller');

App.get('/bcrypt', async (req, res) => {
    const password = 'some crazy password';
    let result = null;
    let workerPool = null;

    if (process.env.WORKER_POOL_ENABLED === '1') {
        workerPool = WorkerCon.get()
        result = await workerPool.bcryptHash(password);
    } else {
        result = await Utilities.bcryptHash(password);
    }

    res.send(result);
});

const port = process.env.PORT;
const server = http.createServer(App);

;(async () => {
    if (process.env.WORKER_POOL_ENABLED === '1') {
        const options = { minWorkers: 'max' };
        await WorkerCon.init(options);
    }

    server.listen(port, () => {
        console.log(`NodeJS Performance Optimizations listening on: ${port}`);
    });
})();