import { axiosInstance } from ".";

export const fetchExpenses =  async (id) => {
    try {
        const response = await axiosInstance.get(`/budget/${id}/expenses`);
        return response.data;
    } catch (error) {
        console.log(error.message)
        console.error('Error fetching expenses:', error);
    }
};
export const addExpense = async (id, name, amount) => {
    try {
        const response = await axiosInstance.post(`/budget/${id}/expenses`, { name, amount });
        return response.data;
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};

export const fetchBudgets = async () => {
    try {
        const response = await axiosInstance.get('/budget');
        return response.data;
    } catch (error) {
        console.error('Error fetching budgets:', error);
        throw error;
    }
};

export const deleteBudget = async (id) => {
    try {
        const response = await axiosInstance.delete(`/budget/${id}`);
        if (response.status !== 200) {
            throw new Error('Failed to delete budget');
        }
        return response.data;
    } catch (error) {
        console.error('Error deleting budget:', error);
        throw error;
    }
};

export const createBudget = async (name, amount) => {
    try {
        const response = await axiosInstance.post('/budget/create', { name, totalAmount: amount });
        return response.data;
    } catch (error) {
        console.error('Error creating budget:', error);
        throw error;
    }
};

