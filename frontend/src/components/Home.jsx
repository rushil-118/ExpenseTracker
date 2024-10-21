import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBudgets, createBudget, deleteBudget } from '../calls/budgets'; // Import delete function

function Home() {
    const [budget, setBudgets] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [budAdd, setAddBud] = useState(true);
    const navigate = useNavigate();
    
    // Fetch all budgets on component mount or when budAdd changes
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
        const getBudgets = async () => {
            try {
                const data = await fetchBudgets();
                setBudgets(data);
            } catch (error) {
                console.error('Failed to fetch budgets', error);
            }
        };
        getBudgets();
    }, [budAdd, navigate]);

    // Handle the form submit for creating a new budget
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBudget(name, amount);
            alert("Budget created");
            setAddBud(!budAdd); // Toggle state to trigger budget fetch
            setName(''); // Reset the name field
            setAmount(0); // Reset the amount field
        } catch (error) {
            console.error('Error creating budget:', error);
            alert("Error creating budget");
        }
    };

    // Handle delete budget
    const handleDelete = async (id) => {
        try {
            await deleteBudget(id);
            alert('Budget deleted successfully');
            setAddBud(!budAdd); // Trigger re-fetch after deletion
        } catch (error) {
            console.error('Error deleting budget:', error);
            alert('Failed to delete budget');
        }
    };

    return (
        <>
            <div>
                <h1 className="logoHome" style={{ padding: '20px', marginLeft: '19%', color: 'green' }}>
                    <u>Budget Tracker</u>
                </h1>
            </div>
            <div className='main1'>
                <form className='f1' onSubmit={handleSubmit} method='POST'>
                    <input
                        type="text"
                        min="1"
                        className='input1'
                        placeholder='Enter Expense Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        min="1"
                        className='input1'
                        placeholder='Input Amount'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <br />
                    <input
                        type="submit"
                        value="Add"
                        className='btn1'
                    />
                </form>
            </div>
            
            <div className='grid'>
                {/* Display all budgets */}
                {budget?.map((bud, index) => (
                    <div className='inner1' key={index}>
                        <div className='in1'>
                            Expense Name: {bud.name}
                        </div>
                        <div className='in2'>
                            Amount: {bud.totalAmount}
                        </div>
                        <Link to={`expense/${bud._id}`}>
                            <button className='btn_exp1'>
                                Open Budget
                            </button>
                        </Link>
                        <button 
                            className='btn_delete' 
                            onClick={() => handleDelete(bud._id)}
                            style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                        >
                            Delete Budget
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
