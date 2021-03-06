<?php
/**
 * Random Articles Widget Class
 */
class EK_Widget_Random_Articles extends WP_Widget {
 
 
    /** constructor -- name this the same as the class above */
    function __construct() 
    {
		/* Widget settings. */
		$widget_ops = array( 'classname' => 'ek-random-articles', 'description' => 'Display some random articles.' );

		/* Widget control settings. */
		$control_ops = array('ek-random-articles');

		/* Create the widget. */
		parent::WP_Widget( 'ek-random-articles', 'EK Random Articles', $widget_ops, $control_ops );
    }
 
    /** @see WP_Widget::widget -- do not rename this */
	function widget($args, $instance) 
	{
	    extract( $args );

	    // don't lazy load images in this widget
		ek_pause_lazyload();

		echo $before_widget;
		if ($instance['title'])
		{
			echo $before_title . $instance['title'] . $after_title;
		}
		
		$random_articles = new WP_Query(array(
			'posts_per_page' => $instance['num_posts'] ?: 10,
			'orderby' => 'rand',
			'meta_key' => '_thumbnail_id',
		));
		
		?>
		<ul class="unstyled post-list">
			<?php while ($random_articles->have_posts()) : $random_articles->the_post(); ?>
			<?php $category = ek_get_cat($post) ?>
			<li class="post <?php echo $category->slug ?>">
				<div class="header">
					<a href="<?php the_permalink() ?>">
						<h5 class="category random-article"><?php echo $category->name ?></h5>
						<h3><?php the_title() ?></h3>
					</a>
				</div>
				<div class="thumbnail"><a href="<?php the_permalink() ?>"><?php the_post_thumbnail() ?></a></div>
			</li>
			<?php endwhile; ?>
		</ul> <!-- /.content -->
		<?php 
		echo $after_widget; ?>
		<?php

		// put lazyload filters back 
		ek_resume_lazyload();
	}
 

    /** @see WP_Widget::form -- do not rename this */
    function form($instance) 
    {
		/* Set up some default widget settings. */
		$defaults = array( 'title' => 'Random Articles on EK');
		$instance = wp_parse_args( (array) $instance, $defaults );
        $title 		= esc_attr($instance['title']);
        $num_posts 		= $instance['num_posts'] ?: 10;
        ?>
         <p>
          <label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:'); ?></label>
          <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" />
        </p>
         <p>
          <label for="<?php echo $this->get_field_id('num_posts'); ?>"><?php _e('Number of Posts:'); ?></label>
          <input class="widefat" id="<?php echo $this->get_field_id('num_posts'); ?>" name="<?php echo $this->get_field_name('num_posts'); ?>" type="text" value="<?php echo $num_posts; ?>" />
        </p>
        <?php
    }
 
 
} // end class example_widget
add_action('widgets_init', create_function('', 'return register_widget("EK_Widget_Random_Articles");'));
?>