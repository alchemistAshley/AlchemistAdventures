const path = require("path");

module.exports = function(app) {

    // HOME page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // CMS page -- add authorization to receive access to post/edit/delete
    app.get("/cms", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    // DESIGN page
    app.get("/design", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/design.html"));
    });

    // FOOD page
    app.get("/food", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/food.html"));
    });

    // EXPLORE page
    app.get("/travel", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/travel.html"));
    });

};