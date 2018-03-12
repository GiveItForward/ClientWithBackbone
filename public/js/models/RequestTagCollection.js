define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var RequestTagModel = require("./RequestTagModel");

    var RequestTagCollection = Backbone.Collection.extend({

        model: RequestTagModel,

        url : "/api/requests/tags/"

    });
    return RequestTagCollection;
});
