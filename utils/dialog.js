Haiku.UpdateDialog = function (){
	var hash = location.hash
	if(hash.length<1)return
	hash = document.querySelector(hash)
	if(hash && hash.tagName == "DIALOG"){
		window.dialog = hash
		hash.setAttribute('open',"true")
		hash.close = function(){
			this.removeAttribute('open')
			document.body.classList.remove("dialog-focus")
			location.hash = ""
		}
		document.body.classList.add("dialog-focus")
	}
}
window.addEventListener('hashchange',()=>{
	Haiku.UpdateDialog()
})
Haiku.onload.add(Haiku.UpdateDialog)
Haiku.onupdate.add(Haiku.UpdateDialog)