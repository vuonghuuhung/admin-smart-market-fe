'use client';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import type { Demo } from '../../../../types/types';
import { UnitMeasurementService } from '../../../../demo/service/UnitMeasurementService';

const TableDemo = () => {
    const [unitOfMeasurement, setUnitOfMeasurement] = useState<Demo.UnitOfMeasurement[]>([]);
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
        UnitMeasurementService.getUnitOfMeasurements().then((data) => {
            console.log(data);

            setUnitOfMeasurement(getUnitOfMeasurement(data));
            setLoading1(false);
        });

        initFilters2();
    }, []);

    const getUnitOfMeasurement = (data: Demo.UnitOfMeasurement[]) => {
        return [...(data || [])].map((d) => {
            // d.date = new Date(d.date);
            return d;
        });
    };

    const initFilters2 = () => {
        setFilters2({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            id: {
                operator: FilterOperator.AND,
                constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }]
            },
            name: {
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
                    <h5>Unit of Measurement</h5>
                    <DataTable
                        value={unitOfMeasurement}
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
                        <Column field="id" header="Id" filter filterPlaceholder="Search by id" style={{ minWidth: '12rem' }} />
                        <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default TableDemo;
