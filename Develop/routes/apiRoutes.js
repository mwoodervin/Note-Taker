
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

        fs.readFile('./db/db.json', 'utf8', (error, file) => {
            if (error) throw error;
            // parse db.json into a JSON object
            const parsedFile = JSON.parse(file);
            // push the new note onto the JSON object
            parsedFile.push(note);
            // Create new stringify of the combined file to write back to file
            const newStringifiedFile = JSON.stringify(parsedFile);
            // notesData = parsedFile;
            // re-write the file as the combined file
            fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
                if (err) throw err;
                console.log("The new note was appended to the file!");
                res.json(note);

            });
        });
    });

    app.delete("/api/notes/:id", function (req, res) {
        console.log(Number(req.params.id));
        fs.readFile('./db/db.json', 'utf8', (error, file) => {
            if (error) throw error;
            // parse db.json into a JSON object
            const parsedFile = JSON.parse(file);
            const result = parsedFile.filter(note => note.id !== Number(req.params.id));
            // notesData = result;
            // Create new stringify of the combined file to write back to file
            const newStringifiedFile = JSON.stringify(result);
            // re-write the file as the combined file
            fs.writeFile('./db/db.json', newStringifiedFile, 'utf8', (err) => {
                if (err) throw err;
                res.json(req.params.id);
            });
        });
    });
}
