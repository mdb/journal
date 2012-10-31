<?php get_header(); ?>
<?php get_sidebar(); ?>
<div class="primary-content">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
  <article class="post">
    <header>
      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
      <time class="date-posted" datetime="<?php the_time('c'); ?>"><?php the_date(); ?></time>
    </header>
    <section class="content">
      <?php the_content(); ?>
    </section>
  </article>
<?php endwhile; else: ?>
	<h2>Sorry, no posts matched your criteria.</h2>
	<?php endif; ?>
	<nav class="post-navigator">
		<ul>
			<li class="prev"><?php next_posts_link('&laquo; Older Entries') ?></li>
			<li class="next"><?php previous_posts_link('Newer Entries &raquo;') ?></li>
		</ul>
	</nav>
</div>
<?php get_footer(); ?>
