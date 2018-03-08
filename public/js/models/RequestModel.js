define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RequestModel = Backbone.Model.extend({

        idAttribute: "rid",

        initialize: function (options) {

            if(options.path === "create") {
                this.url = "/api/requests/create";
                this.set("rid", undefined);
                this.set("ruid", undefined);
                this.set("description", undefined);
                this.set("amount", undefined);
                this.set("image", undefined);
                // this.set("fulfilled", false);
            } else if(options.path === 'paypal'){
                this.url = "/api/requests/paypal";
            }else if (options.path === 'rid'){
                this.url = "/api/requests/rid"
            }else if (options.path === 'update'){
                this.url = "/api/requests/update"
            }else if (options.path === 'delete'){
                this.url = "/api/requests/delete"
            } else {
                this.url = "/api/requests";
            }
        }
    });
    return RequestModel;
});
