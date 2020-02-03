/*if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}*/
const express = require("express");
const bodyParser = require("body-parser");
const mongooseSetup = require("./config/database");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

const path = require("path");

const receipt = require("./routes/receipt");
const cors = require("cors");
mongooseSetup.start(); //starts the database
//Passport Config
require("./config/passport")(passport);

const app = express();
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.set("trust proxy", true);
app.use(cors());
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
    next();
});

//Body Parser
//app.use(express.urlencoded({ extended: false }));


//cors is for cross-origin requests
//we should set this up to ensure we only accept requests
//app.use(bodyParser.urlencoded({ extended: true })); //express 4 way of doing things
//app.use(bodyParser.json()); //alows us to deal with form data and json data
//require('crypto').randomBytes(64).toString('hex')
//used to generate keys for our access and refresh tokens

const PORT = process.env.PORT || 3001;
/*
const SECRET = process.env.SESS_SECRET || "secret";
const PRODCUCTION = process.env.NODE_ENV || "development";
//console.log(mongooseSetup.connection);
//we need to setup https before making the cookie secure
//Express session middleware
app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: SECRET,
    store: new MongoStore({ mongooseConnection: mongooseSetup.connection }),
    cookie: {
      httpOnly: true,
      secure: PRODCUCTION === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    }
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
*/
//Globals
/*
app.use((req, res, next) => {
  if (req.session) {
    res.locals.session = req.session;
  }
  next();
});
*/
//Routes
app.all('/', function(req, res, next) {
    console.log({method: req.method, url: req.url});
    next();
});
//app.use("/", index);
app.use("/receipt", receipt);

/*
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    );
  });
}
*/
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
