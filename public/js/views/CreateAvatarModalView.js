define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var createAvatarModal = require("text!templates/modals/createAvatarModal.html");

    var UserModel = require("models/UserModel");

    var CreateAvatarModalView = Backbone.View.extend({

        el: createAvatarModal,

        events: {
            "click #cancelCreateAvatarBtn"    : "destroyCreateAvatarModal",
            "click #exitCreateAvatarModal"    : "destroyCreateAvatarModal",
        },

        initialize: function (options) {
            this.parent = options.parent;
            this.model = options.model;
        },

        render: function () {
            var self = this;
            self.el = createAvatarModal;
            self.setElement(this.el);
            console.log(self.model);
            return this;
        },

        destroyCreateAvatarModal: function () {
            var self = this;
            $('#editProfileModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                requestTagList = [];
                self.model = undefined;
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
    return CreateAvatarModalView;
});