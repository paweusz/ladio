'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js',
        nodeArgs: ['--debug']
      }
    },
    regarde: {
      js: {
        files: [
          'app.js',
          'routes/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      css: {
        files: ['public/stylesheets/*.css'],
        tasks: ['livereload']
      },
      jade: {
        files: ['views/*.jade'],
        tasks: ['livereload']
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        '*.js',
        'routes/*.js'
      ]
    },
	});
  grunt.registerTask('delayed-livereload', 'delayed livereload', function () {
    var done = this.async();
    setTimeout(function () {
      grunt.task.run('livereload');
      done();
    }, 500);
  });
	grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['livereload-start', 'develop', 'regarde']);
};
