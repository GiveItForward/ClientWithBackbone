console.log("in Home View file");

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var homeTemplate = require("text!templates/homeTemplate.html");
    var requestFeedTemplate = require("text!templates/requestFeedTemplate.html");
    var orgsTemplate = require("text!templates/orgsTemplate.html");
    var myProfileTemplate = require("text!templates/myProfileTemplate.html");

    var HomeView = Backbone.View.extend({

        el: 'body',

        events: {
            "click #homeBtn"          : "renderHome",
            "click #orgsBtn"          : "renderOrgs",
            "click #notesBtn"         : "renderNotes",
            "click #myProfileBtn"     : "renderMyProfile"
        },

        initialize: function () {
            console.log("in home view init");
            this.render();
        },


        render: function () {
            console.log("in home view render");
            var self = this;
            self.$el.html(homeTemplate);
            return this;
        },

        renderHome: function () {
            console.log("in home view renderHome");
            var self = this;
            $("#homeBtn").addClass("selected");
            $("#orgsBtn").removeClass("selected");
            $("#notesBtn").removeClass("selected");
            $("#myProfileBtn").removeClass("selected");
            self.$('#homeContainer').html(requestFeedTemplate);
            return this;
        },

        renderOrgs: function () {
            console.log("in home view renderOrgs");
            var self = this;
            $("#homeBtn").removeClass("selected");
            $("#orgsBtn").addClass("selected");
            $("#notesBtn").removeClass("selected");
            $("#myProfileBtn").removeClass("selected");
            self.$('#homeContainer').html(orgsTemplate);
            return this;
        },

        renderNotes: function () {
            console.log("in home view renderNotes");
            var self = this;
            $("#homeBtn").removeClass("selected");
            $("#orgsBtn").removeClass("selected");
            $("#notesBtn").addClass("selected");
            $("#myProfileBtn").removeClass("selected");
            // self.$('#homeContainer').html(orgsTemplate);
            return this;
        },

        renderMyProfile: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            $("#homeBtn").removeClass("selected");
            $("#orgsBtn").removeClass("selected");
            $("#notesBtn").removeClass("selected");
            $("#myProfileBtn").addClass("selected");
            self.$('#homeContainer').html(myProfileTemplate);
            return this;
        }
    });

    return HomeView;
});