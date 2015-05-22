var path = require('path');
var docConfig = require('./documentjs.json');
var isCI = process.env.CI === 'true';

module.exports = function (grunt) {

	grunt.loadNpmTasks('steal-tools');
	grunt.loadNpmTasks('testee');
	grunt.loadNpmTasks('grunt-serve');
	grunt.loadNpmTasks('documentjs');
	
	var config = {
		documentjs: docConfig,
		testee: {
			options: {
				reporter: 'Spec'
			},
			local: {
				options: {
					browsers: ['chrome']
				},
				src: ['test/test.html']
			},
			ci: {
				options: {
					browsers: ['firefox']
				},
				src: ['test/test.html']
			}
		},
		serve: {
			path: './'
		},
		'steal-export': {
			dist: {
				system: {
					config: 'package.json!npm'
				},
				outputs: {
					'+cjs': {},
					'+amd': {},
					'+global-js': {},
					'+global-css': {}
				}
			}
		}
	};

	grunt.initConfig(config);
	grunt.registerTask('server',['serve']);
	grunt.registerTask('build',['steal-export']);
	grunt.registerTask('test', [ isCI ? 'testee:ci' : 'testee:local' ]);
	grunt.registerTask('docs', ['documentjs'])
};
