<?php get_header(); ?>
<div class="row">
	<div class="span8 <?php echo ek_get_cat(false, 'slug', true) ?>" id="main">
		<?php if (is_category() && ! is_paged()) : ?>
			<?php get_template_part('/partials/category', 'carousel') ?>
		<?php endif; ?>
		<?php get_template_part('/partials/view-controls') ?>
		<div id="post-list" class="post-list grid">
			<?php get_template_part('/partials/posts', 'listing') ?>
		</div> <!-- /#post-list -->
		<div class="row pager">
			<div class="prev span4">
				<h4><?php previous_posts_link('&laquo; Previous') ?></h4>
			</div>
			<div class="next span4">
				<h4><?php next_posts_link('Next &raquo;') ?></h4>
			</div>
		</div>
	</div> <!-- /#main -->
	<div class="span4" id="sidebar">
		<?php get_sidebar(); ?>
	</div> <!-- /#sidebar -->
</div> <!-- /.row -->
<?php get_footer(); ?>