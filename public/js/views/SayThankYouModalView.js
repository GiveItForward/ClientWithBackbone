var chosenImage = "/img/wine_default.png";

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var sayThankYouModal = require("text!templates/modals/sayThankYouModal.html");
    var UserModel = require("models/UserModel");

    var SayThankYouModalView = Backbone.View.extend({

        el: sayThankYouModal,

        events: {
            "click #exitCreateThankYouBtn"          : "destroySayThankYouModal",
            "click #cancelCreateThankYouBtn"        : "destroySayThankYouModal",
            "click #createThankYouBtn"              : "save",
            "keyup"                                 : "updateThankYouModel",
            "change"                                : "updateThankYouModel"
        },

        initialize: function (options) {
            console.log("in thank you modal view init");
            this.parent = options.parent;
            this.model = options.model,
            this.duid = options.duid
            // this.render();
        },

        render: function () {
            console.log("in thank you modal view render");
            var self = this;
            self.el = sayThankYouModal;
            self.setElement(this.el);
            console.log(self.model);
            // self.$('#sayThankYouLabel').html('Write your Thank You message to ' + self.donateUsername + ' here:');
            self.setDonateUsername();
            self.$('#createThankYouBtn').prop("disabled", true);

            return this;
        },

        setDonateUsername: function () {
            var self = this;
            var donateUserModel = new UserModel({
                path: 'byuid',
                uid: self.duid
            });
            donateUserModel.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "uid": self.duid
                },
                success: function (model) {
                    donateUserModel = model;
                    self.$('#sayThankYouLabel').html('Write your Thank You message to ' + model.get('username') + ' here:');
                },
                error: function(err){
                    console.log("error occurred in getting the donate username");
                }
            });
            return this;
        },



        updateThankYouModel: function () {
            var self = this;
            self.model.set("note", $("#thankYouMessage").val());

            console.log('in say thank you update model:');
            console.log(self.model);

            if(!self.model.get("note")){
                self.$('#createRequestBtn').prop("disabled", true);
            }else{
                self.$('#createThankYouBtn').prop("disabled", false);
            }
        },

        save: function () {
            var self = this;
            self.updateThankYouModel()
            console.log('in say thank you save:');
            console.log(self.model);
            self.model.save(null, {
                wait: true,
                success: function(model, response) {
                    console.log(model);
                    console.log('success in saving new thank you');
                    self.parent.renderMyRequests();
                    self.destroySayThankYouModal();
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                    $('#thankYouErrorLabel').html('There was a problem saving your request.');
                }});
            return this;
        },

        destroySayThankYouModal: function () {
            var self = this;
            $('#sayThankYouModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
    return SayThankYouModalView;
});