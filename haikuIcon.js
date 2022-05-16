(()=>{
	const loadedIcons = new Set()
	class Icon extends HaikuElement{
		constructor(){
			super()
		}
		connectedCallback(){
			this.icon = this.getAttribute("icon")
			addIcon(this.icon)
		}
	}
	HaikuElement.register("icon",Icon)
	function loadIcon(icon){
		Haiku.importCSS(`/icons/${icon}.css`)
	}
	function addIcon(icon){
		if(!loadedIcons.has(icon)){
			loadIcon(icon)
		}
	}
})()