define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var OrgModel = Backbone.Model.extend({

        idAttribute: "oid",

        initialize: function (options) {

            if(options.name) {

                this.set("name", options.name);
                this.url = rootUrl.url + "organizations/"
                // this.url = "http://localhost:3000/api/organizations/" ;
                // this.url = "http://giveitforward.us/api/organizations/" ;


            } else {
                this.set("name", undefined);
                this.set("email", undefined);
                this.set("website", undefined);
                this.set("phoneNumber", undefined);
                this.set("image", undefined);
            }
        }
    });
    return OrgModel;
});
