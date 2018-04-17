define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var NotificationModel = Backbone.Model.extend({

        idAttribute: "nid",

        initialize: function (options) {

            if(options.nid) {

                this.set("nid", options.nid);
                this.url = "/api/notifications/";


            } else {
                this.set("nid", undefined);
            }
        },

        setUrl: function(path){
            this.url = '/api/notifications/' + path;
        }
    });
    return NotificationModel;
});
