define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var createAvatarModal = require("text!templates/modals/createAvatarModal.html");
    var UserModel = require("models/UserModel");


    var CreateAvatarModalView = Backbone.View.extend({

        el: createAvatarModal,

        events: {
            "click #closeCreateAvatarBtn"    : "destroySVGAvatarModal",
            "click #exitCreateAvatarModal"    : "destroySVGAvatarModal"
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

        destroySVGAvatarModal: function () {
            var self = this;

            self.model.set('path', "byuid");

            var requestModel = new UserModel({
                path: 'byuid'
            });



            requestModel.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "uid": self.model.get("uid")
                },
                success: function (model) {

                    self.parent.model = model;
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                    self.parent.renderMyProfile();

                },
                error: function(err){
                    console.log("error occurred in getting the user after editing");
                }
            });
        }
    });
    return CreateAvatarModalView;
});