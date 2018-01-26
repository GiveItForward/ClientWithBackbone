var requestTagList = [];

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var RequestModel = require("models/RequestModel");

    var newRequestModal = require("text!templates/modals/newRequestModal.html");
    // var newRequestModal = require("jade!templates/jade_templates/modals/newRequestModal");

    var NewRequestModalView = Backbone.View.extend({

        el: newRequestModal,

        model: new RequestModel({}),

        events: {
            "click #cancelNewRequestBtn"     : "destroyNewRequestModal",
            "click #exitNewRequestModal"     : "destroyNewRequestModal",
            "click #createRequestBtn"        : "save",
            "click .dropdown-menu a"         : "updateTags",
            "keyup"                          : "updateModel",
            "change"                         : "updateModel"
        },

        initialize: function (options) {
            console.log("in new request modal view init");
            this.parent = options.parent;
            this.model.set('fulfilled', false);
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

        updateTags: function (event) {
            // this function from https://codepen.io/bseth99/pen/fboKH?editors=1010
            var $target = $(event.currentTarget),
                val = $target.attr( 'data-value' ),
                $inp = $target.find( 'input' ),
                idx;
            if ( ( idx = requestTagList.indexOf( val ) ) > -1 ) {
                requestTagList.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
            } else {
                requestTagList.push( val );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
            }
            $( event.target ).blur();
            console.log( requestTagList );
            return this;
        },

        updateModel: function () {
            var self = this;
            self.model.set("description", $("#newRequestDescription").val());
            self.model.set("amount", $("#newRequestAmount").val());
            console.log($("#newRequestDescription").val());
            console.log(self.model);
            if(requestTagList.length > 2){
                bootbox.alert("Please only select up to two tags for your request.");
            }else{
                self.model.set("tags", requestTagList);
                //todo hardcoded stuff
                var firstTag = requestTagList[0];
                if('bills' === firstTag){
                    self.model.set("image", '/img/bills_icon.png');
                } else if('clothing' === firstTag){
                    self.model.set("image", '/img/clothing_icon.png');
                }  else if('groceries' === firstTag){
                    self.model.set("image", '/img/groceries_icon.png');
                } else if('rent' === firstTag){
                    self.model.set("image", '/img/rent_icon.png');
                } else if('schoolRelated' === firstTag){
                    self.model.set("image", '/img/school_icon.png');
                }

                $('#newRequestImage').attr('src', self.model.get('image'));
            }
            if(!self.model.get("description") || !self.model.get("amount")){
                self.$('#createRequestBtn').prop("disabled", true);
            }else{
                self.$('#createRequestBtn').prop("disabled", false);
            }
        },

        save: function () {
            var self = this;
            console.log("in createRequest function");

            console.log("user id is: " + self.parent.model.get("uid"));
            console.log($("#newRequestDescription").val());
            console.log($("#newRequestAmount").val());
            console.log($("#newRequestTags").val());
            console.log($("#newRequestTags").val().length);
            self.model.set('rid', self.parent.model.get("uid"));
            self.updateModel();
                //todo save to DB here

            // console.log(self.model);
            // self.model.save({
            //     wait: true,
            //     success: function(model, response) {
            //         console.log(model);
            //         console.log('success in saving new request');
            //     },
            //     error: function(model, response) {
            //         console.log(model);
            //         console.log(response);
            //     }});
            self.destroyNewRequestModal();
            // return this;
        },

        destroyNewRequestModal: function () {
            var self = this;
            $('#newRequestModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            })
        }

    });
    return NewRequestModalView;
});