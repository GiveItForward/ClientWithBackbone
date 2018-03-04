<?php
/*********************************************************************************
 * send-to-gravatar.php - part of jQuery script for creating vector avatars
 * @version: 1.3.1 (21.11.2014)
 * @requires jQuery v1.8.2 or later
 * @URL http://svgavatars.com
 * @author DeeThemes (http://codecanyon.net/user/DeeThemes)
 *
 * Enable to set user's avatar as his/her Gravatar via XML-RPC
 *
 * Based on public Gravatar's XML-RPC API - http://en.gravatar.com/site/implement/
*********************************************************************************/
//require "XML-RPC for PHP"
require_once( 'xmlrpc.inc' );

//cheking for wrong data
if ( ! isset( $_POST['rating'] ) || $_POST['rating'] > 3 || $_POST['rating'] < 0  ) {
    die('ratingfail');
} elseif ( ! isset( $_POST['datastring1'] ) || empty( $_POST['datastring1'] ) ) {
    die('emailfail');
} elseif ( ! isset( $_POST['datastring2'] ) || empty( $_POST['datastring2'] ) ) {
    die('passwordfail');
} elseif ( ! isset( $_POST['imgdata'] ) || strpos( $_POST['imgdata'], 'data:image/png;base64' ) === false ) {
    die('imagefail');
} else { //seems everything is fine    

    function getCurrentUrl() {
        $url  = isset( $_SERVER['HTTPS'] ) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http';
        $url .= '://' . $_SERVER['SERVER_NAME'];
        $url .= in_array( $_SERVER['SERVER_PORT'], array('80', '443') ) ? '' : ':' . $_SERVER['SERVER_PORT'];
        $url .= $_SERVER['REQUEST_URI'];
        return $url;
    }

    //removing 'data:image/png;base64' from string
    $data = $_POST['imgdata'];
    list( $type, $data ) = explode( ';', $data );
    list( , $data ) = explode( ',', $data );
    
    //saving temporary avatar in "temp-avatars" folder and getting its URL
    $data = base64_decode( $data );
    $rnd = substr( md5( rand() ), 0, 12);
    file_put_contents( '../temp-avatars/' . $rnd . '.png', $data );
    $url = str_replace("php/send-to-gravatar.php", "", getCurrentUrl());
    $url .= 'temp-avatars/' . $rnd . '.png';
    
    //creating email md5 hash
    $hash = md5( strtolower( trim( $_POST['datastring1'] ) ) );
    
    //creating XML values for method "grav.saveUrl"
    $values = new xmlrpcval(
        array(
            "url" => new xmlrpcval( $url, "string"),
            "rating" => new xmlrpcval( $_POST['rating'], "int"),
            "password" => new xmlrpcval( $_POST['datastring2'], "string")
        ),
        "struct"
    );
    
    //creating XML-RPC message, client, checking SSL cert of secure.gravatar.com, etc.
    $msg = new xmlrpcmsg( 'grav.saveUrl', array( $values ), "array" );
    $client = new xmlrpc_client( "/xmlrpc?user=" . $hash, "secure.gravatar.com", "https" );
    //uncomment the line below if you wish to see debug messages in browser console via AJAX response
    //$client->setDebug( "2" );
    $client->setSSLVerifyPeer( true );
    $client->setSSLVerifyHost( 2 );
    $client->return_type = 'phpvals';
    $response = $client->send( $msg );
    
    if ( ! $response->faultCode() ) {
        
        //getting avavar unique id from response from grav.saveUrl
        $avatar_id = $response->value();
        
        //creating new XML values for method "grav.useUserimage"
        $values = new xmlrpcval(
            array(
                "userimage" => new xmlrpcval( $avatar_id, "string"),
                "addresses" => new xmlrpcval( array( new xmlrpcval( $_POST['datastring1'], "string" ) ), "array" ),
                "password" => new xmlrpcval( $_POST['datastring2'], "string")
            ),
            "struct"
        );

        //creating new XML-RPC message
        $msg = new xmlrpcmsg( 'grav.useUserimage', array( $values ), "array" );
        $response = $client->send( $msg );
        if ( ! $response->faultCode() ) {
            echo 'success';
        } else {
            echo trim( 'faultcode' . htmlentities( $response->faultCode() ) );
        }
    } else {
        echo trim( 'faultcode' . htmlentities( $response->faultCode() ) );
    }
}
