<div class="secondary-content">
  <section>
    <h3>About</h3>
    <p><?php bloginfo('description'); ?></p>
  </section>
  <section>
    <h3>Categories</h3>
    <ul>
     <?php wp_list_categories('title_li='); ?> 
    </ul>
  </section>
  <section>
    <h3>Archives</h3>
    <ul>
     <?php wp_get_archives(); ?> 
    </ul>
  </section>
  <section class="search">
    <h3>Search</h3>
    <?php get_search_form(); ?>
  </section>
</div>
