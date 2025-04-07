// Fetch the API data
const fetchApiData = async () => {
    try {
      const response = await fetch('https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };
  
  // Function to handle search input and filter the recommendations
  const handleSearch = (keyword, apiData) => {
    const searchKeyword = keyword.toLowerCase();
    let filteredResults = { countries: [], temples: [], beaches: [] };
  
    // Handle different keyword variations
    if (searchKeyword.includes('beach')) {
      filteredResults.beaches = apiData.beaches;
    } else if (searchKeyword.includes('temple')) {
      filteredResults.temples = apiData.temples;
    } else if (searchKeyword.includes('country')) {
      filteredResults.countries = apiData.countries;
    }
  
    return filteredResults;
  };
  
  // Function to display the filtered results
  const displayRecommendations = (filteredResults) => {
    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = ''; // Clear previous results
  
    if (
      filteredResults.beaches.length === 0 &&
      filteredResults.temples.length === 0 &&
      filteredResults.countries.length === 0
    ) {
      recommendationsContainer.innerHTML = '<p>No recommendations found for this keyword.</p>';
      return;
    }
  
    // Display beach recommendations
    filteredResults.beaches.forEach((beach) => {
      const placeElement = document.createElement('div');
      placeElement.classList.add('recommendation');
      
      placeElement.innerHTML = `
        <img src="${beach.imageUrl}" alt="${beach.name}" />
        <h3>${beach.name}</h3>
        <p>${beach.description}</p>
      `;
      
      recommendationsContainer.appendChild(placeElement);
    });
  
    // Display temple recommendations
    filteredResults.temples.forEach((temple) => {
      const placeElement = document.createElement('div');
      placeElement.classList.add('recommendation');
      
      placeElement.innerHTML = `
        <img src="${temple.imageUrl}" alt="${temple.name}" />
        <h3>${temple.name}</h3>
        <p>${temple.description}</p>
      `;
      
      recommendationsContainer.appendChild(placeElement);
    });
  
    // Display country recommendations (cities)
    filteredResults.countries.forEach((country) => {
      country.cities.forEach((city) => {
        const placeElement = document.createElement('div');
        placeElement.classList.add('recommendation');
        
        placeElement.innerHTML = `
          <img src="${city.imageUrl}" alt="${city.name}" />
          <h3>${city.name}</h3>
          <p>${city.description}</p>
        `;
        
        recommendationsContainer.appendChild(placeElement);
      });
    });
  };
  
  // Search button event listener
  document.getElementById('search-btn').addEventListener('click', async () => {
    const searchInput = document.getElementById('search-input').value;
  
    // Check if search input is empty
    if (!searchInput) {
      alert('Please enter a search keyword.');
      return;
    }
  
    // Fetch the API data
    const apiData = await fetchApiData();
    const filteredResults = handleSearch(searchInput, apiData);
    displayRecommendations(filteredResults);
  });
  
  // Clear button event listener
  document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('recommendations').innerHTML = ''; // Clear displayed recommendations
    document.getElementById('search-input').value = ''; // Clear search input
  });
  