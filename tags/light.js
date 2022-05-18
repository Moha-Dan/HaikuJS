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