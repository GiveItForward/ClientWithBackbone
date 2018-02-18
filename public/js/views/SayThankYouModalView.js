var chosenImage = "/img/default_profile_pic_no_bckgrnd.png";

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var sayThankYouModal = require("text!templates/modals/sayThankYouModal.html");

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
            this.model = options.model
            // this.render();
        },

        render: function () {
            console.log("in thank you modal view render");
            var self = this;
            self.el = sayThankYouModal;
            self.setElement(this.el);
            console.log(self.model);
            // self.$('#sayThankYouLabel').html('Write your Thank You message to ' ' here:');
            self.$('#createThankYouBtn').prop("disabled", true);

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