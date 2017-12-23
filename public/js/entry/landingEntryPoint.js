// require("../../css/style.css");
var $ = require("jquery");

var LandingView = require("LandingView");

$(document).ready(function() {

   console.log("hey there from landingEntryPoint");
   var landingView = new LandingView({
       el: $('#landingContainer')
   });

   landingView.render();

});