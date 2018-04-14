console.log("in Home View file");
//The HomeView's model is the UserModel
var searchUserTagsList = [];
var searchRequestTagsList = [];
var price = '';
var age = '';

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var NewOrgModalView = require("views/NewOrgModalView");
    var EditOrgModalView = require("views/EditOrgModalView");
    var NewRequestModalView = require("views/NewRequestModalView");
    var EditRequestModalView = require("views/EditRequestModalView");
    var OtherProfileModalView = require("views/OtherProfileModalView");
    var EditProfileModalView = require("views/EditProfileModalView");
    var NotificationModalView = require("views/NotificationModalView");
    var ChangePasswordModalView = require("views/ChangePasswordModalView");
    var SayThankYouModalView = require("views/SayThankYouModalView");
    var CreateAvatarModalView = require("views/CreateAvatarModalView");
    var ViewThankYouModalView = require("views/ViewThankYouModalView");
    var LandingView = require("views/LandingView");

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

    var navbarTemplate = require("jade!templates/jade_templates/navbarTemplate");
    var topHomeBarTemplate = require("jade!templates/jade_templates/topHomeBarTemplate");
    var requestFeedTemplate = require("jade!templates/jade_templates/requestFeedTemplate");
    var requestTemplate = require("jade!templates/jade_templates/requestTemplate");
    var selectTagsTemplate = require("jade!templates/jade_templates/selectTagsTemplate");
    var orgFeedAdminTemplate = require("jade!templates/jade_templates/orgFeedAdminTemplate");
    var orgFeedOrgTemplate = require("jade!templates/jade_templates/orgFeedOrgTemplate");
    var orgMyOrgTemplate = require("jade!templates/jade_templates/orgMyOrgTemplate");
    var orgFeedTemplate = require("jade!templates/jade_templates/orgFeedTemplate");
    var orgTemplate = require("jade!templates/jade_templates/orgTemplate");
    var orgPendingTemplate = require("jade!templates/jade_templates/orgPendingTemplate");
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
            "click #goFilterRequests"           : "goFilterRequests",
            "click #goSearchUsers"              : "goSearchUsers",
            "keyup #searchUsers"                : "enterGoSearchUsers",
            "click #goSearchOrgs"               : "goSearchOrgs",
            "keyup #searchOrgs"                 : "enterGoSearchOrgs",
            "click #giveBtn"                    : "paypal",
            "click #orgsBtn"                    : "renderOrgs",
            "click #myProfileBtn"               : "renderMyProfile",
            "click #editProfileBtn"             : "editProfile",
            "click #changePasswordBtn"          : "changePassword",
            "click #createAvatarBtn"            : "createAvatar",
            "click #deleteAccountBtn"           : "deleteAccount",
            "click #usersBtn"                   : "renderUsers",
            "click #unverifyTagBtn"             : "unverifyTag",
            "click #verifyTagBtn"               : "verifyTag",
            "click #elevateUserAdminBtn"        : "elevateUserAdmin",
            "click #demoteUserAdminBtn"         : "demoteUserAdmin",
            "click #deleteUserBtn"              : "deleteUser",
            "click #approveOrgBtn"              : "approveOrg",
            "click #denyOrgBtn"                 : "denyOrg",
            "click #newOrgBtn"                  : "newOrg",
            "click #editOrgBtn"                 : "editOrg",
            "click #newRequestBtn"              : "newRequest",
            "click #editRequestBtn"             : "editRequest",
            "click #deleteRequestBtn"           : "deleteRequest",
            "click #otherProfileLink"           : "otherProfile",
            "click #sayThankYouBtn"             : "sayThankYou",
            "click #viewThankYouBtn"            : "viewThankYou",
            "click #logoutBtn"                  : "logout"
        },


        // run scripts on the fly
        getScripts: function(scripts, callback) {
            var progress = 0;
            scripts.forEach(function(script) {
                $.getScript(script, function () {
                    if (++progress == scripts.length) callback();
                });
            });
        },

        initialize: function (options) {

            // load the avatar scripts once they have logged in.
            this.getScripts(["svgavatars/js/svg.min.js", "svgavatars/js/spectrum.min.js",
                "svgavatars/js/jquery.scrollbar.min.js", "svgavatars/js/canvg/rgbcolor.js",
                "svgavatars/js/canvg/StackBlur.js", "svgavatars/js/canvg/canvg.js",
                "svgavatars/js/svgavatars.en.js", "svgavatars/js/svgavatars.core.min.js"], function () {
                // do something... or nothing... what ever you want
            });

            console.log("in home view init *******************");
            var self = this;
            console.log(self.model);
            self.model = options.model;
            self.tagCollection = new TagCollection();

            self.tagCollection.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function (collection) {
                    // console.log('tag names from db: ');
                    // console.log(collection.models);
                    self.tagCollection = collection;
                    self.render();
                }
            });
        },

        render: function () {
            var self = this;
            self.setElement("#homeStuff");
            self.$el.html(navbarTemplate);
            console.log(self.model);
            self.renderHome();
            return this;
        },

        removeSelectedFromAll: function () {
            $("#homeBtn").removeClass("active");
            $("#orgsBtn").removeClass("active");
            $("#usersBtn").removeClass("active");
            $("#adminBtn").removeClass("active");
            $("#myProfileBtn").removeClass("active");
            $("#myRequestsBtn").removeClass("active");
            $("#myDonationsBtn").removeClass("active");
        },

        renderHome: function () {
            var self = this;
            self.renderTopHomeBar();
            self.removeSelectedFromAll();
            $("#homeBtn").addClass("active");
            self.$('#homeContainer').html(requestFeedTemplate);

            var requestCollection = new RequestCollection();

            $('#requestFeedSpinner').css('display', 'block');

            requestCollection.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function (collection) {
                    var collectionWithMyID = {
                        collection: collection,
                        myUid: self.model.get('uid')
                    };
                    $('#requestFeedSpinner').css("display", "none");
                    self.$('#requestCol').html(requestTemplate(collectionWithMyID));
                    self.$('#searchByTags').html(selectTagsTemplate(self.tagCollection));
                }
            });

            var myOid = self.model.get('orgId');
            if(myOid > 0){
                var myOrgModel = new OrgModel({
                    path: 'byoid',
                    oid: myOid
                });
                myOrgModel.fetch({
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {"oid": myOid},
                    success: function (model) {
                        self.orgModel = model;
                        if(self.orgModel.get('approved')){
                            $("#usersBtn").attr("href", "#");
                            $("#usersBtn").text("users");
                        }
                    }
                });
            }

            if(self.model.get('isAdmin')){
                $("#usersBtn").attr("href", "#");
                $("#usersBtn").text("users");
            }
            return this;
        },

        renderTopHomeBar: function () {
            var self = this;
            self.$('#mainHomeContainer').html(topHomeBarTemplate);
            // $("#usernameDisplay").html("Hi, " + self.model.get("username"));

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
            $('#paypalSpinner').css('display', "block");

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
                xhrFields: {
                    withCredentials: true
                },
                success: function (model, response, options) {
                    console.log("success on request fulfill");
                    window.location.href = model.get('redirectUrl');

                },
                error: function (model, response, options){
                    bootbox.alert('There was a problem donating. Try again later.');
                }
            });

            return this;
        },

        renderOrgs: function () {
            var self = this;
            self.renderTopHomeBar();
            self.removeSelectedFromAll();
            $("#orgsBtn").addClass("active");
            // $('<div class="fa-5x">\n' +
            //     '  <i class="fas fa-spinner fa-spin"></i>\n' +
            //     '</div>').insertBefore('#homeContainer');
            if(self.model.get('isAdmin')) {
                self.$('#homeContainer').html(orgFeedAdminTemplate);
            }else if(self.model.get('orgId') > 0 ) {
                self.$('#homeContainer').html(orgFeedOrgTemplate);
            }else{
                self.$('#homeContainer').html(orgFeedTemplate);
            }
            $('#orgSpinner').css('display', 'block');

            var orgCollection = new OrgCollection();
            orgCollection.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function (collection) {
                    console.log(collection.models);
                    if(collection.models.length > 0){
                        self.$('#orgCol').html(orgTemplate(collection));
                    }else{
                        self.$('#orgCol').html("There are no approved orgs at this time.");
                    }
                    $('#orgSpinner').css('display', 'none');
                }
            });

            if(self.model.get('isAdmin')){
                var pendingOrgCollection = new OrgCollection();
                pendingOrgCollection.fetchPending({
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (collection) {
                        console.log(collection.models);
                        if(collection.models.length > 0){
                            self.$('#pendingOrgCol').html(orgPendingTemplate(collection));
                        }else{
                            self.$('#pendingOrgCol').html("There are no pending orgs at this time.");
                        }
                    }
                });
            }

            var myOid = self.model.get('orgId');
            if(myOid > 0){
                var myOrgModel = new OrgModel({
                    path: 'byoid',
                    oid: myOid
                });
                myOrgModel.fetch({
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {"oid": myOid},
                    success: function (model) {
                        console.log(model);
                        var collect = new Backbone.Collection();
                        collect.add(model);
                        self.$('#myOrgCol').html(orgMyOrgTemplate(collect));
                        if(!self.orgModel.get('approved')){
                            self.$('#pendingMessage').html("Your organization is pending approval.");
                        }
                    }
                });
            }
            return this;
        },

        renderMyProfile: function () {
            var self = this;
            self.removeSelectedFromAll();
            $("#myProfileBtn").addClass("active");

            self.$('#mainHomeContainer').html(myProfileTemplate);

            var tags = self.model.get("tags");
            var tagList = "";
            _.each(tags, function(tag) {
                if(tag.tagname !== ''){
                    tagList += "#" + tag.tagname;
                    if(tag.verifiedBy !== ""){
                        tagList += '<span data-title="Verified by "' + tag.verifiedBy + '"><img class="checkmark" src="/img/marooncheckmark.png"/></span>  ';
                    }else{
                        tagList += '  ';
                    }
                }
            });
            $("#myImage").attr('src', self.model.get("image"));
            $("#myUsername").text(self.model.get("username"));
            $("#myFirstName").text(self.model.get("firstname"));
            $("#myLastName").text(self.model.get("lastname"));
            $("#myEmail").text(self.model.get("email"));
            $("#myTags").text(tagList);
            $("#myBio").text(self.model.get("bio"));
            $("#donateCount").html(self.model.get("donateCount"));
            $("#receiveCount").html(self.model.get("receiveCount"));
            self.renderMyRequests();
            self.renderMyDonations();
            self.renderMyNotifications();

            return this;
        },


        editProfile: function () {
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

        createAvatar: function() {
            var self = this;
            // self.renderTopHomeBar();
            // self.$('#homeContainer').html("<div id=\"svgAvatars\"></div>");

            var container = document.createDocumentFragment();
            var createAvatarModalView = new CreateAvatarModalView({
                parent: self,
                model: self.model,
            });
            container.appendChild(createAvatarModalView.render().el);
            $('body').append(container);
            $('#svgAvatars').show();
            $('#svgAvatars').insertAfter('#avatarPlaceHolder');
            return this;
        },


        createAvatarTab: function() {
            $('#svgAvatars').insertAfter('#avatarPlaceHolder2');
            $('#svgAvatars').show();
            $("html, body").animate({ scrollTop: $("#svgAvatars").scrollTop() }, 1000);
            return this;
        },

        changePassword: function () {
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

        deleteAccount: function (event) {
            var self = this;
            console.log("DELET ACCOUNT");
            bootbox.confirm({
                message: "Are you sure you want to DELETE your account?",
                callback: function (result) {
                    if(result){
                        self.model.setUrl('delete');

                        self.model.destroy({
                            xhrFields: {
                                withCredentials: true
                            },
                            headers: {
                                "uid": self.model.get('uid')
                            },
                            success: function (model) {
                                self.logout();
                            },
                            error: function(model, response, options){
                                bootbox.alert('There was a problem deleting your account.');
                                console.log(response);
                            }
                        });
                    }
                }
            });
        },

        renderUsers: function () {
            var self = this;
            self.renderTopHomeBar();
            self.removeSelectedFromAll();
            $("#usersBtn").addClass("active");
            self.$('#searchBarDiv').html(userFeedTemplate);

            var userCollection = new UserCollection();
            console.log("USER COLLECTION: ")
            console.log(userCollection.url);

            $('#homeLoginSpinner').css('display', 'block');
            userCollection.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function (collection) {
                    console.log(collection.models);
                    $("#homeLoginSpinner").css('display', 'none');
                    if(self.model.get('isAdmin')){
                        self.$('#usersCol').html(userAdminTemplate(collection));
                    }else {
                        self.$('#usersCol').html(userTemplate(collection));
                    }
                }
            });
            return this;
        },

        verifyTag: function (event) {
            var self = this;
            var usernameToVerifiy = $(event.currentTarget).attr('data-username');
            var uidToVerifiy = $(event.currentTarget).attr('data-uid');
            var tagNameToVerify = $(event.currentTarget).attr('data-tagname');
            var tagIdToVerify = $(event.currentTarget).attr('data-tid');

            //todo get tags to verify
            bootbox.confirm({
                message: "Would you like to verify the tag #" + tagNameToVerify + " for " + usernameToVerifiy + "?",
                callback: function (result) {
                    if(result){
                        var verifyUserModel = new UserModel({
                            path: 'verifytag',
                            uid: uidToVerifiy});
                        console.log(verifyUserModel);
                        verifyUserModel.save(null, {
                            xhrFields: {
                                withCredentials: true
                            },
                            headers: {
                                uid: uidToVerifiy,
                                tid: tagIdToVerify,
                                oid: self.model.get('orgId')
                            },
                            success: function (collection, response, options) {
                                console.log("request was saved");
                                self.renderUsers();
                            },
                            error: function(model, response, options){
                                bootbox.alert('There was a problem saving this verification.');
                                console.log(response);
                            }
                        });
                    }
                }
            });
        },

        unverifyTag: function (event) {
            var self = this;
            var usernameToUnverifiy = $(event.currentTarget).attr('data-username');
            var uidToUnverifiy = $(event.currentTarget).attr('data-uid');
            var tagNameToUnverify = $(event.currentTarget).attr('data-tagname');
            var tagIdToUnverify = $(event.currentTarget).attr('data-tid');

            //todo get tags to verify
            bootbox.confirm({
                message: "Would you like to REMOVE the verification of the tag #" + tagNameToUnverify + " for " + usernameToUnverifiy + "?",
                callback: function (result) {
                    if(result){
                        var unverifyUserModel = new UserModel({
                            path: 'verifytag',
                            uid: uidToUnverifiy
                        });
                        console.log(unverifyUserModel);
                        unverifyUserModel.save(null, {
                            xhrFields: {
                                withCredentials: true
                            },
                            headers: {
                                uid: uidToUnverifiy,
                                tid: tagIdToUnverify,
                                oid: self.model.get('orgId')
                            },
                            success: function (collection, response, options) {
                                console.log("request was saved");
                                self.renderUsers();
                            },
                            error: function(model, response, options){
                                bootbox.alert('There was a problem undoing this verification.');
                                console.log(response);
                            }
                        });
                    }
                }
            });
        },

        elevateUserAdmin: function (event) {
            var self = this;
            var usernameToAdmin = $(event.currentTarget).attr('data-username');
            var uidToAdmin = $(event.currentTarget).attr('data-uid');

            bootbox.confirm({
                message: "Would you like to elevate " + usernameToAdmin + " to an ADMIN User?",
                callback: function (result) {
                    if(result){
                        var userAdminModel = new UserModel({
                            path: 'promote/admin',
                            uid: uidToAdmin
                        });
                        userAdminModel.save({
                            xhrFields: {
                                withCredentials: true
                            },
                            success: function (model) {

                    self.renderUsers();
                            },
                            error: function(model, response, options){
                                bootbox.alert('There was a problem promoting this user.');
                                console.log(response);
                            }
                        });
                    }
                }
            });
        },

        deleteUser: function (event) {
            var self = this;
            var usernameToDelete = $(event.currentTarget).attr('data-username');
            var uidToDelete = $(event.currentTarget).attr('data-uid');
            console.log("\nIN DELETE USER");
            console.log("UID: " + uidToDelete);

            bootbox.confirm({
                message: "Are you sure you want to DELETE user " + usernameToDelete + "?",
                callback: function (result) {
                    if(result){
                        var userModelToDelete = new UserModel({});
                        userModelToDelete.set('uid', uidToDelete);
                        userModelToDelete.setUrl('delete');

                        userModelToDelete.destroy({
                            xhrFields: {
                                withCredentials: true
                            },
                            headers: {
                                "uid": uidToDelete
                            },
                            success: function (model) {
                                self.renderUsers();
                            },
                            error: function(model, response, options){
                                bootbox.alert('There was a problem deleting this user.');
                                console.log(response);
                            }
                        });
                    }
                }
            });
        },


        renderMyRequests: function () {
            var self = this;
            self.$('#myRequestHistory').html(myRequestFeedTemplate);
            var requestCollection = new RequestCollection();


            $('#myRequestSpinner').css("display", "block");
            requestCollection.fetchByRequestUid({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "uid": self.model.get('uid')
                },
                success: function (collection) {
                    $('#myRequestSpinner').css("display", "none");
                    _.each(collection.models, function(model) {
                        console.log(model.toJSON());
                    });
                    console.log("My requests: ");
                    console.log(collection.models);
                    if(collection.models.length > 0){
                        self.$('#myRequestCol').html(myRequestTemplate(collection));
                    }else{
                        self.$('#myRequestCol').html("There is no history available.");
                    }

                },
                error: function(model, response) {
                    $('#myRequestSpinner').css("display", "none");
                    console.log(model);
                    console.log(response);
                }
            });
            return this;
        },

        renderMyDonations: function () {
            var self = this;
            console.log(self.model.get('uid'));
            self.$('#myDonationHistory').html(myDonationFeedTemplate);

            var requestCollection = new RequestCollection();

            requestCollection.fetchByDonateUid({
                xhrFields: {
                    withCredentials: true
                },
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
                    if(collection.models.length > 0){
                        self.$('#myDonationCol').html(myDonationTemplate(collection));
                    }else{
                        self.$('#myDonationCol').html("There is no history available.");
                    }
                    // self.$('#myDonationsSearchByTags').html(selectTagsTemplate(self.tagCollection));
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                }
            });
            return this;
        },

        renderMyNotifications: function () {
            var self = this;
            var notificationCollection = new NotificationCollection();

            notificationCollection.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "uid": self.model.get('uid')
                },
                success: function (collection) {
                    console.log("My notifications: ");
                    console.log(collection.models);
                    if(collection.models.length > 0){
                        self.$('#notifications').html(notificationTemplate(collection));
                    }else{
                        self.$('#notifications').html("You have no notifications at this time.");
                    }

                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                }
            });
            return this;
        },

        notification: function (event) {
            var self = this;
            var message = $(event.currentTarget).attr('data-message');
            console.log(message);

            var requestModel = new RequestModel({ path: 'rid'});
            requestModel.fetch({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "rid": 2 //113
                },
                success: function (model) {
                    console.log(model);
                    console.log(model.get(0).thankYou);

                    if(model.get(0).thankYou !== ""){

                        var note = model.get(0).thankYou.note;
                        var date = model.get(0).thankYou.date;
                        var rUsername = model.get(0).rUser.username;
                        var container = document.createDocumentFragment();
                        var viewThankYouModalView = new ViewThankYouModalView({
                            parent: self,
                            note: note,
                            date: date,
                            rUsername: rUsername
                        });
                        container.appendChild(viewThankYouModalView.render().el);
                        $('body').append(container);

                    }else{

                        var container = document.createDocumentFragment();
                        var notificationModalView = new NotificationModalView({
                            parent: self,
                            // model: new RequestModel({ path: 'rid'})
                        });
                        container.appendChild(notificationModalView.render().el);
                        $('body').append(container);

                    }
                },
                error: function(error){
                    console.log(error);
                    bootbox.alert("There was an error getting your notification.");
                }
            });

            return this;
        },

        newOrg: function () {
            var self = this;
            var container = document.createDocumentFragment();
            var newOrgModalView = new NewOrgModalView({
                parent: self,
                model: new OrgModel({ path: 'create'})
            });
            container.appendChild(newOrgModalView.render().el);
            $('body').append(container);
            return this;
        },

        editOrg: function () {
            var self = this;
            var container = document.createDocumentFragment();
            var editOrgModalView = new EditOrgModalView({
                parent: self,
                model: new OrgModel({ path: 'update'})
            });
            container.appendChild(editOrgModalView.render().el);
            $('body').append(container);
            return this;
        },

        newRequest: function () {
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
                            xhrFields: {
                                withCredentials: true
                            },
                            headers: {
                                "rid": ridToDelete
                            },
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

        approveOrg: function (event) {
            var self = this;
            var oidToApprove = $(event.currentTarget).attr('data-oid');
            var nameToApprove = $(event.currentTarget).attr('data-name');
            console.log(oidToApprove);

            bootbox.confirm({
                message: "Are you sure you want to APPROVE the org " + nameToApprove + "?",
                callback: function (result) {
                    if(result){
                        var orgToApproveModel = new OrgModel({
                            path: 'approve',
                            oid: oidToApprove
                        });
                        console.log(orgToApproveModel);
                        orgToApproveModel.save(null, {
                            success: function (model) {
                                self.renderOrgs();
                                console.log(model);
                            },
                            error: function(err){
                                console.log('there was some error in approving this org.');
                                console.log(err);
                            }
                        });
                    }
                }
            });
            return this;
        },

        denyOrg: function (event) {
            var self = this;
            var oidToDeny = $(event.currentTarget).attr('data-oid');
            var nameToDeny = $(event.currentTarget).attr('data-name');
            console.log(oidToDeny);

            bootbox.confirm({
                message: "Are you sure you want to DENY and DELETE the org " + nameToDeny + "?",
                callback: function (result) {
                    if(result){
                        var orgToDenyModel = new OrgModel({
                            path: 'delete',
                            oid: oidToDeny
                        });

                        orgToDenyModel.destroy({
                            xhrFields: {
                                withCredentials: true
                            },
                            headers: {
                                "oid": oidToDeny
                            },
                            success: function (model) {
                                self.renderOrgs();
                                console.log(model);
                            },
                            error: function(err){
                                console.log('there was some error in deleting this org.');
                                console.log(err);
                            }
                        });
                    }
                }
            });
            return this;
        },

        otherProfile: function (event) {
            var self = this;
            var otherUid = $(event.currentTarget).attr( 'data-uid' );

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
            //     xhrFields: {
            //         withCredentials: true
            //     },
            //     headers: {
            //         "uid": duid
            //     },
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
                    rid: currentRid,
                    duid: duid
                })
            });
            container.appendChild(sayThankYouModalView.render().el);
            $('body').append(container);
            return this;
        },

        viewThankYou: function (event) {
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

        updateSearchUserTags: function (event) {
            // this function from https://codepen.io/bseth99/pen/fboKH?editors=1010
            var $target = $(event.currentTarget),
                name = $target.attr( 'data-name' ),
                utid = parseInt($target.attr( 'data-tid' )),
                $inp = $target.find( 'input' ),
                idx;
            if ( ( idx = searchUserTagsList.indexOf( utid ) ) > -1 ) {
                searchUserTagsList.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
            } else {
                searchUserTagsList.push( utid );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
            }
            $( event.target ).blur();
            console.log( searchUserTagsList );
            return this;
        },

        updateSearchRequestTags: function (event) {
            // this function from https://codepen.io/bseth99/pen/fboKH?editors=1010
            var $target = $(event.currentTarget),
                name = $target.attr( 'data-name' ),
                rtid = parseInt($target.attr( 'data-tid' )),
                $inp = $target.find( 'input' ),
                idx;
            if ( ( idx = searchRequestTagsList.indexOf( rtid ) ) > -1 ) {
                searchRequestTagsList.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
            } else {
                searchRequestTagsList.push( rtid );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
            }
            $( event.target ).blur();
            console.log( searchRequestTagsList );
            return this;
        },

        updateOrderBy: function (event) {
            return this;
        },

        toggleNew: function () {
            if($("#new").prop('checked') === true){
                $("#old").prop('checked', false);
                age = 'new';
            }else{
                $("#new").prop('checked', false);
                age = '';
            }
            console.log(age);
            return this;
        },

        toggleOld: function () {
            if($("#old").prop('checked') === true){
                $("#new").prop('checked', false);
                age = 'old';
            }else{
                $("#old").prop('checked', false);
                age = '';
            }
            console.log(age);
            return this;
        },

        toggleLow: function () {
            if($("#low").prop('checked') === true){
                $("#high").prop('checked', false);
                price = 'low';
            }else{
                $("#low").prop('checked', false);
                price = '';
            }
            console.log(price);
            return this;
        },

        toggleHigh: function () {
            if($("#high").prop('checked') === true){
                $("#low").prop('checked', false);
                price = 'high';
            }else{
                $("#high").prop('checked', false);
                price = '';
            }
            console.log(price);
            return this;
        },

        goFilterRequests: function () {
            var self = this;

            console.log(age);
            console.log(price);
            console.log(searchUserTagsList);
            console.log(searchRequestTagsList);

            var filteredRequestCollection = new RequestCollection();
            filteredRequestCollection.fetchByFilter({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "age": age,
                    "price": price,
                    "rtags": searchRequestTagsList,
                    "utags": searchUserTagsList
                },
                success: function (collection) {
                    console.log(collection.models);
                    var collectionWithMyID = {
                        collection: collection,
                        myUid: self.model.get('uid')
                    };
                    self.$('#requestCol').html(requestTemplate(collectionWithMyID));
                    self.$('#searchByTags').html(selectTagsTemplate(self.tagCollection));
                },
                error: function(err){
                    console.log("error when filtering");
                    console.log(err);
                }
            });

            //Clear these lists for the next search.
            searchRequestTagsList =[];
            searchUserTagsList = [];
            return this;
        },

        goSearchOrgs: function () {
            var self = this;
            var searchOrgString = $('#searchOrgs').val();

            if(searchOrgString.trim() !== ''){
                var searchOrgCollection = new OrgCollection();
                searchOrgCollection.fetchSearch({
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {
                        "search": searchOrgString
                    },
                    success: function (collection) {
                        console.log(collection.models);
                        if(collection.models.length > 0){
                            self.$('#orgCol').html(orgTemplate(collection));
                        }else{
                            self.$('#orgCol').html('No Orgs matched your search.');
                        }
                    },
                    error: function(err){
                        console.log("error when search orgs");
                        console.log(err);
                    }
                });
                return this;
            }
        },

        enterGoSearchOrgs: function (e) {
            var self = this;
            if ( e.keyCode === 13 ) { // 13 is enter key
                self.goSearchOrgs();
            }
            return this;
        },

        goSearchUsers: function () {
            var self = this;
            var searchUserString = $('#searchUsers').val();

            if(searchUserString.trim() !== ''){
                var searchUserCollection = new UserCollection();
                searchUserCollection.fetchSearch({
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {
                        "search": searchUserString
                    },
                    success: function (collection) {
                        console.log(collection.models);
                        if(collection.models.length > 0){
                            if(self.model.get('isAdmin')){
                                self.$('#usersCol').html(userAdminTemplate(collection));
                            }else{
                                self.$('#usersCol').html(userTemplate(collection));
                            }
                        }else{
                            self.$('#usersCol').html('No users matched your search.');
                        }
                    },
                    error: function(err){
                        console.log("error when search users");
                        console.log(err);
                    }
                });
            }
            return this;
        },

        enterGoSearchUsers: function (e) {
            var self = this;
            if ( e.keyCode === 13 ) { // 13 is enter key
                self.goSearchUsers();
            }
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
                            xhrFields: {
                                withCredentials: true
                            },
                            success: function (collection, response, options) {
                                window.location.href = "/home";
                            },
                            error: function(model, response, options){
                                window.location.href = "/home";
                            }
                        });
                    }
                }
            });
        }
    });
    return HomeView;
});