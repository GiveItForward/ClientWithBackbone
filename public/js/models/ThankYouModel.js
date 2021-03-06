define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var ThankYouModel = Backbone.Model.extend({

        idAttribute: "rid",

        initialize: function (options) {

            if(options.path === "create") {
                this.url = "/api/thankyou/create";
                // this.url = "http://localhost:3000/api/thankyou/create";
                // this.url = "http://giveitforward.us/api/thankyou/create";

            } else {
                this.url = "/api/thankyou";
                // this.url = "http://localhost:3000/api/thankyou";
                // this.url = "http://giveitforward.us/api/thankyou";
            }
        }
    });
    return ThankYouModel;
});
