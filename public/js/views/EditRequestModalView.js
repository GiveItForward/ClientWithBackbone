define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var RequestModel = require("models/RequestModel");
    var RequestTagCollection = require("models/RequestTagCollection");

    var editRequestModal = require("text!templates/modals/editRequestModal.html");
    var NLPModel = require("models/NLPModel");

    var EditRequestModalView = Backbone.View.extend({

        el: editRequestModal,

        events: {
            "click #cancelEditRequestBtn"    : "destroyEditRequestModal",
            "click #exitEditRequestModal"    : "destroyEditRequestModal",
            "click #updateRequestBtn"        : "save",
            "change input[type=radio]"       : "updateEditRequestTags",
            "keyup"                          : "updateEditRequestModel",
            "change"                         : "updateEditRequestModel"
        },

        initialize: function (options) {
            var self= this;
            self.parent = options.parent;
            var currRid = options.rid;
            self.model = new RequestModel({path: 'rid'});
            self.model.fetch({
                headers: {"rid": currRid },
                success: function (model) {
                    console.log("in edit model view init:");
                    console.log(model);
                    // console.log("duid: ");
                    // console.log(model.get("duid"));
                    //todo if model is fulfilled, can't edit it
                    // if(model.get('duid') > 0){
                    //     bootbox.alert("This request has been fulfilled and cannot be changed.");
                    // }else{
                    var tagObj = Backbone.Model.extend({
                        defaults: {
                            tagname: model.get(0).tag1.tagname,
                            tid: model.get(0).tag1.tid
                        }
                    });
                    self.model = new RequestModel({
                        path: 'update',
                        rid: currRid,
                        amount: model.get(0).amount,
                        description: model.get(0).description,
                        image: model.get(0).image,
                        tag1: new tagObj()
                    });

                    console.log("self.model");
                    console.log(self.model);
                    self.$('#editRequestDescription').html(self.model.get('description'));
                    self.$('#editRequestAmount').val(self.model.get('amount'));
                    self.$('#editRequestImage').attr('src', self.model.get('image'));
                    self.checkTags(self.model.get('tag1').get('tagname'));
                    self.$('#updateRequestBtn').prop("disabled", true);
                    // }
                },
                error: function(err){
                    console.log(err);
                    console.log("error occurred in getting the request to edit");
                    bootbox.alert("There was an error getting this request to edit.");
                    self.destroyEditRequestModal();
                }
            });


            $('#requestErrorLabel').html('');
        },

        render: function () {
            var self = this;
            self.el = editRequestModal;
            self.setElement(this.el);
            self.renderTagList();
            return this;
        },

        checkTags: function (tag) {
            console.log("this is the tag to check:");
            console.log(tag);
            $('#' + tag).attr('checked', true);
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
                tagString += '<input type="radio" name="editRequestTag" id="' + model.get("tagname") + '" data-value="' + model.get("tagname") + '" data-tid="' + model.get("tid") + '"> #' + model.get("tagname") + '<br>';
            });
            return tagString;
        },

        updateEditRequestTags: function (event) {
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

            $('#editRequestImage').attr('src', self.model.get('image'));
            return this;
        },

        updateEditRequestModel: function () {
            var self = this;
            console.log(" in updateEditRequestModel function");
            console.log(self.model);
            self.model.set("description", $("#editRequestDescription").val());
            // var amount = $("#newRequestAmount").val();
            if(isNaN($("#editRequestAmount").val())){
                $('#editRequestErrorLabel').html('Please enter a number in the amount field.');
            }else{//is a number and < 500
                $('#editRequestAmountErrorLabel').html('');
                self.model.set("amount", $("#editRequestAmount").val());
            }

            if(!self.model.get("description") || !self.model.get("amount")){
                self.$('#updateRequestBtn').prop("disabled", true);
            }else{
                if(self.model.get("amount") > 500){
                    self.model.set("amount", undefined);
                    self.$('#updateRequestBtn').prop("disabled", true);
                    $('#editRequestAmountErrorLabel').html('Please make your request amount less than $500.');
                }else {
                    self.$('#updateRequestBtn').prop("disabled", false);
                    $('#editRequestAmountErrorLabel').html('');
                }
            }
        },

        save: function () {
            var self = this;
            console.log("in edit Request function");

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
            self.updateEditRequestModel();

            console.log(self.model);
            self.checkDescriptionWithNLPAndSave();

            // self.model.save(null, {
            //     wait: true,
            //     success: function(model, response) {
            //         console.log(model);
            //         console.log('success in saving updated request');
            //         self.parent.renderMyRequests();
            //         self.destroyEditRequestModal();
            //     },
            //     error: function(model, response) {
            //         console.log(model);
            //         console.log(response);
            //         $('#requestErrorLabel').html('There was a problem updating your request.');
            //     }});

            // return this;
        },

        checkDescriptionWithNLPAndSave: function () {
            console.log('in checkDescriptionWithNLP');
            var self = this;
            var nlpModel = new NLPModel({});
            nlpModel.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "stringToCheck": self.model.get('description')
                },
                success: function(model, response) {
                    console.log('success in fetch of NLP model');
                    console.log(model);
                    //check booleans in model to allow save of request, or show
                    var warningMessage = "";
                    if(model.get('person') !== '' && model.get('city') !== '') {
                        warningMessage = "We suspect the following may be the names of cities and people: " +
                            model.get('city') + " " + model.get('person') + ". <br>We strongly suggest against this in order to protect your anonymity."
                    }else if(model.get('city') !== '') {
                        warningMessage = "We suspect the following may be the names of cities: " +
                            model.get('city')  + ". <br>We strongly suggest against this in order to protect your anonymity."
                    }else if(model.get('person') !== '') {
                        warningMessage = "We suspect the following may be the names of people: " +
                            model.get('person')  + ". <br>We strongly suggest against this in order to protect your anonymity."
                    }

                    if(warningMessage !== ""){
                        bootbox.confirm({
                            message: warningMessage,
                            buttons: {
                                confirm: {
                                    label: 'use description anyway'
                                },
                                cancel: {
                                    label: 'back to edit'
                                }
                            },
                            callback: function (result) {
                                if(result){
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
                                        }
                                    });
                                }
                            }
                        });
                    }else{
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
                            }
                        });
                    }
                },
                error: function(model, response) {
                    console.log('There was a problem with the NLP model.');
                    console.log(model);
                    console.log(response);
                    $('#requestErrorLabel').html('There was a problem with the NLP model.');
                }});
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