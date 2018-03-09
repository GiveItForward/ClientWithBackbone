define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var OrgModel = require("models/OrgModel");

    var newOrgModal = require("text!templates/modals/newOrgModal.html");

    var ChooseOrgImageModalView = require("views/ChooseOrgImageModalView");

    var NewOrgModalView = Backbone.View.extend({

        el: newOrgModal,

        events: {
            "click #cancelNewOrgBtn"     : "destroyNewOrgModal",
            "click #exitNewOrgModal"     : "destroyNewOrgModal",
            "click #chooseOrgImage"      : "newOrgImage",
            "click #createOrgBtn"        : "saveNewOrg",
            "keyup"                      : "updateNewOrgModel",
            "change"                     : "updateNewOrgModel"
        },

        initialize: function (options) {
            this.parent = options.parent;
            this.model = new OrgModel({path: 'create'});
            console.log(this.model);
            $('#newOrgErrorLabel').html('');
        },

        render: function () {
            var self = this;
            self.el = newOrgModal;
            self.setElement(this.el);
            // this.$('#editOrgImage').attr('src', '');
            self.$('#createOrgBtn').prop("disabled", true);
            return this;
        },

        newOrgImage: function () {
            var self = this;
            var container = document.createDocumentFragment();
            var chooseOrgImageModalView = new ChooseOrgImageModalView({
                parent: self,
                update: false
            });
            container.appendChild(chooseOrgImageModalView.render().el);
            $('body').append(container);
            return this;
        },


        updateNewOrgModel: function () {
            var self = this;
            self.model.set("name", $("#newOrgName").val());
            self.model.set("description", $("#newOrgDescription").val());
            self.model.set("website", $("#newOrgWebsite").val());
            self.model.set("phone", $("#newOrgPhone").val());
            self.model.set("address", $("#newOrgAddress").val());
            self.model.set("email", $("#newOrgEmail").val());
            self.model.set("image", $("#newOrgImage").attr('src')); //being set in chooseImageModal

            console.log(this.model);

            if(!self.model.get("name") || !self.model.get("description") || !self.model.get("website")
                || !self.model.get("phone") || !self.model.get("address") || !self.model.get("email")){
                self.$('#createOrgBtn').prop("disabled", true);
            }else{
                 self.$('#createOrgBtn').prop("disabled", false);
            }
        },

        saveNewOrg: function () {
            var self = this;
            console.log("in create org function");
            console.log(this.model);

            self.updateNewOrgModel();

            console.log(self.model);
            self.model.save(null, {
                wait: true,
                headers: {
                    "uid": self.parent.model.get('uid')
                },
                xhrFields: {
                    withCredentials: true
                },
                success: function(model, response) {
                    console.log(model);
                    console.log('success in saving new orgs');
                    self.parent.renderOrgs();
                    self.destroyNewOrgModal();
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                    $('#newOrgErrorLabel').html('There was a problem saving your org.');
                }});

            // return this;
        },

        destroyNewOrgModal: function () {
            var self = this;
            $('#newOrgModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
    return NewOrgModalView;
});