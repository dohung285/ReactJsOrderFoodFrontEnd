

import { useKeycloak } from "@react-keycloak/web";
import * as moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from 'primereact/calendar';
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Moment from "react-moment";
import "react-toastify/dist/ReactToastify.css";
import AccountService from "../../service/AccountService";









const Account = () => {


    const [keycloak] = useKeycloak();

    const accountService = new AccountService();

    const [data, setData] = useState([])

    const fetchAllAccount = async () => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)

        let result = await accountService.getAll();
        console.log(`result`, result)
        if (result) {
            setData(result)
            // setProducts(result?.list)
        }
    }


    useEffect(() => {
        fetchAllAccount();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps




    const toast = useRef(null);
    const dt = useRef(null);
    const [products, setProducts] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    const [productDeleteSelected, setProductDeleteSelected] = useState(null);

    const [productDialog, setProductDialog] = useState(false);




    // const commentService = new CommentService();


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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} /> */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const renderFullName = (rowData) => {
        return (
            <React.Fragment>
                <span>{rowData.firstName} {rowData.lastName} </span>
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

    // const onClick = (name, position) => {
    //     dialogFuncMap[`${name}`](true);

    //     if (position) {
    //         setPosition(position);
    //     }
    // }

    // const dialogFuncMap = {
    //     'displayBasic': setDisplayBasic,

    // }

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

    // const fetchDiscount = async () => {
    //     // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
    //     let result = await commentService.getAll();
    //     // console.log(`result`, result)
    //     if (result?.status === 1000) {
    //         setProducts(result?.list)
    //     }
    // }

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

    // useEffect(() => {
    //     fetchDiscount();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const hideDialog = () => {
        // setSubmitted(false);
        setProductDialog(false);
    }
    const saveDiscount = async () => {

        // let result = await discountService.save(objDiscount);
        // // console.log(`result`, result)
        // if (result?.status === 1000) {
        //     // setTxtName(null);
        //     setObjDiscount(
        //         {
        //             name: '',
        //             percent: 0,
        //             startDate: moment().format("DD/MM/yy HH:mm:ss"),
        //             endDate: moment().format("DD/MM/yy HH:mm:ss")
        //         }
        //     )
        //     fetchDiscount();
        // }
        setProductDialog(false);
    }

    const deleteDiscount = async () => {

        // console.log(`id`, productDeleteSelected.id)
        let result = await accountService.deleteAccount(productDeleteSelected.id);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            fetchAllAccount();
        }

        // if (result?.status === 1000) {
        //     fetchAllAccount();
        // }
        setProductDialog(false);
    }



    const productDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text"
                onClick={saveDiscount}
            />
        </React.Fragment>
    );



    return (
        <div className="card">
            <div className="card-body">
                <Toast ref={toast} />

                {/* <Toolbar className="p-mb-4" left={leftToolbarTemplate} ></Toolbar> */}

                <DataTable ref={dt} value={data}
                    selection={selectedProducts}
                    onSelectionChange={(e) => handleOnSelectedChange(e)}
                    dataKey="id"
                    paginator rows={10}
                    rowsPerPageOptions={[10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    currentPageReportTemplate="Tổng {totalRecords}"
                    globalFilter={globalFilter}
                // header={header}
                >

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="Id" ></Column>
                    <Column field="username" header="Tên đăng nhập" ></Column>
                    <Column field="email" header="Email" ></Column>
                    <Column field="username" header="Khách hàng" ></Column>
                    <Column field="rating" header="Họ và Tên" body={renderFullName}></Column>
                    <Column headerStyle={{ width: '4rem' }} body={actionBodyTemplate}></Column>
                </DataTable>


                <Dialog visible={productDialog} style={{ width: '550px' }}
                    header="Thêm nhóm món ăn" modal className="p-fluid"
                    footer={productDialogFooter} onHide={hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">Tên</label>
                        <InputText
                            id="name"
                            name="name"
                            value={objDiscount.name}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="percent">Phần trăm giảm</label>
                        <InputNumber inputId="minmax"
                            name="percent"
                            value={objDiscount.percent}
                            onValueChange={(e) => handleOnChange(e)}
                            mode="decimal" min={0} max={100} showButtons
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="startDate">Ngày bắt đầu</label>
                        <Calendar
                            id="startDate"
                            name="startDate"
                            value={objDiscount.startDate}
                            onChange={(e) => handleOnChange(e)}
                            monthNavigator
                            yearNavigator
                            yearRange="2000:2030"
                            monthNavigatorTemplate={monthNavigatorTemplate}
                            yearNavigatorTemplate={yearNavigatorTemplate}
                            dateFormat="dd/mm/yy"
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="endDate">Ngày kết thúc</label>
                        <Calendar
                            id="endDate"
                            name="endDate"
                            value={objDiscount.endDate}
                            onChange={(e) => handleOnChange(e)}
                            monthNavigator
                            yearNavigator
                            yearRange="2000:2030"
                            monthNavigatorTemplate={monthNavigatorTemplate}
                            yearNavigatorTemplate={yearNavigatorTemplate}
                            dateFormat="dd/mm/yy"
                        />
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
        </div>
    )
}

export default Account
