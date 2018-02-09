var chosenImage = "/img/default_profile_pic_no_bckgrnd.png";

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var viewThankYouModal = require("text!templates/modals/viewThankYouModal.html");

    var ViewThankYouModalView = Backbone.View.extend({

        el: viewThankYouModal,

        events: {
            "click #exitViewThankYouModalBtn"     : "destroyViewThankYouModal",
            "click #closeViewThankYouModalBtn"    : "destroyViewThankYouModal"
        },

        initialize: function (options) {
            console.log("in thank you modal view init");
            this.parent = options.parent;
            this.note = options.note;
            this.date = options.date;
            this.rUsername = options.rUsername;
        },

        render: function () {
            console.log("in thank you modal view render");
            var self = this;
            self.el = viewThankYouModal;
            self.setElement(this.el);
            self.$('#viewThankYouHeader').html(self.date);
            self.$('#viewThankYouMessage').html(self.note);
            self.$('#viewThankYouSig').html("With Gratitude,<br>" + self.rUsername);
            return this;
        },

        destroyViewThankYouModal: function () {
            var self = this;
            $('#viewThankYouModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            })
        }
    });
    return ViewThankYouModalView;
});