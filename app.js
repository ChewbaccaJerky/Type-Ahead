const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");


fetch(endpoint)
  .then((res) => res.json())
  .then((data) => cities.push(...data));

const findMatches = function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
};

const displayMatches = function displayMatches() {
  const match = findMatches(this.value, cities);
  const html = match.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${place.population}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
};


searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
