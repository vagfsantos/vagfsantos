'use strict';
(function(){
	if( !window.app ){
		window.app = {};
	}
})();


(function(){
	window.app.openMenu = function(){
		var btn_menu = document.querySelectorAll('#header .item-menu a')[0];
		var menu = document.querySelector('#main-menu');

		btn_menu.addEventListener('click', function(e){
			e.preventDefault();
			menu.classList.add('actived');
		});
	};
})();

document.addEventListener("DOMContentLoaded", function(e) {
	window.app.openMenu();	
});