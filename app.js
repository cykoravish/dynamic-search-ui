// const searchInput = document.getElementById('search-input');
// const searchSuggestions = document.getElementById('search-suggestions');
// const searchResults = document.getElementById('search-results');
// const filterChips = document.getElementById('filter-chips');
// const themeToggle = document.getElementById('theme-toggle');
// const voiceSearchBtn = document.getElementById('voice-search-btn');
// const searchOverlay = document.getElementById('search-overlay');
// const voiceAnimation = document.getElementById('voice-animation');

// let debounceTimer;
// let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
// let currentFilters = new Set();
// let allData = [];
// let currentPage = 1;
// const itemsPerPage = 10;

// let fuse;

// function debounce(func, delay) {
//     return function () {
//         const context = this;
//         const args = arguments;
//         clearTimeout(debounceTimer);
//         debounceTimer = setTimeout(() => func.apply(context, args), delay);
//     };
// }

// const debouncedSearch = debounce((query) => {
//     const results = fuse.search(query);
//     displayResults(results);
//     updateFilters(results);
// }, 300);

// searchInput.addEventListener('input', (e) => {
//     const query = e.target.value;
//     if (query.length > 1) {
//         debouncedSearch(query);
//     } else {
//         displayInitialData();
//     }
//     showSearchSuggestions(query);
// });

// function showSearchSuggestions(query) {
//     if (query.length < 2) {
//         searchSuggestions.innerHTML = '';
//         searchSuggestions.classList.remove('p-2');
//         return;
//     }

//     const suggestions = fuse.search(query).slice(0, 5);
//     searchSuggestions.innerHTML = '';
//     searchSuggestions.classList.add('p-2');

//     suggestions.forEach(({ item }) => {
//         const suggestionElement = document.createElement('div');
//         suggestionElement.classList.add('p-2', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'cursor-pointer', 'rounded');
//         suggestionElement.textContent = item.title;
//         suggestionElement.addEventListener('click', () => {
//             searchInput.value = item.title;
//             debouncedSearch(item.title);
//             searchSuggestions.innerHTML = '';
//             searchSuggestions.classList.remove('p-2');
//         });
//         searchSuggestions.appendChild(suggestionElement);
//     });

//     gsap.to(searchSuggestions, { opacity: 1, scale: 1, duration: 0.3 });
// }

// function displayResults(results, append = false) {
//     if (!append) {
//         searchResults.innerHTML = '';
//     }
    
//     if (results.length === 0 && !append) {
//         searchResults.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400">No results found</p>';
//         return;
//     }

//     results.forEach(({ item }, index) => {
//         const resultElement = document.createElement('div');
//         resultElement.classList.add('search-result', 'opacity-0');
//         resultElement.innerHTML = `
//             <img src="${item.image}" alt="${item.title}" />
//             <h2>${item.title}</h2>
//             <p>${item.content.substring(0, 150)}...</p>
//             <span class="category">${item.category}</span>
//         `;

//         searchResults.appendChild(resultElement);

//         gsap.to(resultElement, {
//             opacity: 1,
//             y: 0,
//             duration: 0.5,
//             delay: index * 0.1,
//             ease: "power2.out"
//         });
//     });
// }

// function updateFilters(results) {
//     const categories = new Set(results.map(({ item }) => item.category));
//     filterChips.innerHTML = '';

//     categories.forEach(category => {
//         const chipElement = document.createElement('button');
//         chipElement.classList.add('filter-chip', 'px-3', 'py-1', 'rounded-full', 'text-sm', 'font-medium', 'transition-colors', 'duration-300', 'opacity-0', 'scale-95');
//         chipElement.classList.toggle('bg-blue-100', !currentFilters.has(category));
//         chipElement.classList.toggle('text-blue-800', !currentFilters.has(category));
//         chipElement.classList.toggle('bg-blue-500', currentFilters.has(category));
//         chipElement.classList.toggle('text-white', currentFilters.has(category));
//         chipElement.textContent = category;

//         chipElement.addEventListener('click', () => {
//             if (currentFilters.has(category)) {
//                 currentFilters.delete(category);
//             } else {
//                 currentFilters.add(category);
//             }
//             updateFilters(results);
//             applyFilters(results);
//         });

//         filterChips.appendChild(chipElement);

//         gsap.to(chipElement, {
//             opacity: 1,
//             scale: 1,
//             duration: 0.3,
//             delay: Array.from(categories).indexOf(category) * 0.1,
//             ease: "back.out(1.7)"
//         });
//     });
// }

// function applyFilters(results) {
//     if (currentFilters.size === 0) {
//         displayResults(results);
//         return;
//     }

//     const filteredResults = results.filter(({ item }) => currentFilters.has(item.category));
//     displayResults(filteredResults);
// }

// themeToggle.addEventListener('click', () => {
//     document.documentElement.classList.toggle('dark');
//     localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
// });

// // Initialize theme
// if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//     document.documentElement.classList.add('dark');
// }

// voiceSearchBtn.addEventListener('click', () => {
//     if ('webkitSpeechRecognition' in window) {
//         const recognition = new webkitSpeechRecognition();
//         recognition.continuous = false;
//         recognition.interimResults = false;

//         recognition.onstart = () => {
//             voiceAnimation.classList.remove('hidden');
//         };

//         recognition.onresult = (event) => {
//             const transcript = event.results[0][0].transcript;
//             searchInput.value = transcript;
//             debouncedSearch(transcript);
//         };

//         recognition.onend = () => {
//             voiceAnimation.classList.add('hidden');
//         };

//         recognition.start();
//     } else {
//         alert('Voice search is not supported in your browser.');
//     }
// });

// // Keyboard navigation
// document.addEventListener('keydown', (e) => {
//     if (e.key === '/') {
//         e.preventDefault();
//         searchInput.focus();
//     }
// });

// // Search history
// function addToSearchHistory(query) {
//     searchHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 5);
//     localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
// }

// function showSearchHistory() {
//     searchSuggestions.innerHTML = '';
//     searchSuggestions.classList.add('p-2');

//     searchHistory.forEach(query => {
//         const historyElement = document.createElement('div');
//         historyElement.classList.add('p-2', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'cursor-pointer', 'rounded', 'flex', 'items-center');
//         historyElement.innerHTML = `
//             <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 0 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             ${query}
//         `;
//         historyElement.addEventListener('click', () => {
//             searchInput.value = query;
//             debouncedSearch(query);
//             searchSuggestions.innerHTML = '';
//             searchSuggestions.classList.remove('p-2');
//         });
//         searchSuggestions.appendChild(historyElement);
//     });

//     gsap.to(searchSuggestions, { opacity: 1, scale: 1, duration: 0.3 });
// }

// searchInput.addEventListener('focus', () => {
//     if (searchInput.value === '') {
//         showSearchHistory();
//     }
// });

// searchInput.addEventListener('blur', () => {
//     setTimeout(() => {
//         searchSuggestions.innerHTML = '';
//         searchSuggestions.classList.remove('p-2');
//     }, 200);
// });

// // Error handling
// function handleError(error) {
//     console.error('An error occurred:', error);
//     const errorElement = document.createElement('div');
//     errorElement.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'mb-4', 'opacity-0');
//     errorElement.setAttribute('role', 'alert');
//     errorElement.innerHTML = `
//         <strong class="font-bold">Error:</strong>
//         <span class="block sm:inline">${error.message}</span>
//     `;
//     searchResults.insertBefore(errorElement, searchResults.firstChild);

//     gsap.to(errorElement, {
//         opacity: 1,
//         y: 0,
//         duration: 0.5,
//         ease: "power2.out"
//     });

//     setTimeout(() => {
//         gsap.to(errorElement, {
//             opacity: 0,
//             y: -20,
//             duration: 0.5,
//             ease: "power2.in",
//             onComplete: () => errorElement.remove()
//         });
//     }, 5000);
// }

// async function fetchData() {
//     try {
//         const [newsResponse, booksResponse, moviesResponse] = await Promise.all([
//             fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_NEWS_API_KEY'),
//             fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20'),
//             fetch('https://api.themoviedb.org/3/movie/popular?api_key=0d01f63e1aae052211ea93f252a8b015')
//         ]);

//         console.log()
//         const newsData = await newsResponse.json();
//         const booksData = await booksResponse.json();
//         const moviesData = await moviesResponse.json();

//         allData = [
//             ...newsData.articles.map(article => ({
//                 id: article.url,
//                 title: article.title,
//                 content: article.description,
//                 category: 'News',
//                 image: article.urlToImage || 'https://via.placeholder.com/300x200?text=News'
//             })),
//             ...booksData.items.map(book => ({
//                 id: book.id,
//                 title: book.volumeInfo.title,
//                 content: book.volumeInfo.description || 'No description available',
//                 category: 'Books',
//                 image: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/300x200?text=Book'
//             })),
//             ...moviesData.results.map(movie => ({
//                 id: movie.id,
//                 title: movie.title,
//                 content: movie.overview,
//                 category: 'Movies',
//                 image: `https://image.tmdb.org/t/p/w500${movie.poster_path}` || 'https://via.placeholder.com/300x200?text=Movie'
//             }))
//         ];

//         initializeFuse();
//         displayInitialData();
//         hideLoadingIndicator();
//     } catch (error) {
//         handleError(error);
//     }
// }

// function initializeFuse() {
//     fuse = new Fuse(allData, {
//         keys: ['title', 'content', 'category'],
//         threshold: 0.3,
//     });
// }

// function displayInitialData() {
//     const initialResults = allData.slice(0, itemsPerPage);
//     displayResults(initialResults.map(item => ({ item })));
//     currentPage = 1;
// }

// function hideLoadingIndicator() {
//     const loadingIndicator = document.getElementById('loading-indicator');
//     gsap.to(loadingIndicator, {
//         opacity: 0,
//         duration: 0.3,
//         onComplete: () => {
//             loadingIndicator.style.display = 'none';
//         }
//     });
// }

// // Infinite scrolling
// window.addEventListener('scroll', () => {
//     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
//         loadMoreResults();
//     }
// });

// function loadMoreResults() {
//     currentPage++;
//     const startIndex = (currentPage - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const newResults = allData.slice(startIndex, endIndex);
//     displayResults(newResults.map(item => ({ item })), true);
// }

// // Initialize the app
// function init() {
//     try {
//         fetchData();
//     } catch (error) {
//         handleError(error);
//     }
// }

// init();

const searchInput = document.getElementById('search-input');
const searchSuggestions = document.getElementById('search-suggestions');
const searchResults = document.getElementById('search-results');
const filterChips = document.getElementById('filter-chips');
const themeToggle = document.getElementById('theme-toggle');
const voiceSearchBtn = document.getElementById('voice-search-btn');
const searchOverlay = document.getElementById('search-overlay');
const voiceAnimation = document.getElementById('voice-animation');

let debounceTimer;
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
let currentFilters = new Set();
let allData = [];
let currentPage = 1;
const itemsPerPage = 10;

let fuse;

function debounce(func, delay) {
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

const debouncedSearch = debounce((query) => {
    const results = fuse.search(query);
    displayResults(results);
    updateFilters(results);
}, 300);

searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length > 1) {
        debouncedSearch(query);
    } else {
        displayInitialData();
    }
    showSearchSuggestions(query);
});

function showSearchSuggestions(query) {
    if (query.length < 2) {
        searchSuggestions.innerHTML = '';
        searchSuggestions.classList.remove('p-2');
        return;
    }

    const suggestions = fuse.search(query).slice(0, 5);
    searchSuggestions.innerHTML = '';
    searchSuggestions.classList.add('p-2');

    suggestions.forEach(({ item }) => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('p-2', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'cursor-pointer', 'rounded');
        suggestionElement.textContent = item.title;
        suggestionElement.addEventListener('click', () => {
            searchInput.value = item.title;
            debouncedSearch(item.title);
            searchSuggestions.innerHTML = '';
            searchSuggestions.classList.remove('p-2');
        });
        searchSuggestions.appendChild(suggestionElement);
    });

    gsap.to(searchSuggestions, { opacity: 1, scale: 1, duration: 0.3 });
}

function displayResults(results, append = false) {
    if (!append) {
        searchResults.innerHTML = '';
    }
    
    if (results.length === 0 && !append) {
        searchResults.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400">No results found</p>';
        return;
    }

    results.forEach(({ item }, index) => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('search-result', 'opacity-0');
        resultElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" />
            <h2>${item.title}</h2>
            <p>${item.content.substring(0, 150)}...</p>
            <span class="category">${item.category}</span>
        `;

        searchResults.appendChild(resultElement);

        gsap.to(resultElement, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out"
        });
    });
}

function updateFilters(results) {
    const categories = new Set(results.map(({ item }) => item.category));
    filterChips.innerHTML = '';

    categories.forEach(category => {
        const chipElement = document.createElement('button');
        chipElement.classList.add('filter-chip', 'px-3', 'py-1', 'rounded-full', 'text-sm', 'font-medium', 'transition-colors', 'duration-300', 'opacity-0', 'scale-95');
        chipElement.classList.toggle('bg-blue-100', !currentFilters.has(category));
        chipElement.classList.toggle('text-blue-800', !currentFilters.has(category));
        chipElement.classList.toggle('bg-blue-500', currentFilters.has(category));
        chipElement.classList.toggle('text-white', currentFilters.has(category));
        chipElement.textContent = category;

        chipElement.addEventListener('click', () => {
            if (currentFilters.has(category)) {
                currentFilters.delete(category);
            } else {
                currentFilters.add(category);
            }
            updateFilters(results);
            applyFilters(results);
        });

        filterChips.appendChild(chipElement);

        gsap.to(chipElement, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            delay: Array.from(categories).indexOf(category) * 0.1,
            ease: "back.out(1.7)"
        });
    });
}

function applyFilters(results) {
    if (currentFilters.size === 0) {
        displayResults(results);
        return;
    }

    const filteredResults = results.filter(({ item }) => currentFilters.has(item.category));
    displayResults(filteredResults);
}

themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// Initialize theme
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
}

voiceSearchBtn.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => {
            voiceAnimation.classList.remove('hidden');
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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === '/') {
        e.preventDefault();
        searchInput.focus();
    }
});

// Search history
function addToSearchHistory(query) {
    searchHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 5);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function showSearchHistory() {
    searchSuggestions.innerHTML = '';
    searchSuggestions.classList.add('p-2');

    searchHistory.forEach(query => {
        const historyElement = document.createElement('div');
        historyElement.classList.add('p-2', 'hover:bg-gray-100', 'dark:hover:bg-gray-700', 'cursor-pointer', 'rounded', 'flex', 'items-center');
        historyElement.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 0 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            ${query}
        `;
        historyElement.addEventListener('click', () => {
            searchInput.value = query;
            debouncedSearch(query);
            searchSuggestions.innerHTML = '';
            searchSuggestions.classList.remove('p-2');
        });
        searchSuggestions.appendChild(historyElement);
    });

    gsap.to(searchSuggestions, { opacity: 1, scale: 1, duration: 0.3 });
}

searchInput.addEventListener('focus', () => {
    if (searchInput.value === '') {
        showSearchHistory();
    }
});

searchInput.addEventListener('blur', () => {
    setTimeout(() => {
        searchSuggestions.innerHTML = '';
        searchSuggestions.classList.remove('p-2');
    }, 200);
});

// Error handling
function handleError(error) {
    console.error('An error occurred:', error);
    const errorElement = document.createElement('div');
    errorElement.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'mb-4', 'opacity-0');
    errorElement.setAttribute('role', 'alert');
    errorElement.innerHTML = `
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">${error.message}</span>
    `;
    searchResults.insertBefore(errorElement, searchResults.firstChild);

    gsap.to(errorElement, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    });

    setTimeout(() => {
        gsap.to(errorElement, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => errorElement.remove()
        });
    }, 5000);
}

async function fetchData() {
    try {
        const [newsResponse, booksResponse, moviesResponse] = await Promise.all([
            fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_NEWS_API_KEY'),
            fetch('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=20'),
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_TMDB_API_KEY')
        ]);

        const newsData = await newsResponse.json();
        const booksData = await booksResponse.json();
        const moviesData = await moviesResponse.json();

        allData = [
            ...newsData.articles.map(article => ({
                id: article.url,
                title: article.title,
                content: article.description,
                category: 'News',
                image: article.urlToImage || 'https://via.placeholder.com/300x200?text=News'
            })),
            ...booksData.items.map(book => ({
                id: book.id,
                title: book.volumeInfo.title,
                content: book.volumeInfo.description || 'No description available',
                category: 'Books',
                image: book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/300x200?text=Book'
            })),
            ...moviesData.results.map(movie => ({
                id: movie.id,
                title: movie.title,
                content: movie.overview,
                category: 'Movies',
                image: `https://image.tmdb.org/t/p/w500${movie.poster_path}` || 'https://via.placeholder.com/300x200?text=Movie'
            }))
        ];

        initializeFuse();
        displayInitialData();
        hideLoadingIndicator();
    } catch (error) {
        handleError(error);
    }
}

function initializeFuse() {
    fuse = new Fuse(allData, {
        keys: ['title', 'content', 'category'],
        threshold: 0.3,
    });
}

function displayInitialData() {
    const initialResults = allData.slice(0, itemsPerPage);
    displayResults(initialResults.map(item => ({ item })));
    currentPage = 1;
}

function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    gsap.to(loadingIndicator, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            loadingIndicator.style.display = 'none';
        }
    });
}

// Infinite scrolling
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreResults();
    }
});

function loadMoreResults() {
    currentPage++;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newResults = allData.slice(startIndex, endIndex);
    displayResults(newResults.map(item => ({ item })), true);
}

// Initialize the app
function init() {
    try {
        fetchData().then(() => {
            createCategoryFilters();
            const results = fuse.search('');
            applyFilters(results);
        });
    } catch (error) {
        handleError(error);
    }
}

function createCategoryFilters() {
    const categories = [...new Set(allData.map(item => item.category))];
    const filterContainer = document.createElement('div');
    filterContainer.classList.add('flex', 'flex-wrap', 'gap-2', 'mb-4');

    categories.forEach(category => {
        const filterButton = document.createElement('button');
        filterButton.textContent = category;
        filterButton.classList.add('px-3', 'py-1', 'rounded-full', 'text-sm', 'font-medium', 'transition-colors', 'duration-300');
        filterButton.classList.add('bg-gray-200', 'text-gray-700', 'hover:bg-gray-300');
        filterButton.addEventListener('click', () => toggleCategoryFilter(category, filterButton));
        filterContainer.appendChild(filterButton);
    });

    searchResults.parentNode.insertBefore(filterContainer, searchResults);
}

function toggleCategoryFilter(category, button) {
    button.classList.toggle('bg-blue-500');
    button.classList.toggle('text-white');
    button.classList.toggle('bg-gray-200');
    button.classList.toggle('text-gray-700');

    if (currentFilters.has(category)) {
        currentFilters.delete(category);
    } else {
        currentFilters.add(category);
    }

    const results = fuse.search('');
    applyFilters(results);
}

function applyFilters(results) {
    if (currentFilters.size === 0) {
        displayResults(results);
        return;
    }

    const filteredResults = results.filter(({ item }) => currentFilters.has(item.category));
    displayResults(filteredResults);
}

init();

