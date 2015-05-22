'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      lib: ['lib/**/*.js', 'Gruntfile.js'],
      test: 'test/*.test.js'
    },
    uglify: {
      dist: {
        files: {
          'dist/testee.min.js': 'dist/testee.js'
        }
      },
      bootstrap: {
        files: {
          'dist/bootstrap.min.js': 'lib/bootstrap.js'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/testee.js': ['lib/index.js']
        }
      },
      debug: {
        options: {
          bundleOptions: {
            debug: true
          }
        },
        files: {
          'dist/testee.dev.js': ['lib/index.js']
        }
      }
    },
    qunit: {
      test: ['test/index.html']
    },
    watch: {
      scripts: {
        files: ['lib/**/*.js'],
        tasks: ['build']
      }
    },
    release: {}
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-release');

  grunt.registerTask('build', ['browserify', 'uglify']);
  grunt.registerTask('test', ['jshint', 'build', 'qunit']);
  grunt.registerTask('default', ['watch']);
};