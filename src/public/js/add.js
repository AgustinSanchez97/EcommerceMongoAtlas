
const cartAddEvent = document.querySelector("#listOfCarts")
const productId = document.querySelector("#productId").value


cartAddEvent.addEventListener("change",(event)=>{
    event.preventDefault()
    const cartId = cartAddEvent.value
    const data ={
        productId
    }
    console.log(data)

    fetch(`/api/carts/${cartId}`,{
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

