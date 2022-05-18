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