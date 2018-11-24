//All direct jQuery calls need to be made here.
$(document).ready(function(){
  //Form content
  refreshForm();
  $("form").on("change", refreshForm);

  //Set up tabs on sidebar
  $("td").on("click", function() {
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
function refreshForm() {
  var extra = "";
  var plateType = $("input[type='radio'][name='plate']:checked").val();
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
      $(".tab#side1").show("slow");
      $(".tab#side2").show("slow");
      $(".tab#entree").show("slow");
      $(".tab#bed").show("slow");
      $(".tab#bun").hide("slow");
      $(".tab#salad").hide("slow");
      //set large size
      if (plateType === "large")
        extra = "_extra";

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
      $(".tab#side1").show("slow");
      $(".tab#side2").hide("slow");
      $(".tab#entree").show("slow");
      $(".tab#bed").show("slow");
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
  var side1 = $("input[type='radio'][name='side1']:checked").val();
  var side2 = $("input[type='radio'][name='side2']:checked").val();
  var bed = $("input[type='radio'][name='bed']:checked").val();
  var entree = $("input[type='radio'][name='entree']:checked").val();
  var bun = "";
  $("input[type='checkbox'][name='bun']:checked").each(function() {
    bun += $(this).val();
  });

  //Set images and alt text on display
  $("td#side1").html("<img src='./img/classic/"+side1+extra+".png' alt="+side1+">");
  $("td#side2").html("<img src='./img/classic/"+side2+extra+".png' alt="+side2+">");
  $("td#bun").html("<img src='./img/classic/bun"+bun+".png' alt="+bun+">");
  $("td#bed").html("<img src='./img/classic/"+bed+"_bed.png' alt="+bed+">");
  $("td#entree").html("<img src='./img/classic/entree_"+entree+extra+".png' alt="+entree+">");
}
