define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var UserModel = require("./UserModel");

    var UserCollection = Backbone.Collection.extend({

        model: UserModel,

        url : "/api/users/active",

        fetchSearch: function (options) {
            this.url = "/api/users/search";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }

    });
    return UserCollection;
});
