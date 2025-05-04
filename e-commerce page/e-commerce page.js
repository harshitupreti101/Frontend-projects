    document.addEventListener(`DOMContentLoaded`,()=>{
        const products = [
            {id:1,name:"Product 1",price:30.2},
            {id:2,name:"Product 2",price:50.56},
            {id:3,name:"Product 3",price:40.2},
        ]
        const cart = [];

        const productList = document.getElementById(`product-list`);
        const cartItems = document.getElementById(`cart-items`);
        const emptyCart = document.getElementById(`empty-cart`);
        const cartTotal = document.getElementById(`cart-total`);
        const totalPrice = document.getElementById(`total-price`);
        const checkoutBtn = document.getElementById(`checkout-btn`);

        products.forEach(product => {
            const productDiv = document.createElement(`div`);
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <span>${product.name} - $${product.price.toFixed(2)}</span>
                <button data-id="${product.id}">Add to cart</button>
                
            `;
            productList.appendChild(productDiv);
        });

        productList.addEventListener(`click`, (e)=>{
            if (e.target.tagName === `BUTTON`) {
                const productId = parseInt(e.target.getAttribute(`data-id`));
                const product = products.find(p => p.id === productId
                )
                addToCart(product);
            }

        })

        function addToCart(product) {
            cart.push(product);
            renderCart();
        }

        function renderCart() {
            if (cart.length) {
                cartTotal.classList.remove(`hidden`);
                cartItems.innerHTML = ``;
                let price = 0;
                cart.forEach(cart => {
                    const shopPro = document.createElement(`p`);
                    shopPro.classList.add(`wishList`);
                    shopPro.innerHTML = `${cart.name} - $${cart.price}`;
                    cartItems.appendChild(shopPro);
                    price = price + cart.price;
                })
                totalPrice.innerHTML = `$${price.toFixed(2)}`;
            }
            else {
                cartTotal.classList.add(`hidden`);
                cartItems.innerHTML = `<p class="wishList">Your card is empty.</p>`;
            }
            
        }

        checkoutBtn.addEventListener(`click`, ()=>{
            cart.length = 0;
            alert(`Checkout successfully`);
            renderCart();
        })
        
    })
