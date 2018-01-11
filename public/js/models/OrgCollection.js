define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var OrgModel = require("./OrgModel");

    var OrgCollection = Backbone.Collection.extend({

        model: OrgModel,

        fetch: function (params, options) {
            options.url = "" + params;
            return Backbone.Collection.prototype.fetch.call(this, options);
        }

    });
    return OrgCollection;
});
