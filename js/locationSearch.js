document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('autocomplete-input');
  const resultsContainer = document.getElementById('autocomplete-results');
  const loading = document.getElementById('loading');

  let items = [];
  const requestsDiv = document.getElementById('requests');

  // Address auto-complete using hereapi.com
  async function fetchLocations(inputValue) {
    if (!inputValue) return;
    loading.style.display = 'block';
    try {
      const response = await fetch(`https://autocomplete.search.hereapi.com/v1/autocomplete?apiKey=14B6Yr62CTa_mKKoYViJQClxjjA32S6pL4Ir2ehCMcY&q=${inputValue}&maxresults=5`);
      const data = await response.json();
      items = data.items.map(item => ({
        id: item.id,
        title: item.title,
        address: item.address.label
      }));
      loading.style.display = 'none';
      renderResults();
    } catch (error) {
      console.error('Error fetching data:', error);
      loading.style.display = 'none';
      items = [];
      renderResults();
    }
  }

  function renderResults() {
    resultsContainer.innerHTML = '';
    items.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item.title;
      li.className = 'autocomplete-item';
      li.addEventListener('click', () => {
        input.value = item.title;
        globalAddress = item.address;
        console.log('Selected item', item);

        requestsDiv.innerHTML = globalAddress;
        //displayrequests
        resultsContainer.innerHTML = '';
      });
      resultsContainer.appendChild(li);
    });
  }

  input.addEventListener('input', function () {
    const value = input.value;
    fetchLocations(value);
  });
});

var globalAddress = "";

function updateGlobalAddress() {
  var inputField = document.getElementById("autocomplete-input");
  globalAddress = inputField.value;
  console.log("Global Address Updated: " + globalAddress);
  displayRequests(1, 1);
}

// Not currently used
function fetchDetailedAddress(lat, lng) {
    const geocodingUrl = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lng}&apikey=14B6Yr62CTa_mKKoYViJQClxjjA32S6pL4Ir2ehCMcY`;

    axios.get(geocodingUrl)
        .then((response) => {
            if (response.data.items.length > 0) {
                const location = response.data.items[0].address;

                // Create a div to display the latitude, longitude, and place names
                const latLngDiv = document.createElement('div');
                latLngDiv.innerHTML = `
                    <b>Latitude:</b> ${lat}<br>
                    <b>Longitude:</b> ${lng}<br>
                    <b>Country:</b> ${location.countryName || 'N/A'}<br>
                    <b>State:</b> ${location.state || 'N/A'}<br>
                    <b>City:</b> ${location.city || 'N/A'}<br>
                    <b>Street:</b> ${location.street || 'N/A'}<br>
                    <b>Postal Code:</b> ${location.postalCode || 'N/A'}
                `;
                requestsDiv.appendChild(latLngDiv);
            } else {
                const noResultsDiv = document.createElement('div');
                noResultsDiv.textContent = 'No location details found';
                requestsDiv.appendChild(noResultsDiv);
            }
        })
        .catch((error) => {
            console.error('Error in reverse geocoding:', error);
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Error fetching location details';
            requestsDiv.appendChild(errorDiv);
        });
}




//*/