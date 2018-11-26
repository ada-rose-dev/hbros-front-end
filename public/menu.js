//All direct jQuery calls need to be made here.
$(document).ready(function(){
  //Form content
  refreshForm();
  $("form").on("change", refreshForm);

  //Set up tabs on sidebar
  $("td").on("click", function() {
    if ($(".tab-head#"+$(this).attr("id")).is(":visible"))
      $(".tab-head#"+$(this).attr("id")).next().slideToggle("slow");
  });
  $("td").on("hover", function() {
    $('selector').css('cursor','pointer');
  })

  $(".tab-head").on("click", function() {
    $(this).next().slideToggle("slow");
  });
  $(".tab-head").on("hover", function() {
    $('selector').css('cursor','pointer');
  })

})

//this is the main function. it will be called every time the form updates.
function refreshForm() {  var large = "";
  var plateType = $("input[type='radio'][name='plate']:checked").val();
  var locarb = $("input[type='checkbox'][name='entree'][value='locarb']:checked").val();

  switch (plateType)
  {
    case ("large"):
    case ("classic"):
    {
      //change table - colspans
      $("td#side1").attr("colspan","1");
      $("td#side2").attr("colspan","1");
      $("td#entree").attr("colspan","1");
      $("td#bed").attr("colspan","1");
      //hide salad table
      $("table#plate").show();
      $("table#salad").hide();
      //make sure all are visible
      $("td#side1").show();
      $("td#side2").show();
      $("td#entree").show();
      $("td#bed").show();
      $("td#bun").hide();
      //change sidebar layout
      if (!locarb){
        $(".tab#side1").show("slow");
        $(".tab#side2").show("slow");
        $(".tab#bed").show("slow");
      }
      $(".tab#entree").show("slow");
      $(".tab#bun").hide("slow");
      $(".tab#salad").hide("slow");
      //set large size
      if (plateType === "large")
        large = "large_";

      break;
    }
    case ("small"):
    {
      //change table colspans
      $("td#side1").attr("colspan","2");
      $("td#side2").attr("colspan","0");
      $("td#entree").attr("colspan","1");
      $("td#bed").attr("colspan","1");
      //hide salad table
      $("table#plate").show();
      $("table#salad").hide();
      //make sure side 2 is hidden, rest are visible
      $("td#side1").show();
      $("td#side2").hide();
      $("td#entree").show();
      $("td#bed").show();
      $("td#bun").hide();
      //change sidebar layout
      if (!locarb){
        $(".tab#side1").show("slow");
        $(".tab#side2").hide("slow");
        $(".tab#bed").show("slow");
      }
      $(".tab#entree").show("slow");
      $(".tab#bun").hide("slow");
      $(".tab#salad").hide("slow");
      break;
    }
    case ("salad"):
    {
      //change table colspans
      $("td#side1").attr("colspan","0");
      $("td#side2").attr("colspan","0");
      $("td#entree").attr("colspan","0");
      $("td#bed").attr("colspan","0");
      //show salad table
      $("table#plate").hide();
      $("table#salad").show();
      //make sure side 2 is hidden, rest are visible
      $("td#side1").hide();
      $("td#side2").hide();
      $("td#entree").hide();
      $("td#bed").hide();
      $("td#bun").hide();
      //change sidebar layout
      $(".tab#side1").hide("slow");
      $(".tab#side2").hide("slow");
      $(".tab#entree").show("slow");
      $(".tab#bed").hide("slow");
      $(".tab#bun").hide("slow");
      $(".tab#salad").show("slow");
      //change salad toble content - best to just do it here
      var str = "";
      $("input[type='checkbox'][name='salad']:checked").each(function() {
        $("td#salad").append("<img src='./img/classic/salad"+$(this).val()+".png'/>");
      });
      break;
    }
    case ("sandwich"):
    {
      //change table colspans
      $("td#side1").attr("colspan","2");
      $("td#side2").attr("colspan","0");
      $("td#entree").attr("colspan","1");
      $("td#bed").attr("colspan","0");
      $("td#bun").attr("colspan","1");
      //hide salad table
      $("table#plate").show();
      $("table#salad").hide();
      //make sure side 2 is hidden, rest are visible
      $("td#side1").show();
      $("td#side2").hide();
      $("td#entree").show();
      $("td#bed").hide();
      $("td#bun").show();
      //change sidebar layout
      $(".tab#side1").show("slow");
      $(".tab#side2").hide("slow");
      $(".tab#entree").show("slow");
      $(".tab#bed").hide("slow");
      $(".tab#bun").show("slow");
      $(".tab#salad").hide("slow");
      break;
    }
  }

  //Get info
  var extra = getIfDefined("input[type='checkbox'][name='entree'][value='_extra']:checked");
  var s1_extra = getIfDefined("input[type='checkbox'][name='side1'][value='_extra']:checked");
  var s2_extra = getIfDefined("input[type='checkbox'][name='side2'][value='_extra']:checked");

  var side1 = $("input[type='radio'][name='side1']:checked").val();
  side1 += s1_extra;
  var side2 = $("input[type='radio'][name='side2']:checked").val();
  side2 += s2_extra;
  var bed = $("input[type='radio'][name='bed']:checked").val();
  var entree = $("input[type='radio'][name='entree']:checked").val();
  if (plateType === "large") entree += "_extra";
  entree += extra; //large + extra = "entree_x_extra_extra"

  //Sandwich
  var bun = "";
  $("input[type='checkbox'][name='bun']:checked").each(function() {
    bun += $(this).val();
  });

  //locarb
  if (locarb != undefined) {
    $(".tab#side1").hide("slow");
    $(".tab#side2").hide("slow");
    $(".tab#bed").hide("slow");
    $("form#locarb").show("slow");
    var val = $("input[type='radio'][name='locarb']").val();
    side1 = val;
    side2 = val;
    bed = val;
  }
  else {
    $("form#locarb").hide("slow");
  }

  //Set images and alt text on display
  $("td#side1").html("<img src='./img/classic/"+side1+".png' alt="+side1+">");
  $("td#side2").html("<img src='./img/classic/"+side2+".png' alt="+side2+">");
  $("td#bun").html("<img src='./img/classic/bun"+bun+".png' alt="+bun+">");
  $("td#bed").html("<img src='./img/classic/"+bed+"_bed.png' alt="+bed+">");
  $("td#entree").html("<img src='./img/classic/"+"entree_"+entree+".png' alt="+entree+">");

  //caption
  /*
  var cap = "";
  if (plateType === "salad") {
    cap = "Pacific Island Salad";
  }
  else if (plateType === "sandwich") {
    cap = entree + " Sandwich";
  }
  else {
    if (locarb) {
      cap += "Low Carb ";
    }
    cap += capitalizeFirstLetter(plateType) + " " +entree.charAt(0);
    if (extra != "") cap += " (Extra Entree) ";
    if (!locarb){
      if (bed != "rice") cap += " on vegetables ";
      if (side1 != "mac") cap += " sub mac with "+ capitalizeFirstLetter(side1);
      if (side2 != "rice") cap += " sub rice with "+ capitalizeFirstLetter(side2);
    }
  }
  $("caption").text(cap);
  */
}



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getIfDefined(string) {
  var v = $(string).val();
   if (v === undefined) return "";
   else return v;
}
