var grunt = require('grunt');

var grunt = require('grunt');
var wrench = require('wrench');

grunt.registerTask('deploy', 'Deploy a build to the specified environment', function(environment) {
  var env = grunt.config.get('environments')[environment];
  wrench.copyDirSyncRecursive(grunt.config.get('php').dist.dest, env);
});
