define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var otherProfileModal = require("text!templates/modals/otherProfileModal.html");

    var OtherProfileModalView = Backbone.View.extend({

        el: otherProfileModal,

        events: {
            "click #closeOtherProfileBtn"     : "destroyOtherProfileModal",
            "click #exitOtherProfileModal"     : "destroyOtherProfileModal"
        },

        initialize: function (options) {
            this.parent = options.parent;
            // this.render();
        },

        render: function () {
            var self = this;
            self.el = otherProfileModal;
            self.setElement(this.el);
            return this;
        },

        destroyOtherProfileModal: function () {
            var self = this;
            $('#otherProfileModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
        }
    });
    return OtherProfileModalView;
});