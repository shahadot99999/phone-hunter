const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhone(data.data, dataLimit)
}

const displayPhone = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = ``;

    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 10) {
        //display 2o phones only
        phones = phones.slice(0, 20)
        showAll.classList.remove('d-none')
    }
    else {
        showAll.classList.add('d-none');
    }



    //display no phones found
    const noPhone = document.getElementById('no-found-message')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none');
    }

    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">show details</button>
                
        </div>
    </div>`;

        phonesContainer.appendChild(phoneDiv);
    })
    //stop loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    //start loader
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, dataLimit);
}

//btn search hanlder add
document.getElementById('btn-search').addEventListener('click', function () {

    // //start loader
    // toggleSpinner(true);
    // const searchField = document.getElementById('search-field');
    // const searchText = searchField.value;
    // loadPhone(searchText);

    processSearch(10)

})


//search input feild enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    // console.log(e.key);
    if (e.key == 'Enter') {
        processSearch(10);

    }
})

//loading function add when search is open load start and search end and load stop.
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

//do not the best to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    // //start loader
    // toggleSpinner(true);
    // const searchField = document.getElementById('search-field');
    // const searchText = searchField.value;
    // loadPhone(searchText);
    processSearch();
})


// click phone details
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}
const displayPhoneDetails = phone => {
    //console.log(phone);
    const modalTittle = document.getElementById('phoneDetailsModalLabel');
    modalTittle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Relase Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date Found'}</p>
    <p> Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage information here'} </p>
    <p> Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth information here'}</p>
    <p> Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'} </p>
    `
}

loadPhone('apple');



