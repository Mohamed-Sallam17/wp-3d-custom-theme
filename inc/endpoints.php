<?php
/**
 * Custom REST API Endpoints for Wameed Theme
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'custom/v1', '/submit-forminator', array(
        'methods'             => 'POST',
        'callback'            => 'wameed_handle_forminator_submit',
        'permission_callback' => '__return_true',
    ) );
} );

function wameed_handle_forminator_submit( $request ) {
    $params  = $request->get_params();
    $form_id = isset( $params['form_id'] ) ? intval( $params['form_id'] ) : 0;

    if ( ! $form_id ) {
        return new WP_REST_Response( array(
            'success' => false,
            'message' => 'Form ID is missing.',
        ), 400 );
    }

    // التأكد من وجود إضافة Forminator مفعلة
    if ( ! class_exists( 'Forminator' ) && ! class_exists( 'Forminator_API' ) ) {
        return new WP_REST_Response( array(
            'success' => false,
            'message' => 'Forminator plugin is not active.',
        ), 400 );
    }

    // تجهيز الحقول المنسقة لـ Forminator
    $entry_data = array();
    foreach ( $params as $key => $value ) {
        if ( 'form_id' !== $key ) {
            $entry_data[] = array(
                'name'  => sanitize_text_field( $key ),
                'value' => sanitize_textarea_field( $value ),
            );
        }
    }

    // استخدام Forminator_API::add_form_entry لإدخال البيانات وتفعيل الإشعارات/الإيميلات
    if ( class_exists( 'Forminator_API' ) && method_exists( 'Forminator_API', 'add_form_entry' ) ) {
        $entry_id = Forminator_API::add_form_entry( $form_id, $entry_data );

        if ( is_wp_error( $entry_id ) ) {
            return new WP_REST_Response( array(
                'success' => false,
                'message' => $entry_id->get_error_message(),
            ), 400 );
        }

        return new WP_REST_Response( array(
            'success' => true,
            'message' => 'تم الإرسال بنجاح',
            'entry_id' => $entry_id,
        ), 200 );
    }

    // Fallback في حال كانت نسخة Forminator تستخدم الـ Custom Form Response المباشر
    if ( class_exists( 'Forminator_CForm_Front_Action' ) ) {
        $form_action = new Forminator_CForm_Front_Action();
        // محاكاة إرسال الفورم برمجياً
        $_POST = $params;
        $response = $form_action->handle_form( $form_id );

        return new WP_REST_Response( array(
            'success' => true,
            'message' => 'تم الإرسال بنجاح',
        ), 200 );
    }

    return new WP_REST_Response( array(
        'success' => false,
        'message' => 'Unable to process Forminator submission.',
    ), 500 );
}