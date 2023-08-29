// load api data from server site then call displayPhones function and pass the phones data
const loadData = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);

};

//  displayPhones function receive phones all data
//  forEach arrow function call each phone of phones create div and other needed html
//  get phoneContainer 
//  then set appendChild phoneCard in phoneContainer
//  
const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.textContent = '';

    const showAllBtn = document.getElementById('show-all-btn');
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        const phoneCard = document.createElement('div')
        phoneCard.classList = ` card bg-base-100 shadow-xl `;
        phoneCard.innerHTML = `
        
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>There are many variations of passages of available, but the majority have suffered.</p>
        <div class="card-actions">
            <button  onclick="handleShowAllDetails('${phone.slug}')" class="btn btn-neutral text-[#fdfdfd]">Show Details</button>
        </div>

        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
};

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadData(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
};

const handleShowAll = () =>{
    handleSearch(true);
};

const handleShowAllDetails = async (slug) => {
    // console.log('check', slug);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);

};

const showPhoneDetails = (phone) =>{
    // console.log(phone);

    const showDetailsModalInfo = document.getElementById('show-details-modal-info');
    showDetailsModalInfo.innerHTML =`
    
    <div class="flex justify-center bg-slate-100 p-4">
        <img src="${phone.image}" alt="">           
    </div>
    <h2 class="text-3xl my-3 poppins font-semibold">${phone.name}</h2>
    <p class="text-justify my-3">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p> <span class="font-semibold">Storage : </span> ${phone?.mainFeatures?.storage}</p>
    <p class="mt-2"> <span class="font-semibold">Display Size :  </span> ${phone?.mainFeatures?.displaySize}</p>
    <p class="mt-2"> <span class="font-semibold">Chipset :  </span> ${phone?.mainFeatures?.chipSet}</p>
    <p class="mt-2"> <span class="font-semibold">Memory :  </span> ${phone?.mainFeatures?.memory}</p>
    <p class="mt-2"> <span class="font-semibold">Release data :  </span> ${phone?.releaseDate}</p>
    <p class="mt-2"> <span class="font-semibold">Brand :  </span> ${phone?.brand}</p>
    <p class="mt-2"> <span class="font-semibold">GPS :  </span> ${phone?.others?.GPS}</p>

    `
    show_phone_details.showModal()
}


loadData();

