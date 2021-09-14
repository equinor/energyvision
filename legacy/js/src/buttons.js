;(function(){
var buttons = document.querySelectorAll('.btn.download');
for(var i = 0; i < buttons.length; i++){
    var btn = buttons[i];
    btn.addEventListener('click', function(event) {
        var catcher = this.querySelector('.button-focus-catcher');
        if(catcher && event.clientX != 0 && event.clientY != 0) {
            catcher.focus();
        }
    }, true)
}
})();