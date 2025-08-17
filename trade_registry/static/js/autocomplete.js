document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('object-search');
    const resultsContainer = document.getElementById('search-results');
    const selectedList = document.getElementById('selected-list');

    if (!searchInput || !resultsContainer || !selectedList) return;

    const selectedObjects = new Map();
    let searchTimeout;

    async function fetchObjects(query) {
        try {
            const response = await fetch(`/trade_registry/object-search/?q=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Fetch error:', error);
            return [];
        }
    }

    function displayResults(items) {
        resultsContainer.innerHTML = '';

        if (!items || items.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">Ничего не найдено</div>';
            resultsContainer.style.display = 'block';
            return;
        }

        items.forEach(item => {
            if (selectedObjects.has(item.id)) return;

            const div = document.createElement('div');
            div.className = 'result-item';
            div.innerHTML = `
                <div class="item-name">${item.name || 'Без названия'}</div>
                ${item.address ? `<div class="item-address">${item.address}</div>` : ''}
            `;

            div.addEventListener('click', () => {
                addSelectedItem(item);
                searchInput.value = '';
                resultsContainer.style.display = 'none';
            });

            resultsContainer.appendChild(div);
        });

        resultsContainer.style.display = 'block';
    }

    function addSelectedItem(item) {
        if (selectedObjects.has(item.id)) return;

        selectedObjects.set(item.id, item);

        const tag = document.createElement('div');
        tag.className = 'selected-tag';
        tag.innerHTML = `
            <span>${item.name}</span>
            <button class="remove-tag" data-id="${item.id}">×</button>
            <input type="hidden" name="linked_objects" value="${item.id}">
        `;

        selectedList.appendChild(tag);
    }

    // Обработчики событий
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();

        if (query.length < 2) {
            resultsContainer.style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(async () => {
            const results = await fetchObjects(query);
            displayResults(results);
        }, 300);
    });

    selectedList.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-tag')) {
            const id = e.target.getAttribute('data-id');
            selectedObjects.delete(id);
            e.target.closest('.selected-tag').remove();
        }
    });

    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !resultsContainer.contains(e.target)) {
            resultsContainer.style.display = 'none';
        }
    });
});