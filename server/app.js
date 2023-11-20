/*================== Global Imports =================*/
const express = require("express");
const app = express();

const dotenv = require("dotenv");

const cors = require("cors");
// const morgan = require("morgan");
const csp = require("helmet-csp");
const sanitizeMongo = require("express-mongo-sanitize");

const { sanitizeMiddleware } = require("./middleware/middleware");

const path = require("path");

/*================== Configurations =================*/

/*================== Environment Variables config for development =================*/
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

/*================== Express config =================*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*================== Security ==================*/
if (process.env.NODE_ENV === "production") {
  // Use the helmet middleware to set the default CSP
  app.use(
    csp({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'",
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
          "'unsafe-inline'",
        ],
        fontSrc: [
          "https://fonts.gstatic.com",
          "https://dreamcareer.onrender.com",
          "'self'",
        ],
        imgSrc: ["'self'", "*", "blob:", "data:"],
        connectSrc: ["'self'", "wss://dreamcareer.onrender.com/"],
      },
    })
  );
  
  // Enable CORS for all routes in production
  if (process.env.NODE_ENV === "production") {
    app.use(
      cors({
        origin: ["https://dreaca.com"],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
      })
    );
  } else {
    // For non-production environments, allow all origins with the cors() middleware
    app.use(cors());
  }
}
// app.use(morgan("common"));

//To ensure that all incoming user input is properly sanitized
app.use(sanitizeMiddleware);

// sanitize-mongo middleware to protect against MongoDB injection attacks
app.use(sanitizeMongo({ replaceWith: "_" }));

//Routes
const routes = require("./routes");
app.use(routes);

// Serve the index.html file from the public folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'));
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  })
}

module.exports = app;
