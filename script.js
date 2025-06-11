document.addEventListener('DOMContentLoaded', function() {
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
        resultAmount.textContent = 'Rs. 0';
    });

    // Calculate FD maturity amount
    calculateBtn.addEventListener('click', function() {
        const principal = parseFloat(depositAmount.value);
        const rate = parseFloat(interestRate.value);
        const months = parseFloat(depositPeriod.value);
        
        if (isNaN(principal) {
            alert('Please enter a valid deposit amount');
            return;
        }
        
        if (isNaN(rate)) {
            alert('Please enter a valid interest rate');
            return;
        }
        
        if (isNaN(months)) {
            alert('Please enter a valid deposit period');
            return;
        }
        
        // Convert months to years
        const years = months / 12;
        
        // Calculate simple interest (you can change to compound if needed)
        const interest = principal * rate * years / 100;
        const maturityValue = principal + interest;
        
        // Format the number with commas
        resultAmount.textContent = 'Rs. ' + maturityValue.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });
});
