Haiku.onload.add(()=>{
	var elements = document.querySelectorAll('*')
	elements.forEach(x=>{
		if(x.tagName.startsWith("HAIKU")){
			/*is @{HaikuElement}*/
			Haiku.importScript(`/tags/${x.tagName.split('-')[1]}.js`)
		}else{
			// Haiku.importStyle(`/style/${x.tagName}.css`)
		}
	})
})