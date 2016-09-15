module.exports = function(grunt){
	// init config
	grunt.initConfig({
		// cleaning
		clean: {
		  build: {
		    src: ['build']
		  },

		  deploy: {
		    src: ['deploy']
		  }
		},

		//deploy
		copy:{
			deploy:{
				expand: true,
				cwd: 'build/',
			    src: '**',
			    dest: 'deploy/'
			}
		},

		// sass
		sass: {
	    	dist: {
	      		files: [{
	        		expand: true,
	        		cwd: 'assets/scss',
	        		src: ['**/*.scss'],
	        		dest: 'build/scss',
	        		ext: '.css'
	      		}]
	    	}
	  	},

  		// min css
  		cssmin: {
		 	target: {
			    files: [{
			    	expand: true,
			     	cwd: 'build/scss',
			      	src: ['**/*.css', '!*.min.css'],
			      	dest: 'build/css',
			      	ext: '.min.css'
			    }]
		  	}
		},

		// min js
		uglify: {
		    my_target: {
		      	files: [{
		          	expand: true,
		          	cwd: 'assets/js',
		          	src: '**/*.js',
		          	dest: 'build/js',
		          	ext: '.min.js'
		      	}]
		    }
		},

		jslint: {
			client: {
		        src: ['assets/js/**/*.js'],
		        directives: {
		          	browser: true,
		          	predef: []
		        },
	        	options: {
	          		junit: 'errorsJS/client-junit.xml',
	          		failOnError: false
	        	}
	      	}
		},

		//image min
		image: { 
		    dynamic: {
		        files: [{
		          	expand: true,
		          	cwd: 'assets/images/',
		          	src: ['**/*.{png,jpg,gif,svg}'],
		          	dest: 'build/images/'
		        }]
		    }
		},

		// sprite
		sprite:{
		    all:{
		        src: 'assets/images/sprite/*.png',
		        //retinaSrcFilter: ['assets/images/sprite/*@2x.png'],
		        dest: 'build/images/sprite.png',
		        //retinaDest: 'build/images/sprite.retina@2x.png',
		        destCss: 'assets/scss/_sprite.scss'
		    }
		},

		watch: {
		  	js: {
		    	files: 'assets/js/**/*.js',
		    	tasks: ['jslint', 'uglify'],
		    	options: {
		      	event: ['all']
		    	},
		  	},

		  	css: {
		  		files: 'assets/scss/**/*.scss',
		  		tasks: ['sass', 'cssmin'],
		  		options: {
		  	 	event: ['all']
		  		},
		  	},

		  	makesprite: {
		  		files: 'assets/images/sprite/**/*.png',
		  		tasks: ['sprite'],
		  		options: {
		  	 	event: ['all']
		  		},
		  	},

		  	images: {
		  		files: 'assets/images/**/*.jpg',
		  		tasks: ['image'],
		  		options: {
		  	 	event: ['all']
		  		},
		  	}
		},

		'string-replace': {
		  	dist: {
			    files: {
			      'index.html': 'develop.html'
				},

			    options: {
				    replacements: [{
				        pattern: 'build/',
				        replacement: 'deploy/'
				    }]
			    }
		    }
		}
	});

	//loading tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-image');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-string-replace');

	// register tasks
	grunt.registerTask('build', ['clean:build', 'sprite', 'sass', 'cssmin', 'jslint', 'uglify','image']);
	grunt.registerTask('default', ['build', 'watch']);
	grunt.registerTask('deploy', ['build', 'clean:deploy', 'copy:deploy', 'string-replace']);
}