'use client';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import type { Demo } from '../../../../types/types';
import { LoggingService } from '../../../../demo/service/LoggingService';
import { useRouter } from 'next/navigation';

const Logging = () => {
    const [foodCategory, setFoodCategory] = useState<Demo.Log[]>([]);
    const [filters2, setFilters2] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue2, setGlobalFilterValue2] = useState('');

    const clearFilter2 = () => {
        initFilters2();
    };

    const onGlobalFilterChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        let _filters2 = { ...filters2 };
        (_filters2['global'] as any).value = value;

        setFilters2(_filters2);
        setGlobalFilterValue2(value);
    };

    const renderHeader2 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter2} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue2} onChange={onGlobalFilterChange2} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    useEffect(() => {
        LoggingService.getLogs().then((data) => {
            setFoodCategory(data);
            setLoading1(false);
        });

        console.log(foodCategory);
        

        initFilters2();
    }, []);

    const initFilters2 = () => {
        setFilters2({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            id: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            userId: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            resultCode: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            level: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            errorMessage: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            ip: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            createdAt: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            },
            updatedAt: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
            }
        });
        setGlobalFilterValue2('');
    };

    const header2 = renderHeader2();

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Logging</h5>
                    <DataTable
                        value={foodCategory}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        filters={filters2}
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                        header={header2}
                    >
                        <Column field="id" header="Id" filter filterPlaceholder="Search by id" style={{ minWidth: '5rem' }} />
                        <Column field="userId" header="User ID" filter filterPlaceholder="Search by name" style={{ minWidth: '10rem' }} />
                        <Column field="resultCode" header="Result Code" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="level" header="Level" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="errorMessage" header="Error Message" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="ip" header="IP" filter filterPlaceholder="Search by name" style={{ minWidth: '10rem' }} />
                        <Column field="createdAt" header="Create At" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column field="updatedAt" header="Update At" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default Logging;
