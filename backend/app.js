const express = require("express");
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));

const morganConfig = require('./src/log/morganConfig');
morganConfig.morgan(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Rotas
const AuthRoutes = require('./src/routes/AuthRoutes')

app.use("/auth", AuthRoutes)

app.get("/", (req, res) => {
    res.status(200).send("<h1>API Rodando</h1>");
});


const port = process.env.PORT_API || 3000;
app.listen(port, async () => {
    console.log(`Rodando servidor na porta ${port}`);
});

