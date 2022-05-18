import express from "express";
const router = express.Router();

router.get('/info', (req, res) => {
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

export default router;