class HaikuElement extends HTMLElement{
	constructor(){
		super()
		this.attachShadow({mode: 'open'})
	}
	static helpMap = new Map()
	static help(name = ""){
		if(name.length>1){			
			var datas = name.split(".")
			var i = 0
			var el = HaikuElement.helpMap.get(datas[i])
			i++
			while(el && datas[i] && i<datas.length){
				el = el[datas[i]]
			}
			return Object.keys(el)
		}else{
			return [...HaikuElement.helpMap.keys()]
		}
	}
	static register(name,clazz){
		name = name.toLowerCase()
		HaikuElement.helpMap.set(name,clazz)
		window.customElements.define(`haiku-${name}`,clazz)
	}
}

class SwitchNightMode extends HaikuElement{
	static style = `
	.nightmode{
			position: relative;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		  /** sunny side **/
		  --blue-background: #C2E9F6;
		  --blue-border: #72cce3;
		  --blue-color: #96dcee;
		  --yellow-background: #fffaa8;
		  --yellow-border: #f5eb71;
		  /** dark side **/
		  --indigo-background: #348;
		  --indigo-border: #5d6baa;
		  --indigo-color: #6b7abb;
		  --gray-border: #e8e8ea;
		  --gray-dots: #e8e8ea;
		  /** general **/
		  --white: #fff;
		  width:3em;
		  height:2em;
		  min-width:3em;
		  min-height:2em;
		  background: var(--blue-color);
		  border-radius: 2em;
		  border: 1px solid var(--blue-border);
		  transition: all 0.6s ease;
		  overflow:hidden;
	  }
	  .nightmode input[type="checkbox"] {
		display: none;
	  }
	  .nightmode input[type="checkbox"] ~ label{
		width: 100%;
		height: 100%;
		display:block;
		border-radius: 1em;
		position: relative;
		background: var(--blue-color);
	  }
	  
	  .nightmode input[type="checkbox"] ~ label span {
		animation-name: reverse;
		animation-duration: 350ms;
		animation-fill-mode: forwards;
		transition: all 350ms ease-in;
		content: "";
		width: 1.7em;
		height: 1.7em;
		left: .1em;
		top: .1em;
		z-index:1;
		position: absolute;
		border-radius: 2em;
		background: var(--blue-color);
		box-shadow: inset 2em 0px 0px 2px var(--yellow-background);
	  }
	  .nightmode input[type="checkbox"] ~ label span:before,
	  .nightmode input[type="checkbox"] ~ label span:after
	  {
		  display:block;
		  position:relative;
		  border-radius:2px;
		  
		  height:3px;
		  content:"";
		  
		  background:var(--white);
		  
		  transition:all .6s ease;
	  }
	  .nightmode input[type="checkbox"] ~ label span:before{
		  top:45%;
		  left:120%;
		  width:.7em;
	  }
	  .nightmode input[type="checkbox"] ~ label span:after{
		  top:55%;
		  left:100%;
		  width:1em;
	  }
	  
	  .nightmode input[type="checkbox"]:checked ~ label {
		background: var(--indigo-background);
	  }
	  
	  .nightmode input[type="checkbox"]:checked + label span {
		animation-name: switch;
		animation-duration: 350ms;
		animation-fill-mode: forwards;
		transition: all 350ms ease-in;
		background: var(--indigo-background);
		box-shadow:inset -.5em 0px 0px 2px var(--gray-dots);
	  }
	  .nightmode input[type="checkbox"]:checked ~ label span:before{
		  top:23%;
		  left:-10%;
		  width:3px;
		  background:var(--yellow-background);
	  }
	  .nightmode input[type="checkbox"]:checked ~ label span:after{
		  top:35%;
		  left:-30%;
		  width:3px;
		  background:var(--yellow-border);
	  }
	  @keyframes switch {
		0% {
		  left: .1em;
		}
		60% {
		  left: .1em;
		  width: 2.7em;
		}
		100% {
		  left: 1.1em;
		  width: 1.7em;
		}
	  }
	  @keyframes reverse {
		0% {
		  left: 1.1em;
		  width: 1.7em;
		}
		60% {
		  left: .1em;
		  width: 2.7em;
		}
		100% {
		  left: .1em;
		}
	  }
	  `
	constructor(){
		super()
		var style = document.createElement('style')
		style.innerHTML = SwitchNightMode.style
		this.shadowRoot.innerHTML = `<div class="nightmode"><input id="night-toggle" value="false" onchange="document.body.parentElement.classList.toggle('night');localStorage.setItem('nightmode',localStorage.getItem('nightmode')=='false')" type="checkbox"><label for="night-toggle"><span></span></label></div>`
		if(localStorage.getItem("nightmode")=="true"||localStorage.getItem("nightmode")==null){
			// document.body.classList.add("night")
			document.body.parentElement.classList.add("night")
			this.shadowRoot.querySelector('input').checked = true
		}
		this.shadowRoot.appendChild(style)

	}
	connectedCallback(){
		this.style.display = "block"
		this.style.width = "3em"
		this.style.height = "2em"
	}

}

HaikuElement.register("light",SwitchNightMode)

class NavBarToggle extends HaikuElement{
	static style = `
	input {
		display:none;
	}
	input ~ div{
		width: 100%;
		height: 100%;
		margin: auto;
	}
	input ~ div span{
		display:block;
		height:2px;
		border-radius:2px;
		width:100%;
		background:var(--dark);
		position:relative;
		transition:transform .6s ease,width .6s ease,top .6s ease;
		left:50%;
		transform: translate(-50%,-2.5px);
	}
	input ~ div span:nth-child(1){
		top: 25%;
	}
	input ~ div span:nth-child(2){
		top: 50%;
	}
	input ~ div span:nth-child(3){
		top: 75%;
	}
	input:checked ~ div span:nth-child(1) {
	  transform: translate(-50%,2px) rotate(45deg);
	  top: 50%;
	}
	input:checked ~ div span:nth-child(2) {
	  width:0;
	}
	input:checked ~ div span:nth-child(3) {
	  transform: translate(-50%,-2px) rotate(-45deg);
	  top: 50%;
	}
	`
	constructor(){
		super()
		var input = document.createElement('input')
		input.type = "checkbox"

		var div = document.createElement('div')
		var span1 = document.createElement('span')
		var span2 = document.createElement('span')
		var span3 = document.createElement('span')
		var style = document.createElement('style')
		style.innerHTML = NavBarToggle.style
		this.shadowRoot.appendChild(style)

		this.shadowRoot.appendChild(input)
		this.shadowRoot.appendChild(div)

		div.appendChild(span1)
		div.appendChild(span2)
		div.appendChild(span3)

		this.addEventListener('click',()=>{
			input.checked = !input.checked
			this.switchMenu(input.checked)
		})
	}
	connectedCallback(){
		this.style.display = "block"
		this.style.height = "1em"
		this.style.width = "1em"
	}
	switchMenu(value){
		var menu = this.getAttribute('menu')
		if(!menu) throw `the attribute menu is required`
		var v = "open"
		var cls = document.getElementById(menu)
		if(!cls) throw `element ${menu} not find`
		cls.style.display = ""
		value?cls.classList.add(v):cls.classList.remove(v)
	}
}

HaikuElement.register("burger",NavBarToggle)

class TipBox extends HaikuElement{
	static style = `
	.tip-box-content{
		position: absolute;
		background: #222;
		border: #eee 2px solid;
		padding: 10px;
		border-radius: 10px;
		flex-direction: column;
		transform:translate(-100%,2em);
	}
	.row{
		display:flex;
		flex-direction: row;
	}
	.col{
		display:flex;
		flex-direction: column;
	}
	.tip-box-content::after{

	}
	`
	root = document.createElement('div')
	constructor(){
		super()
		var input = document.createElement('input')
		input.type = "checkbox"
		input.style.display = "none"

		var style = document.createElement('style')
		style.innerHTML = TipBox.style
		this.shadowRoot.appendChild(style)

		var icon = document.createElement('div')
		icon.innerHTML = `
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 45.973 45.973" style="enable-background:new 0 0 45.973 45.973;" xml:space="preserve">
		<path xmlns="http://www.w3.org/2000/svg" d="M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774    c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815    C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607    c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205    C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501    C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763    c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733    s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128    c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735    c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77    c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z     M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85    C30.906,27.334,27.355,30.85,22.976,30.85z" fill="var(--color)"/>
		</svg>`

		this.shadowRoot.appendChild(icon)
		this.shadowRoot.appendChild(input)
		this.shadowRoot.appendChild(this.root)
		this.root.classList.add('tip-box-content')
		this.root.style.display = "none"
		this.root.style.minWidth = "max-content"

		icon.addEventListener('click',()=>{
			input.checked = !input.checked
			this.switchTip(input.checked)
		})
		var childs = [...this.children]
		for(var child of childs){
			child.remove()
			this.root.appendChild(child)
		}
	}
	connectedCallback(){
		this.style.display = "block"
		this.style.height = "1em"
		this.style.width = "1em"
	}
	switchTip(value){
		this.root.style.display = value?"flex":"none"
	}
}
HaikuElement.register("tips",TipBox)

class InputSearch extends HaikuElement{
	static style = `
		
.search {
    background:rgb(var(--dark));
    height: 40px;
    border-radius: 40px;
    padding-left: 10px;
	display: flex;
}

.search:hover > .input,.search input:focus {
	width: 240px;
	padding: 0 6px;
	color: rgb(var(--light));
}
.button {
    float: right;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.4s;
}

.input {
    border:none;
    background: none;
    outline:none;
    float:left;
    padding: 0;
    color: rgb(var(--dark));
    font-size: 16px;
    line-height: 40px;
    width: 0px;
	transition: all 0.6s ease;
}

@media screen and (max-width: 620px) {
.search:hover > .input,.search input:focus{
    width: 150px;
    padding: 0 6px;
}
}
.search .input + svg.button{
  display: block;
  height: 40px;
  width: 40px;
  right: 0;
  top: 0;
  fill: none;
  stroke: var(--dark);
  stroke-width: 1.5px;
  stroke-dashoffset: 271.908;
  stroke-dasharray: 59 212.908;
  /* transform:rotate(0deg); */
  transition: all 0.6s ease;
  animation-play-state: paused;
}
.search:hover .input + svg.button,.search input:focus + svg.button{
  stroke-dasharray: 150 212.908;
  stroke-dashoffset: 300;
  stroke: var(--color);
  cursor:pointer;
  animation: rotate-button 2s linear infinite;
  animation-play-state: running;
}
@keyframes rotate-button {
  0% {
	  transform:rotate(0deg);
  }
  60% {
	  transform:rotate(180deg);
  }
  100% {
	  transform:rotate(360deg);
  }
}
	`
	constructor(){
		super()
		var style = document.createElement('style')
		style.innerHTML = InputSearch.style
		this.shadowRoot.appendChild(style)

		var div = document.createElement('div')
		div.classList.add('search')
		this.shadowRoot.appendChild(div)

		div.innerHTML = `
		<input class="input random-search" type="text" name="" onchange="searchFX(this.value)" placeholder="${this.getAttribute('placeholder')||"search"}">
		<svg class="button"><path d="m0-8c5 0 8 4 8 8c0 4-3 8-8 8c-5 0-8-4-8-8c0-4 3-8 8-8l0-9.1825c0-.4971 0-.8175 0-.8175a1 1 0 010 35a1 1 0 010-35" transform="translate(20,20) rotate(-225)"></path></svg>
		`
	}
}

HaikuElement.register("search",InputSearch)

class SearchPanel extends HaikuElement{
	static style = `
	.menu-form {
		border-radius: 32px !important;
		display: flex !important;
		height: 66px !important;
		background-color: #fff !important;
		margin: 2em;
		color: #222;
		overflow: clip;
	}
	.menu-form label {
		display: block;
		min-width: 66px;
		border-radius: 33px;
		min-height: 66px;
		margin: auto;
		width: 100%;
		padding: 15px;
		box-sizing: border-box;
		transition: box-shadow .5s cubic-bezier(0.25, 0.46, 0.45, 0.94),border .2s,background .5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
	}
	.menu-form input{display:none;}
	.menu-form input:not(:checked) + label:hover {background-color: #eee;box-shadow: #eee 0px 0px 12px 6px !important;}
	.menu-form input:checked + label {box-shadow: #eee 0px 0px 12px 6px !important;}
	.main-form {
		background-color: #eee !important;
		border-radius: 32px !important;
		padding: 32px 32px 64px;
		margin: 2em;
		display: none;
		height: min-content;
		transition: height .1s cubic-bezier(0.19, 1, 0.22, 1);
	}
	.main-form.show{
		display: block;
		position: relative;
		top: -1em;
		width: 80%;
		color:#222;
		z-index: 666;
	}
	.main-form>*{
		display: none;
	}
	.main-form>.show{
		display: flex;
	}
	`
	#content = document.createElement('div')
	#container = document.createElement('div')
	#main = document.createElement('div')
	constructor(){
		super()
		
		var style = document.createElement('style')
		style.innerHTML = SearchPanel.style
		this.#content.appendChild(style)
		
		this.#content.appendChild(this.#container)
		this.#container.classList.add('menu-form')
		this.#content.appendChild(this.#main)
		this.#main.classList.add('main-form')
		this.#content.style.position= "relative";
		
		this.shadowRoot.append(this.#content)
	}
	#changeForm(){
		this.#main.querySelectorAll(`.show`).forEach(x=>x.classList.remove("show"))
		var input = this.#container.querySelector('input:checked')
		var value = input.id
		this.#main.querySelector(`#${value}`).classList.add('show')
		this.#main.classList.add('show')
	}
	add(el){
		if(el){
			var id = el.getAttribute('id')
			var name = el.getAttribute('name')||id

			var input = document.createElement('input')
			input.setAttribute('name',"search")
			input.setAttribute('id',id)
			input.type = "radio"
			input.addEventListener('click',()=>this.#changeForm())
			el.classList.add("input")

			var label = document.createElement('label')
			label.innerHTML = name
			label.setAttribute('for',id)
			this.#container.appendChild(input)
			this.#container.appendChild(label)
			this.#main.appendChild(el)
		}
	}
	connectedCallback(){
		var ids = this.getAttribute('content')
		window.addEventListener('load',()=>{
			if(ids){
				ids = ids.split(',')
				ids.forEach((id,n)=>{
					var el = document.getElementById(id)
					this.add(el)
				})
			}
			for(var child of this.children){
				this.add(child)
			}
		})
	}
	
}

HaikuElement.register("searchpanel",SearchPanel)

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

class DragDropFile extends HaikuElement{
	#fileInput = document.createElement('input')
	#area = document.createElement('div')
	#value = null
	constructor(){
		super()
		if(this.hasAttribute('for')){
			var newfileInput = document.getElementById(this.getAttribute('for'))
			if(newfileInput)
				this.#fileInput = newfileInput
		}
		this.#fileInput.type = "file"
		this.shadowRoot.append(this.#area)
		this.#fileInput.addEventListener('change',(event)=>{
			this.#value = this.#fileInput.files[0]
			this.#change(event)
		})
		this.#area.addEventListener('click',()=>{
			this.#fileInput.click()
		})
		this.#area.style = "background:#333;border:#eee;width:100%;height:100%;min-width:3em;min-height:3em;"
		this.#area.innerHTML = "Click or Drop a File"
		this.#area.addEventListener('dragover',(e)=>{
			e.preventDefault()
			e.stopPropagation()
		})
		this.#area.addEventListener('drop',(e)=>{
			this.#value = e.dataTransfer.files[0]|| DragEvent.dataTransfer
			this.#change(e)
			e.preventDefault()
		})
	}
	#change(e){
		this.setAttribute("value", this.value.name)
		const dT = new DataTransfer()
		dT.items.add(this.#value)
		this.#area.innerHTML = this.#value.name
		if(this.hasAttribute('for')){
			var newfileInput = document.getElementById(this.getAttribute('for'))
			if(newfileInput)
				this.#fileInput = newfileInput
		}
		
		this.#fileInput.files = dT.files
		this.dispatchEvent(new CustomEvent('change',e))
	}
	get value(){
		this.#value.url ||= this.#value.src||URL.createObjectURL(this.#value)
		return this.#value
	}
}
HaikuElement.register("dropfile",DragDropFile)

class SlideShow extends HaikuElement{
	#content = document.createElement('div')
	#container = document.createElement('div')
	#dots = document.createElement('div')
	static style = `
	* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.slide {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: var(--dark);
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 1.5s;
  animation-name: fade;
  animation-duration: 1.5s;
}

@-webkit-keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
`
	#slideIndex = 1;
	constructor(){
		super()
		
		var style = document.createElement('style')
		style.innerHTML = SlideShow.style
		this.#content.appendChild(style)
		
		this.#content.appendChild(this.#container)
		this.#container.classList.add('slideshow-container')
		this.#content.appendChild(this.#dots)
		this.#dots.style.textAlign= "center";
		this.#content.style.position= "relative";

		var prev = document.createElement('a')
		prev.classList.add('prev')
		prev.addEventListener('click',()=>{this.plusSlides(-1)})
		prev.innerHTML = "&#10094;"
		
		var next = document.createElement('a')
		next.classList.add('next')
		next.addEventListener('click',()=>{this.plusSlides(1)})
		next.innerHTML = "&#10095;"
		
		this.#content.append(prev,next)
		
		this.shadowRoot.append(this.#content)
	}
	#createDot(clazz,n){
		var dot = document.createElement('span')
		dot.classList.add('dot')
		dot.addEventListener('click',()=>{
			clazz.currentSlide(n)}
			)
		return dot
	}
	add(el){
		if(el){
			el.classList.add("slide")
			this.#container.appendChild(el)
			this.#dots.appendChild(this.#createDot(this,this.#container.childElementCount))
		}
	}
	connectedCallback(){
		var ids = this.getAttribute('content')
		window.addEventListener('load',()=>{
			if(ids){
				ids = ids.split(',')
				ids.forEach((id,n)=>{
					var el = document.getElementById(id)
					this.add(el)
				})
			}
			for(var child of this.children){
				this.add(child)
			}
			this.showSlides(this.#slideIndex);
		})
	}
	showSlides(n) {
		var i;
		var slides = this.#container.querySelectorAll('.slide')
		var dots = this.#dots.querySelectorAll('.dot')
		if(slides.length<1)return
		if (n > slides.length) {this.#slideIndex = 1}
		if (n < 1) {this.#slideIndex = slides.length}
		for (i = 0; i < slides.length; i++) {
			slides[i].style.display = "none";
		}
		for (i = 0; i < dots.length; i++) {
			dots[i].className = dots[i].className.replace(" active", "");
		}
		slides[this.#slideIndex-1].style.display = "block";
		dots[this.#slideIndex-1].className += " active";
	}
	currentSlide(n) {
		this.showSlides(this.#slideIndex = n);
	}
	plusSlides(n) {
		this.showSlides(this.#slideIndex += n);
	}
}
HaikuElement.register("SlideShow",SlideShow)

class MultiForm extends HaikuElement{
	static style = `
	form {width: 400px;margin: 50px auto;text-align: center;position: relative;}
	form>div{display:grid;grid-template:"a";}
	form fieldset {grid-area: a;}
	form fieldset {background: white;border: 0 none;border-radius: 3px;box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);padding: 20px 30px;box-sizing: border-box;width: 80%;margin: 0 10%;position: relative;}
	form fieldset:not(:first-of-type) {display: none;}
	form input, form textarea,form select {padding: 15px;border: 1px solid #ccc;border-radius: 3px;margin-bottom: 10px;width: 100%;box-sizing: border-box;font-family: montserrat;color: #2C3E50;font-size: 13px;}
	form .action-button {width: 100px;background: var(--dark);font-weight: bold;color: var(--light);border: 0 none;border-radius: 1px;cursor: pointer;padding: 10px 5px;margin: 10px 5px;transition:box-shadow .5s ease-in-out;}
	form .action-button:hover, form .action-button:focus {box-shadow: 5px 5px 5px 2px var(--color);}
	h2 {font-size: 15px;text-transform: uppercase;color: var(--dark);margin-bottom: 10px;}
	h3 {font-weight: normal;font-size: 13px;color: #666;margin-bottom: 20px;}
	.progressbar {margin-bottom: 30px;overflow: hidden;counter-reset: step;}
	.progressbar li {list-style-type: none;color: var(--color);text-transform: uppercase;font-size: 9px;width: 33.33%;float: left;position: relative;}
	.progressbar li:before {content: counter(step);counter-increment: step;
	width: 20px;line-height: 20px;display: block;font-size: 10px;color: var(--color);background: white;border-radius: 3px;margin: 0 auto 5px auto;}
	.progressbar li:after {content: '';width: 100%;height: 2px;background: white;position: absolute;left: -50%;top: 9px;z-index: -1;}
	.progressbar li:first-child:after {content: none;}
	.progressbar li.active:before, .progressbar li.active:after{background: var(--color);color: var(--light);}
	* {margin: 0; padding: 0;}
	.group-input{display:flex;flex-direction:column;}
	`
	#form = document.createElement('form')
	#container = document.createElement('div')
	#progress = document.createElement('ul')
	#currentfs
	#nextfs
	#prevfs
	#left
	#opacity
	#scale
	#animating
	constructor(){
		super()

		var style = document.createElement('style')
		style.innerHTML = MultiForm.style
		this.shadowRoot.appendChild(style)
		
		this.shadowRoot.appendChild(this.#form)
		this.#progress.classList.add("progressbar")
		this.#form.appendChild(this.#progress)
		this.#form.appendChild(this.#container)
	}
	connectedCallback(){
		var action = this.getAttribute('action')
		var method = this.getAttribute('method')
		this.#form.method = method
		this.#form.action = action
		var ids = this.getAttribute('content')
		window.addEventListener('load',()=>{
			if(ids){
				ids = ids.split(',')
				ids.forEach((id,n)=>{
					var el = document.getElementById(id)
					this.addForm(el)
				})
			}
			var children = [...this.children]
			for(var id in children){
				var child = children[id]
				this.addForm(child)
			}
		})
	}
	#createItem(name){
		var li = document.createElement('li')
		if(this.#container.childElementCount==1){
			li.classList.add('active')
		}
		li.textContent = name
		return li
	}
	addForm(el){
		if(el){
			this.#container.appendChild(el)
			var h2 = el.querySelector('h2')
			var next = el.querySelector('.next')
			if(next)
				next.addEventListener('click',()=>{
					if(this.#animating)return false
					this.#animating = true

					this.#currentfs = el
					this.#nextfs = el.nextElementSibling

					this.#nextfs.style.display = "block"
					this.#progress.children[([...this.#container.children].indexOf(this.#nextfs))].classList.add("active")

					this.#nextfs.animate([
						{opacity:0,left:"50%"},
						{opacity:1,left:"0",}
					],{
						duration:800,
						easing: 'ease-in-out'
					})
					this.#currentfs.animate([
						{opacity:1,left:"0",transform:`scale(1)`,},
						{opacity:0,left:"-50%",transform:`scale(0.8)`,}
					],{
						duration:800,
						easing: 'ease-in-out'
					})
					setTimeout(()=>{
						this.#currentfs.style.display = "none"
						this.#animating = false
					},800)
				})
			var prev = el.querySelector('.previous')
			if(prev)
				prev.addEventListener('click',()=>{
					// if(this.#animating)return false
					this.#animating = true

					this.#currentfs = el
					this.#prevfs = el.previousElementSibling

					this.#prevfs.style.display = "block"

					this.#progress.children[([...this.#container.children].indexOf(this.#currentfs))].classList.remove("active")

					this.#currentfs.animate([
						{opacity:1,left:"0"},
						{opacity:0,left:"50%",}
					],{
						duration:800,
						easing: 'ease-in-out'
					})
					this.#prevfs.animate([
						{opacity:0,left:"-50%",transform:`scale(0.8)`,},
						{opacity:1,left:"0",transform:`scale(1)`,}
					],{
						duration:800,
						easing: 'ease-in-out'
					})
					setTimeout(()=>{
						this.#currentfs.style.display = "none"
						this.#animating = false
					},800)
				})
			var submit = el.querySelector('.submit')
			if(submit)
				submit.addEventListener("click",function (){return false})
			// var step = document.createElement('H3')
			// step.textContent = `This is step ${this.#form.childElementCount-1}`
			// h2.after(step)
			this.#progress.appendChild(this.#createItem(h2.textContent))
		}
	}
	createForm(name){
		var fieldset = document.createElement('fieldset')
		var title = document.createElement('h2')
		title.textContent = name
		return fieldset
	}
}
HaikuElement.register("form",MultiForm)

function UpdateTabber(){
	const tabcontrolers = document.querySelectorAll("[open-tab]")
	tabcontrolers.forEach(tabcontroler=>{
		tabcontroler.addEventListener('click',(ev)=>{
			location.assign(tabcontroler.getAttribute('open-tab'))
		})
	})
}
const filtred = document.querySelector("#filtred")
const filters = document.querySelectorAll("input.filter")
const filtererror = document.querySelector(".filter.error")

function doFilter(){
	var any = ! [...filters].some((o)=>o.checked)
	elements = filtred.querySelectorAll(".filter:not(.error)")
	var isempty = false;
	[...elements].map(filter=>{
		var clzzs = filter.classList
		clzzs = Object.values(clzzs)
		var mod = [...filters].reduce(
			(p,o)=>{
			if(o.checked)
				p.push(o.getAttribute("id"))
			return p
			},[]
		)
		var isgood = mod.some(x=>clzzs.includes(x))
		isgood||=any
		filter.style.display = isgood ?"flex":"none"
		isempty ||= isgood
	})
	filtererror.style.display = !isempty ?"flex":"none"
}
function UpdateFilter(){
	const filtersCategory = document.querySelectorAll("[type='filters-category']")
	filtersCategory.forEach(element=>{
		var id = element.getAttribute('filterfor')
		element.classList.add('list-group')
		var caterories = element.querySelectorAll("[category]")
		const checkerboard = new Set()
		var filtering = document.getElementById(id);
		var elements = [...filtering.children]

		const update = ()=>{
			var fillonempty = element.hasAttribute('fillonempty')
			var any = false
			if(fillonempty){
				any = checkerboard.size==0
			}
			elements.forEach(filter=>{
				var categories = filter.getAttribute('categories').split(' ')
				var isgood = [...checkerboard].some(category=>categories.includes(category))
				isgood ||= any
				filter.style.display = isgood ?"flex":"none";
			})
		}
		caterories.forEach(category=>{
			category.classList.add('list-group-item')
			category.addEventListener('click',(ev)=>{
				var name = ev.target.getAttribute('category')
				if(checkerboard.has(name)){
					checkerboard.delete(name)
					ev.target.classList.remove("active")
				}else{
					checkerboard.add(name)
					ev.target.classList.add("active")
				}
				update()
			})
		})

		update()
		
	})
}
function UpdateInputs(){
	// checkbox
	const checkboxes = document.querySelectorAll('input[type=checkbox]:not([hidden])')
	checkboxes.forEach(checkbox=>{
		checkbox.style.display = "none"
		const close = ()=>{
			// ctx.strokeStyle = "#f00"
			// ctx.stroke(new Path2D("M0,0L100,100M0,100L100,0"))
		}
		var ctx = document.createElement("canvas").getContext('2d')
		ctx.canvas.width = ctx.canvas.height = 100
		ctx.lineWidth = 20
		ctx.canvas.checked = false
		const update = ()=>{
			ctx.clearRect(0,0,100,100)
			if(ctx.canvas.checked = checkbox.checked){
				ctx.strokeStyle = "#0c2"
				ctx.stroke(new Path2D("M0,25L30,75L100,25"))
			}else{
				close()
			}
			ctx.canvas.dispatchEvent(new Event("change",{}))
		}
		ctx.canvas.addEventListener('click',()=>{checkbox.checked = !checkbox.checked;update()})
		ctx.canvas.onchange = checkbox.onchange
		checkbox.onchange = null
		checkbox.update = update
		checkbox.addEventListener('change',()=>{update()})
		close()
		// ctx.canvas.style = "width:1.5em;height:1.5em;border:rgb(var(--color)) solid .1em;border-radius:.2em;margin:1.2em;"
		checkbox.after(ctx.canvas)
	})
}
function UpdateDialog(){
	var hash = location.hash
	if(hash.length<1)return
	hash = document.querySelector(hash)
	if(hash && hash.tagName == "DIALOG"){
		hash.setAttribute('open',"true")
		hash.close = function(){
			this.removeAttribute('open')
			document.body.classList.remove("dialog-focus")
			location.hash = ""
		}
		document.body.classList.add("dialog-focus")
	}
}

var styleEl = document.createElement('style');
document.head.appendChild(styleEl);
var link = document.createElement('link');

link.rel = "stylesheet"
link.href = document.querySelector('script[src*=haiku]').getAttribute('src').replace("js","css")
document.head.appendChild(link);
function addStylesheetRule (selector,rules) {
	var css = Object.keys(rules).map(x=>`${x}:${rules[x]};`).join("")
	styleEl.innerText += `${selector}{${css}}`
}
let preloads;
window.addEventListener('load',()=>{
	addStylesheetRule("html",{
		"--dark":"#000",
		"--light":"#fff",
		"--color":"#888",
	})
	UpdateFilter()
	UpdateTabber()
	UpdateInputs()
	UpdateDialog()
	preloads = document.querySelectorAll('.preload')
	preloads.forEach(preload=>{
		preload.classList.remove('preload')
		preload.style.display="none"
	})
})
window.addEventListener('beforeUnloadListener',()=>{
	preloads.forEach(preload=>{preload.classList.add('preload')})
})
window.addEventListener('hashchange',()=>{
	UpdateDialog()
})