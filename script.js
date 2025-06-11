document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const depositAmount = document.getElementById('depositAmount');
    const interestRate = document.getElementById('interestRate');
    const depositPeriod = document.getElementById('depositPeriod');
    const clearBtn = document.getElementById('clearBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const resultAmount = document.getElementById('resultAmount');
    const resultLabel = document.getElementById('resultLabel');
    const monthlyResult = document.getElementById('monthlyResult');
    const interestTypeRadios = document.querySelectorAll('input[name="interestType"]');

    // Clear all inputs
    clearBtn.addEventListener('click', function() {
        depositAmount.value = '';
        interestRate.value = '';
        depositPeriod.value = '';
        resultAmount.textContent = 'Rs. 0';
        monthlyResult.innerHTML = '';
        resultLabel.textContent = 'Maturity value at the end of the period';
        document.querySelector('input[name="interestType"][value="maturity"]').checked = true;
        depositAmount.focus();
    });

    // Calculate when button clicked
    calculateBtn.addEventListener('click', calculateResults);

    // Calculate when Enter pressed
    [depositAmount, interestRate, depositPeriod].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateResults();
            }
        });
    });

    function calculateResults() {
        // Get values
        const principal = parseFloat(depositAmount.value);
        const rate = parseFloat(interestRate.value);
        const months = parseFloat(depositPeriod.value);
        const interestType = document.querySelector('input[name="interestType"]:checked').value;

        // Validate inputs
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

        // Calculate based on interest type
        if (interestType === 'monthly') {
            calculateMonthlyInterest(principal, rate, months);
        } else {
            calculateMaturityValue(principal, rate, months);
        }
    }

    function calculateMaturityValue(principal, rate, months) {
        const years = months / 12;
        const maturityValue = principal * Math.pow(1 + (rate / 100), years);
        
        resultLabel.textContent = 'Maturity value at the end of the period';
        displayResult(maturityValue);
        monthlyResult.innerHTML = '';
    }

    function calculateMonthlyInterest(principal, rate, months) {
        const monthlyRate = rate / 12;
        const monthlyInterest = principal * (monthlyRate / 100);
        const totalInterest = monthlyInterest * months;
        const totalValue = principal + totalInterest;
        
        resultLabel.textContent = 'Total value with monthly interest';
        displayResult(totalValue);
        
        // Show monthly breakdown
        monthlyResult.innerHTML = `
            <p><strong>Monthly Interest:</strong> Rs. ${monthlyInterest.toFixed(2)}</p>
            <p><strong>Total Interest:</strong> Rs. ${totalInterest.toFixed(2)}</p>
            <p><strong>Principal Amount:</strong> Rs. ${principal.toFixed(2)}</p>
        `;
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
