function UpdateTabber(){
	const tabcontrolers = document.querySelectorAll("[open-tab]")
	tabcontrolers.forEach(tabcontroler=>{
		tabcontroler.addEventListener('click',(ev)=>{
			location.assign(tabcontroler.getAttribute('open-tab'))
		})
	})
}
