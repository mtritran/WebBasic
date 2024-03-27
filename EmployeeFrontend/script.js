async function createEmployee() {
    const Id = prompt("Enter employee id:");
    const Salary = prompt("Enter employee's salary:");

    if (!Id || isNaN(parseFloat(Salary))) {
        console.error("Invalid input.");
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/Employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Id, Salary })
        });

        if (!response.ok) {
            throw new Error('Failed to create employee.');
        }

        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.error('Error creating employee:', error.message);
    }
}


async function getAllEmployees() {
    try {
        const response = await fetch('http://localhost:8080/api/Employee');
        if (!response.ok) {
            throw new Error('Failed to fetch employees.');
        }
        const data = await response.json();
        console.log(data); 
        displayEmployees(data);
    } catch (error) {
        console.error('Error fetching employees:', error.message);
    }
}

function displayEmployees(employees) {
    const employeeListDiv = document.getElementById("employeeList");
    employeeListDiv.innerHTML = ""; 
    employees.forEach(employee => {
        const employeeDiv = document.createElement("div");
        employeeDiv.textContent = `ID: ${employee.Id}, Salary: ${employee.Salary}`;
        employeeListDiv.appendChild(employeeDiv);
    });
}

async function updateEmployee() {
    const Id = prompt("Enter employee id to update:");
    const Salary = prompt("Enter new employee's salary:");
    try {
        const response = await fetch(`http://localhost:8080/api/Employee/${Id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ Salary })
        });
        if (!response.ok) {
            throw new Error('Failed to update employee.');
        }
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.error('Error updating employee:', error.message);
    }
}

async function deleteEmployee() {
    const Id = prompt("Enter employee id to delete:");
    try {
        const response = await fetch(`http://localhost:8080/api/Employee/${Id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete employee.');
        }
        const data = await response.json();
        console.log(data); 
    } catch (error) {
        console.error('Error deleting employee:', error.message);
    }
}
