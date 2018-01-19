define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootstrapSelect = require("bootstrapSelect");
    var bootbox = require("bootbox");

    var UserModel = require("models/UserModel");
    var HomeView = require("views/HomeView");
    var SignUpView = require("views/SignUpView");

    //issues with jade plugin, using html for dynamic loads for now
    // var loginTemplate = require("jade!jadeViews/login");
    // var signupTemplate = require("jade!signupView");

    var loginTemplate = require("jade!templates/jade_templates/loginTemplate");
    // var signupTemplate = require("jade!templates/jade_templates/signupTemplate");
    // var signup2Template = require("jade!templates/jade_templates/signup2Template");


    var LandingView = Backbone.View.extend({

        el: '#rightCol',

        model: new UserModel({
            path: "login"
        }),

        events: {
            "click #signupBtn"          : "renderSignup",
            // "click #loginBtn"           : "renderLogin",
            "click #loginSubmitBtn"     : "login",
            // "click #yesOrg"             : "toggleYes",
            // "click #noOrg"              : "toggleNo",
            // "click #dropdownBtn"        : "toggleDropdown",
            // "click #createAccountBtn"   : "createAccount",
            // "click #uploadImage"        : "uploadImage",
            // "click #chooseImage"        : "chooseImage",
            // "click #addInfo"            : "addInfo",
            // "click #fillOutLater"       : "fillOutLater",
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


            self.model = new UserModel({
                path: 'login',
                email: $("#username").val(),
                password: $("#password").val()// todo this will be hashed/encrypted
            });
            self.model.fetch({
                success: function () {
                    self.model.set("password", undefined); //todo make sure password is not visable
                    // var requestCollection = new RequestCollection();
                     new HomeView({
                         model: self.model
                         // requestCollection: requestCollection
                    });
                }
            });
            $('#loginSpinner').clearQueue();
            $('#loginSpinner').css('display', 'none');
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
        },

        // toggleYes: function () {
        //     $("#yesOrg").prop('checked', true);
        //     $("#noOrg").prop('checked', false);
        //     $("#findOrg").show();
        //     return this;
        // },
        //
        // toggleNo: function () {
        //     $("#yesOrg").prop('checked', false);
        //     $("#noOrg").prop('checked', true);
        //     $("#findOrg").hide();
        //     return this;
        // },
        //
        // toggleDropdown: function () {
        //     console.log("in toggleDropdown");
        //     $('.dropdown-toggle').dropdown();
        //     return this;
        // },
        //
        // createAccount: function () {
        //     var self = this;
        //     console.log("creating account");
        //     console.log($("#newUsername").val());
        //     console.log($("#newEmail").val());
        //     console.log($("#newPassword").val());
        //     console.log($("#newVerifyPassword").val());
        //
        //     self.model = new UserModel({
        //         email: $("#newEmail").val(),
        //         password: $("#newPassword").val()
        //     });
        //
        //     //todo call to back end here
        //
        //     self.$('#landingContainer').html(signup2Template);
        //     return this;
        // },
        //
        // uploadImage: function () {
        //     var self = this;
        //     console.log($("#fileChooser").trigger("click"));
        //     var image =
        //     self.$('#landingContainer').html(signup2Template);
        //     return this;
        // },
        //
        // chooseImage: function () {
        //     var self = this;
        //     bootbox.alert("Pick an image!");
        //     self.$('#landingContainer').html(signup2Template);
        //     return this;
        // },
        //
        // addInfo: function () {
        //     var self = this;
        //
        //     //todo get image
        //     console.log($("#userBio").val());
        //     //todo get tags
        //
        //     //todo call to back end here
        //
        //     console.log("in add info function");
        //     new HomeView();
        //     return this;
        // },
        //
        // fillOutLater: function () {
        //     var self = this;
        //     new HomeView();
        //     return this;
        // }

    });

    return LandingView;
}); //end of define