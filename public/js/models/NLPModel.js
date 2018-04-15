define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");

    var NLPModel = Backbone.Model.extend({

        idAttribute: "stringToCheck",

        initialize: function (options) {

            this.url = '/api/nlp/';
        }

        //NLP model will send string to backend to be analyzed and get back two booleans: person, city

    });
    return NLPModel;
});
