define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var RequestModel = require("models/RequestModel");
    var RequestTagCollection = require("models/RequestTagCollection");

    var editRequestModal = require("text!templates/modals/editRequestModal.html");

    var EditRequestModalView = Backbone.View.extend({

        el: editRequestModal,

        events: {
            "click #cancelEditRequestBtn"    : "destroyEditRequestModal",
            "click #exitEditRequestModal"    : "destroyEditRequestModal",
            "click #updateRequestBtn"        : "save",
            "change input[type=radio]"       : "updateRequestTags",
            "keyup"                          : "updateEditRequestModel",
            "change"                         : "updateEditRequestModel"
        },

        initialize: function (options) {
            this.parent = options.parent;
            this.model = options.model;
            $('#requestErrorLabel').html('');
        },

        render: function () {
            var self = this;
            self.el = editRequestModal;
            self.setElement(this.el);
            self.renderTagList();
            console.log(self.model.get(0));
            self.$('#editRequestDescription').html(self.model.get(0).description);
            self.$('#editRequestAmount').val(self.model.get(0).amount);
            self.$('#editRequestImage').attr('src', self.model.get(0).image);
            self.checkTags(self.model.get('tags'));
            self.$('#updateRequestBtn').prop("disabled", true);
            return this;
        },

        checkTags: function (tags) {
            //todo check tags and set image from model
        },

        renderTagList: function () {
            var self = this;
            var requestTagCollection = new RequestTagCollection();
            requestTagCollection.fetch({
                success: function (collection) {
                    console.log('tag names from db: ')
                    console.log(collection.models);
                    var editRequestTagsHtml = self.getEditRequestTagsHtml(collection.models);
                    self.$('#editRequestTags').html(editRequestTagsHtml);
                }
            });
            return this;
        },


        getEditRequestTagsHtml: function (models) {
            var tagString = '';
            _.each(models, function(model) {
                tagString += '<input type="radio" name="editRequestTag" data-value="' + model.get("tagname") + '" data-tid="' + model.get("tid") + '"> #' + model.get("tagname") + '<br>';
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
                self.model.set("image", '/img/bills_icon.png');
            } else if('carRepairs' === currTag){
                self.model.set("image", '/img/car_repair_icon.png');
            } else if('clothing' === currTag){
                self.model.set("image", '/img/clothing_icon.png');
            }  else if('forAChild' === currTag){
                self.model.set("image", '/img/forachild_icon.png');
            }  else if('groceries' === currTag){
                self.model.set("image", '/img/groceries_icon.png');
            } else if('rent' === currTag){
                self.model.set("image", '/img/rent_icon.png');
            } else if('schoolRelated' === currTag){
                self.model.set("image", '/img/school_icon.png');
            }

            $('#editRequestImage').attr('src', self.model.get('image'));
            return this;
        },

        updateModel: function () {
            var self = this;
            self.model.set("description", $("#editRequestDescription").val());
            // var amount = $("#newRequestAmount").val();
            if(isNaN($("#editRequestAmount").val())){
                $('#requestAmountErrorLabel').html('Please enter a number in the amount field.');
                // }else if($("#newRequestAmount").val() > 500){
                //     $('#requestAmountErrorLabel').html('Please make your request amount less than $500.');
            }else{//is a number and < 500
                $('#requestAmountErrorLabel').html('');
                self.model.set("amount", $("#editRequestAmount").val());
            }


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
                }  else if('forAChild' === firstTag){
                    self.model.set("image", '/img/forachild_icon.png');
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
            console.log($("#editRequestDescription").val());
            console.log($("#editRequestAmount").val());
            console.log($("#editRequestTags").val());
            console.log($("#editRequestTags").val().length);
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
                    console.log('success in saving updated request');
                    self.parent.renderMyRequests();
                    self.destroyEditRequestModal();
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                    $('#requestErrorLabel').html('There was a problem updating your request.');
                }});

            // return this;
        },

        destroyEditRequestModal: function () {
            var self = this;
            $('#editRequestModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.model = undefined;
                self.$('#editRequestDescription').html('');
                self.$('#editRequestAmount').val('');
                self.$('#editRequestImage').attr('src', '');
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
    return EditRequestModalView;
});