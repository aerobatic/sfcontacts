module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['Gruntfile.js', 'js/**/*.js', 'test/**/*.js']
    },
    favicons: {
      options: {
        appleTouchBackgroundColor: "#ffffff",
        html: 'index.html',
        HTMLPrefix: 'favicons/',
        windowsTile: false
      },
      icons: {
        src: 'favicon.png',
        dest: 'favicons'
      }
    },
    uglify: {
      build: {
        files: {
          'dist/app.min.js': ['tmp/build.js']
        }
      }
    },
    stylus: {
      compile: {
        options: {
          paths: ['css'],
          'include css': true
        },
        files: {
          'tmp/styles.css': ['css/*.styl'] // compile and concat into single file
        }
      }
    },
    cssmin: {
      minify: {
        src: ['tmp/styles.css'],
        dest: 'dist/styles.min.css'
      }
    },
    watch: {
      options: {
        livereload: {
          key: grunt.file.read('ssl/key.pem'),
          cert: grunt.file.read('ssl/cert.pem')
        },
        spawn: true
      },
      stylus: {
        files: ['css/*.styl'],
        tasks: ['stylus', 'cssmin', 'clean']
      },
      js: {
        files: ['js/**/*.js']
      },
      views: {
        files: ['partials/*.html']
      },
      css: {
        files: ['dist/*.css']
      }
    },
    ngmin: {
      target: {
        src: ['js/**/*.js'],
        dest: 'tmp/build.js'
      }
    },
    clean: ['tmp'],
    aerobatic: {
      deploy: {
        src: ['index.html', 'login.html', 'dist/*.*', 'favicons/*', 'partials/*.html', 'libs/**/*.*'],
      },
      sim: {
        index: 'index.html',
        login: 'login.html',
        ssl: {
          key: 'ssl/key.pem',
          cert: 'ssl/cert.pem'
        },
        port: 3000,
        livereload: true
      }
    }
  });

  grunt.registerTask('sim', ['build', 'aerobatic:sim:sync', 'watch']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.registerTask('build', ['jshint', 'stylus', 'cssmin', 'ngmin', 'uglify', 'clean']);

  grunt.loadNpmTasks('grunt-favicons');
  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
};
