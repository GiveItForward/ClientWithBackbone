/**************************************************************************
 * svgavatars.it.js - Italian file
 * @version: 1.3 (20.01.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
**************************************************************************/

function svgAvatarsTranslation (png_one_download_size, png_two_download_size) {

//Ready for the translation to your language (any text inside quotes and please don't break JavaScript sintax!)
return welcome_slogan = '<h2>Benvenuto su SVG Avatar Generator</h2>',
    welcome_msg = '<p>si prega di scegliere un genere</p>',
    wait_msg = '<p>attendere prego…</p>',
    rnd_msg  = 'random',
    reset_msg  = 'reset',
    save_msg  = 'salva',
    share_msg = 'condividi',
    gravatar_msg = 'Gravatar',
    dnl_msg  = 'scarica',
    svg_msg = 'formato svg - vector ',
    png_one_msg = 'png - ' + png_one_download_size + 'x' + png_one_download_size,
    png_two_msg = 'png - ' + png_two_download_size + 'x' + png_two_download_size,
    confirm_msg = '<h3>Sei sicuro?</h3><p>Tutte le modifiche effettuate non saranno salvate.</p>',
    ios_msg = '<p>Si prega di premere e tenere premuta l\'immagine e scegliere Salva</p>',
    gravatar_title = '<h3>Puoi caricare ed utilizzare l\'avatar creato come il tuo Gravatar</h3><p>Si prega di inserire email and password Gravatar</p>',
    gravatar_email = 'La tua email Gravatar',
    gravatar_pwd = 'La tua password Gravatar',
    gravatar_rating = 'Rating:',
    gravatar_note ='<p><small>Nota: la tua email e password non saranno MAI memorizzate nel nostro server</small></p>',
    install_msg = 'carica',
    alert_svg_support_error = 'Spiacenti, ma il vostro browser non supporta SVG (Scalable Vector Graphic).<br> Avatar Generator non puo\' essere avviato.',
    alert_json_error = '<h3>Errore nel caricamento dei dati grafici!</h3><p>Si prega di ricaricare una pagina</p>',
    alert_success = '<h3>Il tuo avatar e\' memorizzato nel nostro server.</h3><p>Grazie!</p>',
    alert_error = '<h3>Avatar non e\' stato salvato!</h3><p>Si prega di riprovare</p>',
    alert_error_download = '<h3>Si e\' verificato un errore!</h3><p>Si prega di riprovare</p>',
    alert_error_image = '<h3>L\'immagine e\' rotta!</h3><p>Si prega di riprovare</p>',
    alert_success_gravatar = '<h3>Congratulazioni!</h3><p>Avete modificato con successo il vostro Gravatar.</p><p>Si prega di consentire da 5 a 10 minuti per rendere effettive le modifiche</p>',
    alert_common_error_gravatar = '<h3>Si e\' verificato un errore sconosciuto!</h3><p>Si prega di riprovare</p>',
    alert_error_ratingfail = '<h3>Valore di Rating sbagliato!</h3><p>Non modificare i valori radio di input. Si prega di riprovare</p>',
    alert_error_emailfail = '<h3>Il campo Email e\' vuoto!</h3><p>Si prega di inserire l\'email e riprovare</p>',
    alert_error_passwordfail = '<h3>Il campo Password e\' vuoto!</h3><p>Si prega di inserire la password e riprovare</p>',
    alert_error_imagefail = '<h3>Si e\' verificato un errore durante la conversione dell\'avatar in PNG!</h3><p>Si prega di riprovare</p>',
    alert_error_faultcode_8 = '<h3>Si e\' verificato un errore interno su secure.gravatar.com</h3><p>Si prega di riprovare</p>',
    alert_error_faultcode_9 = '<h3>Email o Password non corrette!</h3><p>Si prega di controllare e riprovare</p>',
    crd_msg = 'Motore grafico a cura di ',
    ok_msg = 'ok',
    cancel_msg = 'cancella',
    close_msg = 'chiudi',
    tryagain_msg = 'riprova',
    block_titles = {
        face:'viso',
        eyes:'occhi',
        hair:'capelli',
        clothes:'vestiti',
        backs:'sfondo'
    },
    body_zone_titles = {
        backs:'base',
        faceshape:'forma',
        chinshadow:'',//not displayed, just for compatibility
        facehighlight:'',//not displayed, just for compatibility
        humanbody:'',//not displayed, just for compatibility
        clothes:'base',
        hair:'sulla testa',
        ears:'orecchie',
        eyebrows:'sopracciglia',
        eyesback:'',//not displayed, just for compatibility
        eyesiris:'iride',
        eyesfront:'forma degli occhi',
        mouth:'bocca',
        nose:'naso',
        glasses:'occhiali',
        mustache:'baffi',
        beard:'barba'
    };
};