console.log("loaded HomeView.js");
//The HomeView's model is the UserModel
var searchUserTagsList = [];
var searchRequestTagsList = [];
var price = '';
var age = '';

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootbox = require("bootbox");

    var NewOrgModalView = require("views/NewOrgModalView");
    var EditOrgModalView = require("views/EditOrgModalView");
    var NewRequestModalView = require("views/NewRequestModalView");
    var EditRequestModalView = require("views/EditRequestModalView");
    var OtherProfileModalView = require("views/OtherProfileModalView");
    var EditProfileModalView = require("views/EditProfileModalView");
    var ChangePasswordModalView = require("views/ChangePasswordModalView");
    var SayThankYouModalView = require("views/SayThankYouModalView");
    var CreateAvatarModalView = require("views/CreateAvatarModalView");
    var ViewThankYouModalView = require("views/ViewThankYouModalView");

    var UserModel = require("models/UserModel");
    var UserCollection = require("models/UserCollection");
    var RequestModel = require("models/RequestModel");
    var RequestCollection = require("models/RequestCollection");
    var NotificationCollection = require("models/NotificationCollection");
    var TagCollection = require("models/TagCollection");
    var OrgModel = require("models/OrgModel");
    var OrgCollection = require("models/OrgCollection");
    var ThankYouModel = require("models/ThankYouModel");
    var NotificationModel = require('models/NotificationModel');

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
    var myProfileTagsTemplate = require("jade!templates/jade_templates/myProfileTagsTemplate");
    var myRequestFeedTemplate = require("jade!templates/jade_templates/myRequestFeedTemplate");
    var myRequestTemplate = require("jade!templates/jade_templates/myRequestTemplate");
    var myDonationFeedTemplate = require("jade!templates/jade_templates/myDonationFeedTemplate");
    var myDonationTemplate = require("jade!templates/jade_templates/myDonationTemplate");
    var notificationItemTemplate = require("jade!templates/jade_templates/notificationItemTemplate");
    var searchCriteriaButtonTemplate = require("jade!templates/jade_templates/searchCriteriaButtonTemplate");

    var notificatonRequestTemplate = require("jade!templates/jade_templates/notificationRequestTemplate");
    var requestSearchBar = require("jade!templates/jade_templates/requestSearchBar");



    var HomeView = Backbone.View.extend({

        el: 'body',

        events: {
            "click #homeBtn"                    : "renderHome",
            "click #logoMini"                   : "renderHome",
            "click #searchByTags a"             : "updateSearchUserTags",
            "click #orderBy a"                  : "updateOrderBy",
            "click #new"                        : "toggleNew",
            "click #old"                        : "toggleOld",
            "click #low"                        : "toggleLow",
            "click #high"                       : "toggleHigh",
            "click #goFilterRequests"           : "goFilterRequests",
            "click #goSearchUsers"              : "goSearchUsers",
            "click #searchUsersClear"           : "clearSearchUsers",
            "keyup #searchUsers"                : "enterGoSearchUsers",
            "click #goSearchOrgs"               : "goSearchOrgs",
            "click #searchOrgClear"             : "clearSearchOrgs",
            "keyup #searchOrgs"                 : "enterGoSearchOrgs",
            "click #giveBtn"                    : "paypal",
            "click #orgsBtn"                    : "renderOrgs",
            "click #myProfileBtn"               : "renderMyProfile",
            "click #editProfileBtn"             : "editProfile",
            "click #changePasswordBtn"          : "changePassword",
            "click #createAvatarBtn"            : "createAvatar",
            "click #deleteAccountBtn"           : "deleteAccount",
            // "click #usersBtn"                   : "renderUsers",
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
            "click #notificationItem a"         : "viewNotification",
            "mouseover #notificationItem a"     : "quickViewNotification",
            "click #searchCriteria button"      : "removedSearchCriteria",
            "click #notificationDropdown"       : "clearNotificationCount",
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

            var self = this;
            self.model = options.model;
            self.tagCollection = new TagCollection();

            self.tagCollection.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function (collection) {
                    self.tagCollection = collection;
                    self.render();
                }
            });
        },

        render: function () {
            var self = this;
            self.setElement("#homeStuff");
            self.$el.html(navbarTemplate);
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
            self.renderMyNotifications();
            self.renderTopHomeBar();
            self.$('#centerSearchBarDiv').html(requestSearchBar);
            self.$('#miniImage').attr("src", self.model.get('image'));
            self.removeSelectedFromAll();
            $("#homeBtn").addClass("active");
            self.$('#homeContainer').html(requestFeedTemplate);
            $("#donateCount").html(self.model.get("donateCount"));
            $("#receiveCount").html(self.model.get("receiveCount"));

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
                    $('#footerRefresh').css("display", "block");

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
                            self.addUsersButton();
                            // $("#usersBtn").attr("href", "#");
                            // $("#usersBtn").text("users");
                        }
                    }
                });
            }

            if(self.model.get('isAdmin')){
                // $("#usersBtn").attr("href", "#");
                // $("#usersBtn").text("users");
                self.addUsersButton();
            }
            return this;
        },

        renderTopHomeBar: function () {
            var self = this;
            self.$('#mainHomeContainer').html(topHomeBarTemplate);
            // $("#usernameDisplay").html("Hi, " + self.model.get("username"));
            return this;
        },

        paypal: function (e) {
            var self = this;
            var element = $(e.currentTarget);
            var rid = element.attr("data-rid");
            var ruseruid = element.attr("data-ruser-uid");
            var amount = element.attr("data-amount");

            bootbox.confirm({
                message: "Be aware, the amount you will pay will include both the donation and PayPal fees.",
                callback: function (result) {
                    if(result){
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
                                window.location.href = model.get('redirectUrl');

                            },
                            error: function (model, response, options){
                                bootbox.alert('There was a problem donating. Try again later.');
                            }
                        });
                    }
                }
            });

            return this;
        },

        renderOrgs: function () {
            var self = this;
            self.renderTopHomeBar();
            self.renderMyNotifications();
            self.removeSelectedFromAll();
            if(self.model.get('isAdmin')) {
                self.$('#searchBarDiv').html(orgFeedAdminTemplate);
            }else if(self.model.get('orgId') > 0 ) {
                self.$('#searchBarDiv').html(orgFeedOrgTemplate);
            }else{
                self.$('#searchBarDiv').html(orgFeedTemplate);
            }

            self.clearSearchOrgs();
            return this;
        },

        renderMyProfile: function () {
            var self = this;
            self.removeSelectedFromAll();
            $("#myProfileBtn").addClass("active");
            self.$('#mainHomeContainer').html(myProfileTemplate);

            var tags = self.model.get("tags");
            var tagsCollection = new Backbone.Collection();
            tags.forEach(function(tag) {
                if(tag.tagname !== ''){
                    var backboneTag = new Backbone.Model({
                        tagname: tag.tagname,
                        tid: tag.tid,
                        verifiedBy: tag.verifiedBy
                    });
                    tagsCollection.add(backboneTag);
                }
            });
            if(tagsCollection.length > 0){
                $("#myTags").html(myProfileTagsTemplate(tagsCollection));
            }

            $("#myImage").attr('src', self.model.get("image"));
            $("#myUsername").text(self.model.get("username"));
            $("#myFirstName").text(self.model.get("firstname"));
            $("#myLastName").text(self.model.get("lastname"));
            $("#myEmail").text(self.model.get("email"));
            $("#myBio").text(self.model.get("bio"));
            $("#donateCount").html(self.model.get("donateCount"));
            $("#receiveCount").html(self.model.get("receiveCount"));
            self.renderMyRequests();
            self.renderMyDonations();
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
            self.renderMyNotifications();
            self.removeSelectedFromAll();
            $("#usersBtn").addClass("active");
            self.$('#searchBarDiv').html(userFeedTemplate);

            self.clearSearchUsers();
            return this;
        },

        clearSearchUsers: function() {
            var self = this;
            var userCollection = new UserCollection();

            $('#homeLoginSpinner').css('display', 'block');
            $('#searchUsers').val("");
            userCollection.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function (collection) {
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
            self.renderMyNotifications();


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
                    // _.each(collection.models, function(model) {
                    //     console.log(model.toJSON());
                    // });
                    if(collection.models.length > 0){
                        self.$('#myRequestCol').html(myRequestTemplate(collection));
                    }else{
                        self.$('#myRequestCol').html(
                        "<div class=\"panel panel-default\">\n" +
                            "  <div class=\"panel-body\">\n" +
                            "    <p>There is no request history available.</p>\n" +
                            "  </div>\n" +
                            "</div>");
                    }

                },
                error: function(model, response) {
                    $('#myRequestSpinner').css("display", "none");
                    console.log(response);
                }
            });
            return this;
        },

        renderMyDonations: function () {
            var self = this;
            self.$('#myDonationHistory').html(myDonationFeedTemplate);

            self.renderMyNotifications();

            var requestCollection = new RequestCollection();

            requestCollection.fetchByDonateUid({
                xhrFields: {
                    withCredentials: true
                },
                headers: {
                    "uid": self.model.get('uid')
                },
                success: function (collection) {
                    var total = 0;
                    _.each(collection.models, function(model) {
                        total += model.get("amount");
                    });
                    self.$('#totalDonations').html('$' + total);
                    if(collection.models.length > 0){
                        self.$('#myDonationCol').html(myDonationTemplate(collection));
                    }else{
                        self.$('#myDonationCol').html(
                            "<div class=\"panel panel-default\">\n" +
                            "  <div class=\"panel-body\">\n" +
                            "    <p>There is no donation history available.</p>\n" +
                            "  </div>\n" +
                            "</div>");
                    }
                    // self.$('#myDonationsSearchByTags').html(selectTagsTemplate(self.tagCollection));
                },
                error: function(model, response) {
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
                    if(collection.models.length > 0){
                        self.$('#notificationCount').text(collection.models.length.toString());
                        self.$('#notificationsNavItem').html(notificationItemTemplate(collection));
                    }else{
                        self.$('#notificationCount').text("");
                        self.$('#notificationsNavItem').html(
                            "<li'>" +
                            "<div class=\"panel panel-default\">\n" +
                            "  <div class=\"panel-body\">\n" +
                            "    <div class=\"container-fluid\">\n" +
                            "      <div class=\"row blacktext\">\n" +
                            "        <div class=\"col-md-12\"></div>\n" +
                            "<i>You have no <b>new</b> notifications at this time.</i>" +
                            "      </div>\n" +
                            "    </div>\n" +
                            "  </div>\n" +
                            "</div>" +
                            "</li>");
                    }


                    var seenNotificationCollection = new NotificationCollection();
                    seenNotificationCollection.setUrl("read");
                    seenNotificationCollection.fetch({
                        xhrFields: {
                            withCredentials: true
                        },
                        headers: {
                            "uid": self.model.get('uid')
                        },
                        success: function (collection) {
                            if(collection.models.length > 0){
                                self.$('#notificationsNavItem').append('<li class="dropdown-header" style="margin-top: 5px;">earlier</li>');
                                self.$('#notificationsNavItem').append(notificationItemTemplate(collection));
                            }

                        },
                        error: function(model, response) {
                            console.log(response);
                        }
                    });
                },
                error: function(model, response) {
                    console.log(response);
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

            bootbox.confirm({
                message: "Are you sure you want to delete this request?",
                callback: function (result) {
                    if(result){
                        var requestModel = new RequestModel({
                            path: 'delete',
                            rid: ridToDelete
                        });
                        requestModel.destroy({
                            xhrFields: {
                                withCredentials: true
                            },
                            headers: {
                                "rid": ridToDelete
                            },
                            success: function (collection, response, options) {
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

            bootbox.confirm({
                message: "Are you sure you want to APPROVE the org " + nameToApprove + "?",
                callback: function (result) {
                    if(result){
                        var orgToApproveModel = new OrgModel({
                            path: 'approve',
                            oid: oidToApprove
                        });
                        orgToApproveModel.save(null, {
                            success: function (model) {
                                self.renderOrgs();
                            },
                            error: function(err){
                                console.log('there was some error in approving this org.');
                                console.log(err.message);
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
            var duid = $(event.currentTarget).attr('data-duid');

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

            event.stopPropagation();
            var self = this;
            var target = $(event.currentTarget),
                name = target.attr( 'data-name' ),
                tid = parseInt(target.attr( 'data-tid' )),
                idx;

            var addBtn = true;
            var group = target.attr('data-group');

            if (group === "usertag") {
                if ( ( idx = searchUserTagsList.indexOf( tid ) ) > -1 ) {
                    addBtn = false;
                } else {
                    searchUserTagsList.push( tid );
                }
                $( event.target ).blur();
                var locals = {
                    tid: tid,
                    tagname: name,
                    btnColor: "yellow"
                };
                if (addBtn === true) {
                    $('#searchCriteria').append(searchCriteriaButtonTemplate(locals));
                }
            } else if (group === "requesttag") {
                if ( ( idx = searchRequestTagsList.indexOf( tid ) ) > -1 ) {
                    addBtn = false;
                } else {
                    searchRequestTagsList.push( tid );
                }
                $( event.target ).blur();
                var locals = {
                    tid: tid,
                    tagname: name,
                    btnColor: "orange"
                };
                if (addBtn === true) {
                    $('#searchCriteria').append(searchCriteriaButtonTemplate(locals));
                }
            }
            return this;

        },

        updateOrderBy: function (event) {
            event.stopPropagation();
            var self = this;
            var target = $(event.currentTarget);
            var val = target.attr('data-value');
            var id = 0;
            var addSearchCriteriaBtn = true;

            switch (val) {
                case "new":
                    if (age === 'old') {
                        $('#0old').remove();
                    } else if (age === 'new') {
                        addSearchCriteriaBtn = false;
                    }
                    age = 'new';
                    break;
                case "old":
                    if (age === 'new') {
                        $('#0new').remove();
                    } else if (age === 'old') {
                        addSearchCriteriaBtn = false;
                    }
                    age = 'old';
                    break;
                case "high":
                    if (price === 'low') {
                        $('#0low').remove();
                    } else if (price === 'high') {
                        addSearchCriteriaBtn = false;
                    }
                    price = 'high';
                    break;
                case "low":
                    if (price === 'high') {
                        $('#0high').remove();
                    } else if (price === 'low') {
                        addSearchCriteriaBtn = false;
                    }
                    price = 'low';
                    break;
                default:
                    console.log(val);
                    break;
            }

            var locals = {
                tid: id,
                tagname: val,
                btnColor: "turquoise"
            };
            if (addSearchCriteriaBtn === true){
                $('#searchCriteria').append(searchCriteriaButtonTemplate(locals));
            }
            return this;
        },

        goFilterRequests: function () {
            var self = this;

            console.log("FILTER OPTIONS");
            console.log(age);
            console.log(price);
            console.log(searchUserTagsList);
            console.log(searchRequestTagsList);

            self.renderMyNotifications();

            $('#requestFeedSpinner').css("display", "block");
            self.$('#requestCol').html("");
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
                    $('#requestFeedSpinner').css("display", "none");
                    var collectionWithMyID = {
                        collection: collection,
                        myUid: self.model.get('uid')
                    };
                    if (collection.length > 0){
                        self.$('#requestCol').html(requestTemplate(collectionWithMyID));
                    } else {
                        self.$('#requestCol').html(
                            "<div class=\"panel panel-default\">\n" +
                            "  <div class=\"panel-body\">\n" +
                            "    <p style='font-size: 14pt;'>There are no requests with this search criteria.</p>\n" +
                            "  </div>\n" +
                            "</div>");
                    }

                    // self.$('#searchByTags').html(selectTagsTemplate(self.tagCollection));
                },
                error: function(err){
                    $('#requestFeedSpinner').css("display", "none");
                    console.log("error when filtering");
                    console.log(err.message);
                }
            });

            //Clear these lists for the next search.
            // searchRequestTagsList =[];
            // searchUserTagsList = [];
            return this;
        },

        goSearchOrgs: function () {
            var self = this;
            var searchOrgString = $('#searchOrgs').val();

            self.renderMyNotifications();

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
                        if(collection.models.length > 0){
                            self.$('#orgCol').html(orgTemplate(collection));
                        }else{
                            self.$('#orgCol').html('No Orgs matched your search.');
                        }
                    },
                    error: function(err){
                        console.log("error when search orgs");
                        console.log(err.message);
                    }
                });
            } else {
                self.clearSearchOrgs();
            }
            return this;
        },


        clearSearchOrgs: function() {
            var self = this;
            $('#orgSpinner').css('display', 'block');
            $('#searchOrgs').val("");
            var orgCollection = new OrgCollection();
            orgCollection.fetch({
                xhrFields: {
                    withCredentials: true
                },
                success: function (collection) {
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

            self.renderMyNotifications();

            $('#homeLoginSpinner').css('display', 'block');

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
                        $('#homeLoginSpinner').css('display', 'none');

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
                        $('#homeLoginSpinner').css('display', 'none');

                        console.log("error when search users");
                        console.log(err);
                    }
                });
            } else {
                self.clearSearchUsers();
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

        viewNotification: function(event) {
            var self = this;
            var target = $(event.currentTarget);

            var notificationID = target.attr( 'data-nid' );
            var notificationType = target.attr('data-type');
            var targetRid = target.attr('data-rid');
            var seen = target.attr('data-opened');

            if (targetRid > 0) {
                var requestModel = new RequestModel({
                    path: 'rid'
                });

                $('#myRequestSpinner').css("display", "block");
                requestModel.fetch({
                    xhrFields: {
                        withCredentials: true
                    },
                    headers: {
                        "rid": targetRid //113
                    },
                    success: function (model) {
                        $('#myRequestSpinner').css("display", "none");

                        var noteType = parseInt(notificationType);

                        switch (noteType) {
                            case 1: // your request has been fulfilled
                                self.$('#mainHomeContainer').html(myRequestFeedTemplate);
                                self.$('#myRequestCol').html(notificatonRequestTemplate(model.get(0)));
                                break;
                            case 2: // You received a Thank you
                                self.$('#mainHomeContainer').html(myDonationFeedTemplate);
                                self.$('#myDonationCol').html(notificatonRequestTemplate(model.get(0)));
                                break;
                            // case 3: // your tags were verified
                            // case 4: // your tags wer unverifed
                            // case 5: // admin has organization waiting approval
                            // case 6: // your oranization is currently pending approval
                            // case 7: // your organization is approved!
                            // case 8: // your org got denied
                            // case 9: // you've been approved to admin
                            default:
                                break;
                        }

                        self.seeNotification(notificationID, false, seen);
                    },
                    error: function(error){
                        console.log(error.message);
                        $('#myRequestSpinner').css("display", "none");
                        bootbox.alert("There was an error getting your notification: " + notificationID);
                    }
                });
            } else if (seen !== "true"){
                self.seeNotification(notificationID, false, seen);
            }
        },

        seeNotification: function(notificationID, quickMode, seen) {
            var self = this;

            if (seen == true) {
                return;
            }

            var seenNotification = new NotificationModel({
                nid: notificationID
            });
            seenNotification.setUrl('see');


            seenNotification.save(null, {
                xhrFields: {
                    withCredentials: true
                },
                wait: true,
                success: function (model) {
                    if (quickMode !== true){
                        self.renderMyNotifications();
                    }
                },
                error: function(error){
                    console.log('error in saving notification as seen.');
                    console.log(error.message);
                }
            });
        },

        quickViewNotification: function(event) {

            var self = this;
            var target = $(event.currentTarget);

            var notificationID = target.attr( 'data-nid' );

            self.seeNotification(notificationID, true);
            self.$('#nid' + notificationID).remove(); // removed the read icon from the notification
            return;
        },


        removedSearchCriteria: function(event) {
            var self = this;
            var target = $(event.currentTarget);
            var tid = target.attr('id');
            var value = target.attr('data-value');
            target.remove();

            var idx;

            if ( ( idx = searchUserTagsList.indexOf( parseInt(tid) ) ) > -1 ) {
                searchUserTagsList.splice( idx, 1 );
            }

            if ( ( idx = searchRequestTagsList.indexOf( parseInt(tid) ) ) > -1 ) {
                searchRequestTagsList.splice( idx, 1 );
            }

            if (value === 'new' || value === 'old') {
                age = '';
            } else if (value === 'low' || value == 'high') {
                price = '';
            }


            if (searchRequestTagsList.length === 0 && searchUserTagsList.length === 0 && value === ""){

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
                    }
                });
            }
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
        },

        clearNotificationCount: function() {
            var self = this;
            self.$('#notificationCount').text("");
        },

        addUsersButton: function () {
            var self = this;
            var li = $("<li></li>");
            var a  = $("<a></a>");
            a.attr("id", "usersBtn").text("users");
            a.attr("style", "color:black;");
            a.attr("href", "#");
            li.append(a);
            $("#userBthPlaceholder").replaceWith(li);

            $('#usersBtn').click(function(){
                self.renderUsers();
            });

        }
    });
    return HomeView;
});