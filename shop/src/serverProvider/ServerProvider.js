import axios from "axios"
export default class ServerProvider {

    addTokenToHeader() {
        const token = localStorage.getItem('token')
        if (!token) return {}
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    getTokenFromHeader(response) {
        const headers = response?.headers
        if (!headers) return
        const Authorization = headers.Authorization
        if (!Authorization) return
        const token = Authorization.split(' ')[1]
        return token
    }

    getBaseUrl() {
        return 'http://localhost:80'
    }
    handleResponseStatus(response) {
        if (response.status >= 400) {
            throw new Error(response.statusText)
        }  
        this.getTokenFromHeader(response)
    }
    
    async get(url) {
        try {
        const response = await axios(`${this.getBaseUrl()}${url}`, this.addTokenToHeader())
        this.handleResponseStatus(response)
        return response.data
        }
        catch (error) {
            console.log(error)
            return null
        }
    }

    async post(url, body) {
        try {
        const response = await axios.post(`${this.getBaseUrl()}${url}`,body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        this.handleResponseStatus(response)
        return response.data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    

    async put(url, body) {
        try {
        const response = await axios.put(`${this.getBaseUrl()}${url}`,body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        this.handleResponseStatus(response)
        return response.data
        } catch (error) {
            console.log(error)
            return null
        }
    }

    
    async delete(url) {
        try {
        const response = await axios.delete(`${this.getBaseUrl()}${url}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        this.handleResponseStatus(response)
        return response.data
        } catch (error) {
            console.log(error)
            return null
        }
    } 

    async postWithImage(url, body) {
        try {
        let formData=new FormData();
        Object.keys(body).forEach(key => {
            formData.append(key, body[key]);
        });

        const response = await axios.post(`${this.getBaseUrl()}${url}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            },
        })
        this.handleResponseStatus(response)
        return response.data
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
