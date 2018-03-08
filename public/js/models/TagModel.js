define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var TagModel = Backbone.Model.extend({

        idAttribute: "tid",

        initialize: function (options) {

            if(options.tagname) {

                this.set("tagname", options.tagname);
                this.url = "/api/tags/";
                // this.url = "http://localhost:3000/api/tags/";
                // this.url = "http://giveitforward.us/api/tags/" ;


            } else {
                this.set("tagname", undefined);
            }
        }
    });
    return TagModel;
});
