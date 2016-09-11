module.exports = function (grunt) {
	grunt.initConfig({
		clean: {
			files: ['public/*.html', 'public/css/site.css', 'public/js/site.min.js']
		},
		uglify: {
			build: {
				options: {
					force: true
				},
				files: {
					'public/js/site.min.js': ['js/*.js']
				}
			}
		},
		less: {
			build: {
				options: {
					compress: false
				},
				files: {
					'public/css/site.css': 'less/main.less'
				}
			}
		},
		postcss: {
			build: {
				options: {
					processors: [
						require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
						require('cssnano')({autoprefixer: false, safe: true}) // minify and optimise the result
					]
				},
				files: {
					'public/css/site.min.css': 'public/css/site.css'
				}
			}
		},
		copy: {
			build: {
				files: [{
					expand: true,
					cwd: 'public/',
					src: ['**'],
					dest: '../wwwroot/'
				},{
					src: '*.html',
					dest: '../wwwroot/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-postcss');

	grunt.file.setBase('./website/');

	grunt.registerTask('default', ['build']);
	grunt.registerTask('build', ['clean', 'uglify', 'less', 'postcss', 'copy']);
};
