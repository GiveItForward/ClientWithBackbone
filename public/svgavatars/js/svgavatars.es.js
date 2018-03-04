/**************************************************************************
 * svgavatars.es.js - Spanish file
 * @version: 1.3 (20.01.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
**************************************************************************/

function svgAvatarsTranslation (png_one_download_size, png_two_download_size) {

//Ready for the translation to your language (any text inside quotes and please don't break JavaScript sintax!)
return welcome_slogan = '<h2>Bienvenido a SVG Avatar Generator</h2>',
    welcome_msg = '<p>por favor elija un género</p>',
    wait_msg = '<p>por favor espere...</p>',
    rnd_msg  = 'aleatorio',
    reset_msg  = 'limpiar',
    save_msg  = 'guardar',
    share_msg = 'compartir',
    gravatar_msg = 'Gravatar',
    dnl_msg  = 'descargar',
    svg_msg = 'formato vectorial - svg',
    png_one_msg = 'png - ' + png_one_download_size + 'x' + png_one_download_size,
    png_two_msg = 'png - ' + png_two_download_size + 'x' + png_two_download_size,
    confirm_msg = '<h3>¿Está seguro?</h3><p>Todos los cambios actuales se perderán.</p>',
    ios_msg = '<p>Por favor mantenga pulsada la imagen y elija Guardar</p>',
    gravatar_title = '<h3>Puede subir y usar el avatar creado como su Gravatar</h3><p>Por favor entre su correo y contraseña Gravatar</p>',
    gravatar_email = 'Su correo Gravatar',
    gravatar_pwd = 'Su contraseña Gravatar',
    gravatar_rating = 'Calificación:',
    gravatar_note ='<p><small>Nota: Su correo y contraseña NUNCA será almacenada en nuestro servidor</small></p>',
    install_msg = 'subir',
    alert_svg_support_error = 'Lo sentimos, pero su navegador no soporta SVG (Scalable Vector Graphic).<br> El Generador de Avatar no puede comenzar.',
    alert_json_error = '<h3>¡Error al cargar gráficos!</h3><p>Por favor recargue la página</p>',
    alert_success = '<h3>Su avatar está guardado en nuestro servidor.</h3><p>¡Gracias!</p>',
    alert_error = '<h3>¡El Avatar no está guardado!</h3><p>Por favor pruebe de nuevo</p>',
    alert_error_download = '<h3>¡Ocurrió un error!</h3><p>Por favor pruebe de nuevo</p>',
    alert_error_image = '<h3>¡La imagen está corrupta!</h3><p>Por favor pruebe de nuevo</p>',
    alert_success_gravatar = '<h3>¡Felicidades!</h3><p>Ha cambiado con éxito su Gravatar.</p><p>Por favor espere 5 a 10 minutos para que los cambios de avatar hagan efecto</p>',
    alert_common_error_gravatar = '<h3>¡Ocurrió un error desconodido!</h3><p>Por favor pruebe de nuevo</p>',
    alert_error_ratingfail = '<h3>¡Valor de Calificación incorrecto!</h3><p>No cambie los valores de los botones de radio. Por favor pruebe de nuevo</p>',
    alert_error_emailfail = '<h3>¡El correo está vacío!</h3><p>Por favor entre su correo y pruebe de nuevo</p>',
    alert_error_passwordfail = '<h3>¡La contraseña está vacía!</h3><p>Por favor entre su contraseña y pruebe de nuevo</p>',
    alert_error_imagefail = '<h3>¡Hubo un error convirtiendo su avatar a PNG!</h3><p>Por favor pruebe de nuevo</p>',
    alert_error_faultcode_8 = '<h3>Error interno en secure.gravatar.com</h3><p>Por favor pruebe más tarde</p>',
    alert_error_faultcode_9 = '<h3>¡Correo o Contraseña Incorrecta!</h3><p>Por favor revíselo y pruebe de nuevo</p>',
    crd_msg = 'Motor gráfico por ',
    ok_msg = 'ok',
    cancel_msg = 'cancelar',
    close_msg = 'cerrar',
    tryagain_msg = 'prueba de nuevo',
    block_titles = {
        face:'cara',
        eyes:'ojos',
        hair:'pelo',
        clothes:'ropa',
        backs:'fondos'
    },
    body_zone_titles = {
        backs:'básicos',
        faceshape:'forma',
        chinshadow:'',//not displayed, just for compatibility
        facehighlight:'',//not displayed, just for compatibility
        humanbody:'',//not displayed, just for compatibility
        clothes:'básicos',
        hair:'cabello',
        ears:'orejas',
        eyebrows:'cejas',
        eyesback:'',//not displayed, just for compatibility
        eyesiris:'iris',
        eyesfront:'forma del ojo',
        mouth:'boca',
        nose:'nariz',
        glasses:'gafas',
        mustache:'bigote',
        beard:'barba'
    };
};