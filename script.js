document.addEventListener('DOMContentLoaded', () => {
        const mainImageDiv = document.getElementById('mainImage');
        const mainImage = mainImageDiv.querySelector('img');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const productNarration = document.getElementById('productNarration');
        const quantityInput = document.getElementById('quantity');
        const increaseQtyBtn = document.getElementById('increaseQty');
        const decreaseQtyBtn = document.getElementById('decreaseQty');
        const addToCartBtn = document.getElementById('addToCart');

        let cartItems = [];

        // Function to update main image and narration
        function updateMainImage(src, price, narration) {
            mainImage.src = src;
            mainImage.setAttribute('data-price', price);
            productNarration.textContent = narration;
        }

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                const thumbnailSrc = thumbnail.getAttribute('data-src');
                const thumbnailPrice = thumbnail.getAttribute('data-price');
                const narration = thumbnail.getAttribute('data-narration');

                // Update main image and product details
                updateMainImage(thumbnailSrc, thumbnailPrice, narration);
            });
        });

        increaseQtyBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });

        decreaseQtyBtn.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        addToCartBtn.addEventListener('click', () => {
            const item = {
                src: mainImage.src,
                price: parseInt(mainImage.getAttribute('data-price')),
                quantity: parseInt(quantityInput.value),
                narration: productNarration.textContent
            };
            cartItems.push(item);
            alert('Item added to cart');

            let totalCost = 0;
            let emailBody = "Items in cart:\n\n";
            cartItems.forEach(item => {
                totalCost += item.price * item.quantity;
                emailBody += `Product: ${item.narration}\nPrice: ₦${item.price}\nQuantity: ${item.quantity}\nImage: ${item.src}\n\n`;
            });
            emailBody += `Total Cost: ₦${totalCost}`;

            const mailtoLink = `mailto:mondaykingsley80@gmail.com?subject=Cart Items&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
        });
    });


