const ORDER_STORAGE_KEY = 'currentOrder';

const menuItems = [
    { id: 1, name: 'Pepperoni Pizza', price: 10 },
    { id: 2, name: 'Margherita Pizza', price: 8 },
    { id: 3, name: 'Veggie Pizza', price: 9 },
    { id: 4, name: 'BBQ Chicken Pizza', price: 11 },
    { id: 5, name: 'Hawaiian Pizza', price: 10 },
    { id: 6, name: 'Meat Lovers Pizza', price: 12 },
    { id: 7, name: 'Cheese Pizza', price: 7 },
    { id: 8, name: 'Buffalo Chicken Pizza', price: 11 },
    { id: 9, name: 'Supreme Pizza', price: 13 },
    { id: 10, name: 'Veggie Lovers Pizza', price: 9 }
];

let orderItems = [];

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

function displayMenu() {
    const menuList = $('#menu');
    menuList.empty();

    menuItems.forEach(item => {
        const menuItem = `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.name}</strong>
                    <div class="text-muted small">${currencyFormatter.format(item.price)}</div>
                </div>
                <button class="btn btn-sm btn-success add-to-order" data-id="${item.id}">Add</button>
            </li>
        `;
        menuList.append(menuItem);
    });
}

function renderOrder() {
    const orderSummary = $('#order-summary');
    orderSummary.empty();

    if (orderItems.length === 0) {
        orderSummary.append('<li class="list-group-item">Your order is empty.</li>');
    } else {
        orderItems.forEach((item, index) => {
            const orderItem = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${item.name}</strong>
                        <div class="text-muted small">${item.quantity} × ${currencyFormatter.format(item.price)}</div>
                    </div>
                    <button type="button" class="btn btn-sm btn-outline-danger remove-from-order" data-index="${index}">Remove</button>
                </li>
            `;
            orderSummary.append(orderItem);
        });
    }

    updateTotal();
}

function addToOrder(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = orderItems.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        orderItems.push({ ...item, quantity: 1 });
    }

    renderOrder();
}

function removeOrderItem(index) {
    if (index >= 0 && index < orderItems.length) {
        orderItems.splice(index, 1);
        renderOrder();
    }
}

function clearOrder() {
    orderItems = [];
    renderOrder();
}

function updateTotal() {
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    $('#order-total').text(`Total: ${currencyFormatter.format(total)}`);
}

function saveOrder() {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orderItems));
    alert('Your order has been saved!');
}

function loadOrder() {
    const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY);
    if (!savedOrder) return;

    try {
        orderItems = JSON.parse(savedOrder);
    } catch (error) {
        console.error('Unable to parse saved order:', error);
        orderItems = [];
    }

    renderOrder();
    alert('Your order has been loaded!');
}

function placeOrder() {
    if (orderItems.length === 0) {
        alert('Please add at least one item before placing your order.');
        return;
    }

    alert(`Your order has been placed! Total: ${currencyFormatter.format(orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0))}`);
    clearOrder();
    localStorage.removeItem(ORDER_STORAGE_KEY);
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }
}

$(document).ready(function () {
    displayMenu();
    loadOrder();
    registerServiceWorker();
});

$(document).on('click', '.add-to-order', function () {
    const itemId = parseInt($(this).data('id'), 10);
    addToOrder(itemId);
});

$(document).on('click', '.remove-from-order', function () {
    const itemIndex = parseInt($(this).data('index'), 10);
    removeOrderItem(itemIndex);
});

$('#save-order').click(saveOrder);
$('#load-order').click(loadOrder);
$('#clear-order').click(clearOrder);
$('#place-order').click(placeOrder);
