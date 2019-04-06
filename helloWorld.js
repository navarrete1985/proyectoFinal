const express = require('express');
const app = express();

const { PORT, IP } = process.env;

app.use((req, res, next) => {
    console.log(req.href);
    // res.end(req);
    console.log("Paso por aquí");
    next();
});

app.get('' || '/', (req, res) => {
    // console.log("REQ", req);
    // console.log("Funcionando en el puerto: " + PORT + " y la IP: " + IP);
    res.end("Funcionando en el puerto: " + PORT + " y la IP: " + IP + " " + req);
});

app.get('*', (req, res) => {
    res.end("No existe");
});

app.listen(PORT, IP, () => {
    console.log("Funcionando en el puerto: " + PORT + " y la IP: " + IP);
});