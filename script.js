const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

let items = getItems();

function getItems() {
    const value = localStorage.getItem("todo") || "[]";
    return JSON.parse(value);
}

function setItems(items) {
    const itemsJson = JSON.stringify(items);
    localStorage.setItem("todo", itemsJson);
}

function addItem() {
    items.unshift({
        description: "",
        completed: false,
        createdTime: getToday()  // Add createdTime property
    });

    setItems(items);
    refreshList();
}

function updateItem(item, key, value) {
    item[key] = value;
    setItems(items);
    refreshList();
}

function removeItem(item) {
    const index = items.indexOf(item);
    if (index > -1) {
        items.splice(index, 1);
        setItems(items);
    }
    refreshList();
}

function refreshList() {
    ITEMS_CONTAINER.innerHTML = "";

    for (const item of items) {
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");
        const removeButton = itemElement.querySelector(".remove-item");
        const createdTimeBadge = itemElement.querySelector(".item-created-time");

        descriptionInput.value = item.description;
        createdTimeBadge.textContent = item.createdTime;

        if (item.completed) {
            completedInput.classList.remove('fa-circle');
            completedInput.classList.add('fa-circle-check');
            itemElement.querySelector('.item').classList.add('checked');

        } else {
            completedInput.classList.remove('fa-circle-check');
            completedInput.classList.add('fa-circle');
        }
       

        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value);
        });

        completedInput.addEventListener("click", () => {
            item.completed = !item.completed;
            updateItem(item, "completed", item.completed);
        });

        removeButton.addEventListener("click", () => {
            removeItem(item);
        });

        
        ITEMS_CONTAINER.append(itemElement);
    }
}


function getToday() {
    const dateInfo = new Date();

    // Format date
    const dateFormatter = new Intl.DateTimeFormat('en', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedDate = dateFormatter.format(dateInfo);

    // Format time
    const timeFormatter = new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        minute: 'numeric'
    });
    const formattedTime = timeFormatter.format(dateInfo);

    // Combine date and time
    const dateTime = `Created at ${formattedDate}  :  ${formattedTime}`;

    return dateTime;
}



ADD_BUTTON.addEventListener("click", () => {
    addItem();
});

refreshList();
