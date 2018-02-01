var chosenImage = "/img/default_profile_pic_no_bckgrnd.png";

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var sayThankYouModal = require("text!templates/modals/sayThankYouModal.html");

    var SayThankYouModalView = Backbone.View.extend({

        el: sayThankYouModal,

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
            self.el = sayThankYouModal;
            self.setElement(this.el);
            // self.$('#sayThankYouLabel').html('Write your Thank You message to ' ' here:');

            return this;
        },

        save: function (event) {


            return this;
        },

        destroySayThankYouModal: function () {
            var self = this;
            $('#sayThankYouModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            })
        }
    });
    return SayThankYouModalView;
});