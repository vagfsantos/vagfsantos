module.exports = function(grunt){
	// init config
	grunt.initConfig({
		// cleaning
		clean: {
		  build: {
		    src: ['build']
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
		          	dest: 'build/js'
		      	}]
		    }
		},

		//image min
		imagemin: { 
		    dynamic: {  
		      	files: [{
		        	expand: true,              
		        	cwd: 'assets/images/', 
		        	src: ['**/*.{png,jpg,gif}'],   
		        	dest: 'build/images/'                 
		      	}]
		    }
		},

		// sprite
		sprite:{
		    all:{
		        src: 'assets/images/sprite/*.png',
		        dest: 'build/images/sprite.png',
		        destCss: 'assets/scss/_sprite.scss'
		    }
		}
	});

	//loading tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-spritesmith');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// register tasks
	grunt.registerTask('test', ['clean', 'sass', 'cssmin', 'uglify', 'imagemin', 'sprite']);
}