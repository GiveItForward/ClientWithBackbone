console.log("in Home View file");
//The HomeView's model is the UserModel
var searchUserTagsList = [];
var searchRequestTagsList = [];

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var NewRequestModalView = require("views/NewRequestModalView");
    var OtherProfileModalView = require("views/OtherProfileModalView");
    var NotificationsModalView = require("views/NotificationsModalView");
    var SayThankYouModalView = require("views/SayThankYouModalView");
    var ViewThankYouModalView = require("views/ViewThankYouModalView");
    var LandingView = require("views/LandingView");

    var rootUrl = require("models/RootUrl");

    var UserModel = require("models/UserModel");
    var RequestModel = require("models/RequestModel");
    var RequestCollection = require("models/RequestCollection");
    var TagCollection = require("models/TagCollection");
    var OrgModel = require("models/OrgModel");
    var OrgCollection = require("models/OrgCollection");
    var ThankYouModel = require("models/ThankYouModel");

    var homeTemplate = require("jade!templates/jade_templates/homeTemplate");
    var requestFeedTemplate = require("jade!templates/jade_templates/requestFeedTemplate");
    var requestTemplate = require("jade!templates/jade_templates/requestTemplate");
    var selectTagsTemplate = require("jade!templates/jade_templates/selectTagsTemplate");
    var orgsFeedTemplate = require("jade!templates/jade_templates/orgsFeedTemplate");
    var orgTemplate = require("jade!templates/jade_templates/orgTemplate");
    var myProfileTemplate = require("jade!templates/jade_templates/myProfileTemplate");
    var myRequestFeedTemplate = require("jade!templates/jade_templates/myRequestFeedTemplate");
    var myRequestTemplate = require("jade!templates/jade_templates/myRequestTemplate");
    var myDonationFeedTemplate = require("jade!templates/jade_templates/myDonationFeedTemplate");
    var myDonationTemplate = require("jade!templates/jade_templates/myDonationTemplate");


    var HomeView = Backbone.View.extend({

        el: 'body',

        events: {
            "click #homeBtn"                    : "renderHome",
            "click #logoMini"                   : "renderHome",
            "click #searchByUserTags a"         : "updateSearchUserTags",
            "click #searchByRequestTags a"      : "updateSearchRequestTags",
            "click #orderBy a"                  : "updateOrderBy",
            "click #new"                        : "toggleNew",
            "click #old"                        : "toggleOld",
            "click #low"                        : "toggleLow",
            "click #high"                       : "toggleHigh",
            "click #giveBtn"                    : "paypal",
            "click #orgsBtn"                    : "renderOrgs",
            "click #notesBtn"                   : "renderNotes",
            "click #myProfileBtn"               : "renderMyProfile",
            "click #myRequestsBtn"              : "renderMyRequests",
            "click #myDonationsBtn"             : "renderMyDonations",
            "click #newRequestBtn"              : "newRequest",
            "click #otherProfileLink"           : "otherProfile",
            "click #sayThankYouBtn"             : "sayThankYou",
            "click #viewThankYouBtn"            : "viewThankYou",
            "click #logoutBtn"                  : "logout"
        },

        initialize: function (options) {
            console.log("in home view init");
            var self = this;
            self.model = options.model;
            self.tagCollection = new TagCollection();
            self.tagCollection.fetch({
                success: function (collection) {
                    console.log('tag names from db: ');
                    console.log(collection.models);
                    self.tagCollection = collection;
                    self.render();
                }
            });
        },

        render: function () {
            console.log("in home view render");
            var self = this;
            self.$el.html(homeTemplate);
            console.log(self.model);

            // $("#usernameDisplay").html("Welcome, " + self.model.get("username"));
            // $("#donateCount").html(self.model.get("donateCount"));
            // $("#receiveCount").html(self.model.get("receiveCount"));
            self.renderHome();
            return this;
        },

        removeSelectedFromAll: function () {
            $("#homeBtn").removeClass("selected");
            $("#orgsBtn").removeClass("selected");
            $("#notesBtn").removeClass("selected");
            $("#myProfileBtn").removeClass("selected");
            $("#myRequestsBtn").removeClass("selected");
            $("#myDonationsBtn").removeClass("selected");
        },

        renderHome: function () {
            var self = this;

            $("#usernameDisplay").html("Welcome, " + self.model.get("username"));
            $("#donateCount").html(self.model.get("donateCount"));
            $("#receiveCount").html(self.model.get("receiveCount"));

            console.log("in home view renderHome");
            var self = this;
            self.removeSelectedFromAll();
            $("#homeBtn").addClass("selected");
            self.$('#homeContainer').html(requestFeedTemplate);

            var requestCollection = new RequestCollection();
            requestCollection.fetch({
                success: function (collection) {
                    console.log(collection.models);
                    self.$('#requestCol').html(requestTemplate(collection));
                    self.$('#searchByTags').html(selectTagsTemplate(self.tagCollection));
                }
            });
            return this;
        },

        paypal: function (e) {
            var self = this;
            var element = $(e.currentTarget);
            var rid = element.attr("data-rid");
            var ruseruid = element.attr("data-ruser-uid");
            var amount = element.attr("data-amount");
            console.log("in home view paypal");

            var currRequest = new RequestModel({
                path: 'paypal'
            });

            currRequest.fetch({
                reset: true,
                headers: {
                    "rid": rid,
                    "duid": self.model.get("uid"),
                    "uid": ruseruid,
                    "amt": amount
                },
                success: function (model, response, options) {
                    console.log("success on request fulfill");

                },
                error: function (model, response, options){
                    console.log(response.responseText);
                    self.model.set('donateCount', self.model.get('donateCount') + 1);
                    window.location.href = response.responseText;
                }
            });

            return this;
        },

        renderOrgs: function () {
            console.log("in home view renderOrgs");
            var self = this;
            self.removeSelectedFromAll();
            $("#orgsBtn").addClass("selected");
            self.$('#homeContainer').html(orgsFeedTemplate);

            var orgCollection = new OrgCollection();
            orgCollection.fetch({
                success: function (collection) {
                    console.log(collection.models);
                    self.$('#orgCol').html(orgTemplate(collection));
                }
            });
            return this;
        },

        renderNotes: function () {
            console.log("in home view renderNotes");
            var self = this;
            // self.removeSelectedFromAll();
            // $("#notesBtn").addClass("selected");
            var container = document.createDocumentFragment();
            var notificationsModalView = new NotificationsModalView({
                parent: self,
                model: new RequestModel({})
            });
            container.appendChild(notificationsModalView.render().el);
            $('body').append(container);
            return this;
        },

        renderMyProfile: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            console.log(self.model);
            self.removeSelectedFromAll();
            $("#myProfileBtn").addClass("selected");
            self.$('#homeContainer').html(myProfileTemplate);

            $("#myEmail").html(self.model.get("email"));
            var tags = self.model.get("tags");
            // console.log(tags);
            var tagList = "";
            _.each(tags, function(tag) {
                if(tag.tagname !== ''){
                    tagList += "#" + tag.tagname + " ";
                }
            });
            $("#myImage").attr('src', self.model.get("image"));
            $("#myTags").html(tagList);
            $("#myBio").html(self.model.get("bio"));

            return this;
        },

        renderMyRequests: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            self.removeSelectedFromAll();
            $("#myRequestsBtn").addClass("selected");
            self.$('#homeContainer').html(myRequestFeedTemplate);

            var requestCollection = new RequestCollection();
            requestCollection.fetchByRequestUid({
                headers: {"uid": self.model.get('uid')},
                success: function (collection) {
                    _.each(collection.models, function(model) {
                        console.log(model.toJSON());
                    })
                    console.log("My requests: ");
                    console.log(collection.models);
                    self.$('#myRequestCol').html(myRequestTemplate(collection));
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                }
            });
            return this;
        },

        renderMyDonations: function () {
            console.log("in home view renderMyDonations");

            var self = this;
            console.log(self.model.get('uid'));
            self.removeSelectedFromAll();
            $("#myDonationsBtn").addClass("selected");
            self.$('#homeContainer').html(myDonationFeedTemplate);


            var requestCollection = new RequestCollection();
            requestCollection.fetchByDonateUid({
                headers: {"uid": self.model.get('uid')},
                success: function (collection) {
                    console.log("My donations: ");
                    // console.log(collection.models);
                    var total = 0;
                    _.each(collection.models, function(model) {
                        total += model.get("amount");
                    });
                    self.$('#totalDonations').html('$' + total);
                    self.$('#myDonationCol').html(myDonationTemplate(collection));
                    self.$('#myDonationsSearchByTags').html(selectTagsTemplate(self.tagCollection));
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                }
            });
            return this;
        },

        newRequest: function () {
            console.log("in newRequest function");
            var self = this;
            var container = document.createDocumentFragment();
            var newRequestModalView = new NewRequestModalView({
                parent: self,
                model: new RequestModel({ path: 'create'})
            });
            container.appendChild(newRequestModalView.render().el);
            $('body').append(container);
            return this;
        },

        otherProfile: function () {
            console.log("in other profile function");
            var self = this;
            var container = document.createDocumentFragment();
            var otherProfileModalView = new OtherProfileModalView({
                parent: self,
                // model: new UserModel({ path: 'create'})//todo get usermodel
            });
            container.appendChild(otherProfileModalView.render().el);
            $('body').append(container);
            return this;
        },

        sayThankYou: function (event) {
            console.log("in say thank you function");
            var self = this;
            //get current request rid, duid (username)
            var currentRid = $(event.currentTarget).attr( 'data-rid' );
            console.log(currentRid);
            var container = document.createDocumentFragment();
            var sayThankYouModalView = new SayThankYouModalView({
                parent: self,
                model: new ThankYouModel({ path: 'create'})
            });
            container.appendChild(sayThankYouModalView.render().el);
            $('body').append(container);
            return this;
        },

        viewThankYou: function (event) {
            console.log("in view thank you function");
            var self = this;
            var note = $(event.currentTarget).attr( 'data-note' );
            console.log(note);
            var date = $(event.currentTarget).attr( 'data-date' );
            console.log(date);
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

        updateSearchUserTags: function (event) {
            // this function from https://codepen.io/bseth99/pen/fboKH?editors=1010
            var $target = $(event.currentTarget),
                val = $target.attr( 'data-value' ),
                $inp = $target.find( 'input' ),
                idx;
            if ( ( idx = searchUserTagsList.indexOf( val ) ) > -1 ) {
                searchUserTagsList.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
            } else {
                searchUserTagsList.push( val );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
            }
            $( event.target ).blur();
            console.log( searchUserTagsList );
            return this;
        },

        updateSearchRequestTags: function (event) {
            // this function from https://codepen.io/bseth99/pen/fboKH?editors=1010
            var $target = $(event.currentTarget),
                val = $target.attr( 'data-value' ),
                $inp = $target.find( 'input' ),
                idx;
            if ( ( idx = searchRequestTagsList.indexOf( val ) ) > -1 ) {
                searchRequestTagsList.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
            } else {
                searchRequestTagsList.push( val );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
            }
            $( event.target ).blur();
            console.log( searchRequestTagsList );
            return this;
        },

        updateOrderBy: function (event) {
            console.log("in updateOrderBy");
            return this;
        },

        toggleNew: function () {
            $("#new").prop('checked', true);
            $("#old").prop('checked', false);
            return this;
        },

        toggleOld: function () {
            $("#old").prop('checked', true);
            $("#new").prop('checked', false);
            return this;
        },

        toggleLow: function () {
            $("#low").prop('checked', true);
            $("#high").prop('checked', false);
            return this;
        },

        toggleHigh: function () {
            $("#high").prop('checked', true);
            $("#low").prop('checked', false);
            return this;
        },

        logout: function () {
            var self = this;
            console.log("logging out...");



            bootbox.confirm({
                message: "Are you sure you want to log out?",
                callback: function (result) {
                    self.model.setUrl('logout');

                    self.model.fetch({
                        success: function (collection, response, options) {
                            window.location.href = rootUrl.url;
                            // window.location.href = 'http://localhost:3000/';

                        },
                        error: function(model, response, options){
                            window.location.href = rootUrl.url + 'home';
                            // window.location.href = 'http://localhost:3000/home';
                        }
                    });
                }
            });
        }
    });
    return HomeView;
});