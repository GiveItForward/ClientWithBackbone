require("../../css/style.css");
var $ = require("jquery");
var backbone= require("backbone");
var _ = require("underscore");


var indexTemplate = require("index.jade");
var loginTemplate = require("login.jade")
var signupTemplate = require("signup.jade");

module.exports = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    events: {
        "click #signupBtn": "renderSignup",
        "click #loginBtn": "renderLogin"
    },

    render: function () {
        Console.log("in landing view render");
        bootbox.alert("Hello World!");
        var self = this;
        self.$el.html(indexTemplate());
        return this;
    },

    renderLogin: function () {
        var self = this;
        bootbox.alert("Login!");
        self.$('#loginContainer').html(loginTemplate);
        return this;
    },

    renderSignup: function () {
        console.log("in sign up");
        bootbox.alert("Sign up!");
        var self = this;
        self.$('#loginContainer').html(signupTemplate);
        return this;
    }
});