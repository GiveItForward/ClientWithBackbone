define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RequestModel = require("./RequestModel");

    var RequestCollection = Backbone.Collection.extend({

        model: RequestModel,

        url : "/api/requests/",

        fetchByRequestUid: function (options) {

            this.url = "/api/requests/requestuid";
            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        fetchByDonateUid: function (options) {
            this.url = "/api/requests/donateuid";
            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        fetchByFilter: function (options) {
            this.url = "/api/requests/filter";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });
    return RequestCollection;
});
