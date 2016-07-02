// Gruntfile
/*jslint devel: true, node: true, white:true */

module.exports = function(grunt) {
    'use strict';
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);
    // configurable paths
    var mvcConfig = {
        js: 'js',
        release: 'release',
        tmp: 'tmp'
    };

    grunt.initConfig({
        mvc: mvcConfig,
          watch: {
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'js/index.html',
                    'js/views/**/*.html',
                    'js/controllers/*.js',
                    'js/directives/*.js',
                    'js/filters/*.js',
                    'js/services/*.js',
                    'js/states/*.js',
                    'js/css/**/*.less',
                    'js/css/bundle.css',
                    'js/**.js',
                ]
            },
            less: {
                files: [
                    'js/css/**/*.less',
                    //'js/css/**/*.css',
                   // 'js/css/bundle.css'
                ],
                tasks: ['less']
            }
        },
        clean: {
            release: ['<%= mvc.release %>/'],
            tmp: ['<%= mvc.tmp %>/']
        },
        copy: {
            vendor: {
                files: [
                    { "expand": true, "cwd": "<%=mvc.js%>/vendor/angular/", "src": "angular.js", "dest": "<%=mvc.release%>/vendor" },
                    { "expand": true, "cwd": "<%=mvc.js%>/vendor/jquery/", "src": "jquery.js", "dest": "<%=mvc.release%>/vendor" },
                    { "expand": true, "cwd": "<%=mvc.js%>/vendor/requirejs/", "src": "require.js", "dest": "<%=mvc.release%>/vendor/requirejs" },
                    { "expand": true, "cwd": "<%=mvc.js%>/vendor/angular-animate/", "src": "angular-animate.js", "dest": "<%=mvc.release%>/vendor" },
                    { "expand": true, "cwd": "<%=mvc.js%>/vendor/angular-cookies/", "src": "angular-cookies.js", "dest": "<%=mvc.release%>/vendor" },
                    { "expand": true, "cwd": "<%=mvc.js%>/vendor/angular-sanitize/", "src": "angular-sanitize.js", "dest": "<%=mvc.release%>/vendor" },
                    { "expand": true, "cwd": "<%=mvc.js%>/vendor/angular-touch/", "src": "angular-touch.js", "dest": "<%=mvc.release%>/vendor" },
                    { "expand": true, "cwd": "<%=mvc.js%>/vendor/angular-ui-bootstrap-bower", "src": ["ui-bootstrap.js", "ui-bootstrap-tpls.js"], "dest": "<%=mvc.release%>/vendor" }
                ]
            },
            module: {
                files: [{
                    expand: true,
                    cwd: '<%= mvc.js %>',
                    src: ['app.js', 'config.js', 'bootstrap.js', 'index.html', 'controllers/**', 'directives/**', 'filters/**', 'services/**', 'states/**', 'views/**'],
                    dest: '<%= mvc.release %>/'
                }]
            },
            basic: {
                files: [{
                    expand: true,
                    cwd: '<%= mvc.js %>/vendor/jquery/',
                    src: ['jquery.js'],
                    dest: '<%= mvc.release %>/vendor'
                }]
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= mvc.js %>/css/bootstrap/css',
                    src: ['bootstrap.css'],
                    dest: '<%= mvc.tmp %>/css'
                }, {
                    expand: true,
                    cwd: '<%= mvc.js %>/css/bootstrap/fonts',
                    src: ['*.*'],
                    dest: '<%= mvc.release %>/fonts'
                }]
            }
        },
        /*requirejs: {
            compile: {
                options: {
                    appDir: '<%= mvc.tmp %>',
                    baseUrl: './',
                    dir: '<%= mvc.release %>',
                    removeCombined: true,
                    preserveLicenseComments: false,
                    paths: {
                        'angular': '../<%= mvc.tmp %>/vendor/angular',
                        'jquery': '../<%= mvc.tmp %>/vendor/jquery.min',
                        'moment': '../<%= mvc.tmp %>/vendor/moment.min',
                        'respond': '../<%= mvc.tmp %>/vendor/respond',
                        'domReady': '../<%= mvc.tmp %>/vendor/domReady',
                        'bootstrap': '../<%= mvc.tmp %>/vendor/bootstrap.min',
                        'angular.animate':'../<%=mvc.tmp%>/vendor/angular-animate',
                        'angular.cookies':'../<%=mvc.tmp%>/vendor/angular-cookies',
                        'angular.resource':'../<%=mvc.tmp%>/vendor/angular-resource',
                        'angular.route':'../<%=mvc.tmp%>/vendor/angular-route',
                        'angular.sanitize':'../<%=mvc.tmp%>/vendor/angular-sanitize',
                        'angular-touch':'../<%=mvc.tmp%>/vendor/angular-touch',
                        'uiBootstrap':'../<%=mvc.tmp%>/vendor/ui-bootstrap.min',
                        'uiBootstrapTpl':'../<%=mvc.tmp%>/vendor/ui-bootstrap-tpls.min'
                    },
                    shim: {
                        'moment': {
                            exports: 'moment'
                        },
                        'angular': {
                            deps: ['jquery', 'moment'],
                            exports: 'angular'
                        },
                        'respond': {
                            exports: 'respond'
                        },

                        'bootstrap': {
                            deps: ['jquery'],
                            exports: 'bootstrap'
                        },
        'angular.animate': ['angular'],
        'angular.cookies': ['angular'],
        'angular.sanitize': ['angular'],
        'angular-touch': ['angular'],
        'uiBootstrap': { deps: ['angular', 'bootstrap'], exports: 'uiBootstrap' },
        'uiBootstrapTpl': { deps: ['angular', 'uiBootstrap'] }
                    },
                    modules: [{
                        name: 'views/Home/index'
                    }],
                    onBuildRead: function(moduleName, path, contents) {
                        if (moduleName === 'config') {
                            var x = (function(contents) {
                                var regex = /'(vendor|libs)[^']*'/gm;
                                var matches = contents.match(regex);
                                for (var i = 0; i < matches.length; i++) {
                                    var match = matches[i];
                                    var m = matches[i].split('/');
                                    contents = contents.replace(match, '\'vendor/' + m[m.length - 1].toLowerCase());
                                }
                                return contents;
                            })(contents);

                            return x.replace(/\/public\/js/g, '/public/release');
                        }
                        return contents;
                    },
                    urlArgs: "bust=v4"
                }
            }
        },*/
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= mvc.release %>/vendor/*.js', '<%= mvc.release %>/config.js', '<%= mvc.release %>/app.js', '<%= mvc.release %>/bootstrap.js', '<%= mvc.release %>/controllers/**/*.js', '<%= mvc.release %>/directives/**/*.js', '<%= mvc.release %>/filters/**/*.js', '<%= mvc.release %>/services/**/*.js'],
                dest: '<%= mvc.release %>/libs.js'
            }
        },
        uglify: {
            build: {
                src: ['<%= mvc.release %>/libs.js'],
                dest: '<%= mvc.release %>/libs.min.js'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= mvc.release %>/views',
                    src: ['**/*.html'],
                    dest: '<%= mvc.release %>/views'
                }]
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            all: [
                'Gruntfile.js',
                '<%= mvc.js %>/{,*/}*.js',
                '!<%= mvc.js %>/vendor/{,*/}*.js',
                '!<%= mvc.js %>/libs/{,*/}*.min.js',
                '!<%= mvc.js %>/helpers/string.js',
                'test/spec/{,*/}*.js'
            ]
        },
        cssmin: {
            combine: {
                files: {
                    '<%= mvc.release %>/css/bundle.css': ['<%= mvc.js %>/css/**/*.css']
                }
            }
        },
        less: {
            development: {
                files: {
                    'js/css/bundle.css': ['js/css/**/*.less','js/css/fonts/iconfont.css']
                   //'js/css/bundle.css': '<%= watch.less.files %>'
                }
            }
        },
        connect: {
            options: {
                port: 8001,
                livereload: 35732,
                hostname: "localhost"
            },
            livereload: {
                options: {
                    open: 'http://<%= connect.options.hostname %>:<%= connect.options.port%>/js/',
                }
            }
        },
      
    });

    // These plugins provide necessary tasks.
    /*grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-piece-modulejs');*/

    require('load-grunt-tasks')(grunt);
    // grunt.loadTasks('tasks');
    // task
    /*grunt.registerTask('build', [
        'clean:release',
        'clean:tmp',
        'copy:vendor',
        'copy:module',
        'copy:basic',
        'copy:css',
        'less',
        'cssmin',
        'clean:tmp',
        'htmlmin',
        'concat',
        'uglify:build',
        'connect',
        'watch'
    ]);*/

    grunt.registerTask('serve', function() {
        grunt.task.run([
            'less',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('produce',function(){
        grunt.task.run([
            'clean:release',
            'clean:tmp',
            'copy:vendor',
            'copy:module',
            'copy:basic',
            'copy:css',
           // 'less',
            'cssmin',
            'clean:tmp',
            'htmlmin',
            'uglify:build'
        ]);
    });

    grunt.registerTask('default', [
       // 'jshint',
        'serve'
       // 'build'
    ]);

};
