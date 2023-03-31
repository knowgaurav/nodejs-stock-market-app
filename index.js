import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware 
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Set static folder
// console.log(__dirname);
// console.log(path.join(__dirname, 'public'));
// app.use(express.static(path.join(__dirname, 'public')));

const otherStuff = "This is other stuff";

app.get('/', (req, res) => {
    res.render('home', {
        // stuff: "This is stuff",
        stuff: otherStuff
    });
});

app.listen(PORT, () => console.log('Server listening on port ' + PORT));