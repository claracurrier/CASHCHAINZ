/* Import our Modules */
const Bandwidth  = require("node-bandwidth");
const express    = require("express");
const bodyParser = require("body-parser");
const path	 = require('path');
var login = require('./routes/loginroutes');

/* Express Setup */
let app  = express();
let http = require("http").Server(app);
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 3000));

/* Setup our Bandwidth information */
const myBWNumber = '+19196367402';
const myCreds = {
    userId    : 'u-nek7fwd7rcji2d6hqzympeq',
    apiToken  : 't-y3nbr2njxtcfz7lijfcgx2a',
    apiSecret : 'ehvt7qvrxbexffpvvvakp2k3eclaj6manm5vukq'
};
const bandwidthAPI = new Bandwidth(myCreds);

/* Serve our lil website */
app.get("/", function (req, res) {
      res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/pearl-hacks", function(req, res) {
    res.send("Pearl Hacks");
})


app.post("/api/incoming-messages", function (req, res){
    const messageBody = req.body;
    console.log(messageBody);
    res.send(200);
    const myRequest = req.body.text;
    bandwidthAPI.Message.send({
        to: req.body.from,
        from: req.body.to,
	  text: "Thank you for sending a message to CASHCHAINZ";

    })
    .then(function (result){
        console.log(result);
    })
    .catch(function (error){
        console.log(error);
    });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Request$
    next();
});
var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register',login.register);
router.post('/login',login.login)
app.use('/api', router);


/* Answer the request to send the text message */
app.post("/send-message", function (req, res) {
    console.log(req.body);
    const messageBody = {
        to   : req.body.to,
        text : req.body.text,
        from : myBWNumber,
    }
    /* Check to see if media was sent */
    if (req.body.media !== ''){
        messageBody.media = [req.body.media];
    }
    bandwidthAPI.Message.send(messageBody)
    .then(function (bandwidthResponse) {
        res.send(bandwidthResponse);
        return;
    })
    .catch(function (error) {
        res.send(error);
        return;
    });
});

http.listen(app.get('port'), function(){
    console.log('listening on *:' + app.get('port'));
});
