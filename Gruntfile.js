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
    // watch: {
    //   // scripts: {
    //   //   files: ['**/*.js'],
    //   //   tasks: ['uglify', 'stylus']
    //   // },
    //   css: {
    //     files: ['css/*.styl'],
    //     tasks: ['stylus', 'cssmin', 'clean']
    //   }
    // },
    ngmin: {
      target: {
        src: ['js/**/*.js'],
        dest: 'tmp/build.js'
      }
    },
    clean: ['tmp'],
    aerobatic: {
      deploy: {
        src: ['index.html', 'dist/*.*', 'favicons/*'],
      },
      sim: {
        index: 'index.html',
        port: 3000,
        watch: {
          stylus: {
            files: ['css/*.styl', 'css/*.css'],
            tasks: ['stylus', 'cssmin', 'clean']
          }
        }
      }
    }
  });

  grunt.registerTask('sim', ['aerobatic:sim']);
  grunt.registerTask('deploy', ['build', 'aerobatic:deploy']);

  grunt.registerTask('build', ['jshint', 'stylus', 'cssmin', 'ngmin', 'uglify', 'clean']);

  grunt.loadNpmTasks('grunt-favicons');
  // grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadTasks('../grunt-aerobatic/tasks');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
};
