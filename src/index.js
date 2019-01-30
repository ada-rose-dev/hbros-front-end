import $ from 'jquery';
import { changeLocation } from './all';

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
