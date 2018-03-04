<?php
/**************************************************************************
 * save-temp-avatar.php - part of jQuery script for creating vector avatars
 * @version: 1.3 (20.01.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
 *
 * Store avatars on a server in the temporary 'temp-avatars' directory
**************************************************************************/

/*getting file name and image data from POST*/
$filename = $_POST['filename'];
$data = $_POST['imgdata'];

//cheking, that file is exactly png or svg
if ( ( $data && strrpos( $filename, 'png', -3 ) !== false ) || ( $data && strrpos( $filename, 'svg', -3 ) !== false ) ) {
    if ( strrpos( $filename, 'png', -3 ) !== false ) {
        list( $type, $data ) = explode( ';', $data );
        list( $base, $data ) = explode( ',', $data );
        
        /*cheking that image data is base64 of png*/
        if ( $type === 'data:image/png' && $base === 'base64') {
            $data = base64_decode( $data );
            file_put_contents( '../temp-avatars/' . $filename, $data );
            echo 'saved';
        } else {
            echo 'error';
        }
    } elseif ( strrpos( $filename, 'svg', -3 ) !== false ) {
        $data = stripcslashes( $data );

        /*cheking that image data is SVG*/
        if ( strpos( $data, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"' ) !== false && strrpos($data, '</svg>', -6) !== false ) {
            file_put_contents( '../temp-avatars/' . $filename, $data );
            echo 'saved';
        } else {
            echo 'error';
        }
    }
} else {
    echo 'error';
}
