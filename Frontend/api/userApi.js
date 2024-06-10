import { api, setHeaders } from "./api.js";

export const userApi = {
    getAllUsers() {
        const url = "/user";
        return api.get(url, setHeaders());
    },

    async createUser(data) {
        try {
            // {
            //   "name": "dat",
            //   "email": "test@gmail.com",
            //   "password": "123456",
            //   "phone": "123456",
            //   "address": "Ha Noi",
            //   "role": "manager"
            // }
            const url = "/user";
            return await api.post(url, data, setHeaders());
        } catch (error) {
            console.error("Error during creating user:", error);
            return error
        }
    },
    async updateUser(data, userId) {
        try {
            // {
            //   "name": "dat",
            //   "email": "test@gmail.com",
            //   "password": "123456",
            //   "phone": "123456",
            //   "address": "Ha Noi",
            //   "role": "manager"
            // }
            const url = `/user/${userId}`;
            return await api.put(url, {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                role: data.role,
                password: data.password

            }, setHeaders())
        } catch (error) {
            console.error("Error during updating user:", error);
        }
    },
    async getUserById(userId) {
        try {
            const url = `/user/${userId}`;
            return await api.get(url, setHeaders());
        } catch (error) {
            console.error("Error during getting user:", error);
        }
    },
    async deleteUser(userId) {
        try {
            const url = `/user/${userId}`;
            return await api.delete(url, setHeaders());
        } catch (error) {
            console.error("Error during deleting user:", error);
        }
    },
    async forgotPassword(email) {
        try {
            // {
            //   "email": "abc@gmail.com"
            // }
            const url = "forgot_pass";
            return await api.post(url, {
                email: email
            }, setHeaders());
        } catch (error) {
            console.error("Error during forgot password:", error);
        }
    },
};