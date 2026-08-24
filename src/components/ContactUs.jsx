import React from 'react'

function ContactUs() {
  return (
<div id="contact-section">
    <div class="contact-section-form">
        <?php echo do_shortcode('[forminator_form id="123"]'); ?>
    </div>
</div>
  )
}

export default ContactUs
