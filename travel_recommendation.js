document.getElementById('search-btn').addEventListener('click', function () {
    const searchQuery = document.querySelector('.search-container input').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = ''; // Clear previous results

    // If input is empty, do nothing
    if (searchQuery === '') {
        return;
    }

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let allResults = [];

            if (searchQuery.includes('beach')) {
                data.beaches.forEach(beach => {
                    allResults.push({
                        name: beach.name,
                        description: beach.description,
                        imageUrl: `images/${beach.imageUrl}`
                    });
                });
            } else if (searchQuery.includes('temple')) {
                data.temples.forEach(temple => {
                    allResults.push({
                        name: temple.name,
                        description: temple.description,
                        imageUrl: `images/${temple.imageUrl}`
                    });
                });
            } else {
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(searchQuery)) {
                        country.cities.forEach(city => {
                            allResults.push({
                                name: city.name,
                                description: city.description,
                                imageUrl: `images/${city.imageUrl}`
                            });
                        });
                    } else {
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(searchQuery)) {
                                allResults.push({
                                    name: city.name,
                                    description: city.description,
                                    imageUrl: `images/${city.imageUrl}`
                                });
                            }
                        });
                    }
                });
            }

            // Display results
            if (allResults.length === 0) {
                resultsContainer.innerHTML = `<p>No results found for "<strong>${searchQuery}</strong>"</p>`;
                return;
            }

            allResults.forEach(result => {
                const item = document.createElement('div');
                item.classList.add('recommendation-item');
                item.innerHTML = `
                    <img src="${result.imageUrl}" alt="${result.name}">
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                `;
                resultsContainer.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error loading recommendations:', error);
            resultsContainer.innerHTML = `<p>Failed to load data. Please try again later.</p>`;
        });
});

// Reset button functionality
document.getElementById('reset-btn').addEventListener('click', function () {
    document.querySelector('.search-container input').value = '';
    document.getElementById('results-container').innerHTML = '';
});
