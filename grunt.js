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
      wpblock: '/*\n' + 
        'Theme Name: Journal\n' +
        'Theme URI: http://www.mikeball.us\n' +
        'Description: Basic Wordpress Journal Theme\n' +
        'Author: Mike Ball\n' +
        'Author URI: http://www.mikeball.us\n' +
        'Version: <%= meta.version %>\n' + 
        '*/',
      wpphpbanner: '<?php /*\n' +
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

  // Default task.
  grunt.registerTask('default', 'php phpsetup concat min compass cssmin images');
  
  // Compass tasks
  grunt.loadNpmTasks('grunt-compass');

  // CSS tasks
  grunt.loadNpmTasks('grunt-css');

  // PHP tasks
  grunt.registerTask('php', 'Copy php template files from "src/php to "build""', function() {
    var php = grunt.helper('copyPHP');
    grunt.log.write(php);
  });

  grunt.registerTask('phpsetup', 'Add php banners to templates and remove whitespace', function() {
    var php = grunt.helper('setUpPHP');
    grunt.log.write(php);
  });

  grunt.registerTask('images', 'Move images to the build directory', function() {
    var images = grunt.config.get('images');
    wrench.copyDirSyncRecursive(images.dist.src, images.dist.dest);
  });

  // Deploy
  grunt.registerTask('deploy', 'Deploy a build to the specified environment', function(environment) {
    var env = grunt.config.get('environments')[environment];
    wrench.copyDirSyncRecursive(grunt.config.get('php').dist.dest, env);
  });

  // Helpers
  grunt.registerHelper('copyPHP', function () {
    var php = grunt.config.get('php');
    wrench.copyDirSyncRecursive(php.dist.src, php.dist.dest);
  });
  
  grunt.registerHelper('setUpPHP', function () {
    var php = grunt.config.get('php').dist.dest;

    fs.readdir(php, function(error, curFiles) {
      var files = _.filter(curFiles, function(file) { return file.match('.php'); }),
          filesLength = files.length,
          banner = grunt.config.get('meta').wpphpbanner;

      function trim(s) {
        s = s.replace(/(^\s*)|(\s*$)/gi,"");
        s = s.replace(/[ ]{2,}/gi," "); 
        s = s.replace(/\n /,"\n");
        return s;
      }

      function trimmedContent(content) {
        var contentArr = content.split('\n'),
            trimmedContentArr = [];

        contentArr.forEach(function(line) {
          trimmedContentArr.push(trim(line));
        });

        return trimmedContentArr.join('\n');
      }

      function writeFile(file, contents) {
        var content = banner + trimmedContent(contents);

        fs.writeFile(file, content, function (err) {
          console.log('Adding banner to ' + file);
          if (err) { return console.log(err); }
        });
      }

      files.forEach(function (file) {
        var fileName = php + '/' + file;
        
        fs.readFile(fileName, 'utf8', function (err, data) {
          if (err) {
            return console.log(err);
          }

          writeFile(fileName, data);
        });
      });
    });
  });
};
