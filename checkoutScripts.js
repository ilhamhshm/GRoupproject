document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const unitPriceContainer = document.getElementById("price");
    const unitAmountContainer = document.getElementById("amount");
    const unitSubTotalContainer= document.getElementById("itemsub");
    const totalPaymentContainer = document.getElementById("total-payment");
    const placeOrderButton = document.getElementById("orderButton");
    const merchtotal = document.getElementById("merchSubtotal");
    const sst = document.getElementById("sst");
    const shipping = document.getElementById("shiptotal");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        // Clear existing content
        cartItemsContainer.innerHTML = "";
        unitPriceContainer.innerHTML = "";
        unitAmountContainer.innerHTML = "";
        unitSubTotalContainer.innerHTML = "";
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
            totalPaymentContainer.innerHTML = `<p> RM 0.00</p>`;
            merchtotal.innerHTML = `<p id="merchSubtotal"><strong>Merchandise Subtotal</strong> = RM0.00</p>`;
            sst.innerHTML =`<p id="sst"><strong>SST(6%)</strong> = RM0.00</p>`
            shipping.innerHTML =`<p id="shiptotal"><strong>Shipping Subtotal</strong> = RM 0.00</p>`;
            return;
        }

        // Display cart items
        cart.forEach((product, index) => {
            const productSubtotal = product.price * product.quantity;
            subtotal += productSubtotal;

            // Product name
            const item = document.createElement("div");
            item.classList.add("cart-item");
            item.innerHTML = `
                <p>${product.name}<button class="remove-item" data-index="${index}">Remove</button></p>`;
            cartItemsContainer.appendChild(item);

            // Unit price
            const price = document.createElement("div");
            price.classList.add("cart-item");
            price.innerHTML = `<p>RM ${parseFloat(product.price).toFixed(2)}</p>`;
            unitPriceContainer.appendChild(price);

            // Quantity
            const amount = document.createElement("div");
            amount.classList.add("cart-item");
            amount.innerHTML = `<p>${product.quantity}</p>`;
            unitAmountContainer.appendChild(amount);

            // Item subtotal
            const itemSubtotal = document.createElement("div");
            itemSubtotal.classList.add("cart-item");
            itemSubtotal.innerHTML = `<p>RM ${productSubtotal.toFixed(2)}</p>`;
            unitSubTotalContainer.appendChild(itemSubtotal);
        });

        // Update total payment
        merchtotal.innerHTML = `<p id="merchSubtotal"><strong>Merchandise Subtotal</strong> = RM${subtotal.toFixed(2)}</p>`;
        subtotal+=8;
        const ssttotal =subtotal*0.06;
        subtotal+=ssttotal;
        totalPaymentContainer.innerHTML=`<p>RM ${subtotal.toFixed(2)}</p>`;
        sst.innerHTML =`<p id="sst"><strong>SST(6%)</strong> = RM${ssttotal.toFixed(2)}</p>`;
        shipping.innerHTML =`<p id="shiptotal"><strong>Shipping Subtotal</strong> = RM 8.00</p>`;
    }

    cartItemsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.getAttribute("data-index");
            cart.splice(index, 1); // Remove the product from the cart
            localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
            updateCartDisplay(); // Refresh the cart display
        }
    });

    placeOrderButton.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add products before placing an order!");
        } else {
            alert("Order placed successfully!");
            localStorage.removeItem("cart") // Clear the cart
            window.location.reload(); // Reload the page
        }
    });
    updateCartDisplay();
    const x = document.getElementById("demo");
});
const getLoc = document.getElementById("getLocation");
getLoc.addEventListener("click",()=>{
    let marker;
    let map;
    const x = document.getElementById("note");
    let lon;
    let lat;
    getLocation();
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
      
    function showPosition(position) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        const latlon = new google.maps.LatLng(lat, lon);
        const mapholder = document.getElementById('mapholder');
        mapholder.style.height = '250px';
        mapholder.style.width = '500px';
      
        var myOptions = {
            center:latlon,zoom:14,
            mapTypeId:google.maps.MapTypeId.ROADMAP,
            mapTypeControl:false,
            navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
        }
          
        map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
        marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!",draggable: true});
        
        marker.addListener("dragend", () => {
        const newPosition = marker.getPosition();
        lat = newPosition.lat();
        const lng = newPosition.lng();
        console.log("New Position:", lat, lng);

        // Optional: Get the address using Geocoding API
        getAddress(lat, lng);
    });

    map.addListener("click", (event) => {
        const clickedPosition = event.latLng;
        marker.setPosition(clickedPosition);
        console.log("Clicked Position:", clickedPosition.lat(), clickedPosition.lng());

        // Optional: Get the address using Geocoding API
        getAddress(clickedPosition.lat(), clickedPosition.lng());
    })

        getAddress(lat, lon);
    }
    function getAddress(lat, lon) {
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCuaQ0kHrGjef4sNRvg88DpHHyy6VuT1_Y`;
        fetch(geocodeUrl)
            .then(response => response.json())
            .then(data => {
                if (data.status === "OK") {
                    const address = data.results[0].formatted_address;
                    document.getElementById("note").innerHTML = `<strong>Address:</strong> ${address}`;
                } else {
                document.getElementById("note").innerHTML = "Unable to retrieve address.";
                }
            }).catch(error => console.error("Error fetching address:", error));
    }
      
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
            }
        }
})