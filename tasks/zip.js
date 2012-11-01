var grunt = require('grunt');
var execFile = require('child_process').execFile;
var wrench = require('wrench');

grunt.registerTask('zip', 'zip up the build directory as journal.zip', function() {
  var php = grunt.config.get('php');

  wrench.copyDirSyncRecursive(php.dist.dest, 'journal');
  execFile('zip', ['-r', 'journal', 'journal'], function(err, stdout) {
    console.log(err);
  });
  wrench.rmdirSyncRecursive('journal', false);
});
