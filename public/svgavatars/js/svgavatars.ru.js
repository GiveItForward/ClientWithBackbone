/**************************************************************************
 * svgavatars.ru.js - Russian file
 * @version: 1.3 (20.01.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
**************************************************************************/

function svgAvatarsTranslation (png_one_download_size, png_two_download_size) {

//Ready for the translation to your language (any text inside quotes and please don't break JavaScript sintax!)
return welcome_slogan = '<h2>Добро пожаловать на Генератор SVG Аватарок</h2>',
    welcome_msg = '<p>пожалуйста, выберете пол</p>',
    wait_msg = '<p>пожалуйста, подождите...</p>',
    rnd_msg  = 'случайный',
    reset_msg  = 'сбросить',
    save_msg  = 'сохранить',
    share_msg = 'поделиться',
    gravatar_msg = 'Gravatar',
    dnl_msg  = 'скачать',
    svg_msg = 'svg - вектор',
    png_one_msg = 'png - ' + png_one_download_size + 'x' + png_one_download_size,
    png_two_msg = 'png - ' + png_two_download_size + 'x' + png_two_download_size,
    confirm_msg = '<h3>Вы уверены?</h3><p>Все текущие изменения будут потеряны.</p>',
    ios_msg = '<p>Пожалуйста, коснитесь и удерживайте изображение, затем выберете "Сохранить"</p>',
    gravatar_title = '<h3>Вы можете загрузить и использовать созданную аватарку на Gravatar.com</h3><p>Пожалуйста, введите Ваш email и пароль использованные при регистрации на сервисе gravatar.com</p>',
    gravatar_email = 'Ваш email',
    gravatar_pwd = 'Ваш пароль',
    gravatar_rating = 'Рейтинг:',
    gravatar_note ='<p><small>Замечание: Ваш email и пароль НИКОГДА не будут сохраняться на нашем сервере</small></p>',
    install_msg = 'загрузить',
    alert_svg_support_error = 'Очень жаль, но Ваш браузер не поддерживает SVG (Масштабируемую векторную графику). Генератор не может начать работу.',
    alert_json_error = '<h3>Ошибка при загрузке графических данных!</h3><p>Пожалуйста, перезагрузите страницу</p>',
    alert_success = '<h3>Ваша аватарка сохранена на нашем сервере.</h3><p>Спасибо!</p>',
    alert_error = '<h3>Не удалось сохранить аватарку!</h3><p>Пожалуйста, попробуйте еще раз</p>',
    alert_error_download = '<h3>Произошла ошибка!</h3><p>Пожалуйста, попробуйте еще раз</p>',
    alert_error_image = '<h3>Изображение повреждено!</h3><p>Пожалуйста, попробуйте еще раз</p>',
    alert_success_gravatar = '<h3>Поздравляем!</h3><p>Вы успешно поменяли Ваш граватар.</p><p>Подождите 5 - 10 минут чтобы изменения вступили в силу</p>',
    alert_common_error_gravatar = '<h3>Произошла ошибка!</h3><p>Пожалуйста, попробуйте еще раз</p>',
    alert_error_ratingfail = '<h3>Неправильное значение рейтинга граватара!</h3><p>Не изменяйте значения радио кнопок. Попробуйте еще раз</p>',
    alert_error_emailfail = '<h3>Не введен email адрес!</h3><p>Пожалуйста, введите Ваш email и попробуйте еще раз</p>',
    alert_error_passwordfail = '<h3>Не введен пароль!</h3><p>Пожалуйста, введите Ваш пароль и попробуйте еще раз</p>',
    alert_error_imagefail = '<h3>Ошибка при конвертации Вашей аватарки в PNG формат!</h3><p>Пожалуйста, попробуйте еще раз</p>',
    alert_error_faultcode_8 = '<h3>Внутренняя ощибка на сервере secure.gravatar.com</h3><p>Пожалуйста, попробуйте позже</p>',
    alert_error_faultcode_9 = '<h3>Неверный Email и/или пароль!</h3><p>Пожалуйста, проверте введенные данные и попробуйте еще раз</p>',
    crd_msg = 'Graphic engine by ',
    ok_msg = 'ok',
    cancel_msg = 'отмена',
    close_msg = 'закрыть',
    tryagain_msg = 'еще раз',
    block_titles = {
        face:'лицо',
        eyes:'глаза',
        hair:'волосы',
        clothes:'одежда',
        backs:'фоны'
    },
    body_zone_titles = {
        backs:'общие',
        faceshape:'контур',
        chinshadow:'',//не отображается, для совместимости
        facehighlight:'',//не отображается, для совместимости
        humanbody:'',//не отображается, для совместимости
        clothes:'общая',
        hair:'на голове',
        ears:'уши',
        eyebrows:'брови',
        eyesback:'',//не отображается, для совместимости
        eyesiris:'радужка',
        eyesfront:'контур',
        mouth:'рот',
        nose:'нос',
        glasses:'очки',
        mustache:'усы',
        beard:'борода'
    };
};