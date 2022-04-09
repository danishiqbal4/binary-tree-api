const express = require("express");
const RC = require("./controllers/RegisterController");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/register', RC);

app.get('*', (req: any, res: any) => {
    res.status(404).send('Nothing here!');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});