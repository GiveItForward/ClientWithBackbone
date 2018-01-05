console.log("in Home View file");

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var NewRequestModalView = require("views/NewRequestModalView");

    var homeTemplate = require("text!templates/homeTemplate.html");
    var requestFeedTemplate = require("text!templates/requestFeedTemplate.html");
    var orgsTemplate = require("text!templates/orgsTemplate.html");
    var myProfileTemplate = require("text!templates/myProfileTemplate.html");
    var myRequestsTemplate = require("text!templates/myRequestsTemplate.html");
    var myDonationsTemplate = require("text!templates/myDonationsTemplate.html");

    var HomeView = Backbone.View.extend({

        el: 'body',

        events: {
            "click #homeBtn"          : "renderHome",
            "click #logoMini"         : "renderHome",
            "click #orgsBtn"          : "renderOrgs",
            "click #notesBtn"         : "renderNotes",
            "click #myProfileBtn"     : "renderMyProfile",
            "click #myRequestsBtn"    : "renderMyRequests",
            "click #myDonationsBtn"   : "renderMyDonations",
            "click #newRequestBtn"    : "newRequest"
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

        removeSelectedFromAll: function () {
            $("#homeBtn").removeClass("selected");
            $("#orgsBtn").removeClass("selected");
            $("#notesBtn").removeClass("selected");
            $("#myProfileBtn").removeClass("selected");
            $("#myRequestsBtn").removeClass("selected");
            $("#myDonationsBtn").removeClass("selected");
        },

        renderHome: function () {
            console.log("in home view renderHome");
            var self = this;
            self.removeSelectedFromAll();
            $("#homeBtn").addClass("selected");
            self.$('#homeContainer').html(requestFeedTemplate);
            return this;
        },

        renderOrgs: function () {
            console.log("in home view renderOrgs");
            var self = this;
            self.removeSelectedFromAll();
            $("#orgsBtn").addClass("selected");
            self.$('#homeContainer').html(orgsTemplate);
            return this;
        },

        renderNotes: function () {
            console.log("in home view renderNotes");
            var self = this;
            self.removeSelectedFromAll();
            $("#notesBtn").addClass("selected");
            $("#notesBtn").popover();
            console.log("after popover call");
            return this;
        },

        renderMyProfile: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            self.removeSelectedFromAll();
            $("#myProfileBtn").addClass("selected");
            self.$('#homeContainer').html(myProfileTemplate);
            return this;
        },

        renderMyRequests: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            self.removeSelectedFromAll();
            $("#myRequestsBtn").addClass("selected");
            self.$('#homeContainer').html(myRequestsTemplate);
            return this;
        },

        renderMyDonations: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            self.removeSelectedFromAll();
            $("#myDonationsBtn").addClass("selected");
            self.$('#homeContainer').html(myDonationsTemplate);
            return this;
        },

        newRequest: function () {
            console.log("in newRequest function")
            var container = document.createDocumentFragment();
            var newRequestModalView = new NewRequestModalView({});
            container.appendChild(newRequestModalView.render().el);
            $('body').append(container);
            return this;
        }

    });

    return HomeView;
});