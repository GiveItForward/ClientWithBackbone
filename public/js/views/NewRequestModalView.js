define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var RequestModel = require("models/RequestModel");
    var RequestTagCollection = require("models/RequestTagCollection");

    var newRequestModal = require("text!templates/modals/newRequestModal.html");

    var NewRequestModalView = Backbone.View.extend({

        el: newRequestModal,

        events: {
            "click #cancelNewRequestBtn"     : "destroyNewRequestModal",
            "click #exitNewRequestModal"     : "destroyNewRequestModal",
            "click #createRequestBtn"        : "save",
            "change input[type=radio]"       : "updateRequestTags",
            "keyup"                          : "updateModel",
            "change"                         : "updateModel"
        },

        initialize: function (options) {
            this.parent = options.parent;
            $('#requestErrorLabel').html('');
            this.model.set('image', '/img/other_help_icon.png');
        },

        render: function () {
            var self = this;
            self.el = newRequestModal;
            self.setElement(this.el);
            self.renderTagList()
            self.$('#createRequestBtn').prop("disabled", true);
            return this;
        },

        renderTagList: function () {
            var self = this;

            var requestTagCollection = new RequestTagCollection();
            requestTagCollection.fetch({
                success: function (collection) {
                    console.log('tag names from db: ')
                    console.log(collection.models);
                    var newRequestTagsHtml = self.getnewRequestTagsHtml(collection.models);
                    self.$('#newRequestTags').html(newRequestTagsHtml);
                }
            });
            return this;
        },


        getnewRequestTagsHtml: function (models) {
            var tagString = '';
            _.each(models, function(model) {
                tagString += '<input type="radio" name="newRequestTag" data-value="' + model.get("tagname") + '" data-tid="' + model.get("tid") + '"> #' + model.get("tagname") + '<br>';
            });
            return tagString;
        },

        updateRequestTags: function (event) {

           var self = this;
           var currTag = $(event.currentTarget).attr('data-value');
           var currTid = $(event.currentTarget).attr('data-tid');
           console.log(currTag);
           console.log(currTid);

            var tag1Obj = Backbone.Model.extend({
                defaults: {
                    tagname: currTag,
                    tid: currTid
                }
            });
            self.model.set("tag1", new tag1Obj());

            if('bills' === currTag){
                self.model.set("image", '/img/turquoise_bills.png');
            } else if('carRepairs' === currTag){
                self.model.set("image", '/img/turquoise_car.png');
            } else if('clothing' === currTag){
                self.model.set("image", '/img/purple_clothes.png');
            }  else if('forAChild' === currTag){
                self.model.set("image", '/img/yellow_baby.png');
            }  else if('groceries' === currTag){
                self.model.set("image", '/img/yellow_food.png');
            } else if('rent' === currTag){
                self.model.set("image", '/img/rent_icon.png');
            } else if('schoolRelated' === currTag){
                self.model.set("image", '/img/purple_school.png');
            }

            $('#newRequestImage').attr('src', self.model.get('image'));
            return this;
        },

        updateModel: function () {
            var self = this;
            self.model.set("description", $("#newRequestDescription").val());
            // var amount = $("#newRequestAmount").val();
            if(isNaN($("#newRequestAmount").val())){
                $('#requestAmountErrorLabel').html('Please enter a number in the amount field.');
            // }else if($("#newRequestAmount").val() > 500){
            //     $('#requestAmountErrorLabel').html('Please make your request amount less than $500.');
            }else{//is a number and < 500
                $('#requestAmountErrorLabel').html('');
                self.model.set("amount", $("#newRequestAmount").val());
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
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
    return NewRequestModalView;
});