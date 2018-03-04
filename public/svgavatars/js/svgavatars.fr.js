/**************************************************************************
 * svgavatars.fr.js - French file
 * @version: 1.3 (20.01.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
**************************************************************************/

function svgAvatarsTranslation (png_one_download_size, png_two_download_size) {

//Ready for the translation to your language (any text inside quotes and please don't break JavaScript sintax!)
return welcome_slogan = '<h2>Bienvenue sur le Générateur d\'Avatars SVG</h2>',
    welcome_msg = '<p>veuillez choisir un genrep</p>',
    wait_msg = '<p>veuillez patienter...</p>',
    rnd_msg  = 'aléatoire',
    reset_msg  = 'reinitialiser',
    save_msg  = 'enregistrer',
    share_msg = 'partager',
    gravatar_msg = 'Gravatar',
    dnl_msg  = 'télécharger',
    svg_msg = 'svg - format vecteur',
    png_one_msg = 'png - ' + png_one_download_size + 'x' + png_one_download_size,
    png_two_msg = 'png - ' + png_two_download_size + 'x' + png_two_download_size,
    confirm_msg = '<h3>Etes-vous sûr ?</h3><p>Tous les changements actuels seront perdus.</p>',
    ios_msg = '<p>Veuillez appuyez longuement sur l\'image et choisissez Enregistrer</p>',
    gravatar_title = '<h3>Vous pouvez uploader et utiliser l\'avatar créé en tant Gravatar</h3><p>Veuillez entrer votre adresse email et mot de passe Gravatar</p>',
    gravatar_email = 'Votre adresse email Gravatar',
    gravatar_pwd = 'Votre mot de passe Gravatar',
    gravatar_rating = 'Note :',
    gravatar_note ='<p><small>Remarque : Votre adresse email et votre mot de passe me seront JAMAIS enregistrés sur nos serveurs</small></p>',
    install_msg = 'uploader',
    alert_svg_support_error = 'Désolé mais votre navigateur ne supporte pas le SVG(Scalable Vector Graphic).<br> Le Générateur d\'Avatars ne peut pas être lancé.',
    alert_json_error = '<h3>Erreur lors du chargement des données graphiques !</h3><p>Veuillez recharger la page</p>',
    alert_success = '<h3>Votre avatar est stocké sur nos serveurs.</h3><p>Merci !</p>',
    alert_error = '<h3>L\'avatar n\'est pas enregistré !</h3><p>Veuillez réessayer</p>',
    alert_error_download = '<h3>Une erreur s\'est produite !</h3><p>Veuillez réessayer</p>',
    alert_error_image = '<h3>L\'image est abîmée !</h3><p>Veuillez réessayer</p>',
    alert_success_gravatar = '<h3>Félicitatations !</h3><p>Vous avez changé votre Gravatar avec succès.</p><p>Veuillez attendre entre 5 et 10 minutes pour que les changements de l\'avatar prennent effet</p>',
    alert_common_error_gravatar = '<h3>Une erreur inconnue s\'est produite !</h3><p>Veuillez réessayer</p>',
    alert_error_ratingfail = '<h3>Mauvaise valeur entrée pour la note !</h3><p>Ne modifiez pas les valeurs. Veuillez réessayer</p>',
    alert_error_emailfail = '<h3>L\'adresse email est vide !</h3><p>Veuillez entrer votre adresse email et réessayer</p>',
    alert_error_passwordfail = '<h3>Le mot de passe est vide !</h3><p>Veuillez entrer votre mot de passe et réessayer</p>',
    alert_error_imagefail = '<h3>Une erreur s\'est produite lors de la conversion de votre avatar en données PNG</h3><p>Veuillez réessayer</p>',
    alert_error_faultcode_8 = '<h3>Erreur interne sur secure.gravatar.com</h3><p>Veuillez réessayer plus tard</p>',
    alert_error_faultcode_9 = '<h3>Adresse email ou mot de passe incorrect !</h3><p>Veuillez les vérifier et réessayer</p>',
    crd_msg = 'Moteur graphique par ',
    ok_msg = 'ok',
    cancel_msg = 'annuler',
    close_msg = 'fermer',
    tryagain_msg = 'réessayer',
    block_titles = {
        face:'visage',
        eyes:'yeux',
        hair:'cheveux',
        clothes:'vêtements',
        backs:'fond'
    },
    body_zone_titles = {
        backs:'de base',
        faceshape:'forme',
        chinshadow:'',//not displayed, just for compatibility
        facehighlight:'',//not displayed, just for compatibility
        humanbody:'',//not displayed, just for compatibility
        clothes:'de base',
        hair:'sur la tête',
        ears:'oreilles',
        eyebrows:'sourcils',
        eyesback:'',//not displayed, just for compatibility
        eyesiris:'iris',
        eyesfront:'forme des yeux',
        mouth:'bouche',
        nose:'nez',
        glasses:'lunettes',
        mustache:'moustache',
        beard:'barbe'
    };
};