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

require(["jquery", "views/ResetPasswordView"], function ($, ResetPasswordView) {

    $(document).ready(function() {
        new ResetPasswordView({
            hashhash: hashInfo
        });
    });
});