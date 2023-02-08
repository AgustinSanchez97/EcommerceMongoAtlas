
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

    fetch(`/api/products/${id}`,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        window.location.href = "/"
    })
})


//DELETE CART
const deleteEvent = document.querySelectorAll(".deleteCart")

deleteEvent.forEach((cart) => {        
    cart.addEventListener("click", (eventData)=>{
    eventData.preventDefault();
    const cartId = eventData.target.closest(".deleteCart").getAttribute("id")
    const data = {cartId}    
    fetch(`/api/carts/${cartId}`,{
        method: "delete",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            window.location.href = "/api/carts/"
        })

    })
})