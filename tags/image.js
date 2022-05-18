class ImageAspect extends HaikuElement{
	#img = null
	constructor(){
		super()
	}
	connectedCallback(){
		this.style.display = "block"
		this.style.width = this.getAttribute('width')
		this.style.height = this.getAttribute('height')
		var parent = document.createElement('div')
		parent.style = `width:100%;aspect-ratio:${this.getAttribute('aspect')||"16/9"};overflow:hidden;`
		var src = this.getAttribute('src')
		if(src){
			this.#img = new Image()
			this.#img.src = src
			this.#img.style = "object-fit:cover;width:100%;height:100%;"
			parent.appendChild(this.#img)
		}else{
			parent.innerHTML = `<svg style="cover;width:100%;height:100%;" width="500" height="500" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>`
		}
		this.shadowRoot.appendChild(parent)
		this.image = this.#img
	}
}

HaikuElement.register("image",ImageAspect)