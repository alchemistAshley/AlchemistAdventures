const db = require("../models");

module.exports = function(app) {

    app.post("/login", function(req, res) {
        db.Admin.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function(dbLogin) {
            if (dbLogin) {
                var sessid =  "" + (Math.random() * 10000000000000000000);
                db.Admin.update({
                    sessionId: sessid
                }, {
                    where: {
                        username: dbLogin.username,
                        password: dbLogin.password
                    }
                }).then(function(){
                    var sess = {
                        session: sessid
                    };
                    console.log(sess);
                    res.json(sess);
                });
            } 
        });
    });

    app.post("/logout", function(req, res){
        db.Admin.update({
            sessionId: null
        },{
            where: {
                sessionId: req.body.sessionId
            }
        });
    });

    // GET All posts --> Home Page
    app.get("/api/posts", function(req, res) {
        db.Post.findAll({})
        .then(function(dbPost) {
            // console.log("dbpost:", dbPost);
            db.Admin.findOne({
                where: {
                    sessionId : req.params.sessionId
                }
            }).then(function(user){
                // dbPost.loggedIn = user != null;
                res.json(dbPost); 
            });
            
        });
    });

    // GET Posts for specific category --> design/food/travel
    app.get("/api/posts/category/:category", function (req, res) {
        db.Post.findAll({
            where: {
                category: req.params.category
            }
        }).then(function(dbPost) {
            console.log("dbPost: ", dbPost);
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
        console.log("req.body.image", req.body.image);
        db.Post.create({
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            image: req.body.image,
        }).then(function(dbPost) {
            res.json(dbPost);
        });
    });

    // PUT for updating posts
    app.put("/api/posts", function(req, res) {
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

    // function stripMime(image) {
    //     var res = image.split(",");
    //     console.log(res[1]);
    //     return res[1];
    // }
};