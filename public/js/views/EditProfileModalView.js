var editProfileTagList = [];

define(function (require, exports, module) {

    var $ = require("jquery");
    var _ = require("underscore");
    var Backbone = require("backbone");
    var bootstrap = require("bootstrap");
    var bootbox = require("bootbox");

    var editProfileModal = require("text!templates/modals/editProfileModal.html");

    var ChooseUserImageModalView = require("views/ChooseUserImageModalView");

    var UserModel = require("models/UserModel");

    var EditProfileModalView = Backbone.View.extend({

        el: editProfileModal,

        events: {
            "click #cancelEditProfileBtn"    : "destroyEditProfileModal",
            "click #exitEditProfileModal"    : "destroyEditProfileModal",
            "click #updateProfileBtn"        : "save",
            "click #changeImage"             : "changeImage",
            "click .dropdown-menu a"         : "updateEditProfileTags",
            "keyup"                          : "updateEditProfileModel",
            "change"                         : "updateEditProfileModel"
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

            // editProfileTagList = self.model.get('tags');
            _.each(self.model.get('tags'), function(model){
                editProfileTagList.push(model.tagname);
            });

            self.renderEditTagList(self.model.get('tags'));
            self.$('#editProfileImage').attr('src', self.model.get('image'));
            self.$('#editFirst').val(self.model.get('firstname'));
            self.$('#editLast').val(self.model.get('lastname'));
            // self.$('#editUsername').attr(self.model.get('username'));
            self.$('#editBio').html(self.model.get('bio'));

            self.$('#updateProfileBtn').prop("disabled", true);
            console.log(editProfileTagList);
            return this;
        },

        renderEditTagList: function (oldTags) {
            var self = this;
            console.log('oldTags: ');
            console.log(oldTags);
            var tagString = '';
            _.each(self.collection.models, function(model) {
                var contained = false;
                contained = _.find(oldTags, function(tag) {
                    if(tag.tagname === model.get("tagname")){
                        return true;
                    }
                });
                if(contained){
                    console.log("model === oldTag");
                    tagString += '<li><a href="#" data-value="' + model.get("tagname") + '" data-tid="' + model.get("tid") + '" tabindex="-1">\n' +
                        '<input id="' + model.get("tagname") + '" type="checkbox" checked="true" name="editProfileTag"/></a>&nbsp;#' + model.get('tagname') + '</li>';
                }else{
                    console.log("model !== oldTag");
                    tagString += '<li><a href="#" data-value="' + model.get("tagname") + '" data-tid="' + model.get("tid") + '" tabindex="-1">\n' +
                        '<input id="' + model.get("tagname") + '" type="checkbox" name="editProfileTag"/></a>&nbsp;#' + model.get('tagname') + '</li>';
                }
            });
            self.$('#editRequestTags').html(tagString);
            return this;
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
            // this function from https://codepen.io/bseth99/pen/fboKH?editors=1010
            var $target = $(event.currentTarget),
                val = $target.attr( 'data-value' ),
                $inp = $target.find( 'input' ),
                idx;
            if ( ( idx = editProfileTagList.indexOf( val ) ) > -1 ) {
                editProfileTagList.splice( idx, 1 );
                setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
            } else {
                editProfileTagList.push( val );
                setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
            }
            $( event.target ).blur();
            console.log( editProfileTagList );
            self.$('#updateProfileBtn').prop("disabled", false);
            return this;
        },

        updateEditProfileModel: function () {
            var self = this;
            self.model.set("firstname", $("#editFirst").val());
            self.model.set("lastname", $("#editLast").val());
            self.model.set("image", $("#editProfileImage").attr('src')); //being set in chooseImageModal
            self.model.set("bio", $("#editBio").val());
            self.model.set("tags", editProfileTagList);
            console.log(self.model);

            self.$('#updateProfileBtn').prop("disabled", false);
        },

        save: function () {
            var self = this;
            console.log("in createRequest function");
            self.updateEditProfileModel();

            // bootbox.alert("update profile is almost ready, but not quite. Please be patient.");

            //todo something weird with the tags coming back
            var updatedUserModel = new UserModel({
                path: 'update',
                uid: self.model.get('uid'),
                username: self.model.get('username'),
                firstname: self.model.get('firstname'),
                lastname: self.model.get('lastname'),
                isAdmin: self.model.get('isAdmin'),
                email: self.model.get('email'),
                image: self.model.get('image'),
                bio: self.model.get('bio')
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

            console.log("user model to update: ");
            console.log(updatedUserModel);

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