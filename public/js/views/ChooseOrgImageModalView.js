var chosenImage = "/img/org/student_purple.png";

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var chooseOrgImageModal = require("text!templates/modals/chooseOrgImageModal.html");

    var ChooseOrgImageModalView = Backbone.View.extend({

        el: chooseOrgImageModal,

        events: {
            "click #cancelChooseOrgImageBtn"  : "destroyChooseOrgImageModal",
            "click #exitChooseOrgImageBtn"    : "destroyChooseOrgImageModal",
            "click #imageBtnGroup button"      : "getOrgImage",
            "click #chooseUserImageBtn"        : "save"
            // "keyup"                     : "updateModel",
            // "change"                    : "updateModel"
        },

        initialize: function (options) {
            console.log("in choose uorgser image modal view init");
            this.parent = options.parent;
            this.update = options.update;
            // this.render();
        },

        render: function () {
            console.log("in choose org image modal view render");
            var self = this;
            self.el = chooseOrgImageModal;
            self.setElement(this.el);
            return this;
        },

        getOrgImage: function (event) {
            console.log("you clicked an image.....");
            // console.log($(event.currentTarget).attr('data-image'));
            chosenImage = $(event.currentTarget).attr('data-image');
            return this;
        },

        save: function (event) {

            // this.parent.model.set('image', chosenImage);
            // this.parent.$('#updateProfileBtn').prop("disabled", false);
            // console.log(this.parent.model.get('image'));
            // if(this.update){
            //     $("#editProfileImage").attr('src', this.parent.model.get('image'));
            // }else{
            //     $("#userImage").attr('src', this.parent.model.get('image'));
            // }
            // this.destroyChooseOrgImageModal();
            return this;
        },

        destroyChooseOrgImageModal: function () {
            var self = this;
            $('#chooseOrgImageModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            })
        }
    });
    return ChooseOrgImageModalView;
});