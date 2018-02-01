var requestTagList = [];

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var RequestModel = require("models/RequestModel");
    // var RequestTagCollection = require("models/RequestTagCollection");

    var newRequestModal = require("text!templates/modals/newRequestModal.html");
    // var newRequestModal = require("jade!templates/jade_templates/modals/newRequestModal");

    var NewRequestModalView = Backbone.View.extend({

        el: newRequestModal,

        events: {
            "click #cancelNewRequestBtn"     : "destroyNewRequestModal",
            "click #exitNewRequestModal"     : "destroyNewRequestModal",
            "click #createRequestBtn"        : "save",
            "click .dropdown-menu a"         : "updateRequestTags",
            "keyup"                          : "updateModel",
            "change"                         : "updateModel"
        },

        initialize: function (options) {
            this.parent = options.parent;
            $('#requestErrorLabel').html('');
            // this.model.set('fulfilled', false);
            // this.render();
        },

        render: function () {
            var self = this;
            self.el = newRequestModal;
            self.setElement(this.el);
            // self.renderTagList()
            self.$('#createRequestBtn').prop("disabled", true);
            return this;
        },

        renderTagList: function () {
            var self = this;

            var requestTagCollection = new RequestTagCollection();
            requestTagCollection.fetch({
                success: function (collection) {
                    // _.each(collection.models, function(model) {
                    //
                    // });
                    console.log('tag names from db: ')
                    console.log(collection.models);
                    var newRequestTagsHtml = self.getnewRequestTagsHtml(collection.models);
                    self.$('#newRequestTags').html(newRequestTagsHtml);
                }
            });
            return this;
        },


        getnewRequestTagsHtml: function (models) {
            var self = this;
            var tagString = '';
            // _.each(models, function(model) {
            //     tagString += '<li><a href="#" data-value="' + model.tagname + '" tabindex="-1">\n' +
            //         '<input type="checkbox"/></a>&nbsp;#\' + model.tagname + \'</li>'
            //
            // });

            return this;
        },

        updateRequestTags: function (event) {
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

            if(requestTagList.length > 2){
                bootbox.alert("Please only select up to two tags for your request.");
            }else if (requestTagList.length === 1){
                var tag1Obj = Backbone.Model.extend({
                    defaults: {
                        tagname: requestTagList[0],
                        // tid: 1
                    }
                });
                self.model.set("tag1", new tag1Obj());
                //todo hardcoded stuff
                var firstTag = requestTagList[0];
                if('bills' === firstTag){
                    self.model.set("image", '/img/bills_icon.png');
                } else if('carRepairs' === firstTag){
                    self.model.set("image", '/img/car_repair_icon.png');
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
            }else if (requestTagList.length === 2){
                var tag2Obj = Backbone.Model.extend({
                    defaults: {
                        tagname: requestTagList[1],
                        // tid: 1
                    }
                });
                self.model.set("tag2", new tag2Obj());
            }

            if(!self.model.get("description") || !self.model.get("amount")){
                self.$('#createRequestBtn').prop("disabled", true);
            }else{
                if(self.model.get("amount") > 500){
                    self.model.set("amount", undefined);
                    self.$('#createRequestBtn').prop("disabled", true);
                    $('#requestAmountErrorLabel').html('Please make your request amount less than $500.');
                }else {
                    self.$('#createRequestBtn').prop("disabled", false);
                    $('#requestAmountErrorLabel').html('');
                }
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
            var rUserObj = Backbone.Model.extend({
                defaults: {
                    uid: self.parent.model.get("uid")
                }
            });
            self.model.set('rUser', new rUserObj());
            self.updateModel();

            console.log(self.model);
            self.model.save(null, {
                wait: true,
                success: function(model, response) {
                    console.log(model);
                    console.log('success in saving new request');
                    self.parent.renderHome();
                    self.destroyNewRequestModal();
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                    $('#requestErrorLabel').html('There was a problem saving your request.');
                }});

            // return this;
        },

        destroyNewRequestModal: function () {
            var self = this;
            $('#newRequestModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                requestTagList = [];
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
    return NewRequestModalView;
});