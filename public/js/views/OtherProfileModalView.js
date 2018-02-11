define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var otherProfileModal = require("text!templates/modals/otherProfileModal.html");

    var RequestCollection = require("models/RequestCollection");


    var OtherProfileModalView = Backbone.View.extend({

        el: otherProfileModal,

        events: {
            "click #closeOtherProfileBtn"       : "destroyOtherProfileModal",
            "click #exitOtherProfileModal"      : "destroyOtherProfileModal",
            "click #otherProfileTabs"           : "handleTabs"
        },

        initialize: function (options) {
            this.parent = options.parent;
            this.model = options.model
        },

        render: function () {
            var self = this;
            self.el = otherProfileModal;
            self.setElement(this.el);
            console.log(self.model);
            self.$('#otherProfileModalTitle').html(self.model.get('username'));
            self.$("#otherProfileImage").attr('src', self.model.get("image"));
            self.$('#otherProfileDescription').html(self.model.get('description'));
            self.renderOtherRequests();
            self.renderOtherDonations();
            return this;
        },

        renderOtherRequests: function () {
            var self = this;
            var temp = "some request history template goes here ";
            for(var i = 0; i < 20; i++){
                temp += "some request history template goes here ";
            }
            self.$('#otherRequestHistory').html(temp);

            // var requestCollection = new RequestCollection();
            // requestCollection.fetchByRequestUid({
            //     headers: {"uid": self.model.get('uid')},
            //     success: function (collection) {
            //         _.each(collection.models, function(model) {
            //             console.log(model.toJSON());
            //         })
            //         console.log("My requests: ");
            //         console.log(collection.models);
            //         self.$('#myRequestCol').html(myRequestTemplate(collection));
            //     },
            //     error: function(model, response) {
            //         console.log(model);
            //         console.log(response);
            //     }
            // });
            return this;
        },

        renderOtherDonations: function (event) {
            var self = this;
            var temp = "some donation history template goes here ";
            for(var i = 0; i < 20; i++){
                temp += "some donation history template goes here ";
            }
            self.$('#otherDonationHistory').html(temp);

            // var requestCollection = new RequestCollection();
            // requestCollection.fetchByRequestUid({
            //     headers: {"uid": self.model.get('uid')},
            //     success: function (collection) {
            //         // _.each(collection.models, function(model) {
            //         //     console.log(model.toJSON());
            //         // });
            //         console.log("My requests: ");
            //         console.log(collection.models);
            //         self.$('#otherDonationHistory').html(myRequestTemplate(collection));
            //     },
            //     error: function(model, response) {
            //         console.log(model);
            //         console.log(response);
            //     }
            // });

            return this;
        },

        handleTabs: function (event) {
            var self = this;


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