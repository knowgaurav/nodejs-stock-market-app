// Stock Market Portfolio App by Gaurav Singh

const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const { default: axios } = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// use Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// API Key - pk_60c7c9c19d8e48388b6950109450aeae
// request('http://apis.iex.cloud/v1/data/core/quote/aapl?token=pk_60c7c9c19d8e48388b6950109450aeae', { json: true }, (err, res, body) => {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(body);
// })

// create call API function
const getStockData = (ticker) => {
    return new Promise(function (resolve, reject) {
        axios.get(`https://apis.iex.cloud/v1/data/core/quote/${ticker}?token=pk_60c7c9c19d8e48388b6950109450aeae`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(function (response) {
                if (response.status) {
                    resolve(response.data[0]);
                }
            })
            .catch(error => reject(error));
    });
}


// Set Handlebars Middleware 
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set static folder
// console.log(__dirname);
// console.log(path.join(__dirname, 'public'));
// const otherStuff = "This is other stuff";

// Set Handlebar index GET route
app.get('/', (req, res) => {
    getStockData("fb").then(function (apiData) {
        res.render('home', {
            // stuff: "This is stuff",
            stock: apiData
        });
    })
        .catch(function (err) {
            res.render('home', {
                // stuff: "This is stuff",
                stock: "Cannot retrieve stock data " + err.message
            });
        });
});

// Set Handlebar index POST route
app.post('/', (req, res) => {
    posted_stuff = req.body.stock_ticker;
    getStockData(posted_stuff).then(function (apiData) {
        res.render('home', {
            stock: apiData,
            posted_stuff: posted_stuff
        });
    })
        .catch(function (err) {
            res.render('home', {
                stock: "Cannot retrieve stock data " + err.message
            });
        });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server listening on port ' + PORT));