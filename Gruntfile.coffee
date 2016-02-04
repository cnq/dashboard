"use strict"
LIVERELOAD_PORT = 8081
lrSnippet = require("connect-livereload")(port: LIVERELOAD_PORT)

# var conf = require('./conf.'+process.env.NODE_ENV);
mountFolder = (connect, dir) ->
    connect.static require("path").resolve(dir)


# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->
    require("load-grunt-tasks") grunt
    require("time-grunt") grunt
    
    # configurable paths
    yeomanConfig =
        app: "client"
        dist: "dist"

    try
        yeomanConfig.app = require("./bower.json").appPath or yeomanConfig.app
    grunt.initConfig
        yeoman: yeomanConfig
        watch:
            coffee:
                files: ["<%= yeoman.app %>/scripts/**/*.coffee"]
                tasks: ["coffee:dist"]

            compass:
                files: ["<%= yeoman.app %>/styles/**/*.{scss,sass}"]
                tasks: ["compass:server"]

            less:
                files: ["<%= yeoman.app %>/styles-less/**/*.less"]
                tasks: ["less:server"]

            livereload:
                options:
                    livereload: LIVERELOAD_PORT

                files: [
                    "<%= yeoman.app %>/index.html"
                    "<%= yeoman.app %>/views/**/*.html"
                    "<%= yeoman.app %>/styles/**/*.scss"
                    "<%= yeoman.app %>/styles-less/**/*.less"
                    ".tmp/styles/**/*.css"
                    "{.tmp,<%= yeoman.app %>}/scripts/**/*.js"
                    "<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}"
                ]

        connect:
            options:
                port: 8080
                
                # Change this to '0.0.0.0' to access the server from outside.
                hostname: "0.0.0.0"

            livereload:
                options:
                    middleware: (connect) ->
                        [lrSnippet, mountFolder(connect, ".tmp"), mountFolder(connect, yeomanConfig.app)]

            nolivereload:
                options:
                    middleware: (connect) ->
                        [mountFolder(connect, ".tmp"), mountFolder(connect, yeomanConfig.app)]

            test:
                options:
                    middleware: (connect) ->
                        [mountFolder(connect, ".tmp"), mountFolder(connect, "test")]


            dist:
                options:
                    middleware: (connect) ->
                        [mountFolder(connect, yeomanConfig.dist)]

        open:
            server:
                url: "http://localhost:<%= connect.options.port %>"
        
        clean:
            dist:
                files: [
                    dot: true
                    src: [".tmp", "<%= yeoman.dist %>/*", "!<%= yeoman.dist %>/.git*"]
                ]

            server: ".tmp"

        jshint:
            options:
                jshintrc: ".jshintrc"

            all: ["Gruntfile.js", "<%= yeoman.app %>/scripts/**/*.js"]

        compass:
            options:
                sassDir: "<%= yeoman.app %>/styles"
                cssDir: ".tmp/styles"
                generatedImagesDir: ".tmp/styles/ui/images/"
                imagesDir: "<%= yeoman.app %>/styles/ui/images/"
                javascriptsDir: "<%= yeoman.app %>/scripts"
                fontsDir: "<%= yeoman.app %>/fonts"
                importPath: "<%= yeoman.app %>/bower_components"
                httpImagesPath: "styles/ui/images/"
                httpGeneratedImagesPath: "styles/ui/images/"
                httpFontsPath: "fonts"
                relativeAssets: true
            dist:
                options:
                    outputStyle: 'compressed'
                    debugInfo: false
                    noLineComments: true
            server:
                options:
                    debugInfo: true
            forvalidation:
                options:
                    debugInfo: false
                    noLineComments: false
        # if you want to use the compass config.rb file for configuration:
        # compass:
        #   dist:
        #     options:
        #       config: 'config.rb'

        less:
            server:
                options:
                    strictMath: true
                    dumpLineNumbers: true
                    sourceMap: true
                    sourceMapRootpath: ""
                    outputSourceFiles: true
                files: [
                    expand: true
                    cwd: "<%= yeoman.app %>/styles-less"
                    src: "*.less"
                    dest: ".tmp/styles"
                    ext: ".css"                    
                ]
            dist:
                options:
                    cleancss: true,
                    report: 'min'
                files: [
                    expand: true
                    cwd: "<%= yeoman.app %>/styles-less"
                    src: "*.less"
                    dest: ".tmp/styles"
                    ext: ".css"                    
                ]


        coffee:
            server:
                options:
                    sourceMap: true
                    # join: true,
                    sourceRoot: ""
                files: [
                    expand: true
                    cwd: "<%= yeoman.app %>/scripts"
                    src: "**/*.coffee"
                    dest: ".tmp/scripts"
                    ext: ".js"
                ]
            dist:
                options:
                    sourceMap: false
                    sourceRoot: ""
                files: [
                    expand: true
                    cwd: "<%= yeoman.app %>/scripts"
                    src: "**/*.coffee"
                    dest: ".tmp/scripts"
                    ext: ".js"
                ]
            distNoUglify:
                options:
                    sourceMap: false
                    sourceRoot: ""
                files: [
                    expand: true
                    cwd: "<%= yeoman.app %>/scripts"
                    src: "**/*.coffee"
                    dest: "<%= yeoman.dist %>/scripts"
                    ext: ".js"
                ]
            distFreshJS:
                options:
                    sourceMap: false
                    sourceRoot: ""
                files: [
                    expand: true
                    cwd: "<%= yeoman.app %>/scripts"
                    src: "**/*.coffee"
                    dest: "<%= yeoman.dist %>/scripts"
                    ext: ".js"
                ]

        useminPrepare:
            html: ["<%= yeoman.app %>/index.html", "<%= yeoman.app %>/login.html"]
            options:
                dest: "<%= yeoman.dist %>"
                flow:
                    steps:
                        js: ["concat"]
                        css: ["concat"]
                    post: []

        
        # 'css': ['concat']
        usemin:
            html: ["<%= yeoman.dist %>/**/*.html", "!<%= yeoman.dist %>/bower_components/**"]
            css: ["<%= yeoman.dist %>/styles/**/*.css"]
            options:
                dirs: ["<%= yeoman.dist %>"]

        htmlmin:
            dist:
                options: {}
                
                #removeCommentsFromCDATA: true,
                #                    // https://github.com/yeoman/grunt-usemin/issues/44
                #                    //collapseWhitespace: true,
                #                    collapseBooleanAttributes: true,
                #                    removeAttributeQuotes: true,
                #                    removeRedundantAttributes: true,
                #                    useShortDoctype: true,
                #                    removeEmptyAttributes: true,
                #                    removeOptionalTags: true
                files: [
                    expand: true
                    cwd: "<%= yeoman.app %>"
                    src: ["*.html", "views/*.html"]
                    dest: "<%= yeoman.dist %>"
                ]

        
        # Put files not handled in other tasks here
        copy:
            dist:
                files: [
                    expand: true
                    dot: true
                    cwd: "<%= yeoman.app %>"
                    dest: "<%= yeoman.dist %>"
                    src: [
                        "favicon.ico"
                        # bower components that has image, font dependencies
                        "bower_components/font-awesome/css/*"
                        "bower_components/font-awesome/fonts/*"
                        "bower_components/weather-icons/css/*"
                        "bower_components/weather-icons/font/*"

                        "fonts/**/*"
                        "i18n/**/*"
                        "images/**/*"
                        "styles/bootstrap/**/*"
                        "styles/fonts/**/*"
                        "styles/img/**/*"
                        "styles/ui/images/**/*"
                        "views/**/*"
                    ]
                ,
                    expand: true
                    cwd: "<%= yeoman.app %>/bower_components/html5shiv/dist/"
                    src: "html5shiv.min.js"
                    dest: "<%= yeoman.dist %>/scripts"
                ,
                    expand: true
                    cwd: "<%= yeoman.app %>/bower_components/respond/dest/"
                    src: "respond.min.js"
                    dest: "<%= yeoman.dist %>/scripts"
                ,
                    expand: true
                    cwd: ".tmp"
                    dest: "<%= yeoman.dist %>"
                    src: ["styles/**", "assets/**"]
                ,
                    expand: true
                    cwd: ".tmp/images"
                    dest: "<%= yeoman.dist %>/images"
                    src: ["generated/*"]
                ]

            styles:
                expand: true
                cwd: "<%= yeoman.app %>/styles"
                dest: ".tmp/styles/"
                src: "**/*.css"
            distTest:
                files: [
                    expand: true
                    dot: true
                    cwd: "<%= yeoman.app %>"
                    dest: "<%= yeoman.dist %>"
                    src: [
                        "favicon.ico"
                        "bower_components/ace-builds/src-min-noconflict/ace.js"
                        "bower_components/ace-builds/src-min-noconflict/ext-language_tools.js"
                        "bower_components/ace-builds/src-min-noconflict/mode-html.js"
                        "bower_components/ace-builds/src-min-noconflict/worker-html.js"
                        "bower_components/ace-builds/src-min-noconflict/mode-javascript.js"
                        "bower_components/ace-builds/src-min-noconflict/worker-javascript.js"
                        "bower_components/ace-builds/src-min-noconflict/mode-css.js"
                        "bower_components/ace-builds/src-min-noconflict/worker-css.js"
                        "bower_components/ace-builds/src-min-noconflict/ext-searchbox.js"
                        "bower_components/angular/angular.min.js"
                        "bower_components/angular/angular.min.js.map"
                        "bower_components/angular-animate/angular-animate.min.js"
                        "bower_components/angular-animate/angular-animate.min.js.map"
                        "bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js"
                        "bower_components/angular-encode-uri/dist/angular-encode-uri.min.js"
                        "bower_components/angular-resource/angular-resource.min.js"
                        "bower_components/angular-resource/angular-resource.min.js.map"
                        "bower_components/angular-route/angular-route.min.js"
                        "bower_components/angular-route/angular-route.min.js.map"
                        "bower_components/angular-ui-ace/ui-ace.js"
                        "bower_components/angular-ui-tree/dist/angular-ui-tree.min.js"
                        "bower_components/angular-wizard/dist/angular-wizard.min.js"
                        "bower_components/bootstrap-file-input/bootstrap.file-input.js"
                        "bower_components/flot.tooltip/js/jquery.flot.tooltip.min.js"
                        "bower_components/gauge.js/dist/gauge.min.js"
                        "bower_components/holderjs/holder.js"
                        "bower_components/jquery-spinner/dist/jquery.spinner.min.js"
                        "bower_components/jquery-steps/build/jquery.steps.min.js"
                        "bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.min.js"
                        "bower_components/jquery.slimscroll/jquery.slimscroll.min.js"
                        "bower_components/jquery/jquery.min.js"
                        "bower_components/jquery/jquery.min.map"
                        "bower_components/morris.js/morris.js"
                        "bower_components/ng-tags-input/ng-tags-input.min.js"
                        "bower_components/ngmap/dist/ng-map.min.js"
                        "bower_components/raphael/raphael-min.js"
                        "bower_components/restangular/dist/restangular.min.js"
                        "bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js"
                        "bower_components/toastr/toastr.min.js"
                        "bower_components/underscore/underscore-min.js"
                        "bower_components/underscore/underscore-min.map"
                        "bower_components/flot/*.js"
                        "bower_components/textAngular/dist/*.js"
                        "bower_components/font-awesome/css/*"
                        "bower_components/font-awesome/fonts/*"
                        "bower_components/weather-icons/css/*"
                        "bower_components/weather-icons/font/*"
                        "bower_components/bootstrap/dist/fonts/*"
                        "bower_components/ladda/dist/ladda.min.js"
                        "bower_components/ladda/dist/spin.min.js"
                        "bower_components/ng-context-menu/dist/ng-context-menu.min.js"
                        "bower_components/angular-xeditable/dist/js/xeditable.js"
                        "bower_components/angular-poller/angular-poller.js"

                        "fonts/**/*"
                        "i18n/**/*"
                        "images/**/*"
                        "styles/bootstrap/**/*"
                        "styles/fonts/**/*"
                        "styles/img/**/*"
                        "styles/ui/images/**/*"
                        "views/**/*"
                        "scripts/vendors/*.js"
                        "index.html"
                        "login.html"
                    ]
                ,
                    expand: true
                    cwd: ".tmp"
                    dest: "<%= yeoman.dist %>"
                    src: ["styles/**", "assets/**"]
                ,
                    expand: true
                    cwd: ".tmp/images"
                    dest: "<%= yeoman.dist %>/images"
                    src: ["generated/*"]
                ]

       

        concurrent:
            server: ["coffee:server", "compass:server", "copy:styles"]
            dist: ["coffee:dist", "compass:dist", "copy:styles", "htmlmin"]
            lessServer: ["coffee:server", "less:server", "copy:styles"]
            lessDist: ["coffee:dist", "less:dist", "copy:styles", "htmlmin"]
            lessDistTest: ["coffee:distNoUglify", "less:dist", "copy:styles"]

        concat:
            options:
                separator: grunt.util.linefeed + ';' + grunt.util.linefeed

        uglify:
            options:
                mangle: false
                compress:
                    drop_console: true
            dist:
                files:
                    "<%= yeoman.dist %>/scripts/app.js": [".tmp/**/*.js", "<%= yeoman.app %>/scripts/**/*.js"]


    grunt.registerTask "server", (target) ->
        return grunt.task.run(["build", "open", "connect:dist:keepalive"])  if target is "dist"
        grunt.task.run ["clean:server", "concurrent:server", "connect:livereload", "open", "watch"]

    grunt.registerTask "lessServer", (target) ->
        return grunt.task.run(["buildLess", "open", "connect:dist:keepalive"])  if target is "dist"
        grunt.task.run ["clean:server", "concurrent:lessServer", "connect:livereload", "open", "watch"]

    grunt.registerTask "lessServerNoRefresh", (target) ->
        return grunt.task.run(["buildLess", "open", "connect:dist:keepalive"])  if target is "dist"
        grunt.task.run ["clean:server", "concurrent:lessServer", "connect:nolivereload", "open", "watch"]

    grunt.registerTask "build", ["clean:dist", "useminPrepare", "concurrent:lessDist", "copy:dist", "concat", "uglify", "usemin"]
    grunt.registerTask "buildDev", ["clean:dist", "useminPrepare", "concurrent:lessDist", "copy:dist", "concat", "usemin"]

    grunt.registerTask "default", ["server"]