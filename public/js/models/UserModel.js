define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var UserModel = Backbone.Model.extend({

        idAttribute: "email",

        initialize: function (options) {

            if(options.email) {
                this.set("email", options.email);

                if(options.path === 'login/'){
                    this.url = "http://54.227.151.133:8080/giveitforward/" + options.path + options.email + "/" + options.password;
                }else{// 'signup/'
                    this.url = "http://54.227.151.133:8080/giveitforward/" + options.path;
                }
                console.log(this.url);
            } else {
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
