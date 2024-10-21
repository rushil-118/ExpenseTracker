import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchExpenses, addExpense } from "../calls/budgets"; 

function Expense(props) {
    const navigate = useNavigate();
    let { id } = useParams();

    // Set an initial state with a default shape to prevent undefined errors
    const [expenses, setExpenses] = useState({
        data: {
            name: '',
            budgets: {
                expenses: []
            }
        },
        total: 0,
        used: 0,
        available: 0,
    });
    const [expAdd, setExpAdd] = useState(true);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate("/login");
        }
    }, [navigate]);

    // Fetch expenses whenever budgetId or expAdd changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchExpenses(id);
                setExpenses(data);
            } catch (error) {
                console.error('Failed to fetch expenses', error);
            }
        };
        fetchData();
    }, [id, expAdd]);

    // Handle form submission to add a new expense
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addExpense(id, name, amount);
            alert("Expense added successfully");
            setExpAdd(!expAdd); // Toggle to trigger re-fetch of expenses
            setName(''); // Reset form
            setAmount(''); // Reset form
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <>
            <div>
                <h1 className="logo"><u>Budget Tracker</u></h1>
            </div>
            <h3 style={{ marginTop: '40px', marginBottom: '40px', textAlign: 'center' }}>
                Budget Name: {expenses?.data?.name || 'No Budget Found'}
            </h3>
            <div className="float-container">
                <div className="first-child">
                    <form className="form_exp" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Expense Name..."
                            className="input_exp"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Amount"
                            className="input_exp"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <input type="submit" value="Add" className="btn_exp" />
                    </form>
                </div>
                <div className="second-child">
                    <h1 className="text_exp">List of Expenses</h1>
                    <ul className="newul">
                        {expenses?.data?.budgets?.expenses?.map((item, index) => (
                            <li key={index} className="li_exp">
                                <span className="name_exp">{item.name}</span>
                                <span className="a_exp">{item.amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="outer_div">
                <div className="outer_btn">Budget: {expenses.data.total}</div>
                <div className="outer_btn" style={{ backgroundColor: "red" }}>
                    Used: {expenses.data.used}
                </div>
                <div className="outer_btn" style={{ backgroundColor: "green" }}>
                    Left: {expenses.data.available}
                </div>
            </div>
        </>
    );
}

export default Expense;
