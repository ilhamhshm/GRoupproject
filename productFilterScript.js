const products = [
    { id: "1", name: "Male - Blue Outfit", category: "Sportswear" , price:"77.00",quantity:1, image:"E-Commerce Product/Sportwear/Men/Men's Puma Light Blue Iceland National Team Pre-Match Raglan Full-Zip Training Jacket.jpeg"},
    { id: "2", name: "Male - White Outfit", category: "Sportswear", price:"89.99" ,quantity:1, image:"E-Commerce Product/Sportwear/Men/White with Multi Panel Tracksuit for Men.jpeg"},
    { id: "3", name: "Women - Black Outfit", category: "Sportswear", price:"99.99" ,quantity:1, image:"E-Commerce Product/Sportwear/Women/Performance Top Black - 2XL.jpeg"},
    { id:"8", name:"Women- Pink Outfit",category:"Sportswear", price:"110.99",quantity:1,image:"E-Commerce Product/Sportwear/Women/womenPinkOutfit.jpeg"},
    { id: "4", name: "Unisex - Black Sport Shoes", category: "Sportshoes", price:"89.99" ,quantity:1, image:"E-Commerce Product/Sportshoes/BlackSportShoes.jpeg"},
    { id: "5", name: "Unisex - White Court Shoes", category: "Sportshoes", price:"99.99" ,quantity:1, image:"E-Commerce Product/Sportshoes/whiteCourtShoes.jpeg"},
    { id: '6', name: "Women - Pink Indoor Shoes", category: "Sportshoes", price: "79.99", quantity: 1, image:"/E-Commerce Product/Sportshoes/womenPinkshoes.jpeg"},
    { id:"7", name: "Male - Court Shoes",category:"Sportshoes", price:"119.00", quantity:1, image:"E-Commerce Product/Sportshoes/maleCourtShoes.jpeg"},
    {id:"15", name:"Unisex - BasketBall Shoes", category:"Sportshoes", price:"125.00",quantity:1, image:"E-Commerce Product/Sportshoes/basketballshoes.jpeg"},
    { id:"12", name:"Adidas Ball", category:"Sport Item", price:"45.00", quantity:1,image:"E-Commerce Product/Sports-Item/Adidas 'Pyrostorm' 21-22 Champions League Ball Released.jpeg"},
    { id:"13", name:"Badminton Set",category:"Sport Item",price:"90.99", quantity:1,image:"E-Commerce Product/Sports-Item/HIRALIY Badminton Rakcet.jpeg"},
    { id:"14", name:"Rugby Ball",category:"Sport Item", price:"55.00", quantity:1, image:"E-Commerce Product/Sports-Item/download (1).jpeg"},
    { id:"17", name:"Table Tennis Table", category:"Sport Item", price:"450.00",quantity:1,image:"E-Commerce Product/Sports-Item/Table Tennis Table.jpeg"},
    { id:"9", name:"Reuseable Hot/Cold Pack", category:"Sport-Aid", price:"20.00",quantity:1,image:"E-Commerce Product/Sports-Aid/hotcoldpack.jpeg"},
    { id:"10", name:"Premium Elastic Bandage Wrap 8pk (4x3, 4x4)",category:"Sport-Aid",price:"30.00",quantity:1,image:"E-Commerce Product/Sports-Aid/Premium Elastic Bandage Wrap 8pk (4x3, 4x4).jpeg"},
    { id:"11", name:"Elastic Self Adhesive Bandage", category:"Sport-Aid", price:"5.00",quantity:1,image:"E-Commerce Product/Sports-Aid/elasticBandage.jpeg"},
    { id:"16" , name:"Blister Prevention Tape", category:"Sport-Aid", price:"15.00", quantity:1,image:"E-Commerce Product/Sports-Aid/Blister Prevention Tape.jpeg"},
    

];

const cart = JSON.parse(localStorage.getItem("cart")) || [];
let filteredProducts = products;
displayProducts(products);

const filterCategory = document.getElementById("categories");
filterCategory.addEventListener("change", () => {
    filter(products);
});

function filter(products){
    const selectedCategory = filterCategory.value;
    document.getElementById("categoryName").innerHTML= selectedCategory.toUpperCase();
    filteredProducts = selectedCategory === "all" ? products : products.filter(product => product.category === selectedCategory);
    
    displayProducts(filteredProducts);
}
const searchBox =  document.getElementById("searchBox");
    searchBox.addEventListener("input", () => {
    const searchValue = searchBox.value;
    const searchedProducts = filteredProducts.filter(product => product.name.toLowerCase().search(searchValue) !== -1);
    displayProducts(searchedProducts);
});

const sortDropdown = document.getElementById("sort");
sortDropdown.addEventListener("change", () => {
    const sortOrder = sortDropdown.value;

    // Sort the products array
    products.sort((a, b) => {

        if (sortOrder === "low-to-high") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
    filter(products);
});

function displayProducts(products){
    const productList = document.getElementById("productList");
    productList.innerHTML = ""; // Clear previous product list

    for (const product of products) {
        const productItem = document.createElement("div");
        productItem.className = "Product1-Item";

        productItem.innerHTML = `
        <div class="PricePP">
            <img src="${product.image}" class="preview-Image">
            <h3>${product.name}</h3>
            <p>RM ${product.price}</p> 
        </div>
        <p>Quantity</p>
            <input type="number" id="quantity-${product.id}" class="quantity-input" min="1" value="1">
        <button class="add-to-cart" data-id="${product.id}">Add to cart</button>`;

        productList.appendChild(productItem);
    }
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const productId = event.target.getAttribute("data-id");
            const selectedProduct = products.find(p => p.id === productId);
            const quantityInput = document.getElementById(`quantity-${productId}`);
            const selectedQuantity = parseInt(quantityInput.value);

            const productToCart ={  ...selectedProduct,quantity:selectedQuantity};
            // Check if product is already in cart
            const existingProduct = cart.find(item => item.id === selectedProduct.id);
            if (existingProduct) {
                existingProduct.quantity += selectedQuantity;
            } else {
                cart.push(productToCart);
            }
            localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage
            alert(`${selectedProduct.name} (x${selectedQuantity}) added to cart!`);
        });
    });
}

