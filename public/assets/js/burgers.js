// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

  //submit button on add a burger form
  $("#addBurgerSubmit").on("click", function (event) {

    event.preventDefault();

    // Add the burger to the database
    let newBurgerName = { newBurgerName: $("#addBurger").val().trim() };
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurgerName
    }).then(function (res) {

      // Reload the page to get the updated list
      location.reload();
    });
  });

  // When a burger is devoured
  $(".devourButton").on("click", function (event) {

    //update the devoured boolean in the database
    let burgerUpdateId = $(this).attr("burger_id");
    $.ajax("/api/burgers/" + burgerUpdateId, {
      type: "PUT"
    }).then(function (res) {

      location.reload();

    });

  });



});
