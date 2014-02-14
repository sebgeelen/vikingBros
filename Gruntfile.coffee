module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    less:
      options:
        compress: true

      css:
        cwd: ''
        src: ['./view/css/css.less']
        dest: './view/css/css.css'

    connect:
      server:
        options:
          port: 3332
          open: true

    watch:
      less:
        files: ['./view/css/*.less'],
        tasks: ['less']

  grunt.event.on 'coffee.error', (msg) ->
    console.log "ERROR : " + msg

  grunt.registerTask 'default', ['less']
