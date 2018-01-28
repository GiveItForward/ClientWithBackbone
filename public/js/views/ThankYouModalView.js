var chosenImage = "/img/default_profile_pic_no_bckgrnd.png";

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var thankYouModal = require("text!templates/modals/thankYouModal.html");

    var ThankYouModalView = Backbone.View.extend({

        el: chooseUserImageModal,

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
            self.el = chooseUserImageModal;
            self.setElement(this.el);
            return this;
        },

        save: function (event) {


            return this;
        },

        destroyThankYouModal: function () {
            var self = this;
            $('#chooseUserImageModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            })
        }
    });
    return ThankYouModalView;
});