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
    var NotificationsModalView = require("views/NotificationsModalView");

    var RequestModel = require("models/RequestModel");
    var RequestCollection = require("models/RequestCollection");
    var OrgModel = require("models/OrgModel");
    var OrgCollection = require("models/OrgCollection");

    var homeTemplate = require("jade!templates/jade_templates/homeTemplate");
    var requestFeedTemplate = require("jade!templates/jade_templates/requestFeedTemplate");
    var requestTemplate = require("jade!templates/jade_templates/requestTemplate");
    var orgsFeedTemplate = require("jade!templates/jade_templates/orgsFeedTemplate");
    var orgTemplate = require("jade!templates/jade_templates/orgTemplate");
    var myProfileTemplate = require("jade!templates/jade_templates/myProfileTemplate");
    var myRequestFeedTemplate = require("jade!templates/jade_templates/myRequestFeedTemplate");
    var myRequestTemplate = require("jade!templates/jade_templates/myRequestTemplate");
    var myDonationFeedTemplate = require("jade!templates/jade_templates/myDonationFeedTemplate");
    var myDonationTemplate = require("jade!templates/jade_templates/myDonationTemplate");

    //todo for testing; delete when done
    var requestModel1 = new RequestModel({
        username: "@undefined",
        userimage: "/img/anonUser.png",
        description: "My oldest got sick and I had to miss a few days of work last week. Now I'm needing help to pay the rent for next month. Please help!",
        amount: "50",
        date: "Jan 10, 2018",
        tags: "#rent", //todo make sure to add usertags and requesttags to the html
        image: "/img/rent.jpeg",
        fulfilled: false
    });

    var requestModel2 = new RequestModel({
        username: "@undefined",
        userimage: "/img/anonUser.png",
        description: "blah blah 2 My oldest got sick and I had to miss a few days of work last week. Now I'm needing help to pay the rent for next month. Please help!",
        amount: "60",
        date: "Jan 11, 2018",
        tags: "#other", //todo make sure to add usertags and requesttags to the html
        image: "/img/maroon_daisy.png",
        fulfilled: false
    });

    var requestModel3 = new RequestModel({
        username: "@undefined",
        userimage: "/img/anonUser.png",
        description: "blah blah 3 My oldest got sick and I had to miss a few days of work last week. Now I'm needing help to pay the rent for next month. Please help!",
        amount: "70",
        date: "Jan 12, 2018",
        tags: "#forAChild", //todo make sure to add usertags and requesttags to the html
        image: "/img/oldShoes.jpg",
        fulfilled: false
    });

    var orgModel1 = new OrgModel({
        name: "Women's Resource Center", //<a class="requestusername" target="_blank" href="https://womenscenter.utah.edu/">Women's Resource Center</a>
        description: "The Women’s Resource Center (WRC) at the University of Utah serves as the central resource for educational and support services for women.  Honoring the complexities of women’s identities, the WRC facilitates choices and changes through programs, counseling, and training grounded in a commitment to advance social justice and equality.",
        email: "some@email.com",
        website: "https://womenscenter.utah.edu/",
        phoneNumber: "801-581-8030",
        address: "A. Ray Olpin Union 200 S. Central Campus Dr, Room 411\n Salt Lake City, UT 84112",
        image: "/img/u_logo.png"
    });

    var orgModel2 = new OrgModel({
        name: "Veteran's Support Center",
        description: "Our mission is to improve and enhance the individual and academic success of veterans, service members, and their family members who attend the university; to help them receive the benefits they earned; and to serve as a liaison between the student veteran community and the university.",
        email: "some@email.com",
        website: "https://veteranscenter.utah.edu/",
        phoneNumber: "801-581-8030",
        address: "A. Ray Olpin Union 200 S. Central Campus Dr, Room 411\n Salt Lake City, UT 84112",
        image: "/img/u_vet_logo.gif"
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

        initialize: function (options) {
            console.log("in home view init");
            this.model = options.model;
            this.render();
        },


        render: function () {
            console.log("in home view render");
            var self = this;
            self.$el.html(homeTemplate);

            console.log(self.model);
            console.log(self.model.get("numDonations"));
            console.log(self.model.get("numFulfilledRequests"));

            $("#usernameDisplay").html("Welcome, " + self.model.get("username"));
            $("#donateCount").html(self.model.get("donateCount"));
            $("#receiveCount").html(self.model.get("receiveCount"));
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
            console.log("in home view renderHome");
            var self = this;
            self.removeSelectedFromAll();
            $("#homeBtn").addClass("selected");
            self.$('#homeContainer').html(requestFeedTemplate);

            var requestCollection = new RequestCollection();
            var count = 0;

            requestCollection.fetch({
                success: function (collection) {
                    _.each(collection.models, function(model) {
                        //todo hard coded data for now; should come from DB
                        model.set('username', "@undefined");
                        model.set('userimage', "/img/default_profile_pic.png");
                        model.set('date', "Jan 11, 2018");
                        model.set('tags', "#other");  //todo make sure to add usertags and requesttags to the html
                        if(count == 0){
                            model.set('image', "/img/rent_icon.png");
                            count++;
                        }else if(count == 1){
                            model.set('image', "/img/clothing_icon.png");
                            count++;
                        }else if(count == 2){
                            model.set('image', "/img/car_repair_icon.png");
                            count++;
                        }else if(count == 3){
                            model.set('image', "/img/groceries_icon.png");
                            count++;
                        }else if(count == 4){
                            model.set('image', "/img/school_icon.png");
                            count = 0;
                        }
                        // console.log(model.toJSON());
                    })
                    console.log(collection.models);
                    self.$('#requestCol').html(requestTemplate(collection));
                    // self.$('#requestCol').append(requestTemplate(requestCollection));//todo something weird here with requestCollection
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
                    _.each(collection.models, function(model) {
                        model.set('description', "This organization wants to help you! This organization wants to help you! This organization wants to help you!");
                        model.set('phoneNumber', "801-581-8030");
                        model.set('address', "A. Ray Olpin Union 200 S. Central Campus Dr, Room 411\n Salt Lake City, UT 84112");
                        model.set('image', "/img/u_logo.png");
                        // console.log(model.toJSON());
                    });
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
            // $("#notesBtn").popover();
            // //todo do a modal here, this popover sucksass
            // console.log("after popover call");
            var self = this;
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
            self.removeSelectedFromAll();
            $("#myProfileBtn").addClass("selected");
            self.$('#homeContainer').html(myProfileTemplate);

            $("#myEmail").html(self.model.get("email"));
            var tags = self.model.get("tags");
            var tagList = "";
            _.each(tags, function(tag) {
                tagList += "#" + tag + " ";
            });
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

            self.$('#myRequestCol').html(myRequestTemplate);
            return this;
        },

        renderMyDonations: function () {
            console.log("in home view renderMyDonations");

            var self = this;
            console.log(self.model.get('uid'));
            self.removeSelectedFromAll();
            $("#myDonationsBtn").addClass("selected");
            self.$('#homeContainer').html(myDonationFeedTemplate);
            // self.$('#myDonationCol').html(myDonationTemplate);

            var requestCollection = new RequestCollection();
            requestCollection.fetchByDonateUid({
                // headers: {'Authorization' : self.model.get('uid')},
                headers: {'Authorization' : 4},
                success: function (collection) {
                    _.each(collection.models, function(model) {
                        console.log(model.toJSON());
                    })
                    console.log(collection.models);
                    // self.$('#requestCol').html(requestTemplate(collection));
                    // self.$('#myDonationCol').html(myDonationTemplate);
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
                model: new RequestModel({})
            });
            container.appendChild(newRequestModalView.render().el);
            $('body').append(container);
            return this;
        },

        logout: function () {
            console.log("logging out...");
            bootbox.confirm({
                message: "Are you sure you want to log out?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'greyBtn'
                    },
                    cancel: {
                        label: 'No',
                        className: 'wineBtn'
                    }
                },
                callback: function (result) {
                    console.log('This was logged in the callback: ' + result);
                    if(result){
                        window.location.href = '/index';
                    }

                }
            });



            //todo do logout stuff here

        }

    });

    return HomeView;
});