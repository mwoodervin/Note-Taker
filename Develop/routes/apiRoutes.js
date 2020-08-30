
const fs = require("fs");

// accessing the data in the db.json file
let rawNotesData = fs.readFileSync("./db/db.json");
let notesData = JSON.parse(rawNotesData);
console.log(notesData);

// Routing
module.exports = function(app) {
    app.get("./api/notes", function(req, res) {
        res.json(notesData);
    });

    app.post("./api/notes", function(req, res) {
        if (notesData.note) { notesData.push(req.body);
            res.json(true);
            console.log("note added");
        }
        else {
            res.json(false);
            console.log("no note added");
        }
       
    });

    // app.delete("./api/notes", function(req, res) {
        
    // })
}

