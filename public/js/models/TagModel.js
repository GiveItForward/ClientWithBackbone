define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var TagModel = Backbone.Model.extend({

        idAttribute: "tid",

        initialize: function (options) {

            if(options.tagname) {

                this.set("tagname", options.tagname);
                this.url = "http://54.227.151.133:8080/giveitforward/tags/" ;

            } else {
                this.set("tagname", undefined);
            }
        }
    });
    return TagModel;
});
