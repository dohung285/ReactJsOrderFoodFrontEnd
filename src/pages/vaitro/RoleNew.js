



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
import { useHistory, useLocation } from "react-router-dom";
import CommentService from "../../service/CommentService";
import RoleService from "../../service/RoleService";
import { Tree } from 'primereact/tree';
import PermissionService from "../../service/PermissionService";
import { cloneDeep } from "lodash";
import { useKeycloak } from "@react-keycloak/web";
import { checkPermissionAPI } from "../../constants/FunctionConstant";
import { ACTION_DELETE, EXPRITIME_HIDER_LOADER } from "../../constants/ConstantString";
import useFullPageLoader from "../../hooks/useFullPageLoader";
const RoleNew = () => {


    let root = [
        {
            "key": "0",
            "label": "Documents",
            "children": [
                { "key": "0-0", "label": "Work" },
                { "key": "0-1", "label": "Home" }
            ]
        },
        {
            "key": "1",
            "label": "Events",
            "children": [
                { "key": "a", "label": "Meeting", },
                { "key": "b", "label": "Product Launch" },
                { "key": "c", "label": "Report Review" }
            ]
        }
    ]





    const location = useLocation()
    const history = useHistory();


    const toast = useRef(null);
    const dt = useRef(null);
    const [products, setProducts] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [editRoleDialog, setEditRoleDialog] = useState(false)

    const [removeRole, setRemoveRole] = useState(false)
    const [productDeleteSelected, setProductDeleteSelected] = useState(null);
    const [position, setPosition] = useState('center');
    const [displayBasic, setDisplayBasic] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [selectedKeys, setSelectedKeys] = useState(null);
    const [nodes, setNodes] = useState(null);

    const [productDialog, setProductDialog] = useState(false);

    const [keycloak] = useKeycloak();

    const [loader, showLoader, hideLoader] = useFullPageLoader();




    const roleService = new RoleService();
    const permissionService = new PermissionService();


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
        if (rowData.username === 'hungdx') {
            return <Tag severity="success" value="Super Admin" />;
        }
        return (
            <React.Fragment>
                <Button icon="pi pi-plus" className="p-button-rounded p-button-success p-mr-2 " onClick={() => confirmAddProduct(rowData)} disabled={rowData.hasRoleAdmin} />
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2 " onClick={() => editRole(rowData)} disabled={!rowData.hasRoleAdmin} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmRemoveRole(rowData)} disabled={!rowData.hasRoleAdmin} />
            </React.Fragment>
        );
    }

    const renderRoleBodyTemplate = (rowData) => {
        let status = null;
        if (rowData.hasRoleAdmin === true) {
            status = 'Admin'
            return <Tag severity="success" value={status} />;
        }
        else {
            status = 'Non-Admin'
            return <Tag severity="warning" value={status} />;
        }
    }


    const fetchAllPermissionOfUser = async (username) => {
        showLoader();
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await permissionService.getAllPermissionOfUser(username);
        // console.log(`resultFetchAllPermissionOfUser`, result)

        if (result?.status === 1000) {
            // setSelectedKeys(result?.list)
            console.log(`JSON.pase()`, JSON.parse(result?.message))
            setSelectedKeys(JSON.parse(result?.message))

        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const addRoleMapping = async () => {
        console.log(`selectedKeys`, selectedKeys)
        // debugger
        let result = await permissionService.checkPermissionAdd(keycloak?.idTokenParsed?.preferred_username);
        // console.log(`checkPermissionAPI`, result)
        if (result?.status === 1000) {
            const dataBodySave = {
                username: productDeleteSelected.username,
                actionIds: Object.keys(selectedKeys),
                currentPermission: selectedKeys
            }

            // console.log(`dataBodySave`, dataBodySave)
            saveAPI(dataBodySave);

        } else {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Kh??ng c?? quy???n truy c???p' });
        }
    }


    // h???y role admin v?? t???t c??? c??c quy???n action
    const removeRoleMapping = async () => {
        let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_DELETE);
        // console.log(`checkPermissionAPI`, result)
        if (result?.status === 1000) {
            removeRoleMappingAPI();
        } else {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: 'Kh??ng c?? quy???n truy c???p' });
        }
    }

    const handleOnCloseDialog = () => {
        setSelectedKeys(null)
        setDeleteProductDialog(false)
        setEditRoleDialog(false)


    }

    const addRoleDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={handleOnCloseDialog} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text" onClick={addRoleMapping} />
        </React.Fragment>
    );

    const editRoleDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={handleOnCloseDialog} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text" onClick={addRoleMapping} />
        </React.Fragment>
    );

    const removeRoletDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={() => setRemoveRole(false)} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text" onClick={removeRoleMapping} />
        </React.Fragment>
    );

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,

    }




    const confirmAddProduct = (product) => {
        // console.log(`product`, product)
        setProductDeleteSelected(product);
        setDeleteProductDialog(true);
    }


    const editRole = (product) => {
        // console.log(`product`, product)

        if (product.hasRoleAdmin) {
            fetchAllPermissionOfUser(product.username)
        }
        setProductDeleteSelected(product);
        setEditRoleDialog(true);
    }



    const confirmRemoveRole = (product) => {
        // console.log(`product`, product)
        setProductDeleteSelected(product);
        setRemoveRole(true);
    }





    const fetchDiscount = async () => {
        showLoader()
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await roleService.getAllUserAndRole();
        // console.log(`result`, result)
        if (result?.status === 1000) {
            setProducts(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER)
    }

    // const checkAccountIsRootAPI = async () => {
    //     // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
    //     let result = await permissionService.checkAccountIsRoot(keycloak?.idTokenParsed?.preferred_username);
    //     // console.log(`result`, result)
    //     if (result?.status === 1000) {
    //         setProducts(result?.list)
    //     }
    // }

    const fetchAllPermission = async () => {
        showLoader();
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await permissionService.getAllPermission();
        // console.log(`fetchAllPermission`, result)
        if (result?.status === 1000) {

            let isRoot = await permissionService.checkAccountIsRoot(keycloak?.idTokenParsed?.preferred_username);
            // console.log(`isRoot`, isRoot)
            if (isRoot?.status === 1000) {
                setNodes(result?.list)
            } else {

                let indexOfObject = result?.list.findIndex(e => {
                    return e.label == 'Vai tr??';
                })
                // console.log(`indexOfObject`, indexOfObject)
                let resultArray = result?.list.splice(indexOfObject, 1);
                setNodes(result?.list)
            }

            setTimeout(hideLoader, EXPRITIME_HIDER_LOADER)
            // fetchAllPermissionOfUser(keycloak?.idTokenParsed?.preferred_username)

        }
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
        fetchAllPermission();
        // setNodes(root)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const hideDialog = () => {
        setSubmitted(false);
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

    const saveAPI = async (dataBody) => {
        showLoader()

        try {
            let result = await permissionService.save(dataBody);
            console.log(`result`, result)
            if (result?.status === 1000) {
                fetchDiscount();

                const dataBodyAddRole = [
                    {
                        id: "f68c6039-7394-4c64-a351-c87181658272",
                        name: "admin"
                    }
                ]
                // addRoleMapping;
                addRoleMappingAPI(productDeleteSelected.id, dataBodyAddRole)

                //Th??m v??o user_permisson v?? permission_current



                setSelectedKeys(null)
                setDeleteProductDialog(false);
                setProductDeleteSelected(null)
                setEditRoleDialog(false)
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Th??nh c??ng', life: 3000 });



            }
        } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error Message', detail: error?.response?.data?.message });
        }


        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER)

    }

    const addRoleMappingAPI = async (id, dataBody) => {


        let result = await roleService.addRoleMappingToUser(id, dataBody);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            fetchDiscount();
        }
        setProductDialog(false);
    }



    const removeRoleMappingAPI = async () => {

        const dataBody = [
            {
                id: "f68c6039-7394-4c64-a351-c87181658272",
                name: "admin"
            }
        ]
        // console.log(`removeRoleMappingAPI`, productDeleteSelected.username)
        let result = await roleService.removeRoleMappingToUser(productDeleteSelected.id, dataBody, productDeleteSelected.username);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            fetchDiscount();
            setRemoveRole(false);
            setProductDeleteSelected(null)
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Th??nh c??ng', life: 3000 });
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


    const [expandedKeys, setExpandedKeys] = useState({});


    const expandAll = () => {
        let _expandedKeys = {};
        for (let node of nodes) {
            expandNode(node, _expandedKeys);
        }

        setExpandedKeys(_expandedKeys);
    }

    const collapseAll = () => {
        setExpandedKeys({});
    }

    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    }

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
                    currentPageReportTemplate="T???ng {totalRecords} b???n ghi"
                    globalFilter={globalFilter}
                // header={header}
                >

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="Id" style={{ textAlign: 'center' }}></Column>
                    <Column field="email" header="Email" style={{ textAlign: 'center' }}></Column>
                    <Column field="username" header="T??i kho???n" style={{ textAlign: 'center' }}></Column>
                    <Column field="hasRoleAdmin" header="Vai tr??" body={renderRoleBodyTemplate} style={{ textAlign: 'center' }}></Column>
                    <Column headerStyle={{ width: '10rem' }} body={actionBodyTemplate} style={{ textAlign: 'center' }}></Column>
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

                {/* Th??m */}
                <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Th??m vai tr??" modal footer={addRoleDialogFooter} onHide={() => { setDeleteProductDialog(false); setSelectedKeys(null) }}>
                    <div className="confirmation-content">

                        <div className="p-mb-4">
                            <Button type="button" icon="pi pi-plus" label="M??? h???t" onClick={expandAll} className="p-mr-2 p-button-warning" />
                            <Button type="button" icon="pi pi-minus" label="????ng h???t" onClick={collapseAll} className="p-button-danger" />
                        </div>
                        <Tree value={nodes} expandedKeys={expandedKeys}
                            onToggle={e => setExpandedKeys(e.value)}
                            selectionMode="checkbox"
                            selectionKeys={selectedKeys}
                            onSelectionChange={e =>
                                setSelectedKeys(e.value)
                            }
                        />
                    </div>
                </Dialog>
                {/* S???a */}
                <Dialog visible={editRoleDialog} style={{ width: '450px' }} header="S???a vai tr??" modal footer={editRoleDialogFooter} onHide={() => { setEditRoleDialog(false); setSelectedKeys(null) }}>
                    <div className="confirmation-content">

                        <div className="p-mb-4">
                            <Button type="button" icon="pi pi-plus" label="M??? h???t" onClick={expandAll} className="p-mr-2 p-button-warning" />
                            <Button type="button" icon="pi pi-minus" label="????ng h???t" onClick={collapseAll} className="p-button-danger" />
                        </div>
                        <Tree value={nodes} expandedKeys={expandedKeys}
                            onToggle={e => setExpandedKeys(e.value)}
                            selectionMode="checkbox"
                            selectionKeys={selectedKeys}
                            onSelectionChange={e => setSelectedKeys(e.value)}
                        />
                    </div>
                </Dialog>

                {/* X??a */}
                <Dialog visible={removeRole} style={{ width: '450px' }} header="Confirm" modal footer={removeRoletDialogFooter} onHide={() => setRemoveRole(false)}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                        {productDeleteSelected && <span>B???n c?? mu???n h???y thi???t l???p t??i kho???n <b>{productDeleteSelected.username}</b> th??nh admin ?</span>}
                    </div>
                </Dialog>




            </div>
            {loader}
        </div>
    )
}

export default RoleNew
