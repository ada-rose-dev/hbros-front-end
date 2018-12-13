/**********************
*** PRELIMINARY SET-UP
*********************/
class OrderItem {
  constructor(type,value)
  {
    this.type = type;
    this.value = value;
  }

  setValue(val)
  {
    this.value = val;
  }
}

class Plate extends OrderItem {
  constructor(size, entree, bed, side1, side2) {
    super("Plate",[size, entree, bed, side1, side2]);
    this.hot = false;
  }

  setHot(val) {
    this.hot = val;
  }
}

class SmallPlate extends OrderItem {
  constructor(entree, bed, side1) {
    super("SmPlate",[entree, bed, side1]);
  }
}

class Salad extends OrderItem {
  //Entree is a string, the rest should be bools.
  constructor(entree, saladItems) {
    super("Salad",[entree, saladItems /*[oranges, chowMein, cilantro, grOnions, mushrooms]*/]);
  }
}

class Sandwich extends OrderItem {
  constructor(entree, side, toasted, mayo)
  {
    super("Sandwich",[entree, side, [toasted, mayo]]);
  }
}

var customPlate = new Plate("Classic", "Huli Huli", "Rice", "Mac", "Rice");
window.localStorage.customPlate = JSON.stringify(customPlate);

if (typeof(Storage) === undefined) {
  alert("Warning: Your browser does not support web storage. It is unlikely this website will work without it. We recommend switching to a newer browser before using this website.")
}

var order = [];
window.localStorage.order = JSON.stringify(order);

/****************
*** MAIN CONTENT
****************/
$(document).ready(function(){
  //Change location
  changeLocation();
  window.onhashchange = changeLocation;
  //update footer
  $('.footer-content').slick({
    slidesToShow: 10,
    slidesToScroll: 10,
    variableWidth: true,
  });
})

/**************
*** CHANGE PAGE
***************/
function changeLocation() {

  //change location
  var location = window.location.hash;
  $(".page").each(function() {
    $(this).hide();
  });

  if (location === "") {location = "#home";}
  $(".page"+ String(location)).show();

  //back button
  if (window.location.hash === "#home")
      $("button.back").hide();
  else $("button.back").show();

  $("button.back").off().on("click", function () {
    if (window.location.hash === "#plateBuilder")
      window.location = "./#food";

    var id = $(".page").find(".subpage:visible:first").attr("id");
    switch(id){
      default:
        window.location = "./#home";
        break;
      case("food-size"):
      case("food-mixed-plate-1"):
        showSubpage("food-main");
        break;
      case("food-mixed-plate-2"):
        showSubpage("food-mixed-plate-1");
        break;
      case("food-mixed-plate-3"):
        showSubpage("food-mixed-plate-2");
        break;
      case("drink-size"):
      case("hawaiian-sun"):
      case("drink-tea"):
        showSubpage("drink-main");
        break;
    }
  });

  //Does this make a difference? The switch really doesn't do anything.
  switch(location)
  {
    case("#home"):
    {
      showSubpage("home");
    }
    case("#plateBuilder"):
    {
        //Form content

        refreshForm();
        $("form").off().on("change", refreshForm);

        $("button.custom-plate").off().on("click", function() {
          addToOrder(JSON.parse(window.localStorage.customPlate));
          window.location = "./#home";
        });

        //Set up tabs on sidebar
        $("td").off().on("click", function() {
          if ($(".tab-head#"+$(this).attr("id")).is(":visible"))
            $(".tab-head#"+$(this).attr("id")).next().slideToggle("slow");
        });
        $("td").on("hover", function() {
          $('selector').css('cursor','pointer');
        });

        $(".tab-head").off().on("click", function() {
          $(this).next().slideToggle("slow");
        });
        $(".tab-head").on("hover", function() {
          $('selector').css('cursor','pointer');
        });
      break;
    }

    case("#drink"):
    {
      //Initial setup
      showSubpage("drink-main");
      //selection
      var name = "";
      var size = "";
      var newDrink = new OrderItem("Drink");
      $("ul.drink").children("li").each(function() {
        //Get the id of the containing element
        //Action on click
        $(this).off().on("click", function() {
          var id = $(".page").find(".subpage:visible:first").attr("id");

          switch (id) {
            case("drink-tea"):
            case("drink-main"):
            {
              name = $(this).text();

              if (name === "Water Bottle")
              {
                newDrink.setValue(name);
                addToOrder(newDrink);
                window.location = "./#home"
                break;
              }
              else if (name === "Hawaiian Sun")
              {
                showSubpage("hawaiian-sun");
                break;
              }
              else if (name === "Tea")
              {
                showSubpage("drink-tea");
                break;
              }

              showSubpage("drink-size")
              break;
            }

            case("drink-size"):
            case("hawaiian-sun"):
            {
              size = $(this).text();
              newDrink.setValue([name, size]);
              addToOrder(newDrink);
              window.location = "./#home";
              break;
            }
          }
        });
      });
      break;
    }

    case("#food"):
    {
      //Initial setup
      showSubpage("food-main");

      var name = "";
      var size = "";
      $("ul.food").children("li").each(function() {
        $(this).off().on("click", function() {
          var id = $(".page").find(".subpage:visible:first").attr("id");
          switch(id)
          {
            case ("food-main"):
            {
              name = $(this).text();
              if (name.includes("Custom"))
              {
                window.location = "./#plateBuilder";
                break;
              }
              if (name.includes("Sandwich") || name.includes("Salad"))
              {
                var plate = makePlate(name);
                addToOrder(plate);
                window.location = "./#home";
                break;
              }
              if (name.includes("Mixed"))
              {
                showSubpage("food-mixed-plate-1");
                break;
              }

              showSubpage("food-size");
              break;
            }

            case("food-size"):
            {
              size = $(this).text();
              var plate = makePlate(name, size);
              addToOrder(plate);
              window.location = ("./#home");
              break;
            }

            case("food-mixed-plate-1"):
            case("food-mixed-plate-2"):
            case("food-mixed-plate-3"):
            {
              var p = id.substring(id.length - 1);
              if (p == 1){
                name += $(this).text() + " & ";
                showSubpage("food-mixed-plate-2");
              }
              else if (p == 2){
                name += $(this).text();
                showSubpage("food-mixed-plate-3");
              }
              else if (p == 3){
                size = $(this).text();
                addToOrder(makePlate(name,size));
                window.location = "./#home";
              }
              break;
            }

          }
        });
      });

      break;
    }

    case("#sides"):
    {
      showSubpage("sides-main");

      $("ul.sides").children("li").each(function() {
        $(this).off().on("click", function() {
          //Since there is only one page:
          var newSide = new OrderItem("Side",$(this).text());
          addToOrder(newSide);
          window.location = "./#home";
        });
      });
      break;
    }

    case("#checkout"): {
      showSubpage("checkout-main");
      $("ul.checkout-js").text("");
      var order = JSON.parse(window.localStorage.order);
      order.forEach(function(element, i) {
        $("ul.checkout-js").append("<li>"+JSON.stringify(order[i])+"</li>");
      });
      break;
    }
  }
}

/******************
*** PLATE AND ORDER
*******************/
function refreshForm(loadedPlate){
  if (loadedPlate !== undefined)
    loadPlate(loadedPlate);

  var large = "";
  var plateType = $("input[type='radio'][name='plate']:checked").val();
  var locarb = $("input[type='checkbox'][name='entree'][value='locarb']:checked").val();

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

  switch (plateType)
  {
    case ("large"):
    case ("classic"):
    {
      //hide salad table
      $("table#plate").show();
      $("table#salad").hide();
      //make sure all are visible
      showTD(["side1","side2","entree","bed"]);
      //change sidebar layout
      if (!locarb){
        showTab(["plate","entree","side1","side2","bed"], "slow");
      }
      else {
        showTab(["plate","entree"], "slow");
      }
      //set large size
      if (plateType === "large")
        large = "large_";

      //save Order
      var plate = new Plate(plateType,entree,bed,side1,side2);
      window.localStorage.customPlate = JSON.stringify(plate);

      break;
    }
    case ("small"):
    {
      //hide salad table
      $("table#plate").show();
      $("table#salad").hide();
      //make sure side 2 is hidden, rest are visible
      showTD(["entree","side1","bed"],["1","2","1"]);
      //change sidebar layout
      if (!locarb){
        showTab(["plate","entree","side1","bed"],"slow");
      }
      else {
        showTab(["plate","entree"],"slow");
      }

      var plate = new SmallPlate(entree,bed,side1);
      window.localStorage.customPlate = JSON.stringify(plate);
      break;
    }
    case ("salad"):
    {
      //show salad table
      $("table#plate").hide();
      $("table#salad").show();
      //hide all
      showTD("salad");
      //change sidebar layout
      showTab(["plate","salad"],"slow");
      //change salad toble content - best to just do it here
      var str = "";
      var boolArr = [];
      $("input[type='checkbox'][name='salad']:checked").each(function() {
        $("td#salad").append("<img src='./img/classic/salad"+$(this).val()+".png'/>");
      });

      $("input[type='checkbox'][name=salad]").each(function(i) {
        boolArr[i] = $(this).is(":checked");
      });

      var plate = new Salad(entree, boolArr);
      window.localStorage.customPlate = JSON.stringify(plate);

      break;
    }
    case ("sandwich"):
    {
      //hide salad table
      $("table#plate").show();
      $("table#salad").hide();
      //showTD
      showTD(["side1","entree","bun"],["2","1","1"]);
      //change sidebar layout
      showTab(["plate","entree","side1","bun"],"slow");

      var toasted = $("input[type='checkbox'][value='_toasted']").is(":checked");
      var mayo = $("input[type='checkbox'][value='_mayo']").is(":checked");
      var plate = new Sandwich(entree,side1,toasted,mayo);
      window.localStorage.customPlate = JSON.stringify(plate);
      break;
    }
  }
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
function loadPlate(loadedPlate) {
  //This function loads in a plate for the custom plate editor.
  //This will allow the plate to be edited via the footer.
}
function makePlate(name, size) {
  var plate;
  var bed = "rice";
  var side1 = "mac";
  var side2 = "rice";
  var entree = "";
  if (Array.isArray(name))
  {
    entree = name[0];
    bed = name[1];
    side1 = name[2];
    side2 = name[3];
  }
  else {
    if (name.includes("Huli Huli")) entree += "Huli Huli";
    if (name.includes("Molokai")) entree += "Molokai";
    if (name.includes("Honolulu")) entree += "Honolulu";
    if (name.includes("Luau Pork")) entree += "Luau Pork";
    if (name.includes("Grilled Vegetables")) entree += "Grilled Vegetables";
  }


  //Plates
  if (size !== undefined) {
    //Set entree

    //Set size
    if (size === "Small")
      plate = new SmallPlate(entree, bed, side1);
    if (size === "Classic")
      plate = new Plate("Classic",entree, bed, side1, side2);
    if (size === "Large")
      plate = new Plate("Large",entree, bed, side1, side2);

    //Set hot
    if (entree === "Molokai")
      plate.hot = $('input[name="hot"]:checked').length > 0;
    else
      plate.hot = false;
  }
  //Sandwich, Salad
  else {
    if (name.includes("Salad"))
    {
      plate = new Salad("Huli Huli", true, true, true, true, true);
      return plate;
    }
    if (name.includes("Sandwich"))
    {
      var entree = "Luau Pig";
      if (name.includes("Huli Huli")) entree = "Huli Huli";
      plate = new Sandwich(entree, "mac salad", true, true);
    }
  }
  return plate;

}
function addToOrder(item) {
  var order = JSON.parse(localStorage.order);
  order.push(item);
  localStorage.order = JSON.stringify(order);
  //update footer
  updateFooter(item);
}

/****************************
*** NAVIGATION AND AESTHETICS
*****************************/
function showSubpage(name) {
  $(".subpage").hide();
  if (Array.isArray(name))
  {
    name.forEach(function(element) {
      $(".subpage#"+element).fadeIn();
    });
  }
  else
  {
    $(".subpage#"+name).fadeIn();
  }
}
function showTab(name, speed = "", hideOthers = true, hideSpeed = "") {
  //Array
  if (Array.isArray(name)) {
    if (hideOthers) {
      var filter = ".tab:not(";
      name.forEach(function(element, index) {
        filter += "#";
        filter += element;
        if (index === name.length - 1)
          filter += ")";
        else filter += ",";
      });
      $(filter).hide(hideSpeed);
    }

    if (Array.isArray(speed)) {
      name.forEach(function(element, index) {
        $(".tab#"+element).show(speed[index]);
      });
    }
    else {
        name.forEach(function(element) {
          $(".tab#"+element).show(speed);
      });
    }
  }
  //String
  else {
    if (hideOthers) {
      $(".tab:not(#"+name+")").hide(hideSpeed);
    }
    $(".tab#"+name).show(speed);
  }
}
function showTD(name, colspans, hideOthers = true) {

  if (name == undefined) {
    $("td").hide();
    return;
  }

  if (Array.isArray(name)) {
    if (hideOthers) {
      var filter = "td:not(";
      name.forEach(function(element, index) {
        filter += "#";
        filter += element;
        if (index === name.length - 1)
          filter += ")";
        else filter += ",";
      });
      $(filter).hide();
      $(filter).attr("colspan","0");
    }

    name.forEach(function(element, index) {
      $("td#"+element).show();
      if (Array.isArray(colspans))
        colspan = colspans[index];
      else colspan = "1";
      $("td#"+element).attr("colspan",colspan);
    });
  }
  else {
    if (hideOthers) {
      $("td:not(#"+name+")").hide();
      $("td:not(#"+name+")").attr("colspan","0");
    }
    $("td#"+name).show();
  }
}
function updateFooter(item) {
  //parse item
  var icon = "";
  switch (item.type) {
    case("Sandwich"):
    case("Salad"):
    case("Plate"):
      icon = "plate-classic";
      break;

    case("SmPlate"):
      icon = "plate-small";
      break;

    case("Drink"):
      switch(item.value[1]){
        case("Medium"):
          icon = "drink-medium";
          break;
        case("Large"):
          icon = "drink-large";
          break;
        case("Hawaiian Sun"):
          icon = "drink-hs";
          break;
      }
      break;

    case("Side"):
      icon = "side";
      break;
  }

  $(".footer-content").slick("slickAdd","<div><img class='footer-img' src='./img/order-icons/"+icon+".png' /></div>")
}

/*******************
*** HELPER FUNCTIONS
********************/
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getIfDefined(string) {
  var v = $(string).val();
   if (v === undefined) return "";
   else return v;
}
