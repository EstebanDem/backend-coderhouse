import express from "express";
const router = express.Router();
import { fork } from 'child_process';

router.get('/info', (_req, res) => {
    const processInfo = {
        platform: process.platform,
        version: process.version,
        title: process.title,
        execPath: process.execPath,
        processId: process.pid,
        rss: process.memoryUsage().rss
    };
    
    res.status(200).json(processInfo);
})

const randomNumbersGeneratorFork = fork('./src/functions/randomNumbersGenerator.js')

router.get('/randoms', (req, res) => {
    
    const cant = req.query.cant || 5000;
    
    randomNumbersGeneratorFork.on('message', (resultado) => {
        res.status(200).json(resultado);
    })
    randomNumbersGeneratorFork.send(cant);
    
})

export default router;