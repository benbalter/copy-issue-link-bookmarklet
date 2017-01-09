module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    coffee:
      compile:
        options:
          sourceMap: true
        files:
          'dist/bookmark.js': 'src/bookmark.coffee'
    watch:
      scripts:
        files: [ 'src/*.coffee' ]
        tasks: 'coffee'
    uglify:
      bookmark:
        files:
          'dist/bookmark.js': 'dist/bookmark.js'
        sourceMap: true
        sourceMapIncludeSources: true
        sourceMapIn: "./dist/bookmark.js.map"

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  grunt.registerTask 'build', ['coffee', 'uglify']
  grunt.registerTask 'default', ['build']
