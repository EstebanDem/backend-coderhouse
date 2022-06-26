import os from "node:os";
import {fork} from "child_process";

const randomNumbersGeneratorFork = fork('./src/utils/functions/randomNumbersGenerator.js')

export async function getInfo(req, res) {
    const processInfo = {
        platform: process.platform,
        version: process.version,
        title: process.title,
        execPath: process.execPath,
        processId: process.pid,
        rss: process.memoryUsage().rss,
        numberOfProcessors: os.cpus().length
    };
    res.status(200).json(processInfo);
}

export async function getRandomNumbers(req, res) {
    const cant = req.query.cant || 5000;

    randomNumbersGeneratorFork.on('message', (resultado) => {
        res.status(200).json(resultado);
    })
    randomNumbersGeneratorFork.send(cant);
}
