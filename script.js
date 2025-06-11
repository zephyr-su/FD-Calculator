document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const depositAmount = document.getElementById('depositAmount');
    const interestRate = document.getElementById('interestRate');
    const depositPeriod = document.getElementById('depositPeriod');
    const clearBtn = document.getElementById('clearBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultAmount = document.getElementById('resultAmount');

    // Clear all inputs
    clearBtn.addEventListener('click', function() {
        depositAmount.value = '';
        interestRate.value = '';
        depositPeriod.value = '';
        resultAmount.textContent = 'LKR 0';
        depositAmount.focus();
    });

    // Calculate FD maturity amount
    calculateBtn.addEventListener('click', calculateMaturityValue);

    // Allow calculation on Enter key
    [depositAmount, interestRate, depositPeriod].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateMaturityValue();
            }
        });
    });

    function calculateMaturityValue() {
        // Get and validate inputs
        const principal = parseFloat(depositAmount.value);
        const rate = parseFloat(interestRate.value);
        const months = parseFloat(depositPeriod.value);
        
        // Validation
        if (isNaN(principal) || principal <= 0) {
            showError('Please enter a valid deposit amount (minimum 1 LKR)');
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

        // Convert months to years
        const years = months / 12;
        
        // Calculate compound interest
        const maturityValue = principal * Math.pow(1 + (rate / 100), years);
        
        // Format and display result
        displayResult(maturityValue);
    }

    function showError(message) {
        alert(message);
        resultAmount.textContent = 'LKR 0';
    }

    function displayResult(value) {
        // Format with Indian number system
        const formatter = new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        resultAmount.textContent = formatter.format(value);
    }
});
