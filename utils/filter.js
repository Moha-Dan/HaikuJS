const filtred = document.querySelector("#filtred")
const filters = document.querySelectorAll("input.filter")
const filtererror = document.querySelector(".filter.error")

function UpdateFilter(){
	const filtersCategory = document.querySelectorAll("[type='filters-category']")
	filtersCategory.forEach(element=>{
		var id = element.getAttribute('filterfor')
		element.classList.add('list-group')
		var caterories = element.querySelectorAll("[category]")
		const checkerboard = new Set()
		var filtering = document.getElementById(id);
		var elements = [...filtering.children]

		const update = ()=>{
			var fillonempty = element.hasAttribute('fillonempty')
			var any = false
			if(fillonempty){
				any = checkerboard.size==0
			}
			elements.forEach(filter=>{
				var categories = filter.getAttribute('categories').split(' ')
				var isgood = [...checkerboard].some(category=>categories.includes(category))
				isgood ||= any
				filter.style.display = isgood ?"flex":"none";
			})
		}
		caterories.forEach(category=>{
			category.classList.add('list-group-item')
			category.addEventListener('click',(ev)=>{
				var name = ev.target.getAttribute('category')
				if(checkerboard.has(name)){
					checkerboard.delete(name)
					ev.target.classList.remove("active")
				}else{
					checkerboard.add(name)
					ev.target.classList.add("active")
				}
				update()
			})
		})

		update()
		
	})
}
function doFilter(){
	var any = ! [...filters].some((o)=>o.checked)
	elements = filtred.querySelectorAll(".filter:not(.error)")
	var isempty = false;
	[...elements].map(filter=>{
		var clzzs = filter.classList
		clzzs = Object.values(clzzs)
		var mod = [...filters].reduce(
			(p,o)=>{
			if(o.checked)
				p.push(o.getAttribute("id"))
			return p
			},[]
		)
		var isgood = mod.some(x=>clzzs.includes(x))
		isgood||=any
		filter.style.display = isgood ?"flex":"none"
		isempty ||= isgood
	})
	filtererror.style.display = !isempty ?"flex":"none"
}
