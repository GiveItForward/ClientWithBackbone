define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var otherProfileModal = require("text!templates/modals/otherProfileModal.html");

    var UserModel = require("models/UserModel");
    var RequestCollection = require("models/RequestCollection");

    var otherRequestTemplate = require("jade!templates/jade_templates/otherRequestTemplate");


    var OtherProfileModalView = Backbone.View.extend({

        el: otherProfileModal,

        events: {
            "click #closeOtherProfileBtn"       : "destroyOtherProfileModal",
            "click #exitOtherProfileModal"      : "destroyOtherProfileModal",
            "click #otherProfileTabs"           : "handleTabs"
        },

        initialize: function (options) {
            this.parent = options.parent;
            this.uid = options.uid
        },

        render: function () {
            var self = this;
            self.el = otherProfileModal;
            self.setElement(this.el);
            console.log(self.model);
            // self.$('#otherProfileModalTitle').html(self.model.get('username'));
            // self.$("#otherProfileImage").attr('src', self.model.get("image"));
            // self.$("#otherProfileTags").html("#student"); //todo probably need a rendertags
            // self.$('#otherProfileDescription').html(self.model.get('description'));
            self.renderTop();
            self.renderOtherRequests();
            self.renderOtherDonations();
            return this;
        },

        renderTop: function () {
            var self = this;

            var otherUserModel = new UserModel({path: 'byuid/'});
            otherUserModel.fetch({
                headers: { "uid": self.uid },
                success: function (model) {
                    console.log("other user model");
                    console.log(model);
                    self.model = model;
                    self.$('#otherProfileModalTitle').html("@" + self.model.get('username'));
                    self.$("#otherProfileImage").attr('src', self.model.get("image"));
                    // self.$("#otherProfileTags").html("#hardcodedtag"); //todo probably need a rendertags
                    self.renderTags(self.model.get('tags'));
                    self.$('#otherProfileBio').html(self.model.get('bio'));

                },
                error: function(err){
                    console.log("error occurred in getting the other username");
                }
            });
            return this;
        },

        renderTags: function (tags) {
            var self = this;
            console.log(tags);
            var tagString = '';
            _.each(tags, function(tag){
                tagString += '#' + tag.tagname;
                if(tag.verifiedBy !== ""){
                    tagString += '<span data-title="Verified by "' + tag.verifiedBy + '"><img class="checkmark" src="/img/marooncheckmark.png"/></span>  ';
                }else{
                    tagString += ' ';
                }
                // if tag.verifiedBy !== ''
                //     span(data-title='Verified by #{tag.verifiedBy}')
                // img.checkmark(src='/img/marooncheckmark.png')
            });
            self.$("#otherProfileTags").html(tagString);
            return this;
        },

        renderOtherRequests: function () {
            var self = this;

            var requestCollection = new RequestCollection();
            requestCollection.fetchByRequestUid({
                headers: {"uid": self.uid},
                success: function (collection) {
                    _.each(collection.models, function(model) {
                        console.log(model.toJSON());
                    });
                    console.log("other requests: ");
                    console.log(collection.models);
                    if(collection.length > 0){
                        self.$('#otherRequestHistory').html(otherRequestTemplate(collection));
                    }else{
                        self.$('#otherRequestHistory').html("There is no request history available.");
                    }
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                }
            });
            return this;
        },

        renderOtherDonations: function () {
            var self = this;

            var requestCollection = new RequestCollection();
            requestCollection.fetchByDonateUid({
                headers: {"uid": self.uid},
                success: function (collection) {
                    _.each(collection.models, function(model) {
                        console.log(model.toJSON());
                    });
                    console.log("other donations: ");
                    console.log(collection.models);
                    if(collection.length > 0){
                        self.$('#otherDonationHistory').html(otherRequestTemplate(collection));
                    }else{
                        self.$('#otherDonationHistory').html("There is no donation history available.");
                    }
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                }
            });

            return this;
        },

        handleTabs: function (event) {
            var self = this;


            return this;
        },

        destroyOtherProfileModal: function () {
            var self = this;
            $('#otherProfileModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
        }
    });
    return OtherProfileModalView;
});