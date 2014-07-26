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
          'dist/app.min.js': ['tmp/build.js']
        }
      }
    },
    copy: {
      components: {
        src: ['bower_components/angular-ui-bootstrap-bower/ui-bootstrap-tpls.min.js'],
        dest: 'dist/',
        expand: true,
        flatten: true
      }
    },
    cssmin: {
      minify: {
        src: ['css/bootstrap-flatly.css', 'css/styles.css'],
        dest: 'dist/app.min.css'
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
      all: {
        files: ['index.html', 'login.html', 'js/**/*.js','partials/*.html', 'css/*.css']
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
        src: ['index.html', 'login.html', 'dist/*.*', 'favicons/*', 'partials/*.html'],
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

  grunt.registerTask('build', ['jshint', 'copy', 'cssmin', 'ngmin', 'uglify', 'clean']);

  grunt.loadNpmTasks('grunt-aerobatic');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-ngmin');
};
