var grunt = require('grunt');
var wrench = require('wrench');

grunt.registerTask('images', 'Move images to the build directory', function() {
  var images = grunt.config.get('images');
  wrench.copyDirSyncRecursive(images.dist.src, images.dist.dest);
});
