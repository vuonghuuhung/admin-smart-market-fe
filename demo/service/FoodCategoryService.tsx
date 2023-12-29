import { Demo } from '../../types/types';
import { BASE_URL } from './Config';

export const FoodCategoryService = {
    getFoodCategory() {
        return fetch(`${BASE_URL}/admin/category`, {
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then((res) => res.json())
            .then((d) => d.categories as Demo.FoodCategory[]);
    },

    addCategory(category: Demo.FoodCategory) {
        
        return fetch(`${BASE_URL}/admin/category`, {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: category.name})
        })
            .then((res) => res.json())
            .then((d) => {
                
                if (d.resultCode === "00135") {
                    
                    return d.unit as Demo.FoodCategory;
                }

                return null;
            });
    },

    updateCategory(updateCategory: Demo.UpdateCategory) {
        return fetch(`${BASE_URL}/admin/category`, {
            method: 'PUT',
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateCategory)
        })
            .then((res) => res.json())
            .then((d) => d.resultCode as string);
    },

    deleteCategory(category: Demo.FoodCategory) {
        return fetch(`${BASE_URL}/admin/category`, {
            method: 'DELETE',
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: category.name})
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
