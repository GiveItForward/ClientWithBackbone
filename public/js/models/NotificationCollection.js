define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var NotificationModel = require("./NotificationModel");

    var NotificationCollection = Backbone.Collection.extend({

        model: NotificationModel,

        url : rootUrl.url + "api/notifications"

    });
    return NotificationCollection;
});
