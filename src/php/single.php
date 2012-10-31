<?php get_header(); ?>
<?php get_sidebar(); ?>
<div class="primary-content">
  <?php if (have_posts()) : while (have_posts()) : the_post();?>
  <article class="post" id="post-<?php the_ID(); ?>">
    <header>
      <h2 class="post-title"><?php the_title(); ?></h2>
      <time class="date-posted" datetime="<?php the_time('c'); ?>"><?php the_date(); ?></time>
    </header>
    <section class="post-content">
      <?php the_content(); ?>
    </section>
    <footer class="post-meta">
      <small>Posted in <?php the_category(', '); ?></small>
      <?php if (has_tag()) { ?>
      <small>Tags: <?php the_tags(' '); ?></small>
      <?php } ?>
    </footer>
  </article>
  <nav class="post-navigator">
    <ul>
      <li class="prev"><?php previous_post_link('&laquo; %link') ?></li>
      <li class="next"><?php next_post_link('%link &raquo;') ?></li>
    </ul>
  </nav>
  <?php comments_template(); endwhile; else: ?>
  <p>Sorry, no posts matched your criteria.</p>
  <?php endif; ?>
</div>
<?php get_footer(); ?>
