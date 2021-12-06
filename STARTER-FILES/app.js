const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 0
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
]

// const cartItems = []
let cartItems = []

let taxRate = 0.07;

const addToCart = (item) => {
    if (cartItems.some(i => i.name === item.name)) {

    } else {
        cartItems.push({ ...item, count: 1 })
    }
    cart();
    menu();
    totals();
    console.log(cartItems);
}

const increaseCount = (item) => {
    if (cartItems.some(i => i.name === item.name)) {
        cartItems[cartItems.indexOf(item)].count = item.count + 1;
    }

    cart();
    menu();
    totals();

}
const decreaseCount = (item) => {
    if (cartItems.some(i => i.name === item.name && item.count === 1)) {
        cartItems = cartItems.filter(i => i.name !== item.name)
    } else {
        cartItems[cartItems.indexOf(item)].count = item.count - 1;
    }
    cart();
    menu();
    totals();
}

function menu() {
    let menuList = document.querySelector('ul')
    while (menuList.firstChild) {
        menuList.removeChild(menuList.firstChild)
    }
    menuItems.forEach(item => {
        let plateLi = document.createElement('li')
        let plateDiv = document.createElement('div')
        let plateImg = document.createElement('img')

        plateDiv.className = 'plate'
        plateImg.className = 'plate'

        let plateContent = document.createElement('div')
        let menuItemText = document.createElement('p')
        let menuItemPrice = document.createElement('p')
        let menuAddCartButton = document.createElement('button')
        let menuInCartButton = document.createElement('button')
        let checkImg = document.createElement('img')

        plateContent.className = 'content'
        menuItemText.className = 'menu-item'
        menuItemPrice.className = 'price'
        menuAddCartButton.className = 'add'
        menuInCartButton.className = 'in-cart'
        checkImg.src = 'images/check.svg'

        plateImg.src = `./images/${item.image}`

        menuInCartButton.innerHTML = checkImg
        menuInCartButton.innerText = 'In Cart'

        let itemprice = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        })


        menuItemPrice.innerText = `$${(item.price / 100).toFixed(2)}`
        menuItemText.innerText = item.name

        menuAddCartButton.innerText = 'Add To Cart'

        menuAddCartButton.addEventListener('click', () => {
            addToCart(item)
        })


        plateContent.appendChild(menuItemPrice)
        plateContent.appendChild(menuItemText)

        if (cartItems.some(i => i.name === item.name)) {
            plateContent.appendChild(menuInCartButton)
        } else {
            plateContent.appendChild(menuAddCartButton)
        }

        plateDiv.appendChild(plateImg)
        plateLi.appendChild(plateDiv)
        plateLi.appendChild(plateContent)


        menuList.appendChild(plateLi)
    })
}

function cart() {
    let cartSummary = document.querySelector('.cart-summary')


    while (cartSummary.firstChild) {
        cartSummary.removeChild(cartSummary.firstChild)
    }

    cartItems.forEach(cartItem => {

        let listItem = document.createElement('li');
        let plateDiv = document.createElement('div')
        let plateImg = document.createElement('img');
        let quantDiv = document.createElement('div');

        plateDiv.className = 'plate';
        plateImg.className = 'plate';
        quantDiv.className = 'quantity';
        quantDiv.innerText = cartItem.count

        plateImg.src = './images/' + cartItem.image;


        plateDiv.appendChild(plateImg);
        plateDiv.appendChild(quantDiv);
        listItem.appendChild(plateDiv);

        let contentDiv = document.createElement('div')
        let menuText = document.createElement('p')
        let menuPrice = document.createElement('p')

        contentDiv.className = 'content';
        menuText.className = 'menu-item';
        menuPrice.className = 'price';

        menuText.innerText = cartItem.name
        menuPrice.innerText = `$${(cartItem.price / 100).toFixed(2)}`

        contentDiv.appendChild(menuText)
        contentDiv.appendChild(menuPrice)

        listItem.appendChild(contentDiv)


        let quantWrap = document.createElement('div')
        let quant = document.createElement('div')
        let quantDec = document.createElement('button')
        let quantInc = document.createElement('button')
        let chevImg = document.createElement('img')
        let chevImg2 = document.createElement('img')

        chevImg.src = './images/chevron.svg'
        chevImg2.src = './images/chevron.svg'
        quantWrap.className = 'quantity__wrapper';
        quant.className = 'quantity';
        quantInc.className = 'increase';
        quantDec.className = 'decrease';
        quant.innerText = cartItem.count

        quantInc.addEventListener('click', () => {
            increaseCount(cartItem)
        })

        quantDec.addEventListener('click', () => {
            decreaseCount(cartItem)
        })

        quantInc.appendChild(chevImg)
        quantDec.appendChild(chevImg2)



        quantWrap.appendChild(quantDec)
        quantWrap.appendChild(quant)
        quantWrap.appendChild(quantInc)



        listItem.appendChild(quantWrap)


        let subtotalDiv = document.createElement('div')
        subtotalDiv.className = 'subtotal'
        subtotalDiv.innerText = `$${(cartItem.count * cartItem.price / 100).toFixed(2)}`


        listItem.appendChild(subtotalDiv)

        cartSummary.appendChild(listItem);
    })
}

function totals() {
    let subtotal = document.getElementsByClassName('amount price subtotal')
    subtotal[0].innerText = `$${(cartItems.reduce((acc, item) => { return acc + item.price * item.count }, 0) / 100).toFixed(2)}`

    let tax = document.getElementsByClassName('amount price tax')

    let total = document.getElementsByClassName('amount price total')

    tax[0].innerText = '$' + (+subtotal[0].innerText.slice(1) * taxRate).toFixed(2)

    total[0].innerText = '$' + (+subtotal[0].innerText.slice(1) + +tax[0].innerText.slice(1)).toFixed(2)

}

menu()
cart()
totals()