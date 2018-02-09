define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var rootUrl = require("./RootUrl");

    var RequestTagModel = Backbone.Model.extend({

        idAttribute: "tid",

        initialize: function (options) {

            this.url = rootUrl.url + "api/requests/tags/";
            // if(options.tagname) {
            //
            //     this.set("tagname", options.tagname);
            //     this.url = rootUrl.url + "api/requests/tags/";
            //
            // } else {
            //     this.set("tagname", undefined);
            // }
        }
    });
    return RequestTagModel;
});
