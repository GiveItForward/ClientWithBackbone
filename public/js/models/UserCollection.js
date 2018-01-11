define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var UserModel = require("./UserModel");

    var UserCollection = Backbone.Collection.extend({

        model: UserModel,

        fetch: function (params, options) {
            options.url = "" + params;
            return Backbone.Collection.prototype.fetch.call(this, options);
        }

    });
    return UserCollection;
});
