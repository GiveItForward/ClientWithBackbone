define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var UserModel = Backbone.Model.extend({

        idAttribute: "uid",

        initialize: function (options) {

            this.setUrl(options.path);
            // if(options.path === "login") {
            //     this.setUrl('login')
            // } else if(options.path === "signup"){
            //     this.setUrl('signup');
            //
            //     // this.set("uid", undefined);
            //     // this.set("bio", undefined);
            //     // this.set("isAdmin", undefined);
            //     // this.set("email", undefined);
            //     // this.set("username", undefined);
            //     // this.set("oid", undefined);
            //     // this.set("tags", undefined);
            //     // this.set("donateCount", undefined);
            //     // this.set("receiveCount", undefined);
            // } else if(options.path === 'logout') {
            //     this.setUrl('logout');
            //
            // } else {
            //     //fetchUserEmailByUid
            //     this.setUrl('email');
            // }
        },

        setUrl: function(option){

            // this.url = 'http://localhost:3000/api/users/' + option;
            this.url = 'http://giveitforward.us/api/users/' + option;
        }
    });
    return UserModel;
});
