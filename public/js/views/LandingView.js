console.log("in Landing View file");
var onIndex = true;

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    // var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var UserModel = require("models/UserModel");
    var HomeView = require("views/HomeView");
    // var SignUpView = require("views/SignUpView");

    var sha256 = require("sha256");

    var LandingView = Backbone.View.extend({

        el: 'body',

        model: new UserModel({
            path: "login"
        }),

        events: {
            "click #loginSubmitBtn"         : "login",
            "click #googleIn"               : "googleIn",
            "click #createAccountBtn"       : "createAccount",
            "keyup #newVerifyPassword"      : "enterSignup",
            "keyup #username"               : "updateLoginModel",
            "keyup #password"               : "enterLogin",
            "change #username"              : "updateLoginModel",
            "change #password"              : "enterLogin",
            "keyup"                         : "updateSignupModel",
            "change"                        : "updateSignupModel",
            "click #sendEmailBtn"           : "sendForgotPasswordEmail",
            "keyup #forgottenPasswordEmail" : "toggleSendEmailButton"
        },

        initialize: function () {
            this.signupModel = new UserModel({
                path: "create"
            });
            this.render();
        },


        render: function () {
            var self = this;
            self.$('#loginSubmitBtn').prop("disabled", true);
            self.$('#createAccountBtn').prop("disabled", true);
            self.$('#sendEmailBtn').prop("disabled", true);
            return this;
        },

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

        googleIn: function (event) { //google signin
            console.log("in landing view googleIn");
            // console.log(event);
            var firstname = $(event.currentTarget).attr('data-firstname');
            var lastname = $(event.currentTarget).attr('data-lastname');
            var email = $(event.currentTarget).attr('data-email');
            var idtoken = $(event.currentTarget).attr('data-idtoken');
            console.log(firstname);
            console.log(lastname);
            console.log(email);
            console.log('id token:');
            console.log(idtoken);

            var googleUserModel = new UserModel({
                path: "login"
            });
            $('#loginSpinner').css('display', 'block');
            googleUserModel.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "email": email,
                    "token": idtoken,
                    "google": true
                },
                success: function (model) {
                    onIndex = false;
                    new HomeView({
                        model: model
                    });
                    $('#loginSpinner').css('display', 'none');
                },
                error: function(model, response, options){
                    $('#loginSpinner').css('display', 'none');

                    var googleUserSignupModel = new UserModel({
                        path: "create",
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: '',
                        bio: '',
                        image: 'img/profile/wine_default.png',
                        tags: []
                    });

                    bootbox.prompt("Please enter a username: ", function(result){
                        console.log(result);
                        if(result !== ''){
                            googleUserSignupModel.set("username", result);

                            console.log('googleUserSignupModel: ');
                            console.log(googleUserSignupModel);

                            googleUserSignupModel.save( null, {
                                xhrFields: {
                                    withCredentials: true
                                },
                                headers: {
                                    "google": true
                                },
                                wait: true,
                                success: function(model, response) {
                                    new HomeView({
                                        model: model
                                    });
                                },
                                error: function(model, response) {
                                    console.log(model);
                                    $('#signupColumn').html("<div class=\"alert alert-danger\">\n" +
                                        "  <strong>Error!</strong> <p>Error signing up with google.<br></p>" +
                                        "<p>Message from server: " + response.responseText +"</p>" +
                                        "</div>");
                                }
                            });
                        }
                    });
                }
            });

            return this;
        },

        login: function () {
            console.log("in landing view login");
            var self = this;
            self.model = new UserModel({
                path: "login"
            });
            self.updateLoginModel();
            console.log("logging in...");
            var hashPassword = sha256($("#password").val());

            $('#loginSpinner').css('display', 'block');
            self.model.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "email": $("#username").val(),
                    "password": hashPassword,
                    "google": false
                },
                success: function () {
                    self.model.set("password", undefined);
                    onIndex = false;
                    $('#loginSpinner').css('display', 'none');
                     new HomeView({
                         model: self.model
                    });
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
                $("#loginSubmitBtn").click();
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

                if (($("#newPassword").val() !== '') && $("#newPassword").val() === $("#newVerifyPassword").val()) {
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
                    headers: {
                        "google": false
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