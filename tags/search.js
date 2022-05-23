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
  #input
  get value(){
    return this.#input
  }
	constructor(){
		super()
		var style = document.createElement('style')
		style.innerHTML = InputSearch.style
		this.shadowRoot.appendChild(style)

		var div = document.createElement('div')
		div.classList.add('search')
		this.shadowRoot.appendChild(div)

    this.#input = document.createElement('input')
	  this.#input.classList.add('input')
	  this.#input.classList.add('random-search')
    this.#input.setAttribute("placeholder",this.getAttribute('placeholder')||"search")
    this.#input.addEventListener('change',(ev)=>{
      var e = new Event(ev.type)
     this.dispatchEvent(e)
    })
    this.#input.addEventListener('keypress',(ev)=>{
      var e = new Event(ev.type)
      this.dispatchEvent(e)
    })
    
		div.innerHTML = `
		<svg class="button"><path d="m0-8c5 0 8 4 8 8c0 4-3 8-8 8c-5 0-8-4-8-8c0-4 3-8 8-8l0-9.1825c0-.4971 0-.8175 0-.8175a1 1 0 010 35a1 1 0 010-35" transform="translate(20,20) rotate(-225)"></path></svg>
		`
	  div.firstChild.before(this.#input)
	}
}

HaikuElement.register("search",InputSearch)