var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Home: Send all the burger data
router.get("/", function (req, res) {
    burger.all(function (data) {
        let allObj = {
            burgers: data
        };
        res.render("index", allObj);
    });
});

// add a new burger to the database
router.post("/api/burgers", function (req, res) {

    burger.create(["burger_name"], [req.body.newBurgerName], function (result) {
        res.json({ id: result.insertId });
    });

});

// Devour a burger
router.put("/api/burgers/:id", function (req, res) {

    burger.update({
        devoured: true
      }, "id = " + req.params.id, function (result) {
          console.log(result);
        res.json({ result: result});
      });

});

// Export routes for server.js to use.
module.exports = router;
