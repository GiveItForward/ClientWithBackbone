define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RequestModel = Backbone.Model.extend({

        idAttribute: "rid",//todo ??

        initialize: function (options) {

            if(options.amount) {

                // this.set("email", options.email);
                // this.url = "http://54.227.151.133:8080/giveitforward/login/" + options.email + "/" + options.password;

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
