import axios from "axios";

import process from "process";

const BASE_URL = "http://192.168.0.184:8002/api";
const endpoint = "user";
const createPayload = {
    name: "John Doe",
    number: "1234567891",
    password: "password123",
    password_confirmation: "password123",
    profession: "Software Developer",
    description: "Experienced developer in web and mobile applications.",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    facebook: "https://facebook.com/johndoe",
    user_type: "provider",
};

const updatePayload = {
    name: "John Doe",
    number: "1234567890",
    password: "password123",
    password_confirmation: "password123",
    profession: "Software Developer",
    description: "Experienced developer in web and mobile applications.",
    twitter: "https://twitter.com/johndoe",
    instagram: "https://instagram.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    facebook: "https://facebook.com/johndoe",
    user_type: "provider",
};
// Test functions
const fetchTodos = async () => {
    try {
        const result = await axios.get(`${BASE_URL}/${endpoint}`);
        logResult(`GET /${endpoint}`, result);
    } catch (error) {
        console.error(
            "Error fetching todos:",
            error.response ? error.response.data : error.message
        );
    }
};

const createTodo = async () => {
    try {
        const result = await axios.post(
            `${BASE_URL}/${endpoint}`,
            createPayload
        );
        logResult(`POST /${endpoint}`, result);
    } catch (error) {
        console.error(
            "Error creating todo:",
            error.response ? error.response.data : error.message
        );
    }
};

const updateTodo = async (id) => {
    try {
        const result = await axios.put(
            `${BASE_URL}/${endpoint}/${id}`,
            updatePayload
        );
        logResult(`PUT /${endpoint}/:id`, result);
    } catch (error) {
        console.error(
            "Error updating todo:",
            error.response ? error.response.data : error.message
        );
    }
};

const deleteTodo = async (id) => {
    try {
        const result = await axios.delete(`${BASE_URL}/${endpoint}/${id}`);
        logResult(`DELETE /${endpoint}/:id`, result);
    } catch (error) {
        console.error(
            "Error deleting todo:",
            error.response ? error.response.data : error.message
        );
    }
};

// Main function to handle arguments
const testAPI = async () => {
    const args = process.argv.slice(2);
    const command = args[0];
    const id = args[1];

    switch (command) {
        case "r":
            await fetchTodos();
            break;
        case "c":
            await createTodo();
            break;
        case "u":
            if (!id) {
                console.error("Please provide the ID of the todo to update.");
                return;
            }
            await updateTodo(id);
            break;
        case "d":
            if (!id) {
                console.error("Please provide the ID of the todo to delete.");
                return;
            }
            await deleteTodo(id);
            break;
        default:
            console.log(
                'Invalid command. Use "r" for read, "c" for create, "u" for update, "d" for delete.'
            );
    }
};

testAPI();

// Helper function to log results
const logResult = (operation, result) => {
    console.log(`\n${operation}`);
    console.log(JSON.stringify(result.data, null, 2));
};
