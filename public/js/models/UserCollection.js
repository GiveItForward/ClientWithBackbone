define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var UserModel = require("./UserModel");

    var UserCollection = Backbone.Collection.extend({

        model: UserModel,

        url : rootUrl.url + "api/users",

        fetchSearch: function (options) {
            this.url = rootUrl.url + "api/users/search";
            return Backbone.Collection.prototype.fetch.call(this, options);
        }

    });
    return UserCollection;
});
