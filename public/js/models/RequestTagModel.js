define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RequestTagModel = Backbone.Model.extend({

        idAttribute: "tid",

        initialize: function (options) {

            if(options.tagname) {

                this.set("tagname", options.tagname);
                // this.url = "http://localhost:3000/api/requesttags/" ;
                this.url = "http://giveitforward.us/api/requesttags/" ;

            } else {
                this.set("tagname", undefined);
            }
        }
    });
    return RequestTagModel;
});
