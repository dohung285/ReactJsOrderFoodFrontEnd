

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
import { Tag } from "primereact/tag";
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Moment from "react-moment";
import "react-toastify/dist/ReactToastify.css";
import { EXPRITIME_HIDER_LOADER } from "../../constants/ConstantString";
import useFullPageLoader from "../../hooks/useFullPageLoader";
import AccountService from "../../service/AccountService";









const Account = () => {

    const [loader, showLoader, hideLoader] = useFullPageLoader();


    const [keycloak] = useKeycloak();

    const accountService = new AccountService();

    const [data, setData] = useState([])

    const fetchAllAccount = async () => {
        showLoader()

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)

        let result = await accountService.getAll();
        // console.log(`result`, result)
        if (result) {
            setData(result)
            // setProducts(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
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
        // console.log(`rowData`, rowData)
        if (rowData.username === 'hungdx') {
            return <Button label="Supper Admin" className="p-button-rounded p-button-success" />

        }
        return (
            <React.Fragment>
                {/* <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} /> */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
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
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'X??a  th??nh c??ng', life: 3000 });
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    // const leftToolbarTemplate = () => {
    //     return (
    //         <React.Fragment>
    //             <Button label="Th??m" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={onClickHandleOrderButton} />
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

        const { id, username } = productDeleteSelected;

        console.log(`id , username`, id, username)


        let result = await accountService.deleteAccount(id, username);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            fetchAllAccount();
        }
        setProductDialog(false);
    }



    const productDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text"
                onClick={saveDiscount}
            />
        </React.Fragment>
    );

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="T??m ki???m..." />
            </span>
        </div>
    );



    return (
        <div className="card">
            <div className="card-body">
                <Toast ref={toast} />


                <DataTable ref={dt} value={data}
                    selection={selectedProducts}
                    onSelectionChange={(e) => handleOnSelectedChange(e)}
                    dataKey="id"
                    header={header}
                    paginator rows={10}
                    rowsPerPageOptions={[10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    currentPageReportTemplate="T???ng {totalRecords} b???n ghi"
                    globalFilter={globalFilter}
                // header={header}
                >

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="Id" style={{ textAlign: 'center' }}></Column>
                    <Column field="username" header="T??n ????ng nh???p" style={{ textAlign: 'center' }} ></Column>
                    <Column field="email" header="Email" style={{ textAlign: 'center' }}></Column>
                    <Column field="username" header="Kh??ch h??ng" style={{ textAlign: 'center' }} ></Column>
                    <Column field="rating" header="H??? v?? T??n" body={renderFullName} style={{ textAlign: 'center' }}></Column>
                    <Column headerStyle={{ width: '6rem' }} body={actionBodyTemplate} style={{ textAlign: 'center' }}></Column>
                </DataTable>


                <Dialog visible={productDialog} style={{ width: '550px' }}
                    header="Th??m nh??m m??n ??n" modal className="p-fluid"
                    footer={productDialogFooter} onHide={hideDialog}>
                    <div className="p-field">
                        <label htmlFor="name">T??n</label>
                        <InputText
                            id="name"
                            name="name"
                            value={objDiscount.name}
                            onChange={(e) => handleOnChange(e)}
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="percent">Ph???n tr??m gi???m</label>
                        <InputNumber inputId="minmax"
                            name="percent"
                            value={objDiscount.percent}
                            onValueChange={(e) => handleOnChange(e)}
                            mode="decimal" min={0} max={100} showButtons
                        />
                    </div>

                    <div className="p-field">
                        <label htmlFor="startDate">Ng??y b???t ?????u</label>
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
                        <label htmlFor="endDate">Ng??y k???t th??c</label>
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
                        {/* {product && <span>B???n c?? ch???c ch???n mu???n x??a <b>{product.name}</b>?</span>} */}
                        {/* <span>B???n c?? ch???c ch???n mu???n x??a <b>{productDeleteSelected.name }</b>?</span> */}
                        {productDeleteSelected && <span>B???n c?? ch???c ch???n mu???n x??a <b>{productDeleteSelected.name}</b>?</span>}
                    </div>
                </Dialog>


            </div>
            {loader}
        </div>
    )
}

export default Account
