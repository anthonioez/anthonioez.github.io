module.exports = function (grunt) {
    'use strict';

    const sass = require('sass');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                implementation: sass,
                sourcemap: 'none',
                style: 'expanded'
            },
            dist: {
                files: {
                    './static/css/main.css': './src/scss/main.scss'
                }
            }
        },

        uglify: {
            options: {
                sourceMap: false,
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './src/js',
                    src: ['*.js'],
                    dest: './static/js/'
                }]
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: './static/img/'
                }]
            }
        },

        copy: {
            images: {
                files: [{
                    expand: true,
                    cwd: './src/img',
                    src: ['**'],
                    dest: './static/img/'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    cwd: './src/fonts',
                    src: ['**'],
                    dest: './static/fonts/'
                }]
            }
        },

        watch: {
            sass: {
                files: ['./src/scss/**/*.scss'],
                tasks: ['sass']
            },
            script: {
                files: ['./src/js/**/*.js'],
                tasks: ['uglify']
            },
            images: {
                files: ['./src/img/**/*.*'],
                tasks: ['copy:images']
            },
            fonts: {
                files: ['./src/fonts/**/*.*'],
                tasks: ['copy:fonts']
            }
        },

        clean: {
            static: ['./static'],
        },

    });

    grunt.registerTask('monitor', ['watch:sass']);
    grunt.registerTask('build', ['clean', 'sass', 'uglify', 'copy']);

};
