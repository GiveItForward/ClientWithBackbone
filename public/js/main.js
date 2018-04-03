require.config({
   paths: {
       jquery : '../lib/jquery',
       underscore: '../lib/underscore-min',
       backbone: '../lib/backbone-min',
       bootstrap: '../lib/bootstrap.bundle.min',
       bootbox: '../lib/bootbox.min',
       jadeRuntime: '../../node_modules/jade-runtime',
       templates: '../templates',
       modals: '../templates/modals',
       signupView: '../../views/signup',
       jade: './jade',
       sha256: '../lib/sha256.min'
       // aws: 'https://sdk.amazonaws.com/js/aws-sdk-2.183.0.min'
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
        // popper: {
        //     deps: [
        //         'jquery'
        //     ],
        //     exports: 'popper'
        // },
        bootstrap: {
            deps: [
                'jquery',
                // 'popper'
            ],
            exports: 'bootstrap'
        },
        'bootstrap/affix':      { deps: ['jquery'], exports: '$.fn.affix' },
        'bootstrap/alert':      { deps: ['jquery'], exports: '$.fn.alert' },
        'bootstrap/button':     { deps: ['jquery'], exports: '$.fn.button' },
        'bootstrap/carousel':   { deps: ['jquery'], exports: '$.fn.carousel' },
        'bootstrap/collapse':   { deps: ['jquery'], exports: '$.fn.collapse' },
        'bootstrap/dropdown':   { deps: ['jquery'], exports: '$.fn.dropdown' },
        'bootstrap/modal':      { deps: ['jquery'], exports: '$.fn.modal' },
        'bootstrap/popover':    { deps: ['jquery'], exports: '$.fn.popover' },
        'bootstrap/scrollspy':  { deps: ['jquery'], exports: '$.fn.scrollspy' },
        'bootstrap/tab':        { deps: ['jquery'], exports: '$.fn.tab'        },
        'bootstrap/tooltip':    { deps: ['jquery'], exports: '$.fn.tooltip' },
        'bootstrap/transition': { deps: ['jquery'], exports: '$.fn.transition' },
        // 'bootstrap-select':     { deps: ['jquery', 'bootstrap'], exports: 'bootstrapSelect'},
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
        function onSignIn(googleUser) {
            // Useful data for your client-side scripts:
            console.log('in main js');

            var profile = googleUser.getBasicProfile();
            console.log("ID: " + profile.getId()); // Don't send this directly to your server!
            console.log('Full Name: ' + profile.getName());
            console.log('Given Name: ' + profile.getGivenName());
            console.log('Family Name: ' + profile.getFamilyName());
            console.log("Email: " + profile.getEmail());

            // The ID token you need to pass to your backend:
            var id_token = googleUser.getAuthResponse().id_token;
            console.log("ID Token: " + id_token);
            var view = new LandingView();
            view.trigger('#googleIn', googleUser);
        };
        new LandingView();
    });
});