'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Demo } from '../../../../types/demo';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { FoodCategoryService } from '../../../../demo/service/FoodCategoryService';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { classNames } from 'primereact/utils';

const FoodCategory = () => {
    let emptyCategory: Demo.FoodCategory = {
        id: 0,
        name: ''
    };

    const [categories, setCategories] = useState(null);
    const [categoryDialog, setCategoryDialog] = useState(false);
    const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
    const [category, setCategory] = useState<Demo.FoodCategory>(emptyCategory);
    const [submitted, setSubmitted] = useState(false);
    const [oldCategory, setOldCategory] = useState<Demo.FoodCategory>(emptyCategory);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    useEffect(() => {
        FoodCategoryService.getFoodCategory().then((data) => setCategories(data as any));
        console.log(categories);
    }, []);

    const openNew = () => {
        setCategory(emptyCategory);
        setSubmitted(false);
        setCategoryDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCategoryDialog(false);
    };

    const hideDeleteCategoryDialog = () => {
        setDeleteCategoryDialog(false);
    };

    const saveCategory = () => {
        setSubmitted(true);

        if (category.name.trim()) {
            let _categories = [...(categories as any)];

            let _category = { ...category };
            if (category.id) {
                const index = findIndexById(category.id);

                FoodCategoryService.updateCategory({ oldName: oldCategory.name, newName: _category.name }).then((d) => {
                    if (d === '00141') {
                        _categories[index] = _category;

                        toast.current?.show({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Category Updated',
                            life: 3000
                        });
                        setCategories(_categories as any);
                        setCategoryDialog(false);
                        setCategory(emptyCategory);
                    } else {
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Category Updated Failed',
                            life: 3000
                        });
                        setCategories(_categories as any);
                        setCategoryDialog(false);
                        setCategory(emptyCategory);
                    }
                });
            } else {
                FoodCategoryService.addCategory(_category).then((d) => {
                    if (!d) {
                        toast.current?.show({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Category Existed',
                            life: 3000
                        });
                        setCategories(_categories as any);
                        setCategoryDialog(false);
                        setCategory(emptyCategory);
                    } else {
                        _categories.push(d);
                        toast.current?.show({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Category Created',
                            life: 3000
                        });
                        setCategories(_categories as any);
                        setCategoryDialog(false);
                        setCategory(emptyCategory);
                    }
                });
            }
        }
    };

    const editCategory = (category: Demo.FoodCategory) => {
        setOldCategory({ ...category });
        setCategory({ ...category });
        setCategoryDialog(true);
    };

    const confirmDeleteCategory = (category: Demo.FoodCategory) => {
        setCategory(category);
        setDeleteCategoryDialog(true);
    };

    const deleteCategory = () => {
        FoodCategoryService.deleteCategory(category).then((d) => {
            if (d === '00146') {
                let _categories = (categories as any)?.filter((val: any) => val.id !== category.id);
                setCategories(_categories);
                setDeleteCategoryDialog(false);
                setCategory(emptyCategory);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Category Deleted',
                    life: 3000
                });
            } else {
                setDeleteCategoryDialog(false);
                setCategory(emptyCategory);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Category Deleted Failed',
                    life: 3000
                });
            }
        });
    };

    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < (categories as any)?.length; i++) {
            if ((categories as any)[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _category = { ...category };
        if (name === 'id') {
            _category.id = Number(val);
        } else {
            _category.name = val;
        }

        setCategory(_category);
    };

    const onInputNumberChange = (e: InputNumberValueChangeEvent, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _category = { ...category };
        if (name === 'id') {
            _category.id = Number(val);
        }

        setCategory(_category);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData: Demo.FoodCategory) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const nameBodyTemplate = (rowData: Demo.FoodCategory) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Demo.FoodCategory) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editCategory(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteCategory(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Food Category</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const categoryDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveCategory} />
        </>
    );

    const deleteCategoryDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteCategoryDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteCategory} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={categories}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>

                    <Dialog visible={categoryDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={categoryDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Name</label>
                            <InputText
                                id="name"
                                value={category.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !category.name
                                })}
                            />
                            {submitted && !category.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCategoryDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteCategoryDialogFooter} onHide={hideDeleteCategoryDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {category && (
                                <span>
                                    Are you sure you want to delete <b>{category.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default FoodCategory;
