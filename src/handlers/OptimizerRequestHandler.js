import { PythonShell } from 'python-shell';
import path from 'path';

class OptimizerRequestHandler {
    static handleOptimizationRequest(data) {
        // console.log(data);
        let pyScript = path.join(__dirname, 'scripts/p_entry.py');
        let shell = new PythonShell(pyScript);
        let shellInput = JSON.stringify(data)
        shell.send(shellInput);
        shell.on('message', function (message) {
            console.log("output is :" + message);
        });
        shell.end(function (err, code, signal) {
            if (err) throw err;
        });
    }
}

export default OptimizerRequestHandler;