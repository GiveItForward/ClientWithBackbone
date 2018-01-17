define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var notificationsModal = require("text!templates/modals/notificationsModal.html");
    // var notificationsModal = require("jade!templates/jade_templates/modals/notificationsModal");

    var NotificationsModalView = Backbone.View.extend({

        el: notificationsModal,

        events: {
            // "click #createRequestBtn"   : "createRequest",
            // "keyup"                     : "updateModel",
            // "change"                    : "updateModel"
        },

        initialize: function (options) {
            console.log("in new notifications modal view init");
            this.parent = options.parent;
            // this.render();
        },

        render: function () {
            console.log("in new notifications modal view render");
            var self = this;
            self.el = notificationsModal;
            self.setElement(this.el);
            return this;
        }
    });

    return NotificationsModalView;
});