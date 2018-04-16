console.log("in Landing View file");
var onIndex = true;

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    // var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var UserModel = require("models/UserModel");
    var LandingView = require("views/LandingView");
    // var SignUpView = require("views/SignUpView");

    var sha256 = require("sha256");

    var ResetPasswordView = Backbone.View.extend({
        userHash: '',

        el: 'body',

        model: new UserModel({
            path: "login"
        }),

        events: {
            "click #resetPasswordBtn"       : "sendResetPassword"
        },

        initialize: function (options) {
            var self = this;

            console.log('************************' + options.hashhash);
            self.userHash = options.hashhash.substring(1);
            this.render();
        },


        render: function () {
            var self = this;
            return this;
        },


        sendResetPassword: function(event) {
            var self = this;

            self.model = new UserModel({});
            var password = "";

            console.log(self.userHash);

            self.model.url = '/api/resetpassword';
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
                    "hash": self.userHash,
                    "password": password
                },
                success: function () {
                    new LandingView();
                },
                error: function(model, response, options){
                    bootbox.alert("Error resetting password.");
                }
            });
            return this;

        }

    });

    return ResetPasswordView;
}); //end of define