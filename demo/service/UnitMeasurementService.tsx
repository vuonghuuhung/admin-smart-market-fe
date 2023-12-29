import { Demo } from '../../types/types';
import { BASE_URL } from './Config';

export const UnitMeasurementService = {
    getUnitOfMeasurements() {
        return fetch(`${BASE_URL}/admin/unit`, {
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((d) => d.units as Demo.UnitOfMeasurement[]);
    },

    addUnit(category: Demo.UnitOfMeasurement) {
        
        return fetch(`${BASE_URL}/admin/unit`, {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({unitName: category.unitName})
        })
            .then((res) => res.json())
            .then((d) => {
                
                if (d.resultCode === "00116") {
                    
                    return d.unit as Demo.UnitOfMeasurement;
                }

                return null;
            });
    },

    updateUnit(updateUnit: Demo.UpdateUnit) {
        return fetch(`${BASE_URL}/admin/unit`, {
            method: 'PUT',
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateUnit)
        })
            .then((res) => res.json())
            .then((d) => d.resultCode as string);
    },

    deleteUnit(category: Demo.UnitOfMeasurement) {
        return fetch(`${BASE_URL}/admin/unit`, {
            method: 'DELETE',
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({unitName: category.unitName})
        })
            .then((res) => res.json())
            .then((d) => d.resultCode as string);
    }

    // getCustomersMedium() {
    //     return fetch('/demo/data/customers-medium.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data as Demo.Customer[]);
    // },

    // getCustomersLarge() {
    //     return fetch('/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data as Demo.Customer[]);
    // }
};