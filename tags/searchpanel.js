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
	.menu-form>svg.button{
  display: block;
  height: 40px;
  width: 40px;
  right: 0;
  top: 0;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5px;
  stroke-dashoffset: 271.908;
  stroke-dasharray: 59 212.908;
  /* transform:rotate(0deg); */
  transition: all 0.6s ease;
  animation-play-state: paused;
  margin: auto;
}
.menu-form>input:checked~svg.button{
  stroke-dasharray: 150 212.908;
  stroke-dashoffset: 300;
  stroke: currentColor;
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
	#content = document.createElement('div')
	#container = document.createElement('div')
	#main = document.createElement('form')
	#button
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
		this.#container.innerHTML = `<svg class="button"><path d="m0-8c5 0 8 4 8 8c0 4-3 8-8 8c-5 0-8-4-8-8c0-4 3-8 8-8l0-9.1825c0-.4971 0-.8175 0-.8175a1 1 0 010 35a1 1 0 010-35" transform="translate(20,20) rotate(-225)"></path></svg>`
		this.#button = this.#container.lastChild
		this.#button.addEventListener("click",x=>{
			this.#main.submit()
		})
		this.shadowRoot.append(this.#content)
	}
	#changeForm(){
		var current
		this.#main.querySelectorAll(`.show`).forEach(x=>{x.classList.remove("show");current=x.id});
		var input = this.#container.querySelector('input:checked')
		var value = input.id
		if(current != value){
			this.#main.querySelector(`#${value}`).classList.add('show')
			this.#main.classList.add('show')
		}else{
			this.#main.classList.remove('show')
			input.checked = false
		}
	}
	add(el){
		if(el){
			var id = el.getAttribute('id')
			var name = el.getAttribute('name')||id
			console.log(name)

			var input = document.createElement('input')
			input.setAttribute('name',"search")
			input.setAttribute('id',id)
			input.type = "radio"
			input.addEventListener('click',()=>this.#changeForm())
			el.classList.add("input")

			var label = document.createElement('label')
			label.innerHTML = name
			label.setAttribute('for',id)
			this.#button.before(input)
			this.#button.before(label)
			this.#main.appendChild(el)
		}
	}
	connectedCallback(){
		var action = this.getAttribute('action')
		var method = this.getAttribute('method')
		this.#main.method = method
		this.#main.action = action
		var ids = this.getAttribute('content')
		// window.addEventListener('load',()=>{
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
		// })
	}
	
}

HaikuElement.register("searchpanel",SearchPanel)