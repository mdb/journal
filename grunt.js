var wrench = require("wrench");
var fs = require("fs");
var _ = require("underscore");

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! Journal - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://www.mikeball.us\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Mike Ball; Licensed MIT */',
      wpblock: '/*!\n' + 
        'Theme Name: Journal\n' +
        'Theme URI: http://www.mikeball.us\n' +
        'Description: Basic Wordpress Journal Theme\n' +
        'Author: Mike Ball\n' +
        'Author URI: http://www.mikeball.us\n' +
        'Version: <%= meta.version %>\n' + 
        '*/',
      wpphpbanner: '<?php /*!\n' +
        '* @package WordPress\n' +
        '* @subpackage Journal\n' +
        '*/\n' +
        '?>\n'
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', 'src/javascript/libs/*.js', 'src/javascript/script.js'],
        dest: 'build/js/script.min.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: '<config:concat.dist.dest>'
      }
    },
    cssmin: {
      dist: {
        src: ['<banner:meta.wpblock>', 'src/styles/stylesheets/style.css'],
        dest: 'build/style.css'
      }
    },
    watch: {
      files: ['src/styles/sass/*.scss'],
      tasks: 'default'
    },
    compass: {
      dist: {
        src: 'src/styles/sass',
        dest: 'src/styles/stylesheets',
        forcecompile: true
      }
    },
    images: {
      dist: {
        src: 'src/images',
        dest: 'build/images'
      }
    },
    php: {
      dist: {
        src: 'src/php',
        dest: 'build'
      }
    },
    environments: {
      dev: '/Applications/MAMP/htdocs/lps/wp-content/themes/journal'
    }
  });
  
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'php phpsetup concat min compass cssmin images');
  
  // Compass tasks
  grunt.loadNpmTasks('grunt-compass');

  // CSS tasks
  grunt.loadNpmTasks('grunt-css');
};
