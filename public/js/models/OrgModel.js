define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var OrgModel = Backbone.Model.extend({

        idAttribute: "oid",

        initialize: function (options) {

            if(options.oid) {
                this.set("oid", options.oid);
            }
            if(options.path) {
                this.url = "/api/organizations/" + options.path;
            }
        }
    });
    return OrgModel;
});
