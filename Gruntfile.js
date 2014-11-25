module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'app/js/**/*.js', 'test/**/*.js']
    },
    uglify: {
      options: {
        beautify: true
      },
      build: {
        files: {
          'dist/app.min.js': [
            'node_modules/angular-bootstrap/ui-bootstrap.js', 
            'node_modules/angular-aerobatic/angular-aerobatic.js',
            'tmp/annotated.js'
          ]
        }
      }
    },
    copy: {
      dist: {
        files: [
          {src: 'app/index.html', dest: 'dist/index.html'},
          {src: 'app/login.html', dest: 'dist/login.html'},
          {src: 'app/favicon.png', dest: 'dist/favicon.png'},
          {expand: true, cwd:'app', src: ['partials/**'], dest: 'dist/'},
          {expand: true, cwd:'app', src: ['images/**'], dest: 'dist/'}
        ]
      }
    },
    cssmin: {
      minify: {
        src: ['app/css/bootstrap-flatly.css', 'app/css/styles.css'],
        dest: 'dist/app.min.css'
      }
    },
    ngAnnotate: {
      target: {
        files: {
          'tmp/annotated.js': ['app/js/**/*.js']
        }
      }
    },
    clean: ['tmp'],
    karma: {
      options: {
        files: [
          'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js',
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular.min.js',
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular-mocks.js',
          'test/fixtures.js',
          'app/js/**/*.js',
          'test/spec/**/*.js'
        ],
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        logLevel: 'INFO',
        plugins : [
          'karma-jasmine',
          'karma-chrome-launcher'
        ],
        reporters: 'dots'
      },
      unit: {
        singleRun: true
      }
    }
  });

  grunt.registerTask('build', ['jshint', 'copy', 'cssmin', 'ngAnnotate', 'uglify', 'clean']);
  grunt.registerTask('test', ['karma']);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-karma');
};
