

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var UserModel = Backbone.Model.extend({

        idAttribute: "email",

        // parse: function (response, options){
        //     if(_.isObject(response)) {
        //
        //     }
        // },
        //
        // toJSON: {
        //
        //
        // },

        initialize: function (options) {

            if(options.email) {

                this.set("email", options.email);
                this.url = "http://54.227.151.133:8080/giveitforward/login/" + options.email + "/" + options.password;

            } else {
                this.set("uid", undefined);
                this.set("bio", undefined);
                this.set("isAdmin", undefined);
                this.set("email", undefined);
                this.set("username", undefined);
            }
        }
    });
    return UserModel;
});
