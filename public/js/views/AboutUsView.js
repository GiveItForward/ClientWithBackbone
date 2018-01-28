define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");


    var AboutUsView = Backbone.View.extend({

        el: 'body',


        events: {
            // "click #loginBtn"           : "renderLogin",

        },

        initialize: function () {

            this.render();
        },

        render: function () {
            var self = this;

            return this;
        }

    });

    return AboutUsView;
}); //end of define