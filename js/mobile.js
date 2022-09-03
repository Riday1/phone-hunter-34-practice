
//load phones Data by using API and fetch()
const loadPhonesData = async (searchText) => {

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();

    displayPhones(data.data) // pass the data to the function

}

const displayPhones = (phones) => {
    console.log(phones)
    //get phone card container section
    const phonesContainer = document.getElementById('phones-container')

    //if else for show "no phone found message"
    if (phones.length === 0) {
        document.getElementById('no-phone-found').classList.remove('d-none')
    } else {
        document.getElementById('no-phone-found').classList.add('d-none')
    }
    phonesContainer.textContent = ``
    //loopThrough phones array by using forEach()
    phones.forEach(phone => {


        //create phone div and add "col" class
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                
                <button onclick="loadPhonesDetails('${phone.slug}')" class= "btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                
            </div>
        </div>
        `

        //append "phoneDiv/col" into phoneContainer
        phonesContainer.appendChild(phoneDiv)


    });
}


document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    // console.log(searchText)
    loadPhonesData(searchText)
})

const loadPhonesDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = (showDetail) => {
    //set modal title 
    const phoneBrand = document.getElementById('exampleModalLabel')
    phoneBrand.innerText = `${showDetail.brand}`
    const showPhoneDetails = document.getElementById('show-phone-details')

    //set modal body 
    showPhoneDetails.innerHTML = `
    <h5>Brand - ${showDetail.name} </h5>
    <h5>Release Date -${showDetail.releaseDate} </h5>
    
    <h5 class ="mt-5">Features</h5>
    <hr>
    <p class ="my-1">Storange - ${showDetail.mainFeatures.memory}</p>
    <p class ="my-1">Chip Set - ${showDetail.mainFeatures.chipSet}</p>
    
    `
}


//search by Enter using handler
document.getElementById('search-field').addEventListener('keyup', function (event) {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value; // search Field value
    if (event.key === 'Enter') {
        loadPhonesData(searchText) 
    }
})

//call loadPhonesData function
loadPhonesData('a')