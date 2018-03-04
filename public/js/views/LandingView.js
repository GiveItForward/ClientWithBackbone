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
            "keyup #username"           : "updateLoginModel",
            "keyup #password"           : "enterLogin",
            "change #username"          : "updateLoginModel",
            "change #password"          : "enterLogin",
            "keyup"                     : "updateSignupModel",
            "change"                    : "updateSignupModel"
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
            $('#loginSpinner').delay(100).queue(function () {
                $(this).css('display', 'inline-block');
            });
            self.updateLoginModel();
            console.log("logging in...");
            // self.model = new UserModel({
            //     path: 'login'
            // });
            var hashPassword = sha256($("#password").val());
            // console.log(hashPassword);


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
                    $('#loginSpinner').clearQueue();
                    $('#loginSpinner').css('display', 'none');
                },
                error: function(err){
                    // self.renderLogin(); // but render the login with an error message! TODO
                    $('#loginErrorLabel').html("The email or password was incorrect.");
                    console.log("error occurred in login" + err);
                    if(err === 401){
                        $('#loginErrorLabel').html("401! 401!");
                    }
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
                        console.log('success');
                        console.log("model from json");
                        console.log(model);
                        onIndex = false;
                        new HomeView({
                            model: model
                        });
                    },
                    error: function(model, response) {
                        console.log(model);
                        console.log(response);
                    }
                });
            }else{
                bootbox.alert("Passwords do not match.");
            }
            return this;
        },

        // save: function () {
        //     var self = this;
        //     console.log("in sign up save function");
        //
        //     console.log("backbone signup model");
        //     console.log(self.signupModel);
        //
        //     self.signupModel.save( null, {
        //         wait: true,
        //         success: function(model, response) {
        //             console.log('success');
        //             console.log("model from json");
        //             console.log(model);
        //             new HomeView({
        //                 model: model
        //             });
        //         },
        //         error: function(model, response) {
        //             console.log(model);
        //             console.log(response);
        //         }
        //     });
        //     return this;
        // },

        // renderSignup: function () {
        //     var self = this;
        //     new SignUpView();
        //     // $("#signupBtn").addClass("selected");
        //     // $("#loginBtn").removeClass("selected");
        //     //
        //     // self.$('#inputdiv').html(signupTemplate);
        //     // self.$('#createAccountBtn').prop("disabled", true);
        //     return this;
        // }
    });

    return LandingView;
}); //end of define