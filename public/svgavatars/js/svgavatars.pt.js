/**************************************************************************
 * svgavatars.pt.js - Portuguese file
 * @version: 1.3 (20.01.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
**************************************************************************/

function svgAvatarsTranslation (png_one_download_size, png_two_download_size) {

//Ready for the translation to your language (any text inside quotes and please don't break JavaScript sintax!)
return welcome_slogan = '<h2>Bem-vindo ao SVG Avatar Generator</h2>',
    welcome_msg = '<p>por favor, escolha um gênero</p>',
    wait_msg = '<p>por favor, aguarde....</p>',
    rnd_msg  = 'aleatório',
    reset_msg  = 'reset',
    save_msg  = 'salvar',
    share_msg = 'compartilhar',
    gravatar_msg = 'Gravatar',
    dnl_msg  = 'download',
    svg_msg = 'svg - formato vetorial',
    png_one_msg = 'png - ' + png_one_download_size + 'x' + png_one_download_size,
    png_two_msg = 'png - ' + png_two_download_size + 'x' + png_two_download_size,
    confirm_msg = '<h3>Você tem certeza?</h3><p>Todas as modificações atuais serão perdidas.</p>',
    ios_msg = '<p>Por favor, selecione a imagem, segure e escolha Salvar</p>',
    gravatar_title = '<h3>Você pode fazer o upload e usar o avatar criado como seu Gravatar</h3><p>Por favor, insira seu email e senha Gravatar</p>',
    gravatar_email = 'Seu email Gravatar',
    gravatar_pwd = 'Sua senha Gravatar',
    gravatar_rating = 'Parâmetro:',
    gravatar_note ='<p><small>Atenção: seu email e senha NUNCA serão gravados em nosso servidor.</small></p>',
    install_msg = 'upload',
    alert_svg_support_error = 'Desculpe, mas seu navegador não suporta o SVG (gráficos vetoriais escaláveis).<br> O Avatar Generator não pode ser iniciado.',
    alert_json_error = '<h3>Erro no carregamento dos dados gráficos!</h3><p>Por favor, recarregue a página</p>',
    alert_success = '<h3>Seu avatar foi salvo em nosso servidor.</h3><p>Obrigado!</p>',
    alert_error = '<h3>O avatar não foi salvo!</h3><p>Por favor, tente novamente</p>',
    alert_error_download = '<h3>Um erro ocorreu!</h3><p>Por favor, tente novamente</p>',
    alert_error_image = '<h3> A imagem contém erros!</h3><p>Por favor, tente novamente</p>',
    alert_success_gravatar = '<h3>Parabéns!</h3><p>As modificações em seu Gravatar foram realizadas com sucesso.</p><p>Por favor, aguarde de 5 a 10 minutos para que as modificações tenham efeito</p>',
    alert_common_error_gravatar = '<h3>Um erro desconhecido ocorreu!</h3><p>Por favor, tente novamente</p>',
    alert_error_ratingfail = '<h3>Valor de parâmetro incorreto!</h3><p>Não modifique os valores de entrada. Por favor, tente novamente</p>',
    alert_error_emailfail = '<h3>Email em branco!</h3><p>Por favor, insira seu email e tente novamente</p>',
    alert_error_passwordfail = '<h3>Senha em branco!</h3><p>Por favor, insira sua senha e tente novamente</p>',
    alert_error_imagefail = '<h3>Ocorreu um erro na conversão de seu avatar para um arquivo PNG!</h3><p>Por favor, tente novamente</p>',
    alert_error_faultcode_8 = '<h3>Um erro interno ocorreu no secure.gravatar.com</h3><p>Por favor, tente novamente dentro de alguns instantes</p>',
    alert_error_faultcode_9 = '<h3>Email ou senha incorretos!</h3><p>Por favor, verifique-os e tente novamente</p>',
    crd_msg = 'Motor gráfico por ',
    ok_msg = 'ok',
    cancel_msg = 'cancelar',
    close_msg = 'fechar',
    tryagain_msg = 'tentar novamente',
    block_titles = {
        face:'rosto',
        eyes:'olhos',
        hair:'cabelo',
        clothes:'roupas',
        backs:'fundo'
    },
    body_zone_titles = {
        backs:'básico',
        faceshape:'forma',
        chinshadow:'',//not displayed, just for compatibility
        facehighlight:'',//not displayed, just for compatibility
        humanbody:'',//not displayed, just for compatibility
        clothes:'básico',
        hair:'na cabeça',
        ears:'orelhas',
        eyebrows:'sombrancelhas',
        eyesback:'',//not displayed, just for compatibility
        eyesiris:'íris',
        eyesfront:'formato do olho',
        mouth:'boca',
        nose:'nariz',
        glasses:'óculos',
        mustache:'bigode',
        beard:'barba'
    };
};