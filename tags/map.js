class ImageMap extends ImageAspect{
	constructor(){
		super()
		var img = this.shadowRoot.querySelector('img')
		var ctx = document.createElement('canvas').getContext('2d')
		
		var canvas = ctx.canvas
		canvas.style = img.style
		
		canvas.width = this.offsetWidth||window.innerWidth
		canvas.height = this.offsetHeight||window.innerHeight

		this.context = ctx
	}
	requestImage(){
		var img = new Image()
		img.src = `https://tile.openstreetmap.org/${z}/${x}/${y}.png`
	}
}

HaikuElement.register("map",ImageMap)