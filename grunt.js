/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://www.yoursite.com/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'Your Company; Licensed MIT */',
      wpblock: '/*! \n' + 
        'Theme Name: Journal \n' +
        'Theme URI: http://www.mikeball.us \n' +
        'Description: Basic Wordpress Journal Theme \n' +
        'Author: Mike Ball \n' +
        'Author URI: http://www.mikeball.us \n' +
        'Version: 0.0.1 \n' + 
        '*/'
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
        src: ['<banner:meta.wpblock>', '../style.css'],
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
    }
  });

  // Default task.
  grunt.registerTask('default', 'concat min compass cssmin');
  
  // Compass tasks
  grunt.loadNpmTasks('grunt-compass');
  // CSS tasks
  grunt.loadNpmTasks('grunt-css');
};
