define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var TagModel = require("./TagModel");

    var TagCollection = Backbone.Collection.extend({

        model: TagModel,

        url : "/api/tags"
        // url : "http://localhost:3000/api/tags",
        // url : "http://giveitforward.us/api/tags",

        // fetch: function (params, options) {
        //     // options.url = "" + params;
        //     this.url = "http://54.227.151.133:8080/giveitforward/tags/" ;
        //     return Backbone.Collection.prototype.fetch.call(this, options);
        // }

    });
    return TagCollection;
});
