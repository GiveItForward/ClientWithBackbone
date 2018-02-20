var chosenImage = "/img/default_profile_pic_no_bckgrnd.png";

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var chooseUserImageModal = require("text!templates/modals/chooseUserImageModal.html");

    var ChooseUserImageModalView = Backbone.View.extend({

        el: chooseUserImageModal,

        events: {
            "click #cancelChooseUserImageBtn"  : "destroyChooseUserImageModal",
            "click #exitChooseUserImageBtn"    : "destroyChooseUserImageModal",
            "click #imageBtnGroup button"      : "getImage",
            "click #chooseUserImageBtn"        : "save"
            // "keyup"                     : "updateModel",
            // "change"                    : "updateModel"
        },

        initialize: function (options) {
            console.log("in choose user image modal view init");
            this.parent = options.parent;
            this.update = options.update;
            // this.render();
        },

        render: function () {
            console.log("in choose user image modal view render");
            var self = this;
            self.el = chooseUserImageModal;
            self.setElement(this.el);
            return this;
        },

        getImage: function (event) {
            console.log("you clicked an image.....");
            // console.log($(event.currentTarget).attr('data-image'));
            chosenImage = $(event.currentTarget).attr('data-image');
            return this;
        },

        save: function (event) {

            this.parent.model.set('image', chosenImage);
            console.log(this.parent.model.get('image'));
            if(this.update){
                $("#editProfileImage").attr('src', this.parent.model.get('image'));
            }else{
                $("#userImage").attr('src', this.parent.model.get('image'));
            }

            return this;
        },

        destroyChooseUserImageModal: function () {
            var self = this;
            $('#chooseUserImageModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            })
        }
    });
    return ChooseUserImageModalView;
});