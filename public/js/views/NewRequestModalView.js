console.log("in New Request Modal View file");

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var newRequestModal = require("text!modals/newRequestModal.html");

    var NewRequestModalView = Backbone.View.extend({

        el: newRequestModal,

        events: {
            // "click #homeBtn"          : "renderHome"
        },

        initialize: function () {
            console.log("in new request modal view init");
            // this.render();
        },


        render: function () {
            console.log("in new request modal view render");
            var self = this;
            self.el = newRequestModal;
            self.setElement(this.el);
            // self.$el.html(newRequestModal);
            console.log("hello??")
            return this;
        }
    });

    return NewRequestModalView;
});