var grunt = require('grunt');
var wrench = require('wrench');
var fs = require('fs');
var _ = require('underscore');

grunt.registerTask('php', 'Copy php template files from "src/php to "build""', function() {
  var php = grunt.helper('copyPHP');
  grunt.log.write(php);
});

grunt.registerTask('phpsetup', 'Add php banners to templates and remove whitespace', function() {
  var php = grunt.helper('setUpPHP');
  grunt.log.write(php);
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
