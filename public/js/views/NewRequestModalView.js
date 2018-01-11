console.log("in New Request Modal View file");

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var newRequestModal = require("text!modals/newRequestModal.html");

    var NewRequestModalView = Backbone.View.extend({

        el: newRequestModal,

        events: {
            "click #createRequestBtn"   : "createRequest",
            "keyup"                     : "updateModel",
            "change"                    : "updateModel"
        },

        initialize: function (options) {
            console.log("in new request modal view init");
            this.parent = options.parent;
            // this.render();
        },


        render: function () {
            console.log("in new request modal view render");
            var self = this;
            self.el = newRequestModal;
            self.setElement(this.el);
            self.$('#createRequestBtn').prop("disabled", true);
            return this;
        },

        updateModel: function () {
            var self = this;
            self.model.set("description", $("#requestDescription").val());
            self.model.set("amount", $("#requestAmount").val());
            //todo tags
            //todo image
            if(!self.model.get("description") || !self.model.get("amount")){
                self.$('#createRequestBtn').prop("disabled", true);
            }else{
                self.$('#createRequestBtn').prop("disabled", false);
            }
        },

        createRequest: function () {
            var self = this;
            console.log("in createRequest function");

            console.log("user id is: " + self.parent.model.get("uid"));
            console.log($("#requestDescription").val());
            console.log($("#requestAmount").val());
            console.log($("#requestTags").val());
            console.log($("#requestTags").val().length);
            if($("#requestTags").val().length > 2){
                bootbox.alert("Please only choose 2 tags for your request.");
            }else{
                self.updateModel();
                //todo save to DB here

            }
            // todo get or assign image
            return this;
        }

    });

    return NewRequestModalView;
});