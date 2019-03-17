const express = require('express');
const bodyParser = require('body-parser');
const predictor = require('./predictor');

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/predict', async (req, res) => {
    console.log('taking request')
    const img_data = req.body;
    const result = await predictor(img_data)
    res.status(200).send({
        result
    })
})
app.get('/response', (req, res) => {
    res.send('Hello from server')
})

// express will serve up production assets
// like our main.js or main.css file
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('mnist/build'));

    // // express will serve up the index.html file
    // // if it doesn't recognize the route
    // // catch-all case
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'mnist', 'build', 'index.html'));
    });
}

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
