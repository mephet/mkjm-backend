
import OptimizerRequestHandler from '../handlers/OptimizerRequestHandler';

const routes = (app) => {

    app.post('/api/optimization', (req, res) => {

        console.log("post received")

        OptimizerRequestHandler.handleOptimizationRequest(req.body);

        // let pyScript = path.join(__dirname, 'scripts/my_script.py');
        // let shell = new PythonShell(pyScript);
        // let shellInput = JSON.stringify(input)
        // shell.send(shellInput);
        // shell.on('message', function (message) {
        //     console.log("output is :" + message);
        // });
        // shell.end(function (err, code, signal) {
        //     if (err) throw err;
        // });
        res.sendStatus(200);
    })

    app.get('/test', (req, res) => {
        res.send("Invalid Endpoint test");
    })
}

export default routes;