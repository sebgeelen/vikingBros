module.exports = (grunt) ->

  grunt.loadNpmTasks 'grunt-contrib-less'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'

  grunt.initConfig
    less:
      options:
        compress: true

      css:
        cwd: ''
        src: ['./view/css/css.less']
        dest: './view/css/css.css'

    watch:
      less:
        files: ['./view/css/*.less'],
        tasks: ['less']

  grunt.event.on 'coffee.error', (msg) ->
    console.log "ERROR : " + msg

  grunt.registerTask 'default', ['less']
