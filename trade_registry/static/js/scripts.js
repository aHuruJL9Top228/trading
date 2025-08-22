 // JavaScript код для выпадающего меню
document.addEventListener('DOMContentLoaded', function() {
    const tradeLink = document.getElementById('trade-link');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (tradeLink && dropdownMenu) {
        // Показать меню при наведении
        tradeLink.addEventListener('mouseenter', () => {
            dropdownMenu.classList.add('show');
        });

        // Скрыть меню при уходе курсора
        tradeLink.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!dropdownMenu.matches(':hover')) {
                    dropdownMenu.classList.remove('show');
                }
            }, 100);
        });

        // Скрыть меню при уходе курсора из меню
        dropdownMenu.addEventListener('mouseleave', () => {
            dropdownMenu.classList.remove('show');
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные из скрытого элемента
    const kindObjectData = document.getElementById('kind-object-data');

    if (!kindObjectData) {
        console.error('Element kind-object-data not found');
        return;
    }

    const retailKindId = kindObjectData.getAttribute('data-retail-kind-id');
    const wholesaleKindId = kindObjectData.getAttribute('data-wholesale-kind-id');

    console.log('Retail ID:', retailKindId, 'Type:', typeof retailKindId);
    console.log('Wholesale ID:', wholesaleKindId, 'Type:', typeof wholesaleKindId);

    const kindOfObjectSelect = document.getElementById('id_kind_of_object');
    const squareRozForm = document.getElementById('square-roz-form');
    const squareOptForm = document.getElementById('square-opt-form');

    if (!kindOfObjectSelect || !squareRozForm || !squareOptForm) {
        console.error('One or more elements not found');
        return;
    }

    function toggleSquareForms() {
        const selectedValue = kindOfObjectSelect.value;
        console.log('Selected value:', selectedValue, 'Type:', typeof selectedValue);

        // Скрыть все формы
        squareRozForm.style.display = 'none';
        squareOptForm.style.display = 'none';

        // Преобразуем всё в строки для сравнения
        const retailIdStr = String(retailKindId);
        const wholesaleIdStr = String(wholesaleKindId);

        if (retailIdStr && selectedValue === retailIdStr) {
            console.log('Показываем форму розницы');
            squareRozForm.style.display = 'block';
        } else if (wholesaleIdStr && selectedValue === wholesaleIdStr) {
            console.log('Показываем форму опта');
            squareOptForm.style.display = 'block';
        }
    }

    // Инициализация
    toggleSquareForms();

    // Обработчик изменения
    kindOfObjectSelect.addEventListener('change', toggleSquareForms);

    // Дополнительная проверка
    if (!retailKindId || retailKindId === "{{ retail_kind_id|escapejs }}") {
        console.warn('Retail kind ID не передан или не обработан');
    }
    if (!wholesaleKindId || wholesaleKindId === "{{ wholesale_kind_id|escapejs }}") {
        console.warn('Wholesale kind ID не передан или не обработан');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные из скрытого элемента
    const kindObjectData = document.getElementById('kind-object-data');

    if (!kindObjectData) {
        console.error('Element kind-object-data not found');
        return;
    }

    const retailKindId = kindObjectData.getAttribute('data-retail-kind-id');
    const wholesaleKindId = kindObjectData.getAttribute('data-wholesale-kind-id');
    const objectKindId = kindObjectData.getAttribute('data-object-kind-id');

    console.log('Retail ID:', retailKindId);
    console.log('Wholesale ID:', wholesaleKindId);
    console.log('Object Kind ID:', objectKindId);

    const squareRozForm = document.getElementById('square-roz-form');
    const squareOptForm = document.getElementById('square-opt-form');

    if (!squareRozForm || !squareOptForm) {
        console.error('One or more elements not found');
        return;
    }

    // Показываем нужную форму
    if (retailKindId && objectKindId === retailKindId) {
        squareRozForm.style.display = 'block';
    } else if (wholesaleKindId && objectKindId === wholesaleKindId) {
        squareOptForm.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Получаем данные из скрытого элемента
    const kindObjectData = document.getElementById('kind-object-data');

    if (!kindObjectData) {
        console.error('Element kind-object-data not found');
        return;
    }

    const retailKindId = kindObjectData.getAttribute('data-retail-kind-id');
    const wholesaleKindId = kindObjectData.getAttribute('data-wholesale-kind-id');
    const objectKindId = kindObjectData.getAttribute('data-object-kind-id');

    console.log('Retail ID:', retailKindId);
    console.log('Wholesale ID:', wholesaleKindId);
    console.log('Object Kind ID:', objectKindId);

    const kindOfObjectSelect = document.getElementById('id_kind_of_object');
    const squareRozForm = document.getElementById('square-roz-form');
    const squareOptForm = document.getElementById('square-opt-form');

    if (!kindOfObjectSelect || !squareRozForm || !squareOptForm) {
        console.error('One or more elements not found');
        return;
    }

    function toggleSquareForms() {
        const selectedValue = kindOfObjectSelect.value;
        console.log('Selected value:', selectedValue);

        // Скрыть все формы
        squareRozForm.style.display = 'none';
        squareOptForm.style.display = 'none';

        // Преобразуем всё в строки для сравнения
        const retailIdStr = String(retailKindId);
        const wholesaleIdStr = String(wholesaleKindId);

        if (retailIdStr && selectedValue === retailIdStr) {
            console.log('Показываем форму розницы');
            squareRozForm.style.display = 'block';
        } else if (wholesaleIdStr && selectedValue === wholesaleIdStr) {
            console.log('Показываем форму опта');
            squareOptForm.style.display = 'block';
        }
    }

    // Инициализация
    toggleSquareForms();

    // Обработчик изменения
    kindOfObjectSelect.addEventListener('change', toggleSquareForms);
});