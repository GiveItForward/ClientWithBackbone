define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var RequestModel = require("./RequestModel");

    var RequestCollection = Backbone.Collection.extend({

        model: RequestModel,

        url : rootUrl.url + "requests/",
        // url : "http://localhost:3000/api/requests/",
        // url : "http://giveitforward.us/api/requests/",


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

        fetchByRequestUid: function (options) {

            this.url = "http://localhost:3000/api/requests/requestuid";
            // this.url = "http://giveitforward.us/api/requests/requestuid";
            return Backbone.Collection.prototype.fetch.call(this, options);
        },

        fetchByDonateUid: function (options) {
            this.url = "http://localhost:3000/api/requests/donateuid";
            // this.url = "http://giveitforward.us/api/requests/donateuid";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }
    });
    return RequestCollection;
});
