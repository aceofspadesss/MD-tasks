let shopData;
let row = document.querySelector('.row');

//fetching placeholder data for shop items
fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => shopData = data)
    .then(() => {
        let orderItems = new Array;
        let discounts = new Array;
        let totalSum = 0;

        // creating HTML elements that contain data, value of 6 in for loop condition is the number of items we want to be displayed
        for (i = 0; i < 6; i++) {
            let cardContainer = document.createElement('div');
            cardContainer.classList.add('col-sm-4');
            cardContainer.classList.add('py-2');
            cardContainer.classList.add('card-container');
            row.appendChild(cardContainer);

            let card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('h-100')
            card.style.width = '18rem';
            cardContainer.appendChild(card);

            let cardImg = document.createElement('img');
            cardImg.src = shopData[i].image;
            cardImg.classList.add('card-img-top');
            card.appendChild(cardImg);

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            card.appendChild(cardBody);

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = shopData[i].title;
            cardBody.appendChild(cardTitle);

            let priceGroup = document.createElement('ul');
            priceGroup.classList.add('list-group');
            priceGroup.classList.add('list-group-flush');
            card.appendChild(priceGroup);

            let price = document.createElement('li');
            price.classList.add('list-group-item');
            price.textContent = `Price: ${shopData[i].price}`;
            priceGroup.appendChild(price);

            let randomDiscount = Math.random() * 100;
            let roundedDiscount = randomDiscount.toFixed(2);

            let discount = document.createElement('li');
            discount.classList.add('list-group-item');
            discount.textContent = `Discount: ${roundedDiscount}`;
            priceGroup.appendChild(discount);

            let btnSpace = document.createElement('div');
            btnSpace.classList.add('card-body');
            card.appendChild(btnSpace);

            let cartButton = document.createElement('button');
            cartButton.classList.add('btn');
            cartButton.classList.add('btn-primary');
            cartButton.textContent = 'Add To Cart'
            btnSpace.appendChild(cartButton);
            cartButton.onclick = () => {
                // clicking on "Add to Cart" button will push price of the item into orderItems and discount of the price into discounts arrays;
                orderItems.push(parseFloat(price.textContent.substring(7)));
                discounts.push(parseFloat(discount.textContent.substring(9)));
                cartButton.textContent = '';
                let checkIcon = document.createElement('ion-icon');
                checkIcon.name = 'checkmark-circle-outline';
                cartButton.appendChild(checkIcon);
            }
        }
        let sumBtn = document.querySelector('.check-out');
        let modalBody = document.querySelector('.modal-body');
        sumBtn.onclick = () => {
            // calculating totalSum of the order when clicking on "Total Sum" button
            let order = 0;
            for (a = 0; a < orderItems.length; a++) {
                order += orderItems[a] - (orderItems[a] * discounts[a] / 100);
            }
            totalSum = order;
            let roundedSum = totalSum.toFixed(2);
            modalBody.textContent = `Total sum of your order: ${roundedSum}`;
        }
    })