function clickFunction(){
	var url = "src/libraryInfo.php";
    var callback = function(text) {
        console.log(text);
    };
	ajax(url, { success: callback });
}
function ajax(url, settings) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status === 200) {
            settings.success(xhr.responseText);
        } else {
            console.error(xhr.responseText);
        }
    }

    xhr.open(settings.method || 'GET', url, true);
    xhr.send(settings.data || null);
}
(function() {
	libraryButton = document.getElementById('library');
	library.addEventListener('click',clickFunction);
    
})();