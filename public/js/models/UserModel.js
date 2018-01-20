define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var UserModel = Backbone.Model.extend({

        idAttribute: "uid",

        initialize: function (options) {

            if(options.path == "login") {
                this.url = "http://54.227.151.133:8080/giveitforward/login;
            } else {
                this.url = "http://54.227.151.133:8080/giveitforward/signup";
                // console.log(this.url);


                this.set("uid", undefined);
                this.set("bio", undefined);
                this.set("isAdmin", undefined);
                this.set("email", undefined);
                this.set("username", undefined);
                this.set("oid", undefined);
                this.set("tags", undefined);
                this.set("donateCount", undefined);
                this.set("receiveCount", undefined);

            }
        }
    });
    return UserModel;
});
