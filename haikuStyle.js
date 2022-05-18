Haiku.onload.add(()=>{
	var themes = document.querySelectorAll('*[theme]')
	themes.forEach(x=>{
		var z = x.getAttribute('theme')
		Haiku.importStyle(`themes/${z}.css`)
	})
	var elements = document.querySelectorAll('*[class]')
	elements.forEach(x=>{
		if(x.className.length){
			var ls = [...x.classList]
			ls.forEach(y=>{
				if(y.startsWith('hk') || y.startsWith('haiku')){
					var z = y.split('-').slice(1).join("-")
					Haiku.importStyle(`style/${z}.css`)
					x.classList.remove(y)
					x.classList.add(`hk-${z}`)
				}
			})
			//Haiku.importScript(`/tags/${x.tagName.split('-')[1]}.js`)
		}else{
			x.removeAttribute('class')
		}
	})
})