
import * as moment from "moment";
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Tag } from "primereact/tag";
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import Moment from "react-moment";
import OrderStatusService from "../../service/OrderStatusService";
import { RadioButton } from 'primereact/radiobutton';
import { useHistory } from "react-router-dom";
import PermissionService from "../../service/PermissionService";
import { useKeycloak } from "@react-keycloak/web";
import { ACTION_DELETE, ACTION_EDIT, EXPRITIME_HIDER_LOADER, NOT_PERMISSION } from "../../constants/ConstantString";
import useFullPageLoader from "../../hooks/useFullPageLoader";

const Order = () => {

    const [loader, showLoader, hideLoader] = useFullPageLoader();


    const toast = useRef(null);
    const dt = useRef(null);
    const [products, setProducts] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    const [productDeleteSelected, setProductDeleteSelected] = useState(null);
    const [position, setPosition] = useState('center');
    const [displayBasic, setDisplayBasic] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [productDialog, setProductDialog] = useState(false);
    const [orderObject, setOrderObject] = useState(null);
    const [categoryStatus, setCategoryStatus] = useState(
        null
    )


    const history = useHistory();
    const permissionService = new PermissionService();
    const [keycloak] = useKeycloak();




    const orderStatusService = new OrderStatusService();



    const [objDiscount, setObjDiscount] = useState(
        {
            name: '',
            percent: 0,
            startDate: moment().format("DD/MM/yy HH:mm:ss"),
            endDate: moment().format("DD/MM/yy HH:mm:ss")
        }
    )

    const handleOnChange = (e) => {
        // console.log(`e`, e.target)
        let { name } = e.target;
        if (name === 'name') {
            setObjDiscount(
                {
                    ...objDiscount,
                    name: e.target.value
                }
            )
        }
        if (name === 'percent') {
            setObjDiscount(
                {
                    ...objDiscount,
                    percent: e.value
                }
            )

        }
        if (name === 'startDate') {
            setObjDiscount(
                {
                    ...objDiscount,
                    startDate: moment(e.value).format("DD/MM/yy HH:mm:ss")
                }
            )

        }
        if (name === 'endDate') {
            setObjDiscount(
                {
                    ...objDiscount,
                    endDate: moment(e.value).format("DD/MM/yy HH:mm:ss")
                }
            )

        }
    }


    const monthNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
    }


    const handleOnSelectedChange = (e) => {
        // let array = [];
        // setSelectedProducts(e.value)
        // e.value.forEach(element => {
        //     element.money = (element.amount * element.price) - (element.amount * element.price * element.percent) / 100
        //     array.push(element);
        // });
        // setDataOrder(array)
    }

    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 10000 });
    }


    const editProduct = async (product) => {

        let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_EDIT);
        if (result?.status === 1000) {
            // console.log(`product`, product)
            setOrderObject(product)
            setProductDialog(true);
        } else {
            showError(NOT_PERMISSION)
        }


        
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} />
                {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} /> */}
            </React.Fragment>
        );
    }

    const bodyStartDate = (rowData) => {
        return (
            <React.Fragment>
                <Moment format="DD/MM/YYYY">{rowData.startDate}</Moment>
            </React.Fragment>
        );
    }

    const bodyEndDate = (rowData) => {
        return (
            <React.Fragment>
                <Moment format="DD/MM/YYYY">{rowData.endDate}</Moment>
            </React.Fragment>
        );
    }

    const deleteProduct = () => {

        console.log(`productDelete`, productDeleteSelected)

        // deleteFoodIntoCard();
        deleteDiscount(productDeleteSelected.id)

        setDeleteProductDialog(false);
        setProductDeleteSelected(null)
        // setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Xóa  thành công', life: 3000 });
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <Button label="Thêm" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={onClickHandleOrderButton} />
    //         </React.Fragment>
    //     )
    // }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,

    }

    // const onClickHandleOrderButton = () => {
    //     // console.log(`selectedProducts`, selectedProducts)
    //     // onClick('displayBasic')
    //     openNew();
    // }


    const confirmDeleteProduct = (product) => {
        // console.log(`product`, product)
        setProductDeleteSelected(product);
        setDeleteProductDialog(true);
    }

    const fetchDiscount = async () => {
        showLoader()
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await orderStatusService.getAll();
        // console.log(`result`, result)
        if (result?.status === 1000) {
            setProducts(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const deleteFoodGroup = async () => {
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // let result = await foodGroupService.deleteFoodIntoCardByUsername(product.cardId);
        // // console.log(`result`, result)
        // if (result?.status === 1000) {
        //     // setData(result?.response.listReturn)
        //     setProductDeleteSelected({})
        //     fetchFoodGroup();
        // }
    }

    const openNew = () => {
        // setProduct(emptyProduct);
        // setSubmitted(false);
        setProductDialog(true);
    }

    useEffect(() => {
        fetchDiscount();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    const updateSatus = async () => {

        const dataBody = {
            orderId: orderObject.id,
            status: orderObject.status

        }
        console.log(`orderObject?.id`, orderObject?.id)
        console.log(`dataBody`, dataBody)

        let result = await orderStatusService.update(orderObject?.id,dataBody);
        console.log(`resultupdateSatus`, result)
        if (result?.status === 1000) {
         
            setOrderObject(null)
            fetchDiscount();
        }
        setProductDialog(false);
    }

    const deleteDiscount = async (id) => {

        let result = await orderStatusService.delete(id);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            fetchDiscount();
        }
        setProductDialog(false);
    }



    const productDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text"
                onClick={updateSatus}
            />
        </React.Fragment>
    );

    const renderDateOrder = (rowData) => {
        return (
            <React.Fragment>
                <Moment format="DD/MM/YYYY HH:mm:ss">{rowData.dateOrder}</Moment>
            </React.Fragment>
        );
    };

    const renderRowStatus = (rowData) => {
        let status = null;
        if (rowData.status === 0) {
            status = 'Tiếp nhận đơn'
            return <Tag severity="info" value={status} />;
        }
        if (rowData.status === 1) {
            status = 'Đang giao hàng '
            return <Tag severity="warning" value={status} />;
        }
        if (rowData.status === 2) {
            status = 'Giao hàng thành công '
            return <Tag severity="success" value={status} />;
        }

    };

    const onCategoryChange = (e) => {
        console.log(`e`, e)
        setCategoryStatus(e.value)
        if (e.value === 'tndh') {
            setOrderObject(
                {
                    ...orderObject,
                    status: 0
                }
            )
        }

        if (e.value === 'dgh') {
            setOrderObject(
                {
                    ...orderObject,
                    status: 1
                }
            )
        }

        if (e.value === 'gtc') {
            setOrderObject(
                {
                    ...orderObject,
                    status: 2
                }
            )
        }

    }



    return (
        <div className="card">
            <div className="card-body">
                <Toast ref={toast} />

                {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar> */}

                <DataTable ref={dt} value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => handleOnSelectedChange(e)}
                    dataKey="id"
                    paginator rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    currentPageReportTemplate="Tổng {totalRecords} món"
                    globalFilter={globalFilter}
                // header={header}
                >

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="Id" ></Column>
                    <Column field="address" header="Địa chỉ" ></Column>
                    <Column field="phone" header="Số điện thoại" ></Column>
                    <Column field="username" header="Khách hàng" ></Column>
                    <Column field="dateOrder" body={renderDateOrder} header="Thời gian đặt" ></Column>
                    <Column field="note" header="Ghi chú" ></Column>
                    <Column field="status" body={renderRowStatus} header="Trạng thái" ></Column>
                    <Column headerStyle={{ width: '4rem' }} body={actionBodyTemplate}></Column>
                </DataTable>





                <Dialog visible={productDialog} style={{ width: '450px' }}
                    header="Thay đổi trạng thái đơn hàng" modal className="p-fluid"
                    footer={productDialogFooter} onHide={hideDialog}
                >



                    <div className="p-field">
                        <label className="p-mb-3">Trạng thái</label>
                        <div className="p-formgrid p-grid">
                            <div className="p-field-radiobutton p-col-12">
                                <RadioButton inputId="category1" name="category" value="tndh" onChange={onCategoryChange} checked={orderObject?.status === 0} />
                                <label htmlFor="category1">Tiếp nhận đơn</label>
                            </div>
                            <div className="p-field-radiobutton p-col-12">
                                <RadioButton inputId="category2" name="category" value="dgh" onChange={onCategoryChange} checked={orderObject?.status === 1} />
                                <label htmlFor="category2">Đang giao hàng</label>
                            </div>
                            <div className="p-field-radiobutton p-col-12">
                                <RadioButton inputId="category3" name="category" value="gtc" onChange={onCategoryChange} checked={orderObject?.status === 2} />
                                <label htmlFor="category3">Giao hàng thành công</label>
                            </div>
                        </div>
                    </div>


                </Dialog>




                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {/* {product && <span>Bạn có chắc chắn muốn xóa <b>{product.name}</b>?</span>} */}
                        {/* <span>Bạn có chắc chắn muốn xóa <b>{productDeleteSelected.name }</b>?</span> */}
                        {productDeleteSelected && <span>Bạn có chắc chắn muốn xóa <b>{productDeleteSelected.name}</b>?</span>}
                    </div>
                </Dialog>


            </div>
            {loader}
        </div>
    )
}

export default Order
