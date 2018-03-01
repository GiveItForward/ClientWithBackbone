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

        el: '#rightCol',

        model: new UserModel({
            path: "login"
        }),

        events: {
            "click #signupBtn"          : "renderSignup",
            "click #loginSubmitBtn"     : "login",
            "keyup #password"           : "enterLogin",
            "keyup"                     : "updateModel",
            "change"                    : "updateModel"
        },

        initialize: function () {
            this.render();
        },


        render: function () {
            var self = this;
            // self.$el.html(indexTemplate());
            self.$('#loginSubmitBtn').prop("disabled", true);
            return this;
        },

        renderLogin: function () {
            $("#signupBtn").removeClass("selected");
            $("#loginBtn").addClass("selected");
            var self = this;
            self.$('#inputdiv').html(loginTemplate());
            self.$('#loginSubmitBtn').prop("disabled", true);
            return this;
        },

        updateModel: function () {
            var self = this;
            self.model.set("username", $("#username").val());
            self.model.set("password", $("#password").val());// todo this will be hashed/encrypted

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
            self.updateModel();
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
                    new HomeView({
                        model: self.model
                    });
                    $('#loginSpinner').clearQueue();
                    $('#loginSpinner').css('display', 'none');
                },
                error: function(err){
                    self.renderLogin(); // but render the login with an error message! TODO
                    $('#loginErrorLabel').html("The username or password was incorrect.");
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
            if ( e.keyCode === 13 ) { // 13 is enter key
                self.login();
            }
            return this;
        },

        renderSignup: function () {
            var self = this;
            new SignUpView();
            // $("#signupBtn").addClass("selected");
            // $("#loginBtn").removeClass("selected");
            //
            // self.$('#inputdiv').html(signupTemplate);
            // self.$('#createAccountBtn').prop("disabled", true);
            return this;
        }
    });

    return LandingView;
}); //end of define