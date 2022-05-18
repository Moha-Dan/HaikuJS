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
		this.style.minHeight = "1em"
		this.style.minWidth = "1em"
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