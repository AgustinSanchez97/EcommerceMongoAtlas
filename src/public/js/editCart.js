
const sendEvent = document.querySelector("#send")
/*
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
})*/

const deleteCartEvent = document.querySelector("#deleteCart")
const cartId = deleteCartEvent.getAttribute("data-id")

deleteCartEvent.addEventListener("click", (eventData)=>{
    eventData.preventDefault();

    const data = {cartId}
    //console.log(cartId)
    
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





//DELETE CART
const deleteProductEvent = document.querySelectorAll(".deleteProductsFromCart")

    
        deleteProductEvent.forEach((product) => {        
            product.addEventListener("click", (eventData)=>{
            eventData.preventDefault();
            const productId = product.closest(".deleteProductsFromCart").getAttribute("id")
            const data = {productId}
            //console.log(productId)
            
            fetch(`/api/carts/${cartId}/products/${productId}`,{
                method: "delete",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
                })
                .then(res => res.json())
                .then(data => {
                    window.location.href = `/editCart/${cartId}/`
                })
        
            })
        })
    
