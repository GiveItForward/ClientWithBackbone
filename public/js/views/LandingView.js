var onIndex = true;

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var UserModel = require("models/UserModel");
    var HomeView = require("views/HomeView");
    var SignUpView = require("views/SignUpView");

    var sha256 = require("sha256");

    var loginTemplate = require("jade!templates/jade_templates/loginTemplate");

    var LandingView = Backbone.View.extend({

        el: 'body',

        model: new UserModel({
            path: "login"
        }),

        events: {
            // "click #signupBtn"          : "renderSignup",
            "click #loginSubmitBtn"     : "login",
            "click #createAccountBtn"   : "createAccount",
            "keyup #newVerifyPassword"  : "enterSignup",
            "keyup #username"           : "updateLoginModel",
            "keyup #password"           : "enterLogin",
            "change #username"          : "updateLoginModel",
            "change #password"          : "enterLogin",
            "keyup"                     : "updateSignupModel",
            "change"                    : "updateSignupModel",
            "click #sendEmailBtn"       : "sendForgotPasswordEmail",
            "keyup #forgottenPasswordEmail": "toggleSendEmailButton",
            "click #resetPasswordBtn"   : "sendResetPassword"
        },

        initialize: function () {
            this.signupModel = new UserModel({
                path: "create"
            });
            this.render();
        },


        render: function () {
            var self = this;
            // self.$el.html(indexTemplate());
            self.$('#loginSubmitBtn').prop("disabled", true);
            self.$('#createAccountBtn').prop("disabled", true);
            self.$('#sendEmailBtn').prop("disabled", true);
            return this;
        },

        // renderLogin: function () {
        //     $("#signupBtn").removeClass("selected");
        //     $("#loginBtn").addClass("selected");
        //     var self = this;
        //     self.$('#inputdiv').html(loginTemplate());
        //     self.$('#loginSubmitBtn').prop("disabled", true);
        //     return this;
        // },

        updateLoginModel: function () {
            var self = this;
            self.model.set("username", $("#username").val());
            self.model.set("password", $("#password").val());

            if(!self.model.get("username") || !self.model.get("password")){
                self.$('#loginSubmitBtn').prop("disabled", true);
            }else{
                self.$('#loginSubmitBtn').prop("disabled", false);
            }
        },

        login: function () {
            var self = this;
            self.model = new UserModel({
                path: "login"
            });
            self.updateLoginModel();
            console.log("logging in...");
            // self.model = new UserModel({
            //     path: 'login'
            // });
            var hashPassword = sha256($("#password").val());
            // console.log(hashPassword);

            $('#loginSpinner').css('display', 'block');
            self.model.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "email": $("#username").val(),
                    "password": hashPassword
                },
                success: function () {
                    self.model.set("password", undefined);
                    onIndex = false;
                     new HomeView({
                         model: self.model
                    });
                    $('#loginSpinner').css('display', 'none');
                },
                error: function(model, response, options){
                    $('#loginSpinner').css('display', 'none');
                    $('#loginErrorLabel').html(response.responseText);
                }
            });
            return this;
        },

        enterLogin: function (e) {
            var self = this;
            self.updateLoginModel();
            if ( e.keyCode === 13 ) { // 13 is enter key
                self.login();
            }
            return this;
        },

        updateSignupModel: function () {
            if (onIndex) {
                var self = this;
                self.signupModel.set("username", $("#newUsername").val());
                self.signupModel.set("firstname", $("#newFirstname").val());
                self.signupModel.set("lastname", $("#newLastname").val());
                self.signupModel.set("email", $("#newEmail").val());

                if ($("#newPassword").val() === $("#newVerifyPassword").val()) {
                    self.signupModel.set("password", sha256($("#newPassword").val()));
                }

                if (!self.signupModel.get("username") || !self.signupModel.get("email") || !self.signupModel.get("password")) {
                    self.$('#createAccountBtn').prop("disabled", true);
                } else {
                    self.$('#createAccountBtn').prop("disabled", false);
                }
            }
        },

        createAccount: function () {
            var self = this;
            self.updateSignupModel();
            console.log("creating account...");
            // console.log($("#newUsername").val());
            // console.log($("#newEmail").val());
            // console.log($("#newPassword").val());
            // console.log($("#newVerifyPassword").val());

            if($("#newPassword").val() === $("#newVerifyPassword").val()){
                self.signupModel.set("username", $("#newUsername").val());
                self.signupModel.set("firstname", $("#newFirstname").val());
                self.signupModel.set("lastname", $("#newLastname").val());
                self.signupModel.set("password", sha256($("#newPassword").val()));
                self.signupModel.set("email", $("#newEmail").val());
                self.signupModel.set("bio", '');
                self.signupModel.set("image", 'img/profile/wine_default.png');
                self.signupModel.set("tags", []);
                console.log("backbone signup model");
                console.log(self.signupModel);

                self.signupModel.save( null, {
                    xhrFields: {
                        withCredentials: true
                    },
                    wait: true,
                    success: function(model, response) {
                        $('#signupColumn').html("<div class=\"alert alert-success\">\n" +
                            "  <strong>Success!</strong> Email confirmation has been sent. Please confirm email before logging in.\n" +
                            "</div>");
                        onIndex = false;
                    },
                    error: function(model, response) {
                        $('#signupColumn').html("<div class=\"alert alert-danger\">\n" +
                            "  <strong>Error!</strong> <p>Email confirmation was not sent.<br></p>" +
                            "<p>Message from server: " + response.responseText +"</p>" +
                            "</div>");
                    }
                });
            }else{
                bootbox.alert("Passwords do not match.");
            }
            return this;
        },

        enterSignup: function (e) {
            var self = this;
            self.updateSignupModel();
            if ( e.keyCode === 13 ) { // 13 is enter key
                self.createAccount();
            }
            return this;
        },

        sendResetPassword: function() {
            var self = this;
            self.model = new UserModel({});
            var password = "";
            var hash = getUrl.pathname.split('/')[1];
            self.model.url = '/api/resetPassword';
            if ($("#newPasswordReset").val() === $("#confirmNewPasswordReset").val()) {
                password = sha256($("#newPasswordReset").val());
            }
            else {
                bootbox.alert("Passwords do not match.");
            }

            self.model.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "hash": hash,
                    "password": password
                },
                success: function () {
                    new LandingView();
                },
                error: function(model, response, options){
                    bootbox.alerts("Error resetting password.");
                }
            });
            return this;

        },
        sendForgotPasswordEmail: function() {
            var self = this;
            self.model = new UserModel({});
            self.model.url = '/api/forgotpassword';
            console.log($('#forgottenPasswordEmail'));
            self.model.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "email": $('#forgottenPasswordEmail').val()
                },
                success: function () {
                    $('#forgotPasswordModalBody').html("<div class=\"alert alert-success\">\n" +
                        "  <strong>Success! Check your email.</strong>" +
                        "<p>We just sent an email to you with a link to reset your password!</p>" +
                        "</div>");
                },
                error: function(model, response, options){
                    $('#forgotPasswordModalBody').html("<div class=\"alert alert-danger\">\n" +
                        "  <strong>Error!</strong>" +
                        "<p>Error when trying to reset password</p>" +
                        "<p>Message From Server: <br>" + response.responseText + "</p>" +
                        "</div>");
                }
            });

        },

        toggleSendEmailButton: function() {
            var self = this;
            if(self.$('#forgottenPasswordEmail').val() !== ""){
                self.$('#sendEmailBtn').prop("disabled", false);
            } else {
                self.$('#sendEmailBtn').prop("disabled", true);
            }
        }

    });

    return LandingView;
}); //end of define