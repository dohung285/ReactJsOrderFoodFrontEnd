



import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react'

import NotificationService from '../../service/NotificationService';

export const Notification = () => {


    const notificationService = new NotificationService();

    const [selectedNotifications, setSelectedNotifications] = useState(null);
    const dt = useRef(null);
    const toast = useRef(null);
    const [data, setData] = useState(null)
    const [globalFilter, setGlobalFilter] = useState(null);



    const getAllNotificationAPI = async () => {
        console.log('có vào đây')

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)

        let result = await notificationService.getAllNotification();
        console.log(`getAllNotificationAPI`, result?.list)
        if (result?.status === 1000) {

            setData(result?.list)

            // fetchFoodIntoCard();
            // toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Thành công', life: 3000 });
        }

    }

    useEffect(() => {
        getAllNotificationAPI();

    }, [])

    const handleOnSelectedChange = (e) => {
        setSelectedNotifications(e.value)
    }

    const imageStatusTemplate = (rowData) => {
        let status = null;
        if (rowData.isDeleted === 0) {
            status = 'Chưa xóa'
            return <Tag severity="success" value={status} />;
        }
        else {
            status = 'Đã xóa'
            return <Tag severity="warning" value={status} />;
        }
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <Button label="Đặt hàng" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={onClickHandleOrderButton} disabled={!selectedProducts || !selectedProducts.length} /> */}
                <Button
                    label="Xóa"
                    icon="pi pi-trash"
                    className="p-button-danger"
                    // onClick={confirmDeleteSelected}
                    disabled={!setSelectedNotifications || !setSelectedNotifications.length}
                />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="p-mr-2 p-d-inline-block" />
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} /> */}
            </React.Fragment>
        )
    }

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left p-mr-2">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
            <Button
                label="Xóa"
                icon="pi pi-trash"
                className="p-button-danger"
                // onClick={confirmDeleteSelected}
                disabled={!selectedNotifications || !selectedNotifications.length}
            />
        </div>
    );




    return (
        <div>
            <h1>Thông báo</h1>
            <div className="card">
                <div className="card-body">
                    <Toast ref={toast} />

                    {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}


                    <DataTable ref={dt} value={data}
                        selection={selectedNotifications}
                        onSelectionChange={(e) => handleOnSelectedChange(e)}
                        dataKey="id"
                        header={header}
                        paginator rows={10}
                        rowsPerPageOptions={[10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        currentPageReportTemplate="Tổng {totalRecords} bản ghi"
                        globalFilter={globalFilter}
                    >

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Id" style={{ textAlign: 'center' }}></Column>
                        <Column field="content" header="Nội dung" style={{ textAlign: 'center' }} ></Column>
                        <Column header="Trạng thái" style={{ textAlign: 'center' }} body={imageStatusTemplate}></Column>
                        {/* <Column header="Giá" style={{ textAlign: 'center' }} body={priceBodyTemplate}></Column>
                        <Column headerStyle={{ width: '8rem' }} body={actionBodyTemplate} style={{ textAlign: 'center' }}></Column> */}
                    </DataTable>
                </div>
            </div>

        </div>
    )
}
