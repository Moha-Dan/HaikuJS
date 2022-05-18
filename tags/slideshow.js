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
			this.showSlides(this.#slideIndex);
		// })
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