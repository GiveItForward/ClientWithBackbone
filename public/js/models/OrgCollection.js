define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var OrgModel = require("./OrgModel");

    var OrgCollection = Backbone.Collection.extend({

        model: OrgModel,

        url : rootUrl.url + "api/organizations/",

        fetchPending: function (options) {

            this.url = rootUrl.url + "api/organizations/pending";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }

    });
    return OrgCollection;
});
