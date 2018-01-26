define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RequestModel = Backbone.Model.extend({

        idAttribute: "rid",

        initialize: function (options) {

            if(options.path === "create") {
                this.url = "http://localhost:3000/api/requests/create";
                this.set("rid", undefined);
                this.set("ruid", undefined);
                this.set("description", undefined);
                this.set("amount", undefined);
                this.set("tags", undefined);
                this.set("image", undefined);
                this.set("fulfilled", false);
            } else {
                this.url = "http://localhost:3000/api/requests";

            }
        }
    });
    return RequestModel;
});
