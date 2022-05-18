class HaikuChart extends Haiku.Element{
	#canvas = document.createElement('canvas')
	#ctx
	#width;
	#height;
	get width(){return this.#width}
	get height(){return this.#height}
	constructor(){
		super()
		this.shadowRoot.appendChild(this.#canvas)
	}
	execute(callback){
		if(typeof callback != "function"){
			callback = new Function("context","canvas",callback)
		}
		callback(this.#ctx,this.#canvas)
	}
	connectedCallback(){
		this.#width = this.getAttribute("width")||480
		this.#height = this.getAttribute("height")||360
		this.#canvas.width = this.#width
		this.#canvas.height = this.#height
		var ctxt = this.getAttribute("context")||"2d"
		this.#ctx = this.#canvas.getContext(ctxt)
		var setupCode = this.innerHTML;
		new Chart(this.#ctx,JSON.parse(setupCode));
		// this.execute(setupCode)
	}
}
Haiku.register("chart",HaikuChart)