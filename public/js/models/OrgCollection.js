define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var OrgModel = require("./OrgModel");

    var OrgCollection = Backbone.Collection.extend({

        model: OrgModel,

        url : "/api/organizations/",

        fetchPending: function (options) {
            this.url = "/api/organizations/pending";
            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        fetchSearch: function (options) {
            this.url = "/api/organizations/search";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }

    });
    return OrgCollection;
});
