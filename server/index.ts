const express = require("express");
const RC = require("./controllers/RegisterController");
const FC = require("./controllers/FetchController");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', RC);
app.get('/fetch/all', FC.FetchAll);
app.get('/fetch/:sponsor_user_name/:levels', FC.FetchUserTree);

app.get('*', (req: any, res: any) => {
    res.status(404).send('Nothing here!');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});