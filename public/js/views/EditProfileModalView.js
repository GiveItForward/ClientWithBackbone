var editProfileTagList = [];
var saveMe = false;

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var editProfileModal = require("text!templates/modals/editProfileModal.html");

    var ChooseUserImageModalView = require("views/ChooseUserImageModalView");

    var UserModel = require("models/UserModel");
    var NLPModel = require("models/NLPModel");

    var EditProfileModalView = Backbone.View.extend({

        el: editProfileModal,

        events: {
            "click #cancelEditProfileBtn"   : "destroyEditProfileModal",
            "click #exitEditProfileModal"   : "destroyEditProfileModal",
            "click #updateProfileBtn"       : "save",
            "click #editProfileImage"       : "changeImage",
            "click .dropdown-menu a"        : "updateEditProfileTags",
            "click .deleteTag"              : "deleteTag",
            "keyup"                         : "enableUpdateButton",
            "change"                        : "enableUpdateButton"
        },

        initialize: function (options) {
            this.parent = options.parent;
            this.model = options.model;
            this.collection = options.collection;
            $('#editProfileErrorLabel').html('');
        },

        render: function () {
            var self = this;
            self.el = editProfileModal;
            self.setElement(this.el);
            console.log(self.model);

            _.each(self.model.get('tags'), function(model){
                editProfileTagList.push(model.tagname);
            });

            self.renderEditTagList(self.model.get('tags'));
            self.$('#editProfileImage').attr('src', self.model.get('image'));
            self.$('#editFirst').val(self.model.get('firstname'));
            self.$('#editLast').val(self.model.get('lastname'));
            self.$('#editUsername').val(self.model.get('username'));
            self.$('#editBio').val(self.model.get('bio'));
            self.$('#editEmail').val(self.model.get('email'));
            self.$('#updateProfileBtn').prop("disabled", true);
            console.log(editProfileTagList);
            return this;
        },

        renderEditTagList: function (oldTags) {
            var self = this;
            var tagString = '';
            var currTagsString = '';
            _.each(self.collection.models, function(model) {
                var contained = false;
                contained = _.find(oldTags, function(tag) {
                    if(tag.tagname === model.get("tagname")){
                        return true;
                    }
                });
                if(contained){
                    currTagsString += '<button type="button" class="btn btn-default light-yellow deleteTag" aria-label="Close" style="border-radius:25px;" data-value="' + model.get("tagname") + '">' + model.get("tagname") +
                        '<span aria-hidden="true">  &times;</span>' +
                        '</button>'
                }else{
                    tagString += '<li><a href="#" data-value="' + model.get("tagname") + '" tabindex="-1">' + model.get('tagname') + '</a></li>'
                }
            });
            self.$('#editRequestTags').html(tagString);
            self.$('#currentTags').html(currTagsString);
            return this;
        },

        deleteTag: function(event) {
            var self = this;

            var target = $(event.currentTarget),
                val = target.attr( 'data-value' ),
                $inp = target.find( 'input' ),
                idx;
            if ( ( idx = editProfileTagList.indexOf( val ) ) > -1 ) {
                editProfileTagList.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
            } else {
                editProfileTagList.push( val );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
            }

            self.$('#editRequestTags').append('<li><a href="#" data-value="' + val + '" tabindex="-1" data-value="' + val + '">' + val + '</a></li>');
            target.remove();
            self.$('#updateProfileBtn').prop("disabled", false);
        },


        changeImage: function () {
            var self = this;
            var container = document.createDocumentFragment();
            var chooseUserImageModalView = new ChooseUserImageModalView({
                parent: self,
                update: true
            });
            container.appendChild(chooseUserImageModalView.render().el);
            $('body').append(container);
            return this;
        },

        updateEditProfileTags: function (event) {
            var self = this;
            var target = $(event.currentTarget);

            editProfileTagList.push( target.attr('data-value') );

            target.remove();

            self.$('#currentTags').append('<button type="button" class="btn btn-default light-yellow deleteTag" aria-label="Close" style="border-radius:25px;" data-value="' + target.attr('data-value') + '">' + target.attr('data-value') +
            '<span aria-hidden="true">  &times;</span>' +
            '</button>');

            self.$('#updateProfileBtn').prop("disabled", false);
            return this;
        },

        enableUpdateButton: function () {
            var self = this;
            self.$('#updateProfileBtn').prop("disabled", false);
        },

        checkBioWithNLPAndSave: function () {
            console.log('in checkBioWithNLP');
            var self = this;
            var nlpModel = new NLPModel({
                string: $("#editBio").val()
            });
            self.$('#updateProfileBtn').prop("disabled", true);
            nlpModel.save(null, {
                type: 'POST',
                xhrFields: {
                    withCredentials: true
                },
                success: function(model, response) {
                    console.log('success in fetch of NLP model');
                    console.log(model);
                    var warningMessage = "";
                    if(model.get('person') !== '' && model.get('city') !== '') {
                        warningMessage = "We suspect the following may be the names of cities and people in your bio: <B>" +
                            model.get('city') + ", " + model.get('person') + "</B>. <br>We strongly suggest against using this potentially personal information in order to protect your anonymity."
                    }else if(model.get('city') !== '') {
                        warningMessage = "We suspect the following may be the name of a city or cities in your bio: <b>" +
                            model.get('city')  + "</b>. <br>We strongly suggest against using this potentially personal information in order to protect your anonymity."
                    }else if(model.get('person') !== '') {
                        warningMessage = "We suspect the following may be the name of a person or people in your bio: <B>" +
                            model.get('person')  + "</B>. <br>We strongly suggest against using this potentially personal information in order to protect your anonymity."
                    }

                    if(warningMessage !== ""){
                        bootbox.confirm({
                            message: warningMessage,
                            buttons: {
                                confirm: {
                                    label: 'use bio anyway'
                                },
                                cancel: {
                                    label: 'back to edit'
                                }
                            },
                            callback: function (result) {
                                if(result){
                                   self.save();
                                } else {
                                    self.$('#updateProfileBtn').prop("disabled", false);
                                }
                            }
                        });
                    }else{
                        self.save();
                    }
                },
                error: function(model, response) {
                    console.log('There was a problem with the NLP model.');
                    console.log(model);
                    console.log(response);
                    $('#requestErrorLabel').html('There was a problem with the NLP model.');
                }});
        },

        save: function () {
            var self = this;

            var updatedUserModel = new UserModel({
                path: 'update',
                uid: self.model.get('uid'),
                username: self.model.get('username'),
                firstname: $("#editFirst").val(),
                lastname: $("#editLast").val(),
                isAdmin: self.model.get('isAdmin'),
                email: self.model.get('email'),
                image: self.model.get('image'), //this is reset in the change image modal
                bio: $("#editBio").val()
            });
            var tagArr = [];
            _.each(editProfileTagList, function(tag) {
                var tagObj = Backbone.Model.extend({
                    defaults: {
                        tagname: tag,
                        // tid: 1
                    }
                });
                tagArr.push(new tagObj());
            });
            updatedUserModel.set("tags", tagArr);

            updatedUserModel.save(null, {
                wait: true,
                success: function(model, response) {
                    console.log('success in saving updated request');
                    console.log(model);
                    self.parent.model = model;
                    self.parent.renderMyProfile();
                    self.destroyEditProfileModal();
                },
                error: function(model, response) {
                    console.log(model);
                    console.log(response);
                    $('#requestErrorLabel').html('There was a problem updating your profile.');
                }
            });

            return this;
        },

        destroyEditProfileModal: function () {
            var self = this;
            $('#editProfileModal').fadeOut('slow', function () {
                self.undelegateEvents();
                self.$el.removeData().unbind();
                requestTagList = [];
                self.model = undefined;
                self.remove();
                Backbone.View.prototype.remove.call(self);
            });
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    });
    return EditProfileModalView;
});