console.log("in Home View file");
//The HomeView's model is the UserModel

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var popper = require("popper");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var NewRequestModalView = require("views/NewRequestModalView");
    var RequestModel = require("models/RequestModel");
    var OrgModel = require("models/OrgModel");

    var homeTemplate = require("jade!templates/jade_templates/homeTemplate");
    var requestFeedTemplate = require("jade!templates/jade_templates/requestFeedTemplate");
    var requestTemplate = require("jade!templates/jade_templates/requestTemplate");
    var orgsFeedTemplate = require("jade!templates/jade_templates/orgsFeedTemplate");
    var orgTemplate = require("jade!templates/jade_templates/orgTemplate");
    var myProfileTemplate = require("jade!templates/jade_templates/myProfileTemplate");
    var myRequestsTemplate = require("jade!templates/jade_templates/myRequestsTemplate");
    var myDonationsTemplate = require("jade!templates/jade_templates/myDonationsTemplate");

    //todo for testing; delete when done
    var requestModel = new RequestModel({
        description: "My oldest got sick and I had to miss a few days of work last week. Now I'm needing help to pay the rent for next month. Please help!",
        amount: "50",
        date: "Jan 10, 2018",
        tags: "#rent", //todo make sure to add usertags and requesttags to the html
        image: "<img class=\"requestimage\" src=\"/img/rent.jpeg\">",
        fulfilled: false
    });

    var orgModel = new OrgModel({
        name: "Women's Resource Center", //<a class="requestusername" target="_blank" href="https://womenscenter.utah.edu/">Women's Resource Center</a>
        description: "The Women’s Resource Center (WRC) at the University of Utah serves as the central resource for educational and support services for women.  Honoring the complexities of women’s identities, the WRC facilitates choices and changes through programs, counseling, and training grounded in a commitment to advance social justice and equality.",
        email: "some@email.com",
        website: "https://womenscenter.utah.edu/",
        phoneNumber: "801-581-8030",
        address: "A. Ray Olpin Union 200 S. Central Campus Dr, Room 411\n Salt Lake City, UT 84112",
        image: "<img class=\"orglogo\" src=\"/img/u_logo.png\">"
    });


    var HomeView = Backbone.View.extend({

        el: 'body',

        events: {
            "click #homeBtn"          : "renderHome",
            "click #logoMini"         : "renderHome",
            "click #orgsBtn"          : "renderOrgs",
            "click #notesBtn"         : "renderNotes",
            "click #myProfileBtn"     : "renderMyProfile",
            "click #myRequestsBtn"    : "renderMyRequests",
            "click #myDonationsBtn"   : "renderMyDonations",
            "click #newRequestBtn"    : "newRequest",
            "click #logoutBtn"        : "logout"
        },

        initialize: function () {
            console.log("in home view init");
            this.render();
        },


        render: function () {
            console.log("in home view render");
            var self = this;
            self.$el.html(homeTemplate);
            $("#usernameDisplay").html("Welcome, " + self.model.get("username"));
            self.renderHome();
            console.log(self.model)
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
            console.log("in home view renderHome");
            var self = this;
            self.removeSelectedFromAll();
            $("#homeBtn").addClass("selected");
            self.$('#homeContainer').html(requestFeedTemplate);

            //todo need to do dynmaic appending here with RequestCollection
            self.$('#requestCol').append(requestTemplate);
            self.$('#requestAmount').html("$" + requestModel.get("amount"));
            self.$('#requestDate').html(requestModel.get("date"));
            var usertags = "#singleParent<img class=\"checkmark\" src=\"/img/marooncheckmark.png\" title=\"Verified By UofU Women's Resource Center\">#UofUStudent<img class=\"checkmark\" src=\"/img/marooncheckmark.png\" title=\"Verified By UofU Women's Resource Center\">";
            self.$('#requestTags').html(usertags + requestModel.get("tags"));
            self.$('#requestImage').html(requestModel.get("image"));
            self.$('#requestDescription').html(requestModel.get("description"));

            var i;
            for(i = 0; i < 20; i++){
                self.$('#requestCol').append(requestTemplate);
            }

            return this;
        },

        renderOrgs: function () {
            console.log("in home view renderOrgs");
            var self = this;
            self.removeSelectedFromAll();
            $("#orgsBtn").addClass("selected");
            self.$('#homeContainer').html(orgsFeedTemplate);
            self.$('#orgCol').append(orgTemplate);

            //todo need to do dynmaic appending here with OrgCollection
            self.$('#orgName').html("<a class=\"requestusername\" target=\"_blank\" href='" + orgModel.get("website") + "'>" + orgModel.get("name") + "</a>");
            self.$('#orgImage').html(orgModel.get("image"));
            self.$('#orgDescription').html(orgModel.get("description"));
            self.$('#orgWebsite').html("<a target=\"_blank\" href='" + orgModel.get("website") + "'>" + orgModel.get("website") + "</a>");
            self.$('#orgPhone').html(orgModel.get("phoneNumber"));
            self.$('#orgAddress').html(orgModel.get("address"));

            var i;
            for(i = 0; i < 20; i++){
                self.$('#orgCol').append(orgTemplate);
            }

            return this;
        },

        renderNotes: function () {
            console.log("in home view renderNotes");
            var self = this;
            self.removeSelectedFromAll();
            $("#notesBtn").addClass("selected");
            $("#notesBtn").popover();
            console.log("after popover call");
            return this;
        },

        renderMyProfile: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            self.removeSelectedFromAll();
            $("#myProfileBtn").addClass("selected");
            self.$('#homeContainer').html(myProfileTemplate);

            $("#myEmail").html(self.model.get("email"));
            // $("#myTags").html(self.model.get("tags"));
            $("#myBio").html(self.model.get("bio"));

            return this;
        },

        renderMyRequests: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            self.removeSelectedFromAll();
            $("#myRequestsBtn").addClass("selected");
            self.$('#homeContainer').html(myRequestsTemplate);
            return this;
        },

        renderMyDonations: function () {
            console.log("in home view renderMyProfile");
            var self = this;
            self.removeSelectedFromAll();
            $("#myDonationsBtn").addClass("selected");
            self.$('#homeContainer').html(myDonationsTemplate);
            return this;
        },

        newRequest: function () {
            console.log("in newRequest function");
            var self = this;
            var container = document.createDocumentFragment();
            var newRequestModalView = new NewRequestModalView({
                parent: self,
                model: new RequestModel({})
            });
            container.appendChild(newRequestModalView.render().el);
            $('body').append(container);
            return this;
        },

        logout: function () {
            console.log("logging out...");
            //todo do logout stuff here

        }

    });

    return HomeView;
});