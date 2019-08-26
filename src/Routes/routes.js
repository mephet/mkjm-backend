
const routes = (app) => {
    app.use((req, res, next) => {
        //Middleware support
        next();
    })

    app.get('/', (req, res) => {
        res.send("Invalid Endpoint");
    })

    app.get('/test', (req, res) => {
        res.send("Invalid Endpoint test");
    })
}

export default routes;