define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var OrgModel = require("models/OrgModel");

    var editOrgModal = require("text!templates/modals/editOrgModal.html");

    var ChooseOrgImageModalView = require("views/ChooseOrgImageModalView");

    var EditOrgModalView = Backbone.View.extend({

        el: editOrgModal,

        events: {
            "click #cancelEditOrgBtn"           : "destroyEditOrgModal",
            "click #exitEditOrgModal"           : "destroyEditOrgModal",
            "click #changeOrgImage"             : "changeOrgImage",
            "click #updateOrgBtn"               : "saveUpdateOrg",
            "keyup"                             : "updateEditOrgModel",
            "change"                            : "updateEditOrgModel"
        },

        initialize: function (options) {
            this.parent = options.parent;

            var myOid = this.parent.model.get('orgId');
            if(myOid > 0){
                var myOrgModel = new OrgModel({
                    path: 'byoid',
                    oid: myOid
                });
                myOrgModel.fetch({
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {"oid": myOid},
                    success: function (model) {
                        console.log(model);
                        this.$('#editOrgName').val(model.get('name'));
                        this.$('#editOrgDescription').html(model.get('description'));
                        this.$('#editOrgWebsite').val(model.get('website'));
                        this.$('#editOrgPhone').val(model.get('phone'));
                        this.$('#editOrgAddress').val(model.get('address'));
                        this.$('#editOrgEmail').val(model.get('email'));
                        this.$('#editOrgImage').attr('src', model.get('image'));
                    }
                });
            }
            this.model = new OrgModel({
                path: 'update',
                oid: myOid
            });

            $('#editOrgErrorLabel').html('');
        },

        render: function () {
            var self = this;
            self.el = editOrgModal;
            self.setElement(this.el);
            self.$('#updateOrgBtn').prop("disabled", true);
            return this;
        },


        updateEditOrgModel: function () {
            var self = this;
            self.model.set("name", $("#editOrgName").val());
            self.model.set("description", $("#editOrgDescription").val());
            self.model.set("website", $("#editOrgWebsite").val());
            self.model.set("phone", $("#editOrgPhone").val());
            self.model.set("address", $("#editOrgAddress").val());
            self.model.set("email", $("#editOrgEmail").val());
            self.model.set("image", $("#editOrgImage").attr('src')); //being set in chooseImageModal

            self.$('#updateProfileBtn').prop("disabled", false);
        },

        saveUpdateOrg: function () {
            var self = this;
            console.log("in save update org function");

            self.updateEditOrgModel();

            console.log(self.model);
            self.model.save(null, {
                xhrFields: {
                    withCredentials: true
                },
                wait: true,
                success: function(model, response) {
                    console.log(model);
                    console.log('success in saving updated org');
                    self.parent.renderOrgs();
                    self.destroyEditOrgModal();
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                    $('#requestErrorLabel').html('There was a problem saving your request.');
                }});

        },

        changeOrgImage: function () {
            var self = this;
            var container = document.createDocumentFragment();
            var chooseOrgImageModalView = new ChooseOrgImageModalView({
                parent: self,
                update: true
            });
            container.appendChild(chooseOrgImageModalView.render().el);
            $('body').append(container);
            return this;
        },

        destroyEditOrgModal: function () {
            var self = this;
            $('#editOrgModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
    return EditOrgModalView;
});