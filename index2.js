const express = require('express');
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Endpoint for predictions
app.post('/predict', (req, res) => {
    const inputData = req.body;

    // Prepare options for PythonShell
    const options = {
        mode: 'json',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './', // Path where your Python script is located
        args: [JSON.stringify(inputData)]
    };

    PythonShell.run('predict.py', options, (err, results) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.send({ predictions: results });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
