define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var notificationModal = require("text!templates/modals/notificationModal.html");
    // var notificationsModal = require("jade!templates/jade_templates/modals/notificationsModal");

    var NotificationModalView = Backbone.View.extend({

        el: notificationModal,

        events: {
            "click #cancelNotificationBtn"     : "destroyNotificationModal",
            "click #exitNotificationModal"     : "destroyNotificationModal",
            "click #deleteNotificationBtn"     : "deleteNotification"
            // "keyup"                     : "updateModel",
            // "change"                    : "updateModel"
        },

        initialize: function (options) {
            console.log("in new notifications modal view init");
            this.parent = options.parent;
            this.nid = options.nid;
            // rid - Your donation was FULFILLED by jen (should say request)
            this.rid = 2; //113 doesn't have thank you
            // tid - You received a THANK YOU from boo

            // Your TAGS were VERIFIED by Women's Resource Center
            // You have been promoted to an admin.
            // Your organization, LGBT Resource Center, has been approved!

        },

        render: function () {
            console.log("in new notifications modal view render");
            var self = this;
            self.el = notificationModal;
            self.setElement(this.el);
            $('#notificationDiv').html("Notes from the modal view");
            return this;
        },

        deleteNotification: function () {

            var self = this;

            bootbox.confirm({
                message: "Are you sure you want to DELETE this notification?",
                callback: function (result) {
                    // if(result){
                    //     self.model.setUrl('delete');
                    //
                    //     self.model.destroy({
                    //         xhrFields: {
                    //             withCredentials: true
                    //         },
                    //         headers: {
                    //             "uid": self.model.get('uid')
                    //         },
                    //         success: function (model) {
                    //             self.logout();
                    //         },
                    //         error: function(model, response, options){
                    //             bootbox.alert('There was a problem deleting your account.');
                    //             console.log(response);
                    //         }
                    //     });
                    // }
                }
            });
            return this;
        },

        destroyNotificationModal: function () {
            var self = this;
            $('#notificationModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });

    return NotificationModalView;
});