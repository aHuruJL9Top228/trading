document.addEventListener('DOMContentLoaded', function() {
    // Основные элементы
    const originalSelect = document.getElementById('object-select');
    const realLinkedObjects = document.getElementById('real-linked-objects');

    // Создаем кастомный контейнер
    const customContainer = document.createElement('div');
    customContainer.className = 'custom-select-container';
    customContainer.id = 'custom-select-container';

    // Контейнер для выбранных элементов
    const selectedItemsContainer = document.createElement('div');
    selectedItemsContainer.className = 'selected-items';
    customContainer.appendChild(selectedItemsContainer);

    // Поле для поиска
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.className = 'search-input';
    searchInput.placeholder = 'Начните вводить название...';
    searchInput.autocomplete = 'off';
    customContainer.appendChild(searchInput);

    // Выпадающий список
    const dropdown = document.createElement('div');
    dropdown.className = 'dropdown';
    customContainer.appendChild(dropdown);

    // Вставляем кастомный контейнер после оригинального select
    originalSelect.parentNode.insertBefore(customContainer, originalSelect.nextSibling);

    // Скрываем оригинальный select
    originalSelect.style.display = 'none';

    // Состояние приложения
    let selectedItems = [];
    let searchResults = [];
    let activeIndex = -1;
    let isLoading = false;

    // Инициализация выбранных элементов
    function initSelectedItems() {
        const selectedOptions = originalSelect.querySelectorAll('option[selected]');
        selectedOptions.forEach(option => {
            selectedItems.push({
                id: option.value,
                name: option.textContent
            });
        });
        renderSelectedItems();
        updateRealSelect();
    }

    // Отрисовка выбранных элементов с использованием делегирования событий
    function renderSelectedItems() {
        selectedItemsContainer.innerHTML = '';

        selectedItems.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'selected-item';
            itemEl.dataset.id = item.id;
            itemEl.innerHTML = `
                ${item.name}
                <button class="remove-btn" data-id=${item.id}>×</button>
            `;
            selectedItemsContainer.appendChild(itemEl);
        });
    }

    // Удаление элемента
    function removeItem(id) {
        // Удаляем из выбранных
        selectedItems = selectedItems.filter(item => item.id !== id);

        // Обновляем отображение
        renderSelectedItems();
        updateRealSelect();

        // Возвращаем фокус в поле ввода
        searchInput.focus();
    }

    // Обновление скрытого select
    function updateRealSelect() {
        // Очищаем реальный select
        realLinkedObjects.innerHTML = '';

        // Добавляем текущие выбранные элементы
        selectedItems.forEach(item => {
            const option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            option.selected = true;
            realLinkedObjects.appendChild(option);
        });
    }

    // АЛЬТЕРНАТИВНЫЙ ГАРАНТИРОВАННЫЙ ВАРИАНТ
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-btn')) {
            const id = e.target.getAttribute('data-id');
            console.log("Глобальный обработчик: клик по удалению, ID:", id);
            if (id) {
                // Находим ближайший контейнер
                const container = document.getElementById('custom-select-container');
                if (container) {
                    // Вызываем removeItem
                    removeItem(id);
                }
            }
        }
    });

    // ====== Остальной код без изменений ======
    // Показать dropdown
    function showDropdown() {
        dropdown.style.display = 'block';
    }

    // Скрыть dropdown
    function hideDropdown() {
        dropdown.style.display = 'none';
        activeIndex = -1;
    }

    // Показать загрузку
    function showLoading() {
        dropdown.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <span>Поиск объектов...</span>
            </div>
        `;
        showDropdown();
    }

    // Показать результаты
    function showResults() {
        dropdown.innerHTML = '';

        if (searchResults.length === 0) {
            dropdown.innerHTML = '<div class="no-results">Объекты не найдены</div>';
            showDropdown();
            return;
        }

        searchResults.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'dropdown-item';
            if (index === activeIndex) {
                itemEl.classList.add('active');
            }
            itemEl.textContent = item.object_name;
            itemEl.dataset.id = item.id;
            itemEl.dataset.name = item.object_name;

            itemEl.addEventListener('click', () => {
                selectItem(item);
            });

            dropdown.appendChild(itemEl);
        });

        showDropdown();
    }

    // Выбор элемента
    function selectItem(item) {
        // Проверяем, не добавлен ли уже этот элемент
        if (!selectedItems.some(selected => selected.id === item.id)) {
            selectedItems.push({
                id: item.id,
                name: item.object_name
            });
            renderSelectedItems();
            updateRealSelect();
        }

        // Сбрасываем поиск
        searchInput.value = '';
        hideDropdown();
        searchResults = [];
        activeIndex = -1;
    }

    // Поиск объектов
    function searchObjects(query) {
        if (query.length < 2) {
            hideDropdown();
            return;
        }

        isLoading = true;
        showLoading();

        // AJAX запрос
        fetch(`/trade_registry/object-search/?q=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                searchResults = Array.isArray(data) ? data : (data.results || []);
                isLoading = false;
                showResults();
            })
            .catch(error => {
                console.error('Ошибка поиска:', error);
                isLoading = false;
                hideDropdown();
            });
    }

    // Обработчики событий
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        searchObjects(query);
    });

    searchInput.addEventListener('keydown', function(e) {
        // Навигация по выпадающему списку
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            activeIndex = Math.min(activeIndex + 1, searchResults.length - 1);
            showResults();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            activeIndex = Math.max(activeIndex - 1, -1);
            showResults();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (activeIndex >= 0 && activeIndex < searchResults.length) {
                selectItem(searchResults[activeIndex]);
            }
        } else if (e.key === 'Escape') {
            hideDropdown();
        }
    });

    // Закрытие dropdown при клике вне элемента
    document.addEventListener('click', function(e) {
        if (!customContainer.contains(e.target)) {
            hideDropdown();
        }
    });

    // Фокус на поле ввода при клике на контейнер
    customContainer.addEventListener('click', function(e) {
        if (e.target === customContainer || e.target === selectedItemsContainer) {
            searchInput.focus();
        }
    });

    // Инициализация
    initSelectedItems();
});