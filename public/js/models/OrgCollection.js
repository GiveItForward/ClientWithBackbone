define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var OrgModel = require("./OrgModel");

    var OrgCollection = Backbone.Collection.extend({

        model: OrgModel,

        url : "http://localhost:3000/api/organizations/",
        // url : "http://giveitforward.us/api/organizations/",
        // fetch: function (params, options) {
        //     // options.url = "" + params;
        //     this.url = "http://54.227.151.133:8080/giveitforward/organizations/" ;
        //     return Backbone.Collection.prototype.fetch.call(this, options);
        // }

    });
    return OrgCollection;
});
