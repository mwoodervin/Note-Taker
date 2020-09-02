
const fs = require("fs");

// accessing the data in the db.json file
let rawNotesData = fs.readFileSync("./db/db.json");
let notesData = JSON.parse(rawNotesData);
// let notes = [...notesData];
// console.log(notesData);
// console.log(...notesData);
console.log(notesData);

// Routing
module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.send(notesData);
    });

    // app.get("./api/index", function(req, res) {
    //     res.json(notesData);
    // });

    app.post("/api/notes", function(req, res) {
        notesData.push(req.body);
            res.send(req.body);
            console.log("note added");
        });

    // app.delete("./api/notes", function(req, res) {
        
    // })
}

