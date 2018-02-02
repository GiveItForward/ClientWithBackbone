define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var RequestTagModel = require("./RequestTagModel");

    var RequestTagCollection = Backbone.Collection.extend({

        model: RequestTagModel,

        url : rootUrl.url + "requesttags/"
        // url : "http://localhost:3000/api/requesttags/"
        // url : "http://giveitforward.us/api/requesttags/"

    });
    return RequestTagCollection;
});
