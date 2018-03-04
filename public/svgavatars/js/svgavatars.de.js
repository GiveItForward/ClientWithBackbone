/**************************************************************************
 * svgavatars.de.js - German file
 * @version: 1.3 (20.01.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
**************************************************************************/

function svgAvatarsTranslation (png_one_download_size, png_two_download_size) {

//Ready for the translation to your language (any text inside quotes and please don't break JavaScript sintax!)
return welcome_slogan = '<h2>Willkommen bei SVG Avatar Generator</h2>',
    welcome_msg = '<p>Bitte wählen Sie ein Geschlecht</p>',
    wait_msg = '<p>bitte wartene...</p>',
    rnd_msg  = 'zufällig',
    reset_msg  = 'verwerfen',
    save_msg  = 'speichern',
    share_msg = 'teilen',
    gravatar_msg = 'Gravatar',
    dnl_msg  = 'herunterladen',
    svg_msg = 'svg - Vektor Format',
    png_one_msg = 'png - ' + png_one_download_size + 'x' + png_one_download_size,
    png_two_msg = 'png - ' + png_two_download_size + 'x' + png_two_download_size,
    confirm_msg = '<h3>Sind Sie sicher?</h3><p>Alle aktuellen Änderungen gehen verloren.</p>',
    ios_msg = '<p>Bitte tippen und halten Sie das Bild und wählen Sie Speichern.</p>',
    gravatar_title = '<h3>Sie können den erstellten Avatar hochladen und als Ihren Gravatar verwenden.</h3><p>Bitte geben Sie Ihre Gravatar E-mail und Ihr Passwort ein.</p>',
    gravatar_email = 'Ihre Gravatar E-mail',
    gravatar_pwd = 'Ihr Gravatar Passwort',
    gravatar_rating = 'Wertung:',
    gravatar_note ='<p><small>Anmerkung: Ihre E-mail und Ihr Passwort werden NIE auf unserem Server gespeichert.</small></p>',
    install_msg = 'hochladen',
    alert_svg_support_error = 'Es tut uns leid, aber Ihr Browser unterstützt kein SVG (scalable Vector Graphic).<br> Avatar Generator kann nicht starten.',
    alert_json_error = '<h3>Fehler beim Grafikdaten laden!</h3><p>Bitte laden Sie die Seite neu.</p>',
    alert_success = '<h3>Ihr Avatar ist auf unserem Server gespeichert.</h3><p>Danke!</p>',
    alert_error = '<h3>Avatar ist nicht gespeichert!</h3><p>Bitte versuchen Sie es erneut.</p>',
    alert_error_download = '<h3>Ein Fehler ist aufgetreten!</h3><p>Bitte versuchen Sie es erneut.</p>',
    alert_error_image = '<h3>Das Bild is kaputt!</h3><p>Bitte versuchen Sie es erneut.</p>',
    alert_success_gravatar = '<h3>Herzlichen Glückwunsch!</h3><p>Sie haben erfolgreich Ihren Gravatar geändert.</p><p>Bitte warten Sie 5 bis 10 Minuten für die Avatar Änderung wirksam zu werden.</p>',
    alert_common_error_gravatar = '<h3>Ein Fehler ist aufgetreten!</h3><p>Bitte versuchen Sie es erneut.</p>',
    alert_error_ratingfail = '<h3>Der falsche Bewertungswert!</h3><p>Eingangsverhältnisswerte nicht ändern. Bitte versuchen Sie es erneut</p>',
    alert_error_emailfail = '<h3>E-mail ist leer!</h3><p>Bitte geben Sie Ihre E-mail ein und versuchen Sie es erneut.</p>',
    alert_error_passwordfail = '<h3>Passwort ist leer!</h3><p>Bitte geben Sie Ihr Passwort ein und versuchen Sie es erneut.</p>',
    alert_error_imagefail = '<h3>Ein Fehler mit der Umwandlung Ihrer Avatar in PNG- Daten ist aufgetreten.</h3><p>Bitte versuchen Sie es erneut.</p>',
    alert_error_faultcode_8 = '<h3>Interner Fehler auf secure.gravatar.com</h3><p>Bitte versuchen Sie es erneut.</p>',
    alert_error_faultcode_9 = '<h3>Falsche E-mail oder Passwort!</h3><p>Bitte überprüfen Sie diese und versuchen Sie es erneut.</p>',
    crd_msg = 'Graphik Engine von ',
    ok_msg = 'ok',
    cancel_msg = 'abbrechen',
    close_msg = 'schließen',
    tryagain_msg = 'Versuchen Sie es erneut',
    block_titles = {
        face:'Gesicht',
        eyes:'Augen',
        hair:'Haare',
        clothes:'Kleidung',
        backs:'Hintergrund'
    },
    body_zone_titles = {
        backs:'Basic',
        faceshape:'Form',
        chinshadow:'',//nicht angezeigt, nur für Kompatibilität
        facehighlight:'',//nicht angezeigt, nur für Kompatibilität
        humanbody:'',//nicht angezeigt, nur für Kompatibilität
        clothes:'Basic',
        hair:'auf dem Kopf',
        ears:'Ohren',
        eyebrows:'Augenbrauen',
        eyesback:'',//nicht angezeigt, nur für Kompatibilität
        eyesiris:'Iris',
        eyesfront:'Augenform',
        mouth:'Mund',
        nose:'Nase',
        glasses:'Brille',
        mustache:'Schnurrbart',
        beard:'Bart'
    };
};