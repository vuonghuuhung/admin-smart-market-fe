import { Demo } from '../../types/types';
import { BASE_URL } from './Config';

export const LoggingService = {
    getLogs() {
        return fetch(`${BASE_URL}/admin/logs`, { headers: { 
            'Cache-Control': 'no-cache',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
        } })
            .then((res) => res.json())
            .then((d) => d.logs as Demo.Log[]);
    }
};
