module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                files: [{
                    expand: true,
                    cwd: './public/stylesheets',
                    src: ['**/*.less','!**/_*.less'],
                    dest: './public/css',
                    ext: '.css'
                }]
            }
        },
        // CSS压缩
        cssmin: {
            build: {
                expand: true,
                cwd: './public/css',
                src: ['*.css', '!*.min.css'],
                dest: './public/css',
                ext: '.css'
            }
        }

        /*uglify: {
            options: {
                banner: '/!*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> *!/\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        }*/
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // 默认被执行的任务列表。
    grunt.registerTask('stylesheets', ['less','cssmin']);

};