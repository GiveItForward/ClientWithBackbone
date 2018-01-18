define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var OrgModel = Backbone.Model.extend({

        idAttribute: "oid",

        initialize: function (options) {

            if(options.name) {

                this.set("name", options.name);
                this.url = "http://54.227.151.133:8080/giveitforward/organizations/" ;

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
