import axios from 'axios'
const base = '/api/v1/auth/'
export default class AuthService {
    login(data) {
        return new Promise((resolve, reject) => {
            let config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const url = base + 'login';
            axios.post(url, data, config).then((res) => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    signup(data) {
        return new Promise((resolve, reject) => {
            let config = {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const url = base + 'signup';
            axios.post(url, data, config).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
    logout() {
        return new Promise((resolve, reject) => {
            const url = base + 'logout';
            axios.get(url).then(res => resolve(res)).catch(err => reject(err));
        });
    }
    getCurrentUser() {
        return new Promise((resolve, reject) => {
            const url = base + 'current-user';
            axios.get(url).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}