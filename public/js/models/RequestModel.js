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
                this.set("rid", undefined);
                this.set("ruid", undefined);
                this.set("description", undefined);
                this.set("amount", undefined);
                this.set("image", undefined);
                // this.set("fulfilled", false);
            } else if(options.path === 'paypal'){
                this.url = rootUrl.url + "api/requests/paypal";
            }else if (options.path === 'getByRid'){
                this.url = rootUrl.url + "api/request/getByRid"
            }else if (options.path === 'update'){
                this.url = rootUrl.url + "api/request/update"
            }else if (options.path === 'delete'){
                this.url = rootUrl.url + "api/request/delete"
            } else {
                this.url = rootUrl.url + "api/requests";
            }
        }
    });
    return RequestModel;
});
