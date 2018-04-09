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
        fontawesome: '../lib/fontawesome-all.min.js'
        // aws: 'https://sdk.amazonaws.com/js/aws-sdk-2.183.0.min'
    }
});

require(["jquery", "views/LandingView"], function ($, LandingView) {
    $(document).ready(function() {
        new LandingView();
    });
});