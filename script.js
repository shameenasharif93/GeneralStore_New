
let products = JSON.parse(localStorage.getItem("products")) || [];

const productForm = document.getElementById("productForm");

if (productForm) {
    productForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const quantityInput = document.getElementById("quantity").value;
        const quantity = Number(quantityInput);

        if (
            name === "" ||
            quantityInput === "" ||
            !Number.isInteger(quantity) ||
            quantity < 0
        ) {
            alert("Please enter a valid product name and quantity.");
            return;
        }

        products.push({ name, quantity });
        productForm.reset();
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    });
}

function displayProducts() {
    const list = document.getElementById("productList");
    if (!list) return;

    list.innerHTML = "";
    let lowStockCount = 0;

    const searchText = document.getElementById("search").value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchText)
    );

    filteredProducts.forEach((product, index) => {
        const isLow = product.quantity < 25;

        if (isLow) lowStockCount++;

        const row = document.createElement("tr");

        
const nameCell = document.createElement("td");
const quantityCell = document.createElement("td");
const statusCell = document.createElement("td");
const updateCell = document.createElement("td");
const actionCell = document.createElement("td");

const updateButton = document.createElement("button");
const deleteButton = document.createElement("button");


        nameCell.textContent = product.name;
        quantityCell.textContent = product.quantity;
        statusCell.textContent = isLow ? "Low Stock Alert!" : "In Stock";
        statusCell.style.color = isLow ? "red" : "green";
        
updateButton.textContent = "Update";
updateButton.type = "button";

updateButton.addEventListener("click", function () {
    const newName = prompt("Enter updated product name:", product.name);
    if (newName === null || newName.trim() === "") return;

    const newQuantity = prompt("Enter updated quantity:", product.quantity);
    if (newQuantity === null || newQuantity.trim() === "") return;

    const quantity = Number(newQuantity);

    if (!Number.isInteger(quantity) || quantity < 0) {
        alert("Please enter a valid quantity.");
        return;
    }

    product.name = newName.trim();
    product.quantity = quantity;

    displayProducts();
});


        deleteButton.textContent = "Delete";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", function () {
            if (!confirm("Are you sure you want to delete this product?")) return;
            products.splice(products.indexOf(product), 1);
            localStorage.setItem("products", JSON.stringify(products));
            displayProducts();
        });

        

actionCell.appendChild(deleteButton);

row.append(
    nameCell,
    quantityCell,
    statusCell,
    actionCell
);

        list.appendChild(row);
    });

    document.getElementById("total").textContent = products.length;
    document.getElementById("lowStock").textContent =
        products.filter(product => product.quantity < 25).length;

    document.getElementById("emptyMessage").textContent =
        products.length === 0 ? "No products added yet." :
        filteredProducts.length === 0 ? "No matching products found." : "";
}

const searchBox = document.getElementById("search");

if (searchBox) {
    searchBox.addEventListener("input", displayProducts);
}

function logout() {
    window.location.href = "login.html";
}


const lowStockCard = document.getElementById("lowStockCard");
const lowStockNames = document.getElementById("lowStockNames");

if (lowStockCard && lowStockNames) {
    function showLowStockNames() {
        if (lowStockNames.style.display === "none") {
            lowStockNames.innerHTML = "";

            const lowProducts = products.filter(
                product => product.quantity < 25
            );

            if (lowProducts.length === 0) {
                lowStockNames.textContent = "No low-stock products.";
            } else {
                lowProducts.forEach(product => {
                    const item = document.createElement("p");
                    item.textContent =
                        product.name + " — " + product.quantity + " left";
                    lowStockNames.appendChild(item);
                });
            }

            lowStockNames.style.display = "block";
        } else {
            lowStockNames.style.display = "none";
        }
    }

    lowStockCard.addEventListener("click", showLowStockNames);

    lowStockCard.addEventListener("keydown", function(event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            showLowStockNames();
        }
    });
}

const updateForm = document.getElementById("updateForm");

if (updateForm) {
    updateForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const currentName = document.getElementById("updateName").value.trim();
    const newName = document.getElementById("newProductName").value.trim();
    const newQuantity = Number(document.getElementById("updateQuantity").value);

    const product = products.find(
        p => p.name.toLowerCase() === currentName.toLowerCase()
    );

    if (!product) {
        alert("Product not found!");
        return;
    }

    const nameExists = products.some(
        p => p !== product &&
             p.name.toLowerCase() === newName.toLowerCase()
    );

    if (nameExists) {
        alert("Another product already has this name!");
        return;
    }

    product.name = newName;
    product.quantity = newQuantity;

    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();

    alert("Product updated successfully!");
        updateForm.reset();
    });
}

displayProducts();