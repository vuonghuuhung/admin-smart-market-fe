import { Demo } from '../../types/types';

export const UnitMeasurementService = {
    getUnitOfMeasurements() {
        return fetch('/demo/data/unit-of-measurement.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.UnitOfMeasurement[]);
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