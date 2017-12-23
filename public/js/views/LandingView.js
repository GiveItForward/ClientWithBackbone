console.log("in Landing View file");

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var UserModel = require("models/UserModel")
    var HomeView = require("views/HomeView");

    //issues with jade plugin, using html for dynamic loads for now
    // var loginTemplate = require("jade!jadeViews/login");
    // var signupTemplate = require("jade!signupView");

    var loginTemplate = require("text!templates/loginTemplate.html");
    var signupTemplate = require("text!templates/signupTemplate.html");
    var signup2Template = require("text!templates/signup2Template.html");


    var LandingView = Backbone.View.extend({

        el: '#rightCol',

        model: new UserModel({}),

        events: {
            "click #signupBtn"          : "renderSignup",
            "click #loginBtn"           : "renderLogin",
            "click #loginSubmitBtn"     : "login",
            "click #yesOrg"             : "toggleYes",
            "click #noOrg"              : "toggleNo",
            "click #dropdownBtn"        : "toggleDropdown",
            "click #createAccountBtn"   : "createAccount",
            "click #uploadImage"        : "uploadImage",
            "click #chooseImage"        : "chooseImage",
            "click #addInfo"            : "addInfo",
            "click #fillOutLater"       : "fillOutLater"
        },

        initialize: function () {
            console.log("in landing view init");
            this.render();
        },


        render: function () {
            console.log("in landing view render");
            var self = this;
            // self.$el.html(indexTemplate());
            return this;
        },

        renderLogin: function () {
            console.log("in login landing view");
            $("#signupBtn").removeClass("selected");
            $("#loginBtn").addClass("selected");
            var self = this;
            self.$('#inputdiv').html(loginTemplate);
            return this;
        },

        login: function () {
            var self = this;
            console.log("logging in");
            console.log($("#username").val());
            console.log($("#password").val());
            self.model = new UserModel({
                email: $("#username").val(),
                password: $("#password").val()
            });
            self.model.fetch({
                success: function () {
                    console.log(self.model.attributes);
                }
            });

            //todo call to back end here
            //todo go to requestfeed
            new HomeView();
            // window.location.href = '/requestFeed';
            return this;
        },

        renderSignup: function () {
            // bootbox.alert("Sign up!");
            console.log("in sign up landing view");
            $("#signupBtn").addClass("selected");
            $("#loginBtn").removeClass("selected");

            var self = this;
            self.$('#inputdiv').html(signupTemplate);
            return this;
        },

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
            console.log("in toggleDropdown");
            $('.dropdown-toggle').dropdown();
            return this;
        },

        createAccount: function () {
            var self = this;
            console.log("creating account");
            console.log($("#newUsername").val());
            console.log($("#newEmail").val());
            console.log($("#newPassword").val());
            console.log($("#newVerifyPassword").val());

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
            // window.location.href = '/requestFeed';
            return this;
        },

        fillOutLater: function () {
            var self = this;
            new HomeView();
            // window.location.href = '/requestFeed';
            return this;
        }




    });

    return LandingView;
}); //end of define