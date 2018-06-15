const db = require("../models");

module.exports = function(app) {

    // GET All posts --> Home Page
    app.get("/api/posts", function(req, res) {
        db.Post.findAll({})
        .then(function(dbPost) {
            // var image = new Buffer(dbPost.image, 'binary').toString('base64');
            // dbPost.image = image;
            // console.log(dbPost.image);
            // dbPost.image = dbPost.image.toString('utf8');
            res.json(dbPost); 
        });
    });

    // GET Posts for specific category --> design/food/travel
    app.get("/api/posts/category/:category", function (req, res) {
        db.Post.findAll({
            where: {
                category: req.params.category
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // GET post for specific post --> full article
    app.get("/api/posts/:id", function(req, res) {
        db.Post.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // POST for saving new post 
    app.post("/api/posts", function(req, res) {
        // console.log(req.body);
        console.log("IMAGE", Object.prototype.toString.call(req.body.image));
        db.Post.create({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            image: Buffer.from("", "base64"),
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // PUT for updating posts
    app.put("api/posts", function(req, res) {
        db.Post.update(req.body,
        { 
            where: {
                id: req.body.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // DELETE for deleting posts
    app.delete("/api/posts/:id", function(req, res) {
        db.Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    function stripMime(image) {
        var res = image.split(",");
        console.log(res[1]);
        return res[1];
    }
};