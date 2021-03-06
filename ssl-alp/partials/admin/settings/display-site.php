<?php

/**
 * Main site admin settings.
 */
?>
<div class="wrap">
	<h2><?php esc_html_e( 'Academic Labbook Settings', 'ssl-alp' ); ?></h2>
	<?php if ( is_plugin_active_for_network( SSL_ALP_PLUGIN_PATH ) && current_user_can( 'manage_network_options' ) ) : ?>
	<p class="description">
		<?php
		echo wp_kses_post(
			sprintf(
				/* translators: ALP site settings URL */
				__( 'You may also wish to view the <a href="%s">Academic Labbook Network Settings</a> page.', 'ssl-alp' ),
				network_admin_url( 'settings.php?page=' . SSL_ALP_NETWORK_SETTINGS_MENU_SLUG )
			)
		);
		?>
	</p>
	<?php endif; ?>
	<div>
		<form method="post" action="options.php">
			<?php settings_fields( SSL_ALP_SITE_SETTINGS_PAGE ); ?>
			<?php do_settings_sections( SSL_ALP_SITE_SETTINGS_PAGE ); ?>
			<?php submit_button( esc_html__( 'Save Changes' ) ); ?>
		</form>
	</div>
</div>
