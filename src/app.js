console.log("app.js is running");
console.log("testing...");
import { fetchAllData } from './api/dataFetcher.js';
import { initializeFuse, search } from './utils/search.js';
import { fadeIn, bounceAnimation } from './utils/animations.js';

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const voiceSearchBtn = document.getElementById('voice-search-btn');
const voiceAnimation = document.getElementById('voice-animation');
const loadMoreBtn = document.getElementById('load-more-btn');
const themeToggle = document.getElementById('theme-toggle');

// console.log("fetchAllData: ",fetchAllData())

let allData = [];
let currentPage = 1;
const itemsPerPage = 10;

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const displayResults = (results, append = false) => {
  if (!append) {
    searchResults.innerHTML = '';
  }

  results.forEach((item, index) => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('search-result');
    resultElement.innerHTML = `
      <img src="${item.image}" alt="${item.title}" />
      <h2>${item.title}</h2>
      <p>${item.content?.substring(0, 150)}...</p>
      <span class="category">${item.category}</span>
    `;

    searchResults.appendChild(resultElement);
    fadeIn(resultElement, index * 0.1);
  });

  if (results.length === 0 && !append) {
    searchResults.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400">No results found</p>';
  }

  loadMoreBtn.style.display = results.length >= itemsPerPage ? 'block' : 'none';
};

const debouncedSearch = debounce((query) => {
  const results = search(query);
  displayResults(results.slice(0, itemsPerPage));
  currentPage = 1;
}, 300);

searchInput.addEventListener('input', (e) => {
  const query = e.target.value;
  debouncedSearch(query);
});

voiceSearchBtn.addEventListener('click', () => {
  if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      voiceAnimation.classList.remove('hidden');
      const dots = voiceAnimation.querySelectorAll('.dot');
      dots.forEach((dot) => {
        bounceAnimation(dot);
      });
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
      debouncedSearch(transcript);
    };

    recognition.onend = () => {
      voiceAnimation.classList.add('hidden');
    };

    recognition.start();
  } else {
    alert('Voice search is not supported in your browser.');
  }
});

loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  const query = searchInput.value;
  const results = search(query);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  displayResults(results.slice(startIndex, endIndex), true);
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  updateThemeToggleIcon();
});

const updateThemeToggleIcon = () => {
  const isDark = document.documentElement.classList.contains('dark');
  themeToggle.innerHTML = isDark
    ? '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>';
};

// Initialize theme
const initializeTheme = () => {
  if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeToggleIcon();
};

const init = async () => {
  try {
    initializeTheme();
    allData = await fetchAllData();
    initializeFuse(allData);
    console.log("data: ", allData)
    displayResults(allData.slice(0, itemsPerPage));
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};

init();

