


const actualCategory = document.querySelector("#actualCategory")

const categorySelectedEvent = document.querySelector("#allCategory")


categorySelectedEvent.addEventListener("change",(event)=>
{
    event.preventDefault()
    console.log(categorySelectedEvent.value)
    if(categorySelectedEvent.value == "todos") return window.location.href = `/`
    window.location.href = `/?category=${categorySelectedEvent.value}`
})





    


