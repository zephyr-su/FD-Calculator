// Dark Mode Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
if (savedTheme === 'dark') {
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Calculator Functionality
document.addEventListener('DOMContentLoaded', function() {
    const depositAmount = document.getElementById('depositAmount');
    const interestRate = document.getElementById('interestRate');
    const depositPeriod = document.getElementById('depositPeriod');
    const clearBtn = document.getElementById('clearBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultAmount = document.getElementById('resultAmount');
    const resultLabel = document.getElementById('resultLabel');
    const monthlyResult = document.getElementById('monthlyResult');

    clearBtn.addEventListener('click', function() {
        depositAmount.value = '';
        interestRate.value = '';
        depositPeriod.value = '';
        resultAmount.textContent = 'Rs. 0';
        monthlyResult.innerHTML = '';
        document.querySelector('input[name="interestType"][value="maturity"]').checked = true;
    });

    calculateBtn.addEventListener('click', calculateResults);

    function calculateResults() {
        const principal = parseFloat(depositAmount.value);
        const rate = parseFloat(interestRate.value);
        const months = parseFloat(depositPeriod.value);
        const interestType = document.querySelector('input[name="interestType"]:checked').value;

        if (isNaN(principal) || principal <= 0) {
            showError('Please enter a valid deposit amount (minimum Rs. 1)');
            return;
        }
        
        if (isNaN(rate) || rate <= 0) {
            showError('Please enter a valid interest rate (minimum 0.01%)');
            return;
        }
        
        if (isNaN(months) || months <= 0) {
            showError('Please enter a valid deposit period (minimum 1 month)');
            return;
        }

        if (interestType === 'monthly') {
            const monthlyRate = rate / 12;
            const monthlyInterest = principal * (monthlyRate / 100);
            const totalInterest = monthlyInterest * months;
            const totalValue = principal + totalInterest;
            
            resultLabel.textContent = 'Total value with monthly interest';
            displayResult(totalValue);
            
            monthlyResult.innerHTML = `
                <p><strong>Monthly Interest:</strong> Rs. ${monthlyInterest.toFixed(2)}</p>
                <p><strong>Total Interest:</strong> Rs. ${totalInterest.toFixed(2)}</p>
                <p><strong>Principal Amount:</strong> Rs. ${principal.toFixed(2)}</p>
            `;
        } else {
            const years = months / 12;
            const maturityValue = principal * Math.pow(1 + (rate / 100), years);
            
            resultLabel.textContent = 'Maturity value at the end of the period';
            displayResult(maturityValue);
            monthlyResult.innerHTML = '';
        }
    }

    function displayResult(value) {
        resultAmount.textContent = 'Rs. ' + value.toLocaleString('en-LK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function showError(message) {
        alert(message);
        resultAmount.textContent = 'Rs. 0';
        monthlyResult.innerHTML = '';
    }
});
