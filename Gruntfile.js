module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['tmp/annotated.js']
        }
      }
    },
    cssmin: {
      minify: {
        src: ['css/bootstrap-spacelab.css', 'css/styles.css'],
        dest: 'dist/app.min.css'
      }
    },
    watch: {
      options: {
        livereload: true,
        spawn: true
      },
      all: {
        files: ['index.html', 'login.html', 'js/**/*.js','partials/*.html', 'css/*.css']
      }
    },
    ngAnnotate: {
      target: {
        files: {
          'tmp/annotated.js': ['js/**/*.js']
        }
      }
    },
    clean: ['tmp'],
    aerobatic: {
      deploy: {
        src: ['*.html', 'dist/*.*', 'favicons/*', 'partials/*.html', 'images/*.*', 'bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js'],
      },
      sim: {
        index: 'index.html',
        login: 'login.html',
        protocol: 'http',
        port: 3000
      }
    },
    favicons: {
     icons: {
        src: 'favicon.png',
        dest: 'favicons/',
        html: 'favicons.html',
      }
    },
    karma: {
      options: {
        files: [
          'http://cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js',
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.10/angular.min.js',
          'http://ajax.googleapis.com/ajax/libs/angularjs/1.2.9/angular-mocks.js',
          'test/fixtures.js',
          'js/**/*.js',
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

  grunt.registerTask('sim', ['aerobatic:sim:sync', 'watch']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.registerTask('build', ['jshint', 'cssmin', 'ngAnnotate', 'uglify', 'clean']);
  grunt.registerTask('test', ['karma']);

  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-karma');
};
