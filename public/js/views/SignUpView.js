var emailNoteHasBeenShown = 0;
var passwordNoteHasBeenShown = 0;

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var UserModel = require("models/UserModel");
    var HomeView = require("views/HomeView");

    var loginTemplate = require("jade!templates/jade_templates/loginTemplate");
    var signupTemplate = require("jade!templates/jade_templates/signupTemplate");
    var signup2Template = require("jade!templates/jade_templates/signup2Template");

    var SignUpView = Backbone.View.extend({

        el: '#rightCol',

        model: new UserModel({
            path: 'signup/',
            email: 'email',
        }),

        events: {
            // "click #signupBtn"          : "renderSignup",
            "click #loginBtn"           : "renderLogin",
            // "click #loginSubmitBtn"     : "login",
            "click #yesOrg"             : "toggleYes",
            "click #noOrg"              : "toggleNo",
            "click #dropdownBtn"        : "toggleDropdown",
            "click #createAccountBtn"   : "createAccount",
            "click #uploadImage"        : "uploadImage",
            "click #chooseImage"        : "chooseImage",
            "click #addInfo"            : "addInfo",
            "click #fillOutLater"       : "fillOutLater",
            "focus #newEmail"           : "emailPopup",
            "focus #newPassword"        : "passwordPopup",
            "keyup"                     : "updateModel",
            "change"                    : "updateModel"
        },

        initialize: function () {
            var self = this;
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

        updateModel: function () {
            var self = this;
            self.model.set("username", $("#newUsername").val());
            self.model.set("email", $("#newEmail").val());

            if($("#newPassword").val() === $("#newVerifyPassword").val()){
                self.model.set("password", $("#newPassword").val());// todo this will be hashed/encrypted
            }

            if(!self.model.get("username") || !self.model.get("email") || !self.model.get("password")){
                self.$('#createAccountBtn').prop("disabled", true);
            }else{
                self.$('#createAccountBtn').prop("disabled", false);
            }
        },

        // login: function () {
        //     var self = this;
        //     console.log("logging in...");
        //     // console.log($("#username").val());
        //     // console.log($("#password").val());
        //
        //     self.model = new UserModel({
        //         email: $("#username").val(),
        //         password: $("#password").val()
        //     });
        //     self.model.fetch({
        //         success: function () {
        //             // console.log(self.model);
        //             new HomeView({
        //                 model: self.model
        //             });
        //         }
        //     });
        //     return this;
        // },
        //
        // renderSignup: function () {
        //     // bootbox.alert("Sign up!");
        //     console.log("in sign up landing view");
        //     $("#signupBtn").addClass("selected");
        //     $("#loginBtn").removeClass("selected");
        //
        //     var self = this;
        //     self.$('#inputdiv').html(signupTemplate);
        //     return this;
        // },

        toggleYes: function () {
            $("#yesOrg").prop('checked', true);
            $("#noOrg").prop('checked', false);
            $("#findOrg").show();
            return this;
        },

        toggleNo: function () {
            $("#yesOrg").prop('checked', false);
            $("#noOrg").prop('checked', true);
            $("#findOrg").hide();
            return this;
        },

        toggleDropdown: function () {
            $('.dropdown-toggle').dropdown();
            return this;
        },

        emailPopup: function () {
            if(!emailNoteHasBeenShown){
                emailNoteHasBeenShown = 1;
                // bootbox.alert("Please use your PayPal email if you wish to receive donations.", function(){
                //     $('#newEmail').focus();
                // });
                bootbox.alert({
                    size: "medium",
                    message: "Please use your PayPal email if you wish to receive donations.",
                    callback: function(){
                        setTimeout(function(){
                            $('#newEmail').focus();
                        }, 10);
                    }
                });
            }
        },

        passwordPopup: function () {
            if(!passwordNoteHasBeenShown){
                passwordNoteHasBeenShown = 1;
                bootbox.alert({
                    size: "medium",
                    message: "For added security, please do NOT use the same password as your PayPal account.",
                    callback: function(){
                        setTimeout(function(){
                            $('#newPassword').focus();
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
                self.model.set("password", $("#newPassword").val());
                self.model.set("bio", "");
                console.log(self.model);
                self.model.save();
            }else{
                bootbox.alert("Passwords do not match.");
            }


            //todo call to back end here

            self.$('#landingContainer').html(signup2Template);
            return this;
        },

        uploadImage: function () {
            var self = this;
            $("#fileChooser").trigger("click");
            self.$('#landingContainer').html(signup2Template);
            return this;
        },

        chooseImage: function () {
            var self = this;
            bootbox.alert("Pick an image!");
            self.$('#landingContainer').html(signup2Template);
            return this;
        },

        addInfo: function () {
            var self = this;

            //todo get image
            console.log($("#userBio").val());
            //todo get tags

            //todo call to back end here

            console.log("in add info function");
            new HomeView();
            return this;
        },

        fillOutLater: function () {
            var self = this;
            new HomeView({
                model: self.model
            });
            return this;
        }

    });

    return SignUpView;
}); //end of define