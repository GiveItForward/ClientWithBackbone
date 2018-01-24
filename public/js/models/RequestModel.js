define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RequestModel = Backbone.Model.extend({

        idAttribute: "rid",//todo ??

        initialize: function (options) {

            if(options.amount) {

                this.set("amount", options.amount);
                this.url = "http://localhost:3000/api/requests";

            } else {
                this.set("description", undefined);
                this.set("amount", undefined);
                this.set("tags", undefined);
                this.set("image", undefined);
                this.set("fulfilled", undefined);
            }
        }
    });
    return RequestModel;
});
