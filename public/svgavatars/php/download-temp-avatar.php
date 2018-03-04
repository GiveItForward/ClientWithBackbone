<?php
/******************************************************************************
 * download-temp-avatar.php - part of jQuery script for creating vector avatars
 * @version: 1.3 (20.01.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
 *
 * Force download of stored avatars from the 'temp-avatars' directory
******************************************************************************/

/*getting file name and file type (png or svg) from GET*/
$file = '../temp-avatars/' . $_GET['filename'];
$type = $_GET['filetype'];

/*Detect special conditions devices*/
$iPod    = strpos( $_SERVER['HTTP_USER_AGENT'], 'iPod' );
$iPhone  = strpos( $_SERVER['HTTP_USER_AGENT'], 'iPhone' );
$iPad    = strpos( $_SERVER['HTTP_USER_AGENT'], 'iPad' );
$Android = stripos( $_SERVER['HTTP_USER_AGENT'], 'Android' );

/*Checking if file exist (means that it has been written successfully earlier) and name is not empty*/
if ( file_exists( $file ) && $file != '../temp-avatars/' ) {
    header( 'Content-Length: ' . filesize( $file ) );
    /*For iOS device in Safari force download is not possible*/
    if( !$iPad || !$iPhone || !$iPod ) {
        
        # Android "Internet" Browser makes two GET request for a file.
        # If we change file name to "myAvatar" this will not work,
        # so we need to leave a temporary filename for Android
        if ( $Android ) {
            header( 'Content-Type: "image/png"' );
            header( 'Content-Disposition: attachment; filename="' . basename( $file ) . '"' );
        } else {
            if ( $type === 'png' ) {
                header( 'Content-Type: "image/png"' );
                header( 'Content-Disposition: attachment; filename="myAvatar.png"' );
            } elseif ( $type === 'svg' ) {
                header( 'Content-Type: "image/svg+xml"' );
                header( 'Content-Disposition: attachment; filename="myAvatar.svg"' );
            };
        };
        if ( ob_get_length() > 0 ) {
            ob_clean();
        };
        flush();
        readfile( $file );
        exit;
    }
} else {
    echo 'File does not exist!';
}
