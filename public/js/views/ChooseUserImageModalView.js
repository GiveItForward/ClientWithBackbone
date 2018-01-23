define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var chooseUserImageModal = require("text!templates/modals/chooseUserImageModal.html");

    var ChooseUserImageModalView = Backbone.View.extend({

        el: chooseUserImageModal,

        events: {
            // "keyup"                     : "updateModel",
            // "change"                    : "updateModel"
        },

        initialize: function (options) {
            console.log("in choose user image modal view init");
            this.parent = options.parent;
            // this.render();
        },


        render: function () {
            console.log("in choose user image modal view render");
            var self = this;
            self.el = chooseUserImageModal;
            self.setElement(this.el);
            return this;
        }
    });
    return ChooseUserImageModalView;
});