require.config({
   paths: {
       jquery : '../lib/jquery',
       underscore: '../lib/underscore-min',
       backbone: '../lib/backbone-min',
       popper: '../lib/popper.min',
       bootstrap: '../lib/bootstrap.min',
       bootbox: '../lib/bootbox.min',
       templates: '../templates',
       signupView: '../../views/signup',
       jade: './jade'
   },
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
        popper: {
            deps: [
                'jquery'
            ],
            exports: 'popper'
        },
        bootstrap: {
            deps: [
                'jquery',
                'popper'
            ],
            exports: 'bootstrap'
        },
        bootbox: {
            deps: [
                'jquery',
                'bootstrap'

            ],
            exports: 'bootbox'
        }
    }
});

require(["jquery", "views/LandingView"], function ($, LandingView) {
    $(document).ready(function() {
        new LandingView();
    });
});