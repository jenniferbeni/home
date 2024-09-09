document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('autocomplete-input');
  const resultsContainer = document.getElementById('autocomplete-results');
  const loading = document.getElementById('loading');

  let items = [];
  let zip = "";
  const requestsDiv = document.getElementById('requests');

  // Address auto-complete using hereapi.com
  async function fetchLocations(inputValue) {
    if (!inputValue) return;
    loading.style.display = 'block';
    try {
      const response = await fetch(`https://autocomplete.search.hereapi.com/v1/autocomplete?apiKey=14B6Yr62CTa_mKKoYViJQClxjjA32S6pL4Ir2ehCMcY&q=${inputValue}&maxresults=5`);
      const data = await response.json();
      console.log('data.items line 17', data.items)
      items = data.items.map(item => ({
        id: item.id,
        title: item.title,
        address: {
          label: item.address.label,
          city: item.address.city,
          countryName: item.address.countryName,
          postalCode: item.address.postalCode,
          state: item.address.state,
          stateCode: item.address.stateCode
        },
        zip: item.address.postalCode || 'No ZIP Code'
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

 

function renderResults1() {
  resultsContainer.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.className = 'autocomplete-item';
    li.addEventListener('click', async () => {
      input.value = item.title;
      globalAddress = item.address;
      zip = item.zip || "";  // added zip code
      
      console.log('Selected item', item);




      // Use OpenStreetMap (Nominatim) to get lat/lon for the selected address
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(item.title)}&format=json&limit=1`);
        const data = await response.json();
        if (data.length > 0) {
          const location = data[0];
          console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`);
          

          requestsDiv.innerHTML = `
          <b>City:</b> ${item.address.city || 'N/A'}<br>
          <b>Country:</b> ${item.address.countryName || 'N/A'}<br>
          <b>Postal Code:</b> ${item.address.postalCode || 'N/A'}<br>
          <b>State:</b> ${item.address.state || 'N/A'}<br>
          <b>Formatted Address:</b> ${item.address.label || 'N/A'}<br>
          <b>Latitude:</b> ${location.lat}<br>
          <b>Longitude:</b> ${location.lon}
        `;
  
         // requestsDiv.innerHTML = `Address: ${globalAddress}<br>Latitude: ${location.lat}, Longitude: ${location.lon}<br>ZIP: ${zip}`; 
         
          // Update the requestsDiv with latitude and longitude from Nominatim
         // requestsDiv.innerHTML = `Address: ${globalAddress}<br>Latitude: ${location.lat}, Longitude: ${location.lon}`;
        } else {
          console.log('No lat/lon found for this address');
        }
      } catch (error) {
        console.error('Error fetching lat/lon:', error);
      }

      resultsContainer.innerHTML = '';
    });
    resultsContainer.appendChild(li);
  });
}

function renderResults() {
  resultsContainer.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.title;
    li.className = 'autocomplete-item';

    li.addEventListener('click', async () => {
      input.value = item.title;
      globalAddress = item.address;
      zip = item.zip || "";  // Capture the zip code

      console.log('Selected item', item);

      // Try fetching lat/lon using a simplified address query
      const searchQuery = `${item.address.city}, ${item.address.state}, ${item.address.postalCode}`; // Simplified query
      console.log(`Searching lat/lon for: ${searchQuery}`);
      
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`);
        const data = await response.json();
        if (data.length > 0) {
          const location = data[0];
          console.log(`Latitude: ${location.lat}, Longitude: ${location.lon}`);

          // Display address details with lat/lon
          requestsDiv.innerHTML = `
            <b>City:</b> ${item.address.city || 'N/A'}<br>
            <b>Country:</b> ${item.address.countryName || 'N/A'}<br>
            <b>Postal Code:</b> ${item.address.postalCode || 'N/A'}<br>
            <b>State:</b> ${item.address.state || 'N/A'}<br>
            <b>Formatted Address:</b> ${item.address.label || 'N/A'}<br>
            <b>Latitude:</b> ${location.lat}<br>
            <b>Longitude:</b> ${location.lon}
          `;
        } else {
          console.log('No lat/lon found for this address');
          requestsDiv.innerHTML = `
            <b>City:</b> ${item.address.city || 'N/A'}<br>
            <b>Country:</b> ${item.address.countryName || 'N/A'}<br>
            <b>Postal Code:</b> ${item.address.postalCode || 'N/A'}<br>
            <b>State:</b> ${item.address.state || 'N/A'}<br>
            <b>Formatted Address:</b> ${item.address.label || 'N/A'}<br>
            <b>Latitude:</b> Not available<br>
            <b>Longitude:</b> Not available
          `;
        }
      } catch (error) {
        console.error('Error fetching lat/lon:', error);
        requestsDiv.innerHTML = `
          <b>City:</b> ${item.address.city || 'N/A'}<br>
          <b>Country:</b> ${item.address.countryName || 'N/A'}<br>
          <b>Postal Code:</b> ${item.address.postalCode || 'N/A'}<br>
          <b>State:</b> ${item.address.state || 'N/A'}<br>
          <b>Formatted Address:</b> ${item.address.label || 'N/A'}<br>
          <b>Latitude:</b> Error fetching<br>
          <b>Longitude:</b> Error fetching
        `;
      }

      resultsContainer.innerHTML = ''; // Clear the autocomplete suggestions
    });

    resultsContainer.appendChild(li); // Append each list item to results
  });
}




  input.addEventListener('input', function () {
    const value = input.value;
    fetchLocations(value);
  });

  document.getElementById("autocomplete-button").addEventListener("click", function() {
    window.location.href = "/RealityStream/#zip=" + zip;
  });
});

var globalAddress = "";

function updateGlobalAddress() {
  var inputField = document.getElementById("autocomplete-input");
  globalAddress = inputField.value;
  console.log("Global Address Updated: " + globalAddress);
}