define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var NotificationModel = require("./NotificationModel");

    var NotificationCollection = Backbone.Collection.extend({

        model: NotificationModel,

        url : "/api/notifications"

    });
    return NotificationCollection;
});
