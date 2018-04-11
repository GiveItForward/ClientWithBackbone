require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: [
                'jquery'
            ]
        },
        bootbox: {
            deps: [
                'jquery',
                'bootstrap'
            ],
            exports: 'bootbox'
        }
    },
    paths: {
        jquery: '../lib/jquery-3.3.1',
        underscore: '../lib/underscore-min',
        backbone: '../lib/backbone-min',
        bootstrap: '../lib/bootstrap.min',
        bootbox: '../lib/bootbox.min',
        jadeRuntime: '../../node_modules/jade-runtime',
        templates: '../templates',
        modals: '../templates/modals',
        jade: './jade',
        sha256: '../lib/sha256.min',
        // aws: 'https://sdk.amazonaws.com/js/aws-sdk-2.183.0.min'
    }
});

require(["jquery", "views/HomeView", "models/UserModel"], function ($, HomeView, UserModel) {

    $(document).ready(function() {

        var userModel = new UserModel({
            uid: userInfo.uid,
            path: "login",
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            bio: userInfo.bio,
            donateCount: userInfo.donateCount,
            receiveCount: userInfo.receiveCount,
            image: userInfo.image,
            tags: userInfo.tags,
            isAdmin: userInfo.isAdmin,
            orgId: userInfo.orgId,
            firstname: userInfo.firstname,
            lastname: userInfo.lastname
        });

        new HomeView({
            model: userModel
        });
    });
});