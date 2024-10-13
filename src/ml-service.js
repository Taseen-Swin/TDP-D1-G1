const { PythonShell } = require('python-shell');
const path = require('path');


class MLService {
    constructor() {

    }

    async makeFuturePrediction() {
        // let options = {
        //     scriptPath: '', // Adjust to where your Python script is located
        //     args: [] // You can pass any arguments here if needed
        //   };
        
        //   // Run the Python script for prediction
        //   PythonShell.run('predict_future.py', options, (err, results) => {
        //     if (err) throw err;
        //     // Parse the predictions returned by the Python script
        //     let predictions = JSON.parse(results[0]);
        //     res.json(predictions);
        //   });
    }
}

module.exports = { MLService };
