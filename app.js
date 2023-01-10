const API = 'https://futar.bkk.hu/api/query/v1/ws/otp/api/where/bicycle-rental.json?key=apaiary-test&version=3&appVersion=apiary-1.0&includeReferences=true';

const container = document.querySelector('.container');
const results = document.getElementById('results');
const search = document.getElementById('search');
let search_term;

async function fetchBubiData() {
    const response = await fetch(API);
    const json = await response.json();
    const result = await json.data.list;

    result.forEach(el => {

        if (el.code === 'BIKE') {
            return;
        }

        const locationName = el.name;
        const bikes = el.bikes;
        const lat = el.lat;
        const lon = el.lon;

        // Create html tags, add class
        const item = document.createElement('div');
        item.classList.add('item');

        const bike = document.createElement('span');
        if (bikes === 0) {
            item.classList.add('bikes-off');
        }

        const location = document.createElement('p');
        
        const map = document.createElement('a');

        // Connect tags
        container.appendChild(item);
        item.appendChild(bike);
        item.appendChild(location);
    
        item.appendChild(map);

        // Add values to tags
        map.innerHTML = `<a class="map" href="https://www.google.com/maps/search/?api=1&query=${lat}%2C${lon}" target="_blank"><i class="fa-sharp fa-solid fa-map-pin"></i></a>`;
        location.innerHTML = `<p class="location">${locationName}</p>`;
        bike.innerHTML = `<p class="bikes">${bikes}</p>`;

        
    });

    return result;
}

fetchBubiData();


search.addEventListener('input', (event) => {
    search_term = event.target.value.toLowerCase();
    showList();
  });

const showList = () => {
    results.innerHTML = '';
    fetchBubiDataSearch(); 
  };

  // TODO: Clear search result if search-input value deleted
async function fetchBubiDataSearch() {
    const response = await fetch(API);
    const json = await response.json();
    const result = await json.data.list;
    result.filter((item) => {
        return item.name.toLowerCase().includes(search_term);
      })
      .forEach((e) => {

        if (e.code === 'BIKE') {
            return;
        }

        const itemSearch = document.createElement('div');
        itemSearch.classList.add('item-result');
        
        const bike = document.createElement('span');
        if (e.bikes === 0) {
            itemSearch.classList.add('bikes-off-result');
        }

        const location = document.createElement('p');

        const map = document.createElement('a');

        container.appendChild(itemSearch);
        itemSearch.appendChild(bike);
        itemSearch.appendChild(location);
        itemSearch.appendChild(map);

        map.innerHTML = `<a class="map-result" href="https://www.google.com/maps/search/?api=1&query=${e.lat}%2C${e.lon}" target="_blank"><i class="fa-sharp fa-solid fa-map-pin"></i></a>`;
        location.innerHTML = `<p class="location-result">${e.name}</p>`;
        bike.innerHTML = `<span class="bikes-result">${e.bikes}</span>`;

        results.appendChild(itemSearch);
       
    });

    return result;
}
