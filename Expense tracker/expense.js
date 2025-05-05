document.addEventListener(`DOMContentLoaded`, () => {
    const expenseName = document.getElementById(`expense-name`);
    const amount = document.getElementById(`amt`);
    const expenseButton = document.getElementById(`expense-btn`); // ✅ match HTML
    const expenses = document.getElementById(`all-expense`); // ✅ match HTML
    const totalAmt = document.getElementById(`total-amt`);
    let expenseData = JSON.parse(localStorage.getItem(`expenseData`)) || [];

    updateTotal();

    expenseButton.addEventListener(`click`, () => {
        const inputExpense = expenseName.value.trim();
        const inputAmt = amount.value.trim();
        if (inputExpense && inputAmt && !isNaN(inputAmt)) {
            addExpenses(inputExpense, parseFloat(inputAmt));
            expenseName.value = "";
            amount.value = "";
        }
    });

    expenses.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            removeExpenses(e.target.getAttribute(`data-id`));
        }
    });

    function addExpenses(inputExpense, inputAmt) {
        const dataId = Date.now();
        expenseData.push({ dataId, expense: inputExpense, amount: inputAmt });
        localStorage.setItem(`expenseData`, JSON.stringify(expenseData));
        renderExpenses({ dataId, expense: inputExpense, amount: inputAmt });
        updateTotal();
    }

    function removeExpenses(dataID) {
        expenseData = expenseData.filter(data => data.dataId != dataID);
        localStorage.setItem(`expenseData`, JSON.stringify(expenseData));
        document.querySelectorAll(`[data-id='${dataID}']`).forEach(elem => elem.remove());
        updateTotal();
    }

    function renderExpenses(data) {
        let wrapper = document.createElement(`div`);
        wrapper.setAttribute(`data-id`, `${data.dataId}`);
        wrapper.innerHTML = `
            <span>${data.expense} - $${data.amount.toFixed(2)}</span>
            <button data-id="${data.dataId}">Delete</button>
        `;
        expenses.appendChild(wrapper);
    }

    function updateTotal() {
        const total = expenseData.reduce((sum, item) => sum + parseFloat(item.amount), 0);
        totalAmt.innerText = `Total: $${total.toFixed(2)}`;
    }
});
