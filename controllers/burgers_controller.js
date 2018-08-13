var express = require("express");
var router = express.Router();
var db = require("../models");

// Home: Send all the burger data
router.get("/", function (req, res) {
/*     burger.all(function (data) {
        let allObj = {
            burgers: data
        };
        res.render("index", allObj);
    }); */

    db.Burger.findAll().then(function (data) {
        let allObj = {
            burgers: data
        };
        res.render("index", allObj);
    });
});

// add a new burger to the database
router.post("/api/burgers", function (req, res) {

    db.Burger.create(["burger_name"], [req.body.newBurgerName], function (result) {
        res.json({ id: result.insertId });
    });

});

// Devour a burger
router.put("/api/burgers/:id", function (req, res) {

    console.log(req.params.id);
    db.Burger.update(
        {devoured: true},
        {where: {id: req.params.id} }
      )
      .then(function(rowsUpdated) {
        res.json(rowsUpdated)
      })


/*     db.Burger.update({
        devoured: true
      }, "id = " + req.params.id, function (result) {
          console.log(result);
        res.json({ result: result});
      }); */

});

// Export routes for server.js to use.
module.exports = router;
