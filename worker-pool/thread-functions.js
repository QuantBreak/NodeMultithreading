'use strict'

const WorkerPool = require('workerpool');
const Utilities = require('../utilities');

const bcryptHash = (password) => {
    return Utilities.bcryptHash(password);
}

WorkerPool.worker({
    bcryptHash
});