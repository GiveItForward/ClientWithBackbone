define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var UserModel = Backbone.Model.extend({

        idAttribute: "uid",

        initialize: function (options) {

            this.setUrl(options.path);
        },

        setUrl: function(option){

            this.url = '/api/users/' + option;
        }
    });
    return UserModel;
});
