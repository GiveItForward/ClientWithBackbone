var emailNoteHasBeenShown = 0;
var onSignUp2 = false;

var tagList = [];

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootstrapSelect = require("bootstrapSelect");
    var bootbox = require("bootbox");
    var sha256 = require('sha256');

    var ChooseUserImageModalView = require("views/ChooseUserImageModalView");
    var HomeView = require("views/HomeView");

    var UserModel = require("models/UserModel");
    var TagCollection = require("models/TagCollection");

    var loginTemplate = require("jade!templates/jade_templates/loginTemplate");
    var signupTemplate = require("jade!templates/jade_templates/signupTemplate");
    var signup2Template = require("jade!templates/jade_templates/signup2Template");
    var signup2TagsTemplate = require("jade!templates/jade_templates/signup2TagsTemplate");

    var SignUpView = Backbone.View.extend({

        el: '#rightCol',

        model: new UserModel({
            path: 'signup'
        }),

        events: {
            "click #loginBtn"           : "renderLogin",
            "click #dropdownBtn"        : "toggleDropdown",
            "click #createAccountBtn"   : "createAccount",
            "click #uploadImage"        : "uploadImage",
            "click #chooseImage"        : "chooseImage",
            "click #addInfo"            : "save",
            "click #fillOutLater"       : "fillOutLater",
            "click .dropdown-menu a"    : "updateUserTags",
            "focus #newEmail"           : "emailPopup",
            "keyup"                     : "updateModel",
            "change"                    : "updateModel"
        },

        initialize: function () {
            this.model.set('image', '/img/default_profile_pic_no_bckgrnd.png');
            this.render();
        },

        render: function () {
            var self = this;
            $("#signupBtn").addClass("selected");
            $("#loginBtn").removeClass("selected");
            self.$('#inputdiv').html(signupTemplate);
            self.$('#createAccountBtn').prop("disabled", true);
            return this;
        },

        renderLogin: function () {
            $("#signupBtn").removeClass("selected");
            $("#loginBtn").addClass("selected");
            var self = this;
            self.$('#inputdiv').html(loginTemplate);
            return this;
        },

        updateUserTags: function (event) {
            // this function from https://codepen.io/bseth99/pen/fboKH?editors=1010
            var $target = $(event.currentTarget),
                val = $target.attr( 'data-value' ),
                $inp = $target.find( 'input' ),
                idx;
            if ( ( idx = tagList.indexOf( val ) ) > -1 ) {
                tagList.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
            } else {
                tagList.push( val );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
            }
            $( event.target ).blur();
            console.log( tagList );
            return this;
        },

        updateModel: function () {
            if (!onSignUp2) {
                var self = this;
                self.model.set("username", $("#newUsername").val());
                self.model.set("email", $("#newEmail").val());

                if ($("#newPassword").val() === $("#newVerifyPassword").val()) {
                    self.model.set("password", sha256($("#newPassword").val()));// todo this will be hashed/encrypted
                }

                if (!self.model.get("username") || !self.model.get("email") || !self.model.get("password")) {
                    self.$('#createAccountBtn').prop("disabled", true);
                } else {
                    self.$('#createAccountBtn').prop("disabled", false);
                }
            }
        },


        toggleDropdown: function () {
            $('.dropdown-toggle').dropdown();
            return this;
        },

        emailPopup: function () {
            if(!emailNoteHasBeenShown){
                emailNoteHasBeenShown = 1;
                bootbox.alert({
                    size: "large",
                    message: "Please use your PayPal email if you wish to receive donations.",
                    callback: function(){
                        setTimeout(function(){
                            $('#newEmail').focus();
                        }, 10);
                    }
                });
            }
        },

        createAccount: function () {
            var self = this;
            self.updateModel();
            console.log("creating account...");
            console.log($("#newUsername").val());
            console.log($("#newEmail").val());
            console.log($("#newPassword").val());
            console.log($("#newVerifyPassword").val());

            if($("#newPassword").val() === $("#newVerifyPassword").val()){
                self.model.set("username", $("#newUsername").val());
                self.model.set("password", sha256($("#newPassword").val()));
                self.model.set("email", $("#newEmail").val());
                // self.model.set("bio", "");
                console.log(self.model);
            }else{
                bootbox.alert("Passwords do not match.");
            }
            onSignUp2 = true;

            var tagCollection = new TagCollection();
            tagCollection.fetch({
                success: function (collection) {
                    console.log('tag names from db: ')
                    console.log(collection.models);
                    self.$('#landingContainer').html(signup2Template);
                    self.$('#chooseUserTags').html(signup2TagsTemplate(collection));
                }
            });

            return this;
        },

        uploadImage: function () {
            var self = this;
            // $("#fileChooser").trigger("click");
            bootbox.alert("Not yet implemented.");
            return this;
        },

        chooseImage: function () {
            var self = this;
            // bootbox.alert("Pick an image!");
            var self = this;
            var container = document.createDocumentFragment();
            var chooseUserImageModalView = new ChooseUserImageModalView({
                parent: self
            });
            container.appendChild(chooseUserImageModalView.render().el);
            $('body').append(container);
            return this;
        },

        save: function () {
            var self = this;
            console.log("in sign up save function");

            console.log(tagList);
            self.model.set("tags", tagList);
            self.model.set("bio", $("#userBio").val());
            console.log("backbone model");
            console.log(self.model);

            //todo saving to DB, but not getting to success function...and erasing tags
            // self.model.save({
            //     // wait: true,
            //     success: function(model, response) {
            //         console.log("model from json");
            //         console.log(model);
            //         new HomeView({
            //             model: model
            //         });
            //         console.log('success');
            //     },
            //     error: function(model, response) {
            //         console.log(model);
            //         console.log(response);
            //     }});
            return this;
        },

        fillOutLater: function () {
            var self = this;
            new HomeView({
                // model: self.model
            });
            return this;
        }

    });

    return SignUpView;
}); //end of define