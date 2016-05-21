module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            jade: {
                files: ['server/views/**'],
                options: {
                    livereload: true,
                }
            },
            html: {
                files: ['client/views/**'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: ['client/css/**'],
                options: {
                    livereload: true,
                }
            },
            js: {
                files: ['client/js/**/*.js', 'server/**/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    livereload: true,
                }
            }/*,
            concat: {
                compile_js: {
                    src: [
                        'client/bower_components/jquery/dist/jquery.min.js',
                        'client/bower_components/jquery/dist/jquery.slim.min.js'
                    ]
                }
            }*/
        },
        jshint: {
            all: ['client/js/**/*.js', 'server/**/*.js']
        },
        uglify: {
            build: {
                files: {
                    'client/concated/app.min.js': ['client/js/**/*.js', 'server/**/*.js']
                }
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    ignore: ['node_modules/**'],
                    //watch: ['server/**/*.js'],
                    //debug: true,
                    env: {
                        PORT: 3000
                    }
                }
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');


    grunt.registerTask('default', ['concurrent', 'nodemon','jshint']);
}