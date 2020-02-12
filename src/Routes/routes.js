import { PythonShell } from 'python-shell';
import path from 'path';

const routes = (app) => {
    app.use((req, res, next) => {
        //Middleware support
        next();
    })

    app.get('/api/optimization', (req, res) => {
        let pyScript = path.join(__dirname, 'scripts/my_script.py');
        let shell = new PythonShell(pyScript);
        shell.send({ 'a': 'b' });
        shell.on('message', function (message) {
            console.log(message);
        });
        shell.end(function (err,code,signal) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
            console.log('finished');
          });
        res.send("Done");
    })

    app.get('/test', (req, res) => {
        res.send("Invalid Endpoint test");
    })
}

export default routes;