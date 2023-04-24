export function createMarkUpForOneCountry(arr) { 
    return arr.map(({ name, capital, population, languages, flags }) => { 
        return `<li>
        <img src="${flags.svg}" alt="country" width=40 height=auto>
        <h2>${name.official}</h2>
        <p><span>Capital:</span> ${capital}</p>
        <p><span>Population:</span> ${population}</p>
        <p><span>Languages:</span> ${Object.values(languages).join(',')}</p>
      </li>`
    }).join('')
}


export function createMarkUpForAllCountries(arr) {
    return arr.map(({ name, flags }) => {
        return `<li>
        <img src="${flags.svg}" alt="country" width=40 height=auto>
        <h2>${name.official}</h2>
        </li>`
    }).join('')
}