const API_URL = 'https://keycloak-manager-26141362689.europe-west1.run.app';

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
};

export const createUser = async (userData) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
};

export const updateUser = async (userId, userData) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
};

export const deleteUser = async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete user');
};

export const enableUser = async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}/enable`, {
        method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to enable user');
};

export const disableUser = async (userId) => {
    const response = await fetch(`${API_URL}/users/${userId}/disable`, {
        method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to disable user');
};
