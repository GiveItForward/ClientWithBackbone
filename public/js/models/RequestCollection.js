define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var RequestModel = require("./RequestModel");

    var RequestCollection = Backbone.Collection.extend({

        model: RequestModel,

        url : rootUrl.url + "api/requests/",

        fetchByRequestUid: function (options) {

            this.url = rootUrl.url + "api/requests/requestuid";
            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        fetchByDonateUid: function (options) {
            this.url = rootUrl.url + "api/requests/donateuid";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });
    return RequestCollection;
});
