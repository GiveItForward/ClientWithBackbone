console.log("in Home View file");
//The HomeView's model is the UserModel
var searchUserTagsList = [];
var searchRequestTagsList = [];
var lowOrHigh = '';
var newOrOld = '';

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var NewRequestModalView = require("views/NewRequestModalView");
    var EditRequestModalView = require("views/EditRequestModalView");
    var OtherProfileModalView = require("views/OtherProfileModalView");
    // var NotificationsModalView = require("views/NotificationsModalView");
    var EditProfileModalView = require("views/EditProfileModalView");
    var ChangePasswordModalView = require("views/ChangePasswordModalView");
    var SayThankYouModalView = require("views/SayThankYouModalView");
    var ViewThankYouModalView = require("views/ViewThankYouModalView");
    var LandingView = require("views/LandingView");

    var rootUrl = require("models/RootUrl");

    var UserModel = require("models/UserModel");
    var UserCollection = require("models/UserCollection");
    var RequestModel = require("models/RequestModel");
    var RequestCollection = require("models/RequestCollection");
    var NotificationModel = require("models/NotificationModel");
    var NotificationCollection = require("models/NotificationCollection");
    var TagCollection = require("models/TagCollection");
    var OrgModel = require("models/OrgModel");
    var OrgCollection = require("models/OrgCollection");
    var ThankYouModel = require("models/ThankYouModel");

    var homeTemplate = require("jade!templates/jade_templates/homeTemplate");
    var topHomeBarTemplate = require("jade!templates/jade_templates/topHomeBarTemplate");
    var requestFeedTemplate = require("jade!templates/jade_templates/requestFeedTemplate");
    var requestTemplate = require("jade!templates/jade_templates/requestTemplate");
    var selectTagsTemplate = require("jade!templates/jade_templates/selectTagsTemplate");
    var orgFeedAdminTemplate = require("jade!templates/jade_templates/orgFeedAdminTemplate");
    var orgFeedOrgTemplate = require("jade!templates/jade_templates/orgFeedOrgTemplate");
    var orgFeedTemplate = require("jade!templates/jade_templates/orgFeedTemplate");
    var orgTemplate = require("jade!templates/jade_templates/orgTemplate");
    var userFeedTemplate = require("jade!templates/jade_templates/userFeedTemplate");
    var userTemplate = require("jade!templates/jade_templates/userTemplate");
    var userAdminTemplate = require("jade!templates/jade_templates/userAdminTemplate");
    var myProfileTemplate = require("jade!templates/jade_templates/myProfileTemplate");
    var myRequestFeedTemplate = require("jade!templates/jade_templates/myRequestFeedTemplate");
    var myRequestTemplate = require("jade!templates/jade_templates/myRequestTemplate");
    var myDonationFeedTemplate = require("jade!templates/jade_templates/myDonationFeedTemplate");
    var myDonationTemplate = require("jade!templates/jade_templates/myDonationTemplate");
    var notificationTemplate = require("jade!templates/jade_templates/notificationTemplate");


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
            "click #myProfileBtn"               : "renderMyProfile",
            "click #editProfileBtn"             : "editProfile",
            "click #changePasswordBtn"          : "changePassword",
            "click #deleteAccountBtn"           : "deleteAccount",
            "click #usersBtn"                   : "renderUsers",
            "click #adminBtn"                   : "renderAdmin",
            "click #newRequestBtn"              : "newRequest",
            "click #editRequestBtn"             : "editRequest",
            "click #deleteRequestBtn"           : "deleteRequest",
            "click #otherProfileLink"           : "otherProfile",
            "click #sayThankYouBtn"             : "sayThankYou",
            "click #viewThankYouBtn"            : "viewThankYou",
            "click #logoutBtn"                  : "logout"
        },

        initialize: function (options) {
            console.log("in home view init *******************");
            var self = this;
            console.log(self.model);
            self.model = options.model;
            self.tagCollection = new TagCollection();

            self.tagCollection.fetch({
                credentials: 'include',
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
            self.renderHome();
            return this;
        },

        removeSelectedFromAll: function () {
            $("#homeBtn").removeClass("selected");
            $("#orgsBtn").removeClass("selected");
            $("#usersBtn").removeClass("selected");
            $("#adminBtn").removeClass("selected");
            $("#myProfileBtn").removeClass("selected");
            $("#myRequestsBtn").removeClass("selected");
            $("#myDonationsBtn").removeClass("selected");
        },

        renderHome: function () {
            var self = this;
            self.renderTopHomeBar();

            console.log("in home view renderHome");

            self.removeSelectedFromAll();
            $("#homeBtn").addClass("selected");
            self.$('#homeContainer').html(requestFeedTemplate);

            var requestCollection = new RequestCollection();



            requestCollection.fetch({
                credentials: 'include',
                success: function (collection) {
                    console.log(collection.models);
                    self.$('#requestCol').html(requestTemplate(collection));
                    self.$('#searchByTags').html(selectTagsTemplate(self.tagCollection));
                }
            });
            //todo, not this but add tabs to orgs
            // if(self.model.get('isAdmin')){
            //     $("#adminBtn").addClass("turquoisebtncol");
            //     $("#adminBtn").addClass("btn");
            //     $("#adminBtn").attr("href", "#");
            //     $("#adminBtn").text("Admin");
            // }
            if(self.model.get('orgId') > 0 || self.model.get('isAdmin')){
                $("#usersBtn").addClass("turquoisebtncol");
                $("#usersBtn").addClass("btn");
                $("#usersBtn").attr("href", "#");
                $("#usersBtn").text("Users");
            }
            return this;
        },

        renderTopHomeBar: function () {
            var self = this;
            self.$('#mainHomeContainer').html(topHomeBarTemplate);
            $("#usernameDisplay").html("Welcome, " + self.model.get("username"));
            $("#donateCount").html(self.model.get("donateCount"));
            $("#receiveCount").html(self.model.get("receiveCount"));
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
                credentials: 'include',
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
            //todo orgs need div on description and admin needs approve/deny btns
            var self = this;
            self.renderTopHomeBar();
            self.removeSelectedFromAll();
            $("#orgsBtn").addClass("selected");
            if(self.model.get('isAdmin')) {
                self.$('#homeContainer').html(orgFeedAdminTemplate);
            }else if(self.model.get('orgId') > 0 ) {
                self.$('#homeContainer').html(orgFeedOrgTemplate);
            }else{
                self.$('#homeContainer').html(orgFeedTemplate);
            }



            var orgCollection = new OrgCollection();
            orgCollection.fetch({
                credentials: 'include',
                success: function (collection) {
                    console.log(collection.models);
                    self.$('#orgCol').html(orgTemplate(collection));
                }
            });

            if(self.model.get('isAdmin')){
                var pendingOrgCollection = new OrgCollection();
                pendingOrgCollection.fetchPending({
                    credentials: 'include',
                    success: function (collection) {
                        console.log(collection.models);
                        self.$('#pendingOrgCol').html(orgTemplate(collection));
                    }
                });
            }

            return this;
        },

        renderMyProfile: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            console.log(self.model);
            self.removeSelectedFromAll();
            $("#myProfileBtn").addClass("selected");
            self.$('#mainHomeContainer').html(myProfileTemplate);

            var tags = self.model.get("tags");
            // console.log(tags);
            var tagList = "";
            _.each(tags, function(tag) {
                if(tag.tagname !== ''){
                    tagList += "#" + tag.tagname + " ";
                }
            });
            $("#myImage").attr('src', self.model.get("image"));
            $("#myUsername").html('@' + self.model.get("username"));
            $("#myFirstName").html(self.model.get("firstname"));
            $("#myLastName").html(self.model.get("lastname"));
            $("#myEmail").html(self.model.get("email"));
            $("#myTags").html(tagList);
            $("#myBio").html(self.model.get("bio"));
            $("#donateCount").html(self.model.get("donateCount"));
            $("#receiveCount").html(self.model.get("receiveCount"));
            self.renderMyRequests();
            self.renderMyDonations();
            self.renderMyNotifications();

            return this;
        },

        editProfile: function () {
            console.log("in edit profile function");
            var self = this;
            var container = document.createDocumentFragment();
            var editProfileModalView = new EditProfileModalView({
                parent: self,
                model: self.model,
                collection: self.tagCollection
            });
            container.appendChild(editProfileModalView.render().el);
            $('body').append(container);
            return this;
        },

        changePassword: function () {
            console.log("in change password function");
            var self = this;
            var container = document.createDocumentFragment();
            var changePasswordModalView = new ChangePasswordModalView({
                parent: self,
                model: self.model
            });
            container.appendChild(changePasswordModalView.render().el);
            $('body').append(container);
            return this;
        },

        deleteAccount: function () {
            console.log("in delete account function");

            bootbox.confirm({
                message: "Are you sure you want to DELETE your account?",
                callback: function (result) {
                    if(result){
                       bootbox.alert("Your account is pretend deleted. buh-bye now!")
                    }
                }
            });
        },

        renderUsers: function () {
            console.log("in render users function");
            var self = this;
            self.renderTopHomeBar();
            self.removeSelectedFromAll();
            $("#usersBtn").addClass("selected");
            self.$('#homeContainer').html(userFeedTemplate);

            var userCollection = new UserCollection();
            userCollection.fetch({
                credentials: 'include',
                success: function (collection) {
                    console.log(collection.models);
                    if(self.model.get('isAdmin')){
                        self.$('#usersCol').html(userAdminTemplate(collection));
                    }else{
                        self.$('#usersCol').html(userTemplate(collection));
                    }


                }
            });
            return this;
        },

        renderAdmin: function () {
            console.log("in render admin function");
            var self = this;
            self.renderTopHomeBar();
            self.removeSelectedFromAll();
            $("#adminBtn").addClass("selected");
            self.$('#homeContainer').html(userFeedTemplate);

            return this;
        },

        renderMyRequests: function () {
            console.log("in home view renderMyrequests");
            var self = this;
            self.$('#myRequestHistory').html(myRequestFeedTemplate);

            var requestCollection = new RequestCollection();


            requestCollection.fetchByRequestUid({
                credentials: 'include',
                headers: {
                    "uid": self.model.get('uid')
                },
                success: function (collection) {
                    _.each(collection.models, function(model) {
                        console.log(model.toJSON());
                    });
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
            self.$('#myDonationHistory').html(myDonationFeedTemplate);

            var requestCollection = new RequestCollection();

            requestCollection.fetchByDonateUid({
                credentials: 'include',
                headers: {
                    "uid": self.model.get('uid')
                },
                success: function (collection) {
                    console.log("My donations: ");
                    console.log(collection.models);
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

        renderMyNotifications: function () {
            console.log("in home view renderMyNotifications");
            var self = this;

            var notificationCollection = new NotificationCollection();

            notificationCollection.fetch({
                credentials: 'include',
                headers: {
                    "uid": self.model.get('uid')
                },
                success: function (collection) {
                    console.log("My notifications: ");
                    console.log(collection.models);

                    self.$('#notifications').html(notificationTemplate(collection));
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

        editRequest: function (event) {
            console.log("in edit Request function");
            var self = this;
            var ridToEdit = $(event.currentTarget).attr('data-rid');
            console.log(ridToEdit);

            var container = document.createDocumentFragment();
            var editRequestModalView = new EditRequestModalView({
                parent: self,
                rid: ridToEdit
            });
            container.appendChild(editRequestModalView.render().el);
            $('body').append(container);
            return this;
        },

        deleteRequest: function (event) {
            console.log("in deleteRequest function");
            var self = this;
            var ridToDelete = $(event.currentTarget).attr('data-rid');
            console.log(ridToDelete);

            bootbox.confirm({
                message: "Are you sure you want to delete this request?",
                callback: function (result) {
                    if(result){
                        var requestModel = new RequestModel({
                            path: 'delete',
                            rid: ridToDelete
                        });
                        console.log(requestModel);
                        requestModel.destroy({
                            success: function (collection, response, options) {
                                console.log("request was deleted");
                                self.renderMyRequests();
                            },
                            error: function(model, response, options){
                                bootbox.alert('There was a problem deleting this request.');
                                console.log(response);
                            }
                        });
                    }
                }
            });
            return this;
        },

        otherProfile: function (event) {
            console.log("in other profile function");
            var self = this;
            var otherUid = $(event.currentTarget).attr( 'data-uid' );
            console.log("current uid: ");
            console.log(otherUid);

            // var otherUserModel = new UserModel({
            //     path: 'byuid/'
            // });
            //
            // otherUserModel.fetch({
            //     headers: { "uid": otherUid },
            //     success: function (model) {
            //         console.log("other user model");
            //         console.log(model);
            //
            //         var container = document.createDocumentFragment();
            //         var otherProfileModalView = new OtherProfileModalView({
            //             parent: self,
            //             model: model
            //         });
            //         container.appendChild(otherProfileModalView.render().el);
            //         $('body').append(container);
            //     },
            //     error: function(err){
            //         console.log("error occurred in getting the other username");
            //     }
            // });

            var container = document.createDocumentFragment();
            var otherProfileModalView = new OtherProfileModalView({
                parent: self,
                uid: otherUid
            });
            container.appendChild(otherProfileModalView.render().el);
            $('body').append(container);
            return this;
        },

        sayThankYou: function (event) {
            console.log("in say thank you function");
            var self = this;
            //get current request rid, duid (username)
            var currentRid = $(event.currentTarget).attr('data-rid');
            console.log(currentRid);
            var duid = $(event.currentTarget).attr('data-duid');
            console.log(duid);
            // var donateUserModel = new UserModel({
            //     path: 'byuid',
            //     uid: duid
            // });
            // donateUserModel.fetch({
            //     success: function (model) {
            //
            //         donateUserModel = model;
            //         console.log(model);
            //
            //     },
            //     error: function(err){
            //         console.log("error occurred in getting the donate username");
            //     }
            // });
            var container = document.createDocumentFragment();
            var sayThankYouModalView = new SayThankYouModalView({
                parent: self,
                model: new ThankYouModel({
                    path: 'create',
                    rid: currentRid
                }),
                // donateUsername: donateUserModel.get('username')
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
            if($("#new").prop('checked') === true){
                $("#old").prop('checked', false);
                newOrOld = 'new';
            }else{
                $("#new").prop('checked', false);
                newOrOld = '';
            }
            console.log(newOrOld);
            return this;
        },

        toggleOld: function () {
            if($("#old").prop('checked') === true){
                $("#new").prop('checked', false);
                newOrOld = 'old';
            }else{
                $("#old").prop('checked', false);
                newOrOld = '';
            }
            console.log(newOrOld);
            return this;
        },

        toggleLow: function () {
            if($("#low").prop('checked') == true){
                $("#high").prop('checked', false);
                lowOrHigh = 'low';
            }else{
                $("#low").prop('checked', false);
                lowOrHigh = '';
            }
            console.log(lowOrHigh);
            return this;
        },

        toggleHigh: function () {
            if($("#high").prop('checked') === true){
                $("#low").prop('checked', false);
                lowOrHigh = 'high';
            }else{
                $("#high").prop('checked', false);
                lowOrHigh = '';
            }
            console.log(lowOrHigh);
            return this;
        },

        logout: function () {
            var self = this;
            console.log("logging out...");

            bootbox.confirm({
                message: "Are you sure you want to log out?",
                callback: function (result) {
                    if(result){
                        self.model.setUrl('logout');

                        self.model.fetch({
                            credentials: 'include',
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
                }
            });
        }
    });
    return HomeView;
});