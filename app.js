const path = require("node:path");
const pool = require("./db/pool");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const bcrypt = require("bcryptjs"); // Add bcrypt import
const LocalStrategy = require("passport-local").Strategy;
const SignUpRouter = require("./router/sign-up");
const LogInRouter = require("./router/log-in");
const indexRouter = require("./router/indexRouter");
const addRouter = require("./router/addRouter");
// const { errorHandler } = require("./controllers/error");

passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        console.log(`Attempting login for username: ${username}`);
        
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
          console.log('No user found');
          return done(null, false, { message: 'Invalid username or password' });
        }
    
        const user = result.rows[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          console.log('Password mismatch');
          return done(null, false, { message: 'Invalid username or password' });
        }
  
        console.log('Authentication successful');
        return done(null, user);
      } catch (err) {
        console.error('Error in authentication:', err);
        return done(err);
      }
    }
));

  

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]); // Corrected the typo here
      const user = rows[0];
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport session

app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);
app.use("/sign-up", SignUpRouter);
app.use("/log-in", LogInRouter);
app.use("/add", addRouter);
app.get("/log-out", (req, res ) => {
    req.logout((err) => {
      if (err) {
        res.status(400).send('Error in logging out');
      }
      res.redirect("/");
    });
  });

// Error Handler
// app.use(errorHandler);

app.listen(3000, () => console.log("App listening on port 3000!"));
