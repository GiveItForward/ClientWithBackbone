define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var otherProfileModal = require("text!templates/modals/otherProfileModal.html");

    var UserModel = require("models/UserModel");
    var RequestCollection = require("models/RequestCollection");

    var ViewThankYouModalView = require("views/ViewThankYouModalView");

    var otherRequestTemplate = require("jade!templates/jade_templates/otherRequestTemplate");


    var OtherProfileModalView = Backbone.View.extend({

        el: otherProfileModal,

        events: {
            "click #closeOtherProfileBtn"       : "destroyOtherProfileModal",
            "click #exitOtherProfileModal"      : "destroyOtherProfileModal",
            "click #viewThankYouBtn"            : "viewOtherThankYou"
        },

        initialize: function (options) {
            this.parent = options.parent;
            this.uid = options.uid
        },

        render: function () {
            var self = this;
            self.el = otherProfileModal;
            self.setElement(this.el);
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
                    self.model = model;
                    self.$('#otherProfileModalTitle').html("@" + self.model.get('username'));
                    self.$("#otherProfileImage").attr('src', self.model.get("image"));
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
            var tagString = '';
            _.each(tags, function(tag){
                if(tag.tagname !== ""){
                    tagString += '#' + tag.tagname;
                }
                if(tag.verifiedBy !== ""){
                    tagString += '<span data-title="Verified by "' + tag.verifiedBy + '"><img class="checkmark" src="/img/marooncheckmark.png"/></span>  ';
                }else{
                    tagString += ' ';
                }
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

        viewOtherThankYou: function (event) {
            var self = this;
            var note = $(event.currentTarget).attr( 'data-note' );
            var date = $(event.currentTarget).attr( 'data-date' );
            var rUsername = $(event.currentTarget).attr( 'data-rUsername' );
            console.log(rUsername);
            var container = document.createDocumentFragment();
            var viewThankYouModalView = new ViewThankYouModalView({
                parent: self,
                note: note,
                date: date,
                rUsername: rUsername
            });
            container.appendChild(viewThankYouModalView.render().el);
            $('body').append(container);
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