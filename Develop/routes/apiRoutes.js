
const fs = require("fs");

// Routing
module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        fs.readFile('./db/db.json', 'utf8', (error, file) => {
            if (error) throw error;
            const parsedFile = JSON.parse(file);
            res.json(parsedFile);
        });
    });

    // This pushes the recent note into the .json file but not onto the page
    app.post("/api/notes", function (req, res) {
        let note = req.body;
        console.log(req.body);
        let noteId = Date.now();
        note.id = noteId;
        console.log(note);

    // this writes the new note and past notes onto the page
        fs.readFile('./db/db.json', 'utf8', (error, file) => {
            if (error) throw error;
            const parsedFile = JSON.parse(file);
            parsedFile.push(note);
            const newStringifiedFile = JSON.stringify(parsedFile);
            fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
                if (err) throw err;
                console.log("The new note was appended to the file!");
                res.json(note);

            });
        });
    });
    // this deletes a note and writes all notes (minus the deleted notes) onto the page
    app.delete("/api/notes/:id", function (req, res) {
        console.log(Number(req.params.id));
        fs.readFile('./db/db.json', 'utf8', (error, file) => {
            if (error) throw error;
            const parsedFile = JSON.parse(file);
            const result = parsedFile.filter(note => note.id !== Number(req.params.id));
            const newStringifiedFile = JSON.stringify(result);
            fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
                if (err) throw err;
                res.json(req.params.id);
            });
        });
    });
}
