define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var changePasswordModal = require("text!templates/modals/changePasswordModal.html");

    var ChangePasswordModalView = Backbone.View.extend({

        el: changePasswordModal,

        events: {
            "click #cancelChangePasswordBtn"     : "destroyChangePasswordModal",
            "click #exitChangePasswordModal"     : "destroyChangePasswordModal",
            "click #updatePasswordBtn"           : "save"
        },

        initialize: function (options) {
            this.parent = options.parent;
            this.model = options.model;
            $('#changePasswordErrorLabel').html('');
        },

        render: function () {
            var self = this;
            self.el = changePasswordModal;
            self.setElement(this.el);
            return this;
        },



        save: function () {
            var self = this;

            console.log($("#oldPassword").val());
            console.log($("#changePassword").val());
            console.log($("#verifyChangePassword").val());

            if($("#changePassword").val() != $("#verifyChangePassword").val()){
                $('#changePasswordErrorLabel').html('Your passwords do not match.');
            }else{
                $('#changePasswordErrorLabel').html('There was a problem updating your request.');
            }
        },

        destroyChangePasswordModal: function () {
            var self = this;
            $('#changePasswordModal').fadeOut('slow', function () {
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
    return ChangePasswordModalView;
});