import { error } from 'console';
import { Demo } from '../../types/types';
import { BASE_URL } from './Config';

export const AuthService = {
    async login(account: Demo.LoginAccount) {
        try {
            const response = await fetch(`${BASE_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            });

            const data = await response.json();            

            if (data.resultCode !== "00047") {
                throw new Error(data.resultMessage.vn);
            }

            console.log('data.user.type: ', data.user.type);
            if (data.user.type !== "admin") {
                throw new Error("You are not admin");
            }

            localStorage.setItem("accessToken", data.accessToken);

        } catch (error: any) {
            // console.log(error);
            throw new Error(error);
        }
    },
    
    logout(): void {
        localStorage.removeItem("accessToken");
    }
};
