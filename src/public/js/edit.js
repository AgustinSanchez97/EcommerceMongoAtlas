
const sendEvent = document.querySelector("#send")

sendEvent.addEventListener("click",(event)=>{
    event.preventDefault()
    const id = document.querySelector("#id").value
    const data = {
    
        title : document.querySelector("#title").value,
        description : document.querySelector("#description").value,
        price : document.querySelector("#price").value,
        stock : document.querySelector("#stock").value,
    }
    
    console.log(data)
    fetch(`/api/products/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    })
    .then(res => res.json())
    .then(data => {
        //window.location.href = "/"
    })
})
/*
const deleteEvent = document.querySelector("#delete")

deleteEvent.addEventListener("click",(event)=>{
    event.preventDefault()
    const id = document.querySelector("#id").value

    fetch(`/api/products/${id}`,{
        method: "delete",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)

    })
    .then(res => res.json())
    .then(data => {
        //window.location.href = "/"
    })
})
*/
//const allProductsRender = document.querySelector("#allProductsAdded")