module.exports = function(grunt) {

    grunt.initConfig({
    
        pkg: grunt.file.readJSON('package.json'),

        concat: {
        
            options: {
                separator: ';'
            },
            form: {
                src: [],
                //dest: 
            }
        
        },

        less: {
        
            dev: {
                options: {
                    paths: ['public/styles']
                },
                files: {
                    'static/css/master.css': 'public/styles/master.less'
                }
            }
        
        },

        watch: {
        
            css: {
                files: ['public/styles/**/*.less'],
                tasks: ['less'],
                options: {
                    host: 'localhost',
                    livereload: true
                }
            },

            html: {
                files: ['views/**/*.jade'],
                options: {
                    host: 'localhost',
                    livereload: true
                }
            },

            js: {
                files: ['public/**/*.js'],
                options: {
                    host: 'localhost',
                    livereload: true
                }
            }
        
        }

    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('css', ['less']);
    grunt.registerTask('default', ['watch']);

};
