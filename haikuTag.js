Haiku.onload.add(()=>{
	var elements = document.querySelectorAll('*')
	elements.forEach(x=>{
		if(x.tagName.startsWith("HAIKU")){
			/*is @{HaikuElement}*/
			var y = x.tagName.split('-')[1].toLowerCase()
			Haiku.importScript(`tags/${y}.js`)
		}else{
			// Haiku.importStyle(`/style/${x.tagName}.css`)
		}
	})
})