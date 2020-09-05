// npm package to make the server work
const express = require("express");

// initialize express
const app = express();

// identify a PORT in the operating environment or use PORT 3000
const PORT = process.env.PORT || 3000;

// set up express to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Router 
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Listener
app.listen(PORT, function() {
    console.log(`This application is listening on PORT: ${PORT}`);
});
