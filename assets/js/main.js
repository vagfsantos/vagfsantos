'use strict';
(function(){
	if( !window.app ){
		window.app = {};
	}
})();


(function(){
	var app = window.app || {};

	app.initAPP = function(){
		for(var i in app.features){
			if( app.features.hasOwnProperty(i) ){
				app.features[i]();
			}
		}
	}

	app.features = {
		menuViewController: function(){
			var btn_menu = document.querySelectorAll('#header .item-menu a')[0];
			var menu = document.querySelector('#main-menu');
			var close = document.querySelector('#close-menu');

			btn_menu.addEventListener('click', function(e){
				e.preventDefault();
				menu.classList.add('actived');
			});

			close.addEventListener('click', function(e){
				e.preventDefault();
				menu.classList.remove('actived');
			});
		},

		menuLinksController: function(){
			var menu = document.querySelector('#main-menu');
			menu.addEventListener('click', function(e){
				
				var target = e.target;
				var section = document.querySelector(target.hash);
				if( target.classList.contains('go-to-section') ){
					menu.classList.remove('actived');

					if( target.offsetTop ){
						e.preventDefault();
						var offset = section.offsetTop - 50;
						var scroll = window.scrollY;
						var aceleration = 0;
						var interval = 20;
						var step = 5;

						if( offset > scroll ){
							var time = setInterval(function(){
								if( scroll <= offset ){
									scroll += step + aceleration;
									aceleration++;
									window.scrollTo(0, scroll);
								}else{
									clearInterval(time);
								}
							}, interval);
						}else{
							var time = setInterval(function(){
								if( scroll >= offset ){
									scroll -= step - aceleration;
									aceleration--;
									window.scrollTo(0, scroll);
								}else{
									clearInterval(time);
								}
							}, interval);
						}
					}
				}
			});
		},

		fixedMenuHighlight: function(){
			var limit = 100;
			var highlighted = false;
			var header = document.querySelector('#header .group-header');

			window.addEventListener('scroll', function(){
				var scroll = this.scrollY;

				if( scroll > limit && !highlighted){
					header.classList.add('fixed');
					highlighted = true;
				}

				if( scroll < limit && highlighted){
					header.classList.remove('fixed');
					highlighted = false;
				}

			}, false);
		}
	}

})();

document.addEventListener("DOMContentLoaded", function(e) {
	window.app.initAPP();	
});