import axios from "axios";

class AuthService {
    constructor () {
        this.baseUrl = "BACKEND_API_URL" // Comeback after setting up backend server for auth
    }
    
    async signUp(email, password){
        try{
            const response = await axios.post(`${this.baseUrl}/signup`, { email, password });
            return response.data;
        }catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    async signIn (email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/signin`, { email, password })
            return response.data;
        }catch (error) {
            throw new Error(error.response.data.error);
        }
    }

    // more methods might come here as needed......
}

export default new AuthService();