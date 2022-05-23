class MultiForm extends HaikuElement{
	static style = `
	form {width: 400px;margin: 50px auto;text-align: center;position: relative;}
	form>div{display:grid;grid-template:"a";}
	form fieldset {grid-area: a;}
	form fieldset {background: var(--light-color);border: 0 none;border-radius: 3px;box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);padding: 20px 30px;box-sizing: border-box;width: 80%;margin: 0 10%;position: relative;}
	form fieldset:not(:first-of-type) {display: none;}
	form input, form textarea,form select {padding: 15px;border: 1px solid #ccc;border-radius: 3px;margin-bottom: 10px;width: 100%;box-sizing: border-box;font-family: montserrat;color: #2C3E50;font-size: 13px;}
	form .action-button {width: 100px;background: var(--dark);font-weight: bold;color: var(--light);border: 0 none;border-radius: 1px;cursor: pointer;padding: 10px 5px;margin: 10px 5px;transition:box-shadow .5s ease-in-out;}
	form .action-button:hover, form .action-button:focus {box-shadow: 5px 5px 5px 2px var(--color);}
	h2 {font-size: 15px;text-transform: uppercase;color: var(--dark);margin-bottom: 10px;}
	h3 {font-weight: normal;font-size: 13px;color: #666;margin-bottom: 20px;}
	.progressbar {margin-bottom: 30px;overflow: hidden;counter-reset: step;display:flex;}
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
		// window.addEventListener('load',()=>{
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
		// })
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