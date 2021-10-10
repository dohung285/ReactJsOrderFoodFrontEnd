


import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ACTION_ADD, ACTION_DELETE, EXPRITIME_HIDER_LOADER, MESSAGE_REQUIRE } from '../../constants/ConstantString';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import FoodGroupService from '../../service/FoodGroupService';
import PermissionService from '../../service/PermissionService';
// import { classNames } from 'primereact/utils';



export const FoodGroup = () => {

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
    const foodGroupService = new FoodGroupService();
    const [productDialog, setProductDialog] = useState(false);
    const [txtName, setTxtName] = useState(null);

    const history = useHistory();
    const permissionService = new PermissionService();
    const [keycloak] = useKeycloak();

    //errors
    const [objecErrors, setObjecErrors] = useState({
        name: {}
    })


    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 10000 });
    }


    const formValidation = () => {

        const nameErrors = {}

        let isValid = true;

        // name
        if (txtName === null) {
            nameErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        setObjecErrors(
            {
                ...objecErrors,
                name: nameErrors
            }
        )

        return isValid;
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} /> */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const deleteProduct = async () => {

        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_DELETE);
            console.log(`resutl`, result)
            if (result?.status === 1000) {
                // console.log(1000)
                // alert(1000)


                // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
                console.log(`productDeleteSelected`, productDeleteSelected)
                let result = await foodGroupService.deleteFoodGroupById(productDeleteSelected?.id);
                // console.log(`result`, result)
                if (result?.status === 1000) {
                    // setData(result?.response.listReturn)
                    setProductDeleteSelected({})
                    fetchFoodGroup();

                    showSuccess('Xóa thành công!')
                    window.location.reload();
                }

                // deleteFoodGroup();

                setDeleteProductDialog(false);
                // setProduct(emptyProduct);
                // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Xóa sản phẩm khỏi giỏ hàng thành công', life: 3000 });

                // showSuccess('Xóa thành công!')
                // window.location.reload();
                
                // history.push('/food-group')

            }
        } catch (error) {
            // showError(error)
            showError(error?.response?.data?.message)
            // setSelectedProducts(null)
        }



    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <Button icon="pi pi-plus-circle" className="p-button-success p-mr-2" onClick={onClickHandleOrderButton} />
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

    const onClickHandleOrderButton = async () => {
        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_ADD);
            if (result?.status === 1000) {
                openNew();
            }
        } catch (error) {
            // showError(error)
            showError(error?.response?.data?.message)
            // setSelectedProducts(null)
        }

    }

    const confirmDeleteProduct = (product) => {
        console.log(`product`, product)
        setProductDeleteSelected(product);
        setDeleteProductDialog(true);
    }

    const fetchFoodGroup = async () => {
        showLoader();
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await foodGroupService.getAllFoodGroup();
        // console.log(`result`, result)
        if (result?.status === 1000) {
            setProducts(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const deleteFoodGroup = async () => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        console.log(`productDeleteSelected`, productDeleteSelected)
        let result = await foodGroupService.deleteFoodGroupById(productDeleteSelected?.id);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            // setData(result?.response.listReturn)
            setProductDeleteSelected({})
            fetchFoodGroup();
        }
    }

    const openNew = () => {
        // setProduct(emptyProduct);
        // setSubmitted(false);
        setProductDialog(true);
    }

    useEffect(() => {
        fetchFoodGroup();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    const saveFoodGroup = async () => {

        if (formValidation()) {

            const dataBody = {
                name: txtName
            }

            let result = await foodGroupService.saveFoodGroup(dataBody);
            // console.log(`result`, result)
            if (result?.status === 1000) {
                // setTxtName(null);
                fetchFoodGroup();
            }

            setProductDialog(false);
            window.location.reload();

        }


    }

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text"
                onClick={saveFoodGroup}
            />
        </React.Fragment>
    );


    const handleOnChange = (e) => {

        if (e?.target?.value?.length > 0) {
            setObjecErrors(
                {
                    ...objecErrors,
                    name: ''
                }
            )
        } else {
            setObjecErrors(
                {
                    ...objecErrors,
                    name: MESSAGE_REQUIRE
                }
            )
        }

        setTxtName(e.target.value)
    }

    const header = (
        <div className="table-header">
            <Button icon="pi pi-plus-circle" className="p-button-success p-mr-2" onClick={onClickHandleOrderButton} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm..." />
            </span>
        </div>
    );


    return (
        <div className="card">
            <div className="card-body">

                <Toast ref={toast} />

                {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar> */}

                <DataTable ref={dt} value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => handleOnSelectedChange(e)}
                    dataKey="id"
                    header={header}
                    paginator rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    currentPageReportTemplate="Tổng {totalRecords} bản ghi"
                    globalFilter={globalFilter}
                // header={header}
                >

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="Id" style={{ textAlign: 'center' }} ></Column>
                    <Column field="name" header="Tên" style={{ textAlign: 'center' }} ></Column>
                    <Column headerStyle={{ width: '4rem' }} style={{ textAlign: 'center' }} body={actionBodyTemplate}></Column>
                </DataTable>


                <Dialog visible={productDialog} style={{ width: '450px' }}
                    header="Thêm nhóm món ăn" modal className="p-fluid"
                    footer={productDialogFooter} onHide={hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Tên nhóm <span className="item-required"> *</span></label>
                        <InputText
                            className={Object.keys(objecErrors.name).length > 0 ? "error" : null}
                            id="name"
                            defaultValue={txtName}
                            onChange={(e) => handleOnChange(e)}
                            required
                            autoFocus
                        />
                        {Object.keys(objecErrors.name).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{objecErrors.name[keyIndex]} </span>
                        })}
                    </div>
                </Dialog>


                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Xác nhận" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
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
export default FoodGroup;
