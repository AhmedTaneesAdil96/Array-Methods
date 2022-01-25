const adduserBtn = document.getElementById('add-user')
const doubleMoneyBtn = document.getElementById('double-money')
const onlyMillion = document.getElementById('only-million')
const richestBtn = document.getElementById('richest')
const entireWealthBtn = document.getElementById('entire-wealth')
const main = document.getElementById('main')


getRandomUSer();
getRandomUSer();
getRandomUSer();

let data = []

async function getRandomUSer() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();


    const user = data.results[0];
    // console.log(user);

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,

        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}


function addData(obj) {
    data.push(obj);


    updateDOM();
}


function updateDOM(providedData = data) {
    main.innerHTML = ' <h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(item => {

        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element)
    });
}


function formatMoney(number) {

    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



adduserBtn.addEventListener('click', getRandomUSer);

///doubling the money function

doubleMoneyBtn.addEventListener('click', doubleTheMoney);

function doubleTheMoney() {
    data = data.map(user => {
        return {
            ...user,
            money: user.money * 2
        }

    });
    console.log(data);
    updateDOM();
}



///sorting function
richestBtn.addEventListener('click', sortByRichest);

function sortByRichest() {
    data = data.sort((a, b) =>
        b.money - a.money)
    updateDOM();
}

///only Millionaires

onlyMillion.addEventListener('click', onlyMillionaires)

function onlyMillionaires() {
    data = data.filter(user =>

        user.money > 100000
    )

    updateDOM();
}


///entire wealth 

entireWealthBtn.addEventListener('click', entireWealth)

function entireWealth() {
    const totWealth = data.reduce((acc, user) => (acc += user.money), 0)
        //  const wealth = data.reduce((acc, user) => {acc += user.money}, 0);

    const wealth = document.createElement('div');

    wealth.classList.add('wealth')

    wealth.innerHTML = `<strong>Total Wealth: ${formatMoney(totWealth)}</strong>`
    main.appendChild(wealth);
    console.log(totWealth);

}