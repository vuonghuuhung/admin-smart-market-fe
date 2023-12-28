import { Demo } from '../../types/types';

export const FoodCategoryService = {
    getFoodCategory() {
        return fetch('/demo/data/food-category.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.FoodCategory[]);
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
