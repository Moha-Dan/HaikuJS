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
const Haiku = {
	onload:new Set(),
	onupdate:new Set(),
	load(ev={}){this.onload.forEach(callback=>callback(ev))},
	update(ev={}){this.onload.forEach(callback=>callback(ev))},
	Element:HaikuElement,
	createElement:function(tag){
		return document.createElement(`haiku-${tag}`)
	},
	register:HaikuElement.register,
	path : document.querySelector('script[src*=haiku]').getAttribute('src').replace(/haiku.*js/,""),
}
Haiku.imports = new Set()
Haiku.importStyle = function(file){
	var link = document.createElement('link');
	link.rel = "stylesheet"
	link.href = Haiku.path+file
	if(!Haiku.imports.has(link.href)){
		Haiku.imports.add(link.href)
		document.head.appendChild(link);
	}
}
Haiku.importScript = function(file){
	var script = document.createElement('script');
	script.type = "text/javascript"
	script.src = Haiku.path+file
	if(!Haiku.imports.has(script.src)){
		Haiku.imports.add(script.src)
		document.head.appendChild(script);
	}
}
// Haiku.importStyle("haiku.css")
Haiku.importScript("haikuTag.js")
Haiku.importScript("haikuStyle.js")
let preloads;
window.addEventListener('load',(ev)=>{
	// addStylesheetRule("html",{
	// 	"--dark":"#000",
	// 	"--light":"#fff",
	// 	"--color":"#888",
	// })
	Haiku.load()
	preloads = document.querySelectorAll('.preload')
	preloads.forEach(preload=>{
		preload.classList.remove('preload')
		preload.style.display="none"
	})
	
	// console.log(haikuelements)
})
window.addEventListener('beforeUnloadListener',()=>{
	preloads.forEach(preload=>{preload.classList.add('preload')})
})
