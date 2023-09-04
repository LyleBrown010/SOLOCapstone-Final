const {express, routes} = require('./controllers');
const app = express();

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandling = require('./middleware/errorHandling')
const port = +process.env.PORT || 3000;

// set up cors access
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Request-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Authorization");
    next();
});

app.use(
    express.static('./static'),
    express.urlencoded({
        extended: false
    }),
    cookieParser(),
    cors(),
    routes
);

// direct to routes description page
routes.get('/',
(req, res) => {
    res.sendFile(path.resolve(__dirname, './static/html/index.html'));
});

app.use(errorHandling);

// set server
app.listen(port, () => {
    console.log(`Puzzles Deli server is running on port ${port}`);
});