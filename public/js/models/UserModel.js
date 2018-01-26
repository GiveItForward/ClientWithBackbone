define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var UserModel = Backbone.Model.extend({

        idAttribute: "uid",

        initialize: function (options) {

            if(options.path === "login") {
                this.url = "http://localhost:3000/api/login";
            } else if(options.path === "signup"){
                this.url = "http://localhost:3000/api/signup";

                // this.set("uid", undefined);
                // this.set("bio", undefined);
                // this.set("isAdmin", undefined);
                // this.set("email", undefined);
                // this.set("username", undefined);
                // this.set("oid", undefined);
                // this.set("tags", undefined);
                // this.set("donateCount", undefined);
                // this.set("receiveCount", undefined);
            } else {
                //fetchUserEmailByUserName
                this.url = "http://localhost:3000/api/email";
            }
            console.log(options.path);
            console.log(this.url);
            console.log(this);
        }
    });
    return UserModel;
});
