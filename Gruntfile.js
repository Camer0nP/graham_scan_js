module.exports = function(grunt) {
  var path = require('path');

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({

    uglify: {
      options: {
        preserveComments: function (info, comment) {
          // Only keep the banner comment.
          return comment.pos === 0;
        }
      },
      graham_scan: {
        files: {
          'graham_scan.min.js': path.join('src', 'graham_scan.js')
        }
      }
    }

  });

  grunt.registerTask('build', 'Builds the app into a distributable package.', function() {
    grunt.task.run('uglify:graham_scan');
  });

};
