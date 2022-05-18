function UpdateInputs(){
	// checkbox
	const checkboxes = document.querySelectorAll('input[type=checkbox]:not([hidden])')
	checkboxes.forEach(checkbox=>{
		checkbox.style.display = "none"
		const close = ()=>{
			// ctx.strokeStyle = "#f00"
			// ctx.stroke(new Path2D("M0,0L100,100M0,100L100,0"))
		}
		var ctx = document.createElement("canvas").getContext('2d')
		ctx.canvas.width = ctx.canvas.height = 100
		ctx.lineWidth = 20
		ctx.canvas.checked = false
		const update = ()=>{
			ctx.clearRect(0,0,100,100)
			if(ctx.canvas.checked = checkbox.checked){
				ctx.strokeStyle = "#0c2"
				ctx.stroke(new Path2D("M0,25L30,75L100,25"))
			}else{
				close()
			}
			ctx.canvas.dispatchEvent(new Event("change",{}))
		}
		ctx.canvas.addEventListener('click',()=>{checkbox.checked = !checkbox.checked;update()})
		ctx.canvas.onchange = checkbox.onchange
		checkbox.onchange = null
		checkbox.update = update
		checkbox.addEventListener('change',()=>{update()})
		close()
		// ctx.canvas.style = "width:1.5em;height:1.5em;border:rgb(var(--color)) solid .1em;border-radius:.2em;margin:1.2em;"
		checkbox.after(ctx.canvas)
	})
}
