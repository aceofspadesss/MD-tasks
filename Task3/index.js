let towns = document.querySelector('.towns');
let waresWrapper = document.querySelector('.wares-wrapper');
let status = document.querySelector('.status');
let coins = document.querySelector('.coins');
let purchased = document.querySelector('.purchased');
let score = document.querySelector('.score');

let coinsCounter = 50;
let priceTracker = 0;
let activeTown = undefined;
let visitedTowns = 0;
coins.textContent = `${coinsCounter} Coins Left`;

class Town {
	constructor (townName, salt, fish, cloth, copper, furs) {
        this.townName = townName;
        this.salt = salt;
        this.fish = fish;
        this.cloth = cloth;
        this.copper = copper;
        this.furs = furs;
    }

    management() {
        hideTownButtons();
        //removes visited town button so the player could not visit same town twice
        document.querySelectorAll(`.${this.townName}`).forEach(el => el.remove());
        waresWrapper.style.display = "flex";

        let waresList = document.createElement('ul');
        waresList.classList.add('wares-list');
        waresWrapper.appendChild(waresList);

        var size = Object.keys(this).length;

        for (i = 1; i < size; i++) {
            let waresItem = document.createElement('li');
            waresItem.classList.add('item');
            waresList.appendChild(waresItem);
            waresItem.onclick = () => {
                //reduces number of coins when clicking on an item (you can't buy an item if you don't have enough coins), as well as adds a possibility to sell said item whether in current or next town
                if (coinsCounter >= parseInt(itemPrice.textContent)) {
                    purchased.textContent = itemName.textContent;
                    coinsCounter -= parseInt(itemPrice.textContent);
                    priceTracker = parseInt(itemPrice.textContent);
                    coins.textContent = `${coinsCounter} Coins Left`;

                    let sellButton = document.createElement('button');
                    sellButton.classList.add('sell-button');
                    sellButton.textContent = 'SELL';
                    purchased.appendChild(sellButton);

                    //selling function
                    sellButton.onclick = () => {
                        let cut = 'SELL';
                        let keyItem = purchased.textContent.substring(0, purchased.textContent.lastIndexOf(cut));
                        let activeTownLength = Object.keys(activeTown).length;
                        for (let k = 0; k < activeTownLength; k++) {
                            if (keyItem === Object.keys(activeTown)[k]) {
                                priceTracker = parseInt(activeTown[Object.keys(activeTown)[k]])
                            }
                        }

                        coinsCounter += priceTracker;
                        coins.textContent = `${coinsCounter} Coins Left`;
                        purchased.textContent = '';
                        purchased.removeChild(sellButton);
                    }
                }
                
            }
            //assignment of items and their prices to elements
            let itemName = document.createElement('p');
            itemName.classList.add('item-name');
            itemName.textContent = `${Object.keys(this)[i]}`;
            waresItem.appendChild(itemName);

            let itemPrice = document.createElement('p');
            itemPrice.classList.add('item-price');
            itemPrice.textContent = `${this[Object.keys(this)[i]]}`;
            waresItem.appendChild(itemPrice);
        }

            let backButton = document.createElement('button');
            backButton.classList.add('go-back');
            backButton.textContent = 'GO BACK';
            waresWrapper.appendChild(backButton);

            backButton.onclick = () => {
                waresWrapper.style.display = 'none';
                waresWrapper.textContent = '';
                towns.style.display = 'flex';
                visitedTowns += 1;

                if (visitedTowns === 3) {
                    score.style.display = 'block';
                    score.textContent = `Your Wealth: ${coinsCounter}`
                }
            }
    }
}

const lubeck = new Town('Lubeck', 20, 50, 60, 36, 96);
const reval = new Town('Reval', 35, 50, 40, 60, 45);
const bergen = new Town('Bergen', 62, 15, 18, 82, 54);

let townsArray = [lubeck, reval, bergen];

//hides town buttons during data view
const hideTownButtons = () => {
    towns.style.display = "none";
}

const getTownButtons = () => {
    //creates the town buttons and assigns each button its' own town data
    for (i = 0; i < townsArray.length; i++) {
        let townButton = document.createElement('button');
        townButton.classList.add('town');
        townButton.classList.add(`${townsArray[i].townName}`)
        towns.appendChild(townButton);

        switch (i) {
            case 0:
              townButton.onclick = () => {
                  lubeck.management();
                  activeTown = lubeck;
              }
              break;
            
            case 1:
                townButton.onclick = () => {
                    reval.management();
                    activeTown = reval;
                }
                break;
            case 2:
                townButton.onclick = () => {
                    bergen.management();
                    activeTown = bergen;
                }
                break;
        }

        let townName = document.createElement('p');
        townName.classList.add('town-name');
        townName.textContent = townsArray[i].townName;
        townButton.appendChild(townName);
    }
}

// final score and game reset by clicking on score element space
score.onclick = () => {
    coinsCounter = 50;
    priceTracker = 0;
    activeTown = undefined;
    visitedTowns = 0;
    coins.textContent = `${coinsCounter} Coins Left`;
    getTownButtons();

    score.style.display = 'none';
    purchased.textContent = '';

}

getTownButtons();