define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var RequestModel = Backbone.Model.extend({

        idAttribute: "rid",

        initialize: function (options) {

            if(options.path === "create") {
                this.url = rootUrl.url + "api/requests/create";
                // this.url = "http://localhost:3000/api/requests/create";
                // this.url = "http://giveitforward.us/api/requests/create";
                this.set("rid", undefined);
                this.set("ruid", undefined);
                this.set("description", undefined);
                this.set("amount", undefined);
                this.set("image", undefined);
                // this.set("fulfilled", false);
            } else if(options.path === 'paypal'){
                this.url = rootUrl.url + "api/requests/paypal";
            }else if (options.path === 'update'){
                this.url = rootUrl.url + "api/request/update"
            } else {
                this.url = rootUrl.url + "api/requests";
                // this.url = "http://localhost:3000/api/requests";
                // this.url = "http://giveitforward.us/api/requests";
            }
        }
    });
    return RequestModel;
});
