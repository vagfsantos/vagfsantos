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
				if( target.classList.contains('go-to-section') ){
					menu.classList.remove('actived');
				}
			})
		}
	}

})();

document.addEventListener("DOMContentLoaded", function(e) {
	window.app.initAPP();	
});