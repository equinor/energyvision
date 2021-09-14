(function(){
	
	window.onkeydown = function(e) {
        if (e.keyCode == 32 && document.activeElement.className.includes('languagetoggle')){
			e.preventDefault();
            document.activeElement.click();
		}
        if (e.keyCode == 32 && document.activeElement.className.includes('si-search')){
			e.preventDefault();
            document.activeElement.click();
		}
	};

})();