// npm package to make the server work
const express = require("express");

// initialize express
const app = express();

// identify a PORT in the operating environment or use PORT 3000
const PORT = process.env.PORT || 3000;

// set up express to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Router - have to create these files first
// require("/routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

// Listener
app.listen(PORT, function() {
    console.log("This application is listening onf PORT:" + PORT);
});
