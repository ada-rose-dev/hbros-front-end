//This will use jQuery to manipulate the webpage.
$(document).ready(function(){

  /*****************
  * Get form content
  *****************/
  refreshForm();
  $("form").on("change", refreshForm);

  /********************
  * Edit page content
  *******************/
  //Set images and alt text on display
  /*
  $("td#side1").text(side1);
  $("td#side2").text(side2);
  $("td#bed").text(bed);
  $("td#entree").text(entree);
  */
  //Set up tabs on sidebar
  $(".tab-head").on("click", function() {
    $(this).next().slideToggle("slow");
  });



})

function refreshForm() {
    var side1 = $("input[type='radio'][name='side1']:checked").val();
    var side2 = $("input[type='radio'][name='side2']:checked").val();
    var bed = $("input[type='radio'][name='bed']:checked").val();
    var entree = $("input[type='radio'][name='entree']:checked").val();

    //Set images and alt text on display
    $("td#side1").text(side1);
    $("td#side2").text(side2);
    $("td#bed").text(bed);
    $("td#entree").text(entree);
    console.log("Form refreshed!");
}

function getVars() {
  return {side1: $("td#side1").text(), side2: $("td#side2").text(), bed: $("td#bed").text(), entree: $("td#entree").text()};
}
