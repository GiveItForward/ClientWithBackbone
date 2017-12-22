console.log("in Home View file");

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var homeTemplate = require("text!templates/homeTemplate.html");

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
            // self.$el.html(indexTemplate());
            return this;
        },

        renderHome: function () {
            console.log("in home view renderHome");
            var self = this;
            self.$('#homeContainer').html(homeTemplate);
            // self.$el.html(indexTemplate());
            return this;
        }
    });

    return HomeView;
});