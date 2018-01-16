define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RequestModel = require("./RequestModel");

    var RequestCollection = Backbone.Collection.extend({

        model: RequestModel,

        url : "http://54.227.151.133:8080/giveitforward/requests/",

        // fetch: function (params, options) {
        //     // options.url = "" + params;
        //     // this.url = "http://54.227.151.133:8080/giveitforward/requests/";
        //     // return Backbone.Collection.prototype.fetch.call(this, options);
        //     options = options || {};
        //     if (options.url === undefined) {
        //         options.url = this.urlRoot;
        //         // options.url = this.urlRoot + "/owner/" + username + "/current";
        //     }
        //     console.log(options.url);
        //     return Backbone.Model.prototype.fetch.call(this, options);
        // },

        fetchByRequestUid: function (params, options) {
            // options.url = "http://54.227.151.133:8080/giveitforward/requests/requestuid" + params;
            // return Backbone.Collection.prototype.fetch.call(this, options);
        },

        fetchByDonateUid: function (params, options) {
            // options.url = "http://54.227.151.133:8080/giveitforward/requests/donateuid" + params;
            // return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });
    return RequestCollection;
});