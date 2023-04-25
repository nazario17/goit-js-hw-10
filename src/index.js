import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { createMarkUpForAllCountries, createMarkUpForOneCountry } from './js/createMarkUp';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const list = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) { 
    const value = event.target.value
    if (!value || !value.trim()) {
        list.innerHTML = '';
        return;
    }

    fetchCountries(value.toLowerCase())
      .then(data => {
        if (data.length > 10) {
          Notify.failure(
            'Too many matches found. Please enter a more specific name.'
          );
          list.innerHTML = '';
          return;
        } else if (data.length >= 2 && data.length <= 10) {
          list.innerHTML = createMarkUpForAllCountries(data);
        } else if (data.length === 1) {
          list.innerHTML = createMarkUpForOneCountry(data);
        }
      })
      .catch(error => {
        console.dir(error);
        if (error.message === 'Not Found') {
          Notify.failure('Oops, there is no country with that name');
          list.innerHTML = '';
        }
      });
}

