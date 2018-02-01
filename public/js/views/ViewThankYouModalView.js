var chosenImage = "/img/default_profile_pic_no_bckgrnd.png";

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var viewThankYouModal = require("text!templates/modals/viewThankYouModal.html");

    var ViewThankYouModalView = Backbone.View.extend({

        el: viewThankYouModal,

        events: {
            // "keyup"                     : "updateModel",
            // "change"                    : "updateModel"
        },

        initialize: function (options) {
            console.log("in thank you modal view init");
            this.parent = options.parent;
            // this.render();
        },

        render: function () {
            console.log("in thank you modal view render");
            var self = this;
            self.el = viewThankYouModal;
            self.setElement(this.el);
            self.$('#viewThankYouMessage').html('Thank you hard coded!');
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