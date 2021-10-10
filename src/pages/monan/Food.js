

import { useKeycloak } from '@react-keycloak/web';
import { forEach } from 'lodash';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ACTION_ADD, ACTION_DELETE, ACTION_EDIT, EXPRITIME_HIDER_LOADER, MESSAGE_PERCENT_REQUIRE, MESSAGE_PRICE_REQUIRE, MESSAGE_REQUIRE, NOT_NUMBER, NOT_PERMISSION } from '../../constants/ConstantString';
import { isNumber } from '../../constants/FunctionConstant';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import FoodGroupService from '../../service/FoodGroupService';
import FoodService, { saveFood } from '../../service/FoodService';
import PermissionService from '../../service/PermissionService';

import './Food.css'

export const Food = () => {

    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const history = useHistory();
    const [keycloak] = useKeycloak();
    const permissionService = new PermissionService();
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [selectedFoodGroup, setSelectedFoodGroup] = useState(null)
    const [value, setValue] = useState('');
    const [foodGroup, setFoodGroup] = useState([])
    const [price, setPrice] = useState('')
    const [arrayImage, setArrayImage] = useState([])
    const [products, setProducts] = useState(null);



    const dt = useRef(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [productDeleteSelected, setProductDeleteSelected] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [showAddProductDialog, setShowAddProductDialog] = useState(false)
    const [editProductDialog, setEditProductDialog] = useState(false)
    const [productEditSelected, setProductEditSelected] = useState(false)

    const [deleteAllProduct, setDeleteAllProduct] = useState(false)

    const [objectEdit, setObjectEdit] = useState(
        {
            name: '',
            price: 0
        }
    )


    const [data, setData] = useState([])

    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 10000 });
    }

    const hideDialog = () => {

        setSelectedProducts(false)


        setShowAddProductDialog(false)
        setDeleteProductDialog(false)
        setDeleteAllProduct(false)
        setEditProductDialog(false)


        setObjecErrors(
            {
                name: {},
                price: {},
                description: {},
                file: {},
                foodGroup: {},
                nameEdit: {},
                priceEdit: {}
            }
        )


        setObjectEdit(
            {
                name: '',
                price: 0
            }
        )
    }

    const deleteFoodAPI = async () => {
        showLoader()
        // console.log(`id`, productDeleteSelected.id)
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await foodService.deleteFood(productDeleteSelected.id);
        // console.log(`getAllFoodAPI`, result)
        if (result?.status === 1000) {
            getAllFoodAPI()
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const deleteAllFoodAPI = async (ids) => {
        showLoader()
        // console.log(`id`, productDeleteSelected.id)
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await foodService.deleteAllFood(ids);
        // console.log(`getAllFoodAPI`, result)
        if (result?.status === 1000) {
            getAllFoodAPI()
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const editProduct = async () => {
        // console.log(`prod`, productEditSelected)

        if (formValidationEdit()) {
            showLoader()
            // console.log(`id`, productDeleteSelected.id)
            // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
            try {
                console.log(`objectEdit`, objectEdit)
                let result = await foodService.updateNameAndPrice(objectEdit, productEditSelected.id);
                // console.log(`getAllFoodAPI`, result)
                if (result?.status === 1000) {
                    getAllFoodAPI()
                }
                showSuccess('Thành công')

            } catch (error) {
                // console.log(`error`)
                showError(error?.response?.data?.message)
                setSelectedProducts(null)
            }
            setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
            setEditProductDialog(false)
            //clear
            setObjectEdit(
                {
                    name: '',
                    price: 0
                }
            )
        }



    }


    const deleteProduct = async () => {
        deleteFoodAPI();

        setDeleteProductDialog(false);

        showSuccess('Xóa thành công!')
    }

    const confirmEditProduct = async (product) => {
        // console.log(`product`, product)
        setObjectEdit({
            ...objectEdit,
            name: product?.name,
            price: product?.price
        })
        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_EDIT);
            if (result?.status === 1000) {
                setProductEditSelected(product)
                setEditProductDialog(true)
            }
        } catch (error) {
            showError(error?.response?.data?.message)
            setSelectedProducts(null)
            console.log(`error`, { ...error }, error?.response?.data?.message)
        }



    }

    const confirmDeleteAllProductAPI = async () => {

        // console.log(`selectedProducts`, selectedProducts)
        // console.log(`values`, Object.values(selectedProducts))

        let arrayOrderIds = Object.values(selectedProducts).map(x => x.id);
        // console.log(`arrayOrderIds`, arrayOrderIds)

        deleteAllFoodAPI(arrayOrderIds)

        setDeleteAllProduct(false);

        showSuccess('Xóa thành công!')
    }

    const editProductDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text" onClick={editProduct} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    const deleteAllProductDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text" onClick={confirmDeleteAllProductAPI} />
        </React.Fragment>
    );

    const confirmAddProduct = () => {
        setShowAddProductDialog(true)
    }

    const confirmDeleteSelectedAllProducts = async () => {

        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_DELETE);
            if (result?.status === 1000) {
                setDeleteAllProduct(true)
            }
        } catch (error) {
            // showError(error)
            showError(error?.response?.data?.message)
            setSelectedProducts(null)
        }


    }

    const header = (
        <div className="table-header">
            <Button icon="pi pi-trash" className="p-button-danger p-mr-2" disabled={!selectedProducts || !selectedProducts.length} onClick={confirmDeleteSelectedAllProducts} />
            <Button icon="pi pi-plus-circle" className=" p-button-success p-mr-2" onClick={() => confirmAddProduct()} />
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Tìm kiếm..." />
            </span>
        </div>
    );



    const confirmDeleteProduct = async (product) => {
        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_DELETE);
            if (result?.status === 1000) {
                // console.log(`product`, product)
                setProductDeleteSelected(product);
                setDeleteProductDialog(true);
            }
        } catch (error) {
            // showError(error)
            showError(error?.response?.data?.message)
            setSelectedProducts(null)
        }

    }



    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => confirmEditProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`${rowData.path}`} style={{ width: '80px', height: '80px' }} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }

    const formatCurrency = (value) => {
        // console.log(`value`, value)
        return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const handleOnSelectedChange = (e) => {
        setSelectedProducts(e.value)
    }









    const [objectSave, setObjectSave] = useState(
        {
            name: '',
            price: '',
            description: ''
        }
    )


    //errors
    const [objecErrors, setObjecErrors] = useState({
        name: {},
        price: {},
        description: {},
        file: {},
        foodGroup: {},
        nameEdit: {},
        priceEdit: {}
    })


    // const data = [
    //     { "id": "1000", "code": "f230fh0g3", "name": "Bamboo Watch", "description": "Product Description", "image": "bamboo-watch.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 },
    //     { "id": "1001", "code": "nvklal433", "name": "Black Watch", "description": "Product Description", "image": "black-watch.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1002", "code": "zz21cz3c1", "name": "Blue Band", "description": "Product Description", "image": "blue-band.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3 }
    // ]

    const formValidationEdit = () => {

        const nameEditErrors = {}
        const priceEditErrors = {}

        let isValid = true;
        // name
        if (objectEdit.name === '') {
            nameEditErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        // price
        if (objectEdit.price === 0) {
            priceEditErrors.required = MESSAGE_PRICE_REQUIRE;
            isValid = false;
        }else if (objectEdit.price === null){
            priceEditErrors.required = MESSAGE_PRICE_REQUIRE;
            isValid = false;
        }

        setObjecErrors(
            {
                ...objecErrors,
                nameEdit: nameEditErrors,
                priceEdit: priceEditErrors
            }
        )

        return isValid;


    }


    const formValidation = () => {

        const nameErrors = {}
        const priceErrors = {}
        const foodGroupErrors = {}
        const descriptionErrors = {}
        const imageErrors = {}




        let isValid = true;
        // name
        if (objectSave.name === '') {
            nameErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        // price
        if (objectSave.price === '') {
            priceErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }
        if (!isNumber(objectSave.price)) {
            console.log(`cisNumber`)
            priceErrors.phoneErrorNotNumber = NOT_NUMBER;
            isValid = false;
        }

        // description
        if (objectSave.description === '') {
            descriptionErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        // file
        if (arrayImage.length === 0) {
            imageErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        // foodGroup
        if (selectedFoodGroup === null) {
            foodGroupErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        setObjecErrors(
            {
                ...objecErrors,
                name: nameErrors,
                price: priceErrors,
                foodGroup: foodGroupErrors,
                file: imageErrors,
                description: descriptionErrors
            }
        )

        return isValid;
    }




    const foodGroupService = new FoodGroupService();
    const foodService = new FoodService();


    const getAllFoodAPI = async () => {
        showLoader()
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await foodService.getAll();
        // console.log(`getAllFoodAPI`, result)
        if (result?.status === 1000) {
            setData(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }


    const getAllFoodGroupAPI = async () => {
        showLoader()
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await foodGroupService.getAllFoodGroup();
        // console.log(`result`, result)
        if (result?.status === 1000) {
            setFoodGroup(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    useEffect(() => {
        getAllFoodAPI()
        getAllFoodGroupAPI();
        // setProducts(data)
    }, [])





    const onTemplateUpload = (e) => {
        // console.log(`chay vào đây`)
        // let _totalSize = 0;
        // e.files.forEach(file => {
        //     _totalSize += (file.size || 0);
        // });

        // setTotalSize(_totalSize);
        // toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    }

    const onTemplateClear = () => {
        setTotalSize(0);
    }

    const onTemplateSelect = (e) => {

        // console.log(`e`, Object.keys(e.files).length)
        if (Object.keys(e.files).length > 0) {
            setObjecErrors(
                {
                    ...objecErrors,
                    file: ''
                }
            )
        } else {
            setObjecErrors(
                {
                    ...objecErrors,
                    file: MESSAGE_REQUIRE
                }
            )
        }

        // console.log(Array.isArray(e?.files[0]))
        // console.log(`e`, e?.files[0])
        // // console.log(`e`, e?.files[1])
        // console.log(`e`, Object.values(e?.files))

        let arrayData = [];
        // arrayData.push(e?.files[0])

        Object.values(e?.files).forEach(e => arrayData.push(e))
        setArrayImage(arrayData)
        setTotalSize(e?.files[0]?.size)
    }

    const headerTemplate = (options) => {
        // console.log(`options`, options)
        const { className, chooseButton,
            //  uploadButton,
            cancelButton } = options;
        // const { className, chooseButton, cancelButton } = options;
        const value = totalSize / 10000;
        const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {/* {uploadButton} */}
                {cancelButton}
                <ProgressBar value={value} displayValueTemplate={() => `${formatedValue} / 1 MB`} style={{ width: '300px', height: '20px', marginLeft: 'auto' }}></ProgressBar>
            </div>
        );
    }

    const itemTemplate = (file, props) => {
        // console.log(`file.objectURL`, file.objectURL)
        return (
            <div className="p-d-flex p-ai-center p-flex-wrap">
                <div className="p-d-flex p-ai-center" style={{ width: '40%' }}>
                    <img alt={file.name} role="presentation" src={file.objectURL} width={50} />
                    <span className="p-d-flex p-dir-col p-text-left p-ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="p-px-3 p-py-2" />
                <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger p-ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
            </div>
        )
    }

    const emptyTemplate = () => {
        return (
            <div className="p-d-flex p-ai-center p-dir-col">
                <i className="pi pi-image p-mt-3 p-p-5" style={{ 'fontSize': '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ 'fontSize': '1.2em', color: 'var(--text-color-secondary)' }} className="p-my-5">Drag and Drop Image Here</span>
            </div>
        )
    }

    const chooseOptions = { icon: 'pi pi-fw pi-images', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
    const uploadOptions = { label: 'Uplaod 111', icon: 'pi pi-upload', className: 'p-button-success' };
    const cancelOptions = { icon: 'pi pi-fw pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };


    // const [selectedCity1, setSelectedCity1] = useState(null);

    const handleOnChangeFoodGroup = (e) => {
        // console.log(`e`, e.value)
        if (e.value.name.length > 0) {
            setObjecErrors(
                {
                    ...objecErrors,
                    foodGroup: ''
                }
            )
        } else {
            setObjecErrors(
                {
                    ...objecErrors,
                    foodGroup: MESSAGE_REQUIRE
                }
            )
        }

        setSelectedFoodGroup(e.value)
    }

    const handleOnAddFood = () => {
        console.log(`add`)
        if (totalSize === 0) {
            console.log("chua chon")
        }
    }


    // const leftContents = (
    //     <React.Fragment>
    //         <Button label="Thêm" icon="pi pi-plus" className="p-mr-2" onClick={handleOnAddFood} />
    //     </React.Fragment>
    // );

    // const rightContents = (
    //     <React.Fragment>
    //         {/* <Button icon="pi pi-search" className="p-mr-2" />
    //         <Button icon="pi pi-calendar" className="p-button-success p-mr-2" />
    //         <Button icon="pi pi-times" className="p-button-danger" /> */}
    //     </React.Fragment>
    // );





    const saveFoodAPI = async (body) => {
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        try {
            let result = await foodService.saveFood(body);
            // console.log(`saveFoodAPI`, result);
            if (result === undefined) {
                showError('Đã có lỗi xảy ra, xin vui lòng liên hệ quản trị viên')
            }
            if (result?.status === 1000) {
                showSuccess('Thành công!')
                getAllFoodAPI()
                getAllFoodGroupAPI();
            }
        } catch (e) {
            console.log(`e.response`, e?.response?.data?.message)
            showError(e?.response?.data?.message)
        }

    }



    const handleSaveFood = async () => {

        let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_ADD);
        if (result?.status === 1000) {
            if (formValidation()) {
                // console.log(`handleSaveFood`, totalSize)
                // console.log(`arrayImage`, arrayImage)

                try {
                    let formData = new FormData();
                    formData.append("files", arrayImage[0]);
                    formData.append("files", arrayImage[1]);
                    formData.append("files", arrayImage[2]);
                    formData.append("files", arrayImage[3]);

                    formData.append("name", objectSave.name);
                    formData.append("price", objectSave.price);
                    formData.append("groupId", selectedFoodGroup?.id);
                    formData.append("desciption", objectSave.description);

                    saveFoodAPI(formData);
                    setSelectedFoodGroup(null)
                    setObjectSave(
                        {
                            name: '',
                            price: '',
                            description: ''
                        }
                    )
                } catch (e) {
                    console.log(`e`, e)
                }
                setShowAddProductDialog(false)
            }
        } else {
            showError("Bạn không có quyền")
        }


    }

    const handleOnChange = (e) => {
        // console.log(`e`, e)
        // console.log(`e`, e.target.value)
        let name = e.target.name
        const value = e.target.value

        if (name === 'name') {

            if (value.length > 0) {
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

            setObjectSave({
                ...objectSave,
                name: e.target.value
            })
        }

        if (name === 'price') {

            if (value.length > 0) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        price: ''
                    }
                )
            }
            else {
                setObjecErrors(
                    {
                        ...objecErrors,
                        price: MESSAGE_REQUIRE
                    }
                )
            }



            setObjectSave({
                ...objectSave,
                price: e.target.value
            })
        }

        if (name === 'description') {

            if (value.length > 0) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        description: ''
                    }
                )
            } else {
                setObjecErrors(
                    {
                        ...objecErrors,
                        description: MESSAGE_REQUIRE
                    }
                )
            }

            setObjectSave({
                ...objectSave,
                description: e.target.value
            })
        }

        if (name === 'imageFile') {

            let arrayDataImage = []

            const fileArray = e.target.files;


            Object.values(fileArray).forEach(e => {
                console.log(`e`, e)
                // arrayData.push(e)

            }
            )
            // setArrayImage(arrayData)

            // console.log("URL.createObjectURL(event.target.files[0])", URL.createObjectURL(e.target.files[0]))
            // console.log(`fileArray`, fileArray)

            // console.log(`Object.values(fileArray)`, Object.values(fileArray))
            Object.values(fileArray).forEach(e => {

                arrayDataImage.push(e);

                let obj = {
                    name: e.name,
                    size: e.size,
                    type: e.type,
                    url: URL.createObjectURL(e)
                }
                console.log(`objTmp`, obj)
            });

            setArrayImage(arrayDataImage)

        }

        if (name === 'nameEdit') {
            if (value.length > 0) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        nameEdit: ''
                    }
                )
            } else {
                setObjecErrors(
                    {
                        ...objecErrors,
                        nameEdit: MESSAGE_REQUIRE
                    }
                )
            }

            setObjectEdit(
                {
                    ...objectEdit,
                    name: e.target.value
                }
            )
        }

        if (name === 'priceEdit') {
            if (e.value > 0) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        priceEdit: ''
                    }
                )
            } else if (e.value === null) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        priceEdit: MESSAGE_PRICE_REQUIRE
                    }
                )
            }
            else {
                setObjecErrors(
                    {
                        ...objecErrors,
                        priceEdit: MESSAGE_PRICE_REQUIRE
                    }
                )
            }

            setObjectEdit(
                {
                    ...objectEdit,
                    price: e.value
                }
            )
        }


    }


    const saveDiscount = async () => {

        // // console.log(`objDiscount`, objDiscount)
        // // console.log(`object`, objecErrors)

        // if (formValidation()) {
        //     let result = await discountService.save(objDiscount);
        //     // console.log(`result`, result)
        //     if (result?.status === 1000) {
        //         showSuccess('Thành công!')
        //         setObjDiscount(
        //             {
        //                 name: '',
        //                 percent: 0,
        //                 startDate: moment().format("DD/MM/yy"),
        //                 endDate: moment().format("DD/MM/yy")
        //             }
        //         )
        //         fetchDiscount();
        //     } else {
        //         showError(result?.message)
        //     }
        //     setProductDialog(false);
        // }


    }







    const productDialogFooter = (
        <React.Fragment>
            {/* <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text" onClick={saveDiscount} /> */}
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast}></Toast>
            <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
            <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
            <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />


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
                        currentPageReportTemplate="Tổng {totalRecords} bản ghi"
                        globalFilter={globalFilter}
                    >

                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="id" header="Id" style={{ textAlign: 'center' }}></Column>
                        <Column field="name" header="Tên" style={{ textAlign: 'center' }} ></Column>
                        <Column header="Ảnh" style={{ textAlign: 'center' }} body={imageBodyTemplate}></Column>
                        <Column header="Giá" style={{ textAlign: 'center' }} body={priceBodyTemplate}></Column>
                        <Column headerStyle={{ width: '8rem' }} body={actionBodyTemplate} style={{ textAlign: 'center' }}></Column>
                    </DataTable>
                </div>
            </div>



            {/* Thêm món ăn */}
            <Dialog visible={showAddProductDialog} style={{ width: '800px' }}
                header="Thêm món ăn" modal className="p-fluid"
                footer={productDialogFooter} onHide={hideDialog}
            >

                <div className="card">
                    <div className="card-body p-mt-4">

                        {/* <Toolbar left={leftContents} right={rightContents} /> */}

                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="name">Tên món ăn <span className="item-required"> *</span> </label>
                                <InputText
                                    id="name"
                                    className={Object.keys(objecErrors.name).length > 0 ? "error" : null}
                                    type="text"
                                    name="name"
                                    onChange={handleOnChange} />
                                {Object.keys(objecErrors.name).map((keyIndex, key) => {
                                    return <span className="errorMessage" key={key} >{objecErrors.name[keyIndex]} </span>
                                })}
                            </div>
                            <div className="p-field p-col">
                                <label htmlFor="price">Giá <span className="item-required"> *</span> </label>
                                <InputText
                                    className={Object.keys(objecErrors.price).length > 0 ? "error" : null}
                                    name="price"
                                    id="price"
                                    type="text"
                                    value={objectSave.price}
                                    onChange={handleOnChange}
                                />
                                {Object.keys(objecErrors.price).map((keyIndex, key) => {
                                    return <span className="errorMessage" key={key} >{objecErrors.price[keyIndex]} <br></br> </span>
                                })}
                            </div>
                        </div>

                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="foodGroup">Nhóm món ăn <span className="item-required"> *</span> </label>
                                <Dropdown
                                    className={Object.keys(objecErrors.foodGroup).length > 0 ? "error" : null}
                                    value={selectedFoodGroup}
                                    options={foodGroup}
                                    onChange={(e) => handleOnChangeFoodGroup(e)}
                                    optionLabel="name"
                                    placeholder="============= Chọn =============" />
                                {Object.keys(objecErrors.foodGroup).map((keyIndex, key) => {
                                    return <span className="errorMessage" key={key} >{objecErrors.foodGroup[keyIndex]} </span>
                                })}
                            </div>

                        </div>


                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="description">Mô tả <span className="item-required"> *</span> </label>
                                <InputTextarea
                                    className={Object.keys(objecErrors.description).length > 0 ? "error" : null}
                                    name="description"
                                    onChange={handleOnChange}
                                    value={objectSave.description}
                                    rows={5}
                                    cols={30} />
                                {Object.keys(objecErrors.description).map((keyIndex, key) => {
                                    return <span className="errorMessage" key={key} >{objecErrors.description[keyIndex]} </span>
                                })}
                            </div>
                        </div>

                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col">
                                <FileUpload ref={fileUploadRef}
                                    className={Object.keys(objecErrors.file).length > 0 ? "error" : null}
                                    name="demo[]"
                                    // url="https://primefaces.org/primereact/showcase/upload.php"
                                    multiple accept="image/*"
                                    maxFileSize={1000000}
                                    // onUpload={onTemplateUpload}
                                    chooseLabel="Chọn"
                                    cancelLabel="Hủy"
                                    onSelect={onTemplateSelect}
                                    onError={onTemplateClear}
                                    onClear={onTemplateClear}
                                    headerTemplate={headerTemplate}
                                    itemTemplate={itemTemplate}
                                    emptyTemplate={emptyTemplate}
                                    chooseOptions={chooseOptions}
                                    // uploadOptions={uploadOptions}
                                    cancelOptions={cancelOptions}
                                // showUploadButton = {false}
                                />
                                {Object.keys(objecErrors.file).map((keyIndex, key) => {
                                    return <span className="errorMessage" key={key} >{objecErrors.file[keyIndex]} </span>
                                })}
                            </div>


                            <Button label="Thêm" onClick={handleSaveFood} className="p-mr-6 p-ml-6 p-d-inline" />

                        </div>
                        {/* <hr/>
                        <div>
                       
                        </div> */}
                    </div>
                </div>

            </Dialog>

            <Dialog visible={editProductDialog} style={{ width: '450px' }} header="Sửa món ăn" modal footer={editProductDialogFooter} onHide={hideDialog}>
                <div className="confirmation-content">
                    <div className="p-fluid">
                        <div className="p-field">
                            <label htmlFor="name">Tên <span className="item-required">*</span></label>
                            <InputText
                                name="nameEdit"
                                className={Object.keys(objecErrors.nameEdit).length > 0 ? "error" : null}
                                id="name"
                                type="text"
                                value={objectEdit.name}
                                onChange={handleOnChange}
                            />
                            {Object.keys(objecErrors.nameEdit).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{objecErrors.nameEdit[keyIndex]} </span>
                            })}
                        </div>
                        <div className="p-field">
                            <label htmlFor="priceEdit">Giá <span className="item-required">*</span></label>
                            <InputNumber
                                name="priceEdit"
                                className={Object.keys(objecErrors.priceEdit).length > 0 ? "error" : null}
                                inputId="priceEdit"
                                value={objectEdit.price}
                                onValueChange={handleOnChange}
                            />
                            {Object.keys(objecErrors.priceEdit).map((keyIndex, key) => {
                                return <span className="errorMessage" key={key} >{objecErrors.priceEdit[keyIndex]} </span>
                            })}
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Xác nhận" modal footer={deleteProductDialogFooter} onHide={hideDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {/* {product && <span>Bạn có chắc chắn muốn xóa <b>{product.name}</b>?</span>} */}
                    {/* <span>Bạn có chắc chắn muốn xóa <b>{productDeleteSelected.name }</b>?</span> */}
                    {productDeleteSelected && <span>Bạn có chắc chắn muốn xóa <b>{productDeleteSelected.name}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteAllProduct} style={{ width: '450px' }} header="Xác nhận" modal footer={deleteAllProductDialogFooter} onHide={hideDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                    {selectedProducts && <span>Bạn có chắc chắn xóa hết các sản phẩm đang chọn?</span>}
                </div>
            </Dialog>


            {loader}
        </div>

    )
}
export default Food;
