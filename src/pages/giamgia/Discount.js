

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import React, { useEffect, useRef, useState } from 'react';
import FoodGroupService from '../../service/FoodGroupService';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import DiscountService from '../../service/DiscountService';
import * as moment from "moment";
import Moment from "react-moment";
import { Toast } from 'primereact/toast';
import FoodService from '../../service/FoodService';

import './Discount.css'
import { ACTION_ADD, ACTION_CREATE, ACTION_DELETE, ACTION_EDIT, ACTION_EDIT_CREATE, EXPRITIME_HIDER_LOADER, MESSAGE_PERCENT_ERROR_GREATER_THAN, MESSAGE_PERCENT_REQUIRE, MESSAGE_REQUIRE, MESSAGE_REQUIRE_PERCENT_LONHON_0, NOT_PERMISSION } from '../../constants/ConstantString';
import PermissionService from '../../service/PermissionService';
import { useKeycloak } from '@react-keycloak/web';
import { useHistory } from 'react-router-dom';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import { Tag } from 'primereact/tag';

const Discount = () => {

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const toast = useRef(null);
    const dt = useRef(null);
    const dtDiscount = useRef(null);
    const dtUpdateDiscount = useRef(null);

    const history = useHistory();
    const permissionService = new PermissionService();
    const [keycloak] = useKeycloak();



    const [products, setProducts] = useState(null);
    const [foodForDiscount, setFoodForDiscount] = useState(null)
    const [updateFoodForDiscount, setUpdateFoodForDiscount] = useState(null)



    const [foodSelected, setFoodSelected] = useState([])
    const [discountDropdown, setDiscountDropdown] = useState(null)

    const [updatedFoodSelected, setUpdatedFoodSelected] = useState([])



    const [selectedProducts, setSelectedProducts] = useState(null);
    const [selectedDiscount, setSelectedDiscount] = useState(null)
    const [updateSelectedDiscount, setUpdateSelectedDiscount] = useState(null)


    const [unSelected, setUnSelected] = useState(null)
    const [unUpdateSelected, setUnUpdateSelected] = useState(null)


    const [globalFilter, setGlobalFilter] = useState(null);
    const [globalFilterForFoodSelected, setGlobalFilterForFoodSelected] = useState(null)
    const [globalFilterForFoodUpdateSelected, setGlobalFilterForFoodUpdateSelected] = useState(null)
    const [globalFilterForFoodUnUpdateSelected, setGlobalFilterForFoodUnUpdateSelected] = useState(null)


    const [deleteProductDialog, setDeleteProductDialog] = useState(false);

    const [productDeleteSelected, setProductDeleteSelected] = useState(null);
    const [position, setPosition] = useState('center');
    const [displayBasic, setDisplayBasic] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [productDialog, setProductDialog] = useState(false);
    const [discountDialog, seTdiscountDialog] = useState(false)
    const [updadteDiscountDialog, seTupdadteDiscountDialog] = useState(false)



    const [selectedDiscountForFood, setSelectedDiscountForFood] = useState(null)
    const [selectedUpdateDiscountForFood, setSelectedUpdateDiscountForFood] = useState(null)

    const [editDiscountDialog, setEditDiscountDialog] = useState(false);
    const [discountEditSelected, setDiscountEditSelected] = useState(false)


    const foodGroupService = new FoodGroupService();
    const discountService = new DiscountService();
    const foodService = new FoodService();

    //object save
    const [objDiscount, setObjDiscount] = useState(
        {
            name: '',
            percent: 0,
            startDate: '',   //moment().format("DD/MM/yy ")
            endDate: ''  //moment().format("DD/MM/yy")
        }
    )

    //object edit
    const [objectEdit, setObjectEdit] = useState(
        {
            name: '',
            percent: 0
        }
    )

    //errors
    const [objecErrors, setObjecErrors] = useState({
        name: {},
        percent: {},
        startDate: {},
        endDate: {},
        nameEdit: {},
        percentEdit: {}
    })

    const formValidationEdit = () => {

        const nameEditErrors = {}
        const percentEditErrors = {}

        let isValid = true;
        // name
        if (objectEdit.name === '') {
            nameEditErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        // percent
        if (objectEdit.percent === 0) {
            percentEditErrors.required = MESSAGE_PERCENT_REQUIRE;
            isValid = false;
        } else if (objectEdit.percent >= 100) {
            percentEditErrors.error_greater = MESSAGE_PERCENT_ERROR_GREATER_THAN;
            isValid = false;
        }

        setObjecErrors(
            {
                ...objecErrors,
                nameEdit: nameEditErrors,
                percentEdit: percentEditErrors
            }
        )

        return isValid;
    }



    const formValidation = () => {

        const nameErrors = {}
        const percentErrors = {}
        const startDateErrors = {}
        const endDateErrors = {}

        let isValid = true;

        let dateNow = new Date();

        // name
        if (objDiscount.name === '') {
            console.log(`objDiscount.name `, objDiscount.name)
            nameErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        // percent
        if (objDiscount.percent === 0) {
            percentErrors.required = MESSAGE_REQUIRE_PERCENT_LONHON_0;
            isValid = false;
        }
        // console.log(`dateNow`, dateNow)
        // console.log(`new Date()`, new Date(objDiscount.startDate).getDay())
        // console.log(`dateNow.getTime()`, dateNow.getDay())
        //startDate
        if (objDiscount.startDate === '') {
            startDateErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }
        //endDate
        if (objDiscount.startDate === '') {
            endDateErrors.required = MESSAGE_REQUIRE;
            isValid = false;
        }



        setObjecErrors(
            {
                ...objecErrors,
                name: nameErrors,
                percent: percentErrors,
                startDate: startDateErrors,
                endDate: endDateErrors
            }
        )

        return isValid;
    }







    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 10000 });
    }

    const handleOnChange = (e) => {
        // console.log(`handleOnChange`, e)
        let { name, value } = e.target;
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

            setObjDiscount(
                {
                    ...objDiscount,
                    name: e.target.value
                }
            )
        }
        if (name === 'percent') {

            console.log(`value`, value)

            if (value > 0) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        percent: ''
                    }
                )
            } else {
                setObjecErrors(
                    {
                        ...objecErrors,
                        percent: MESSAGE_REQUIRE
                    }
                )
            }

            setObjDiscount(
                {
                    ...objDiscount,
                    percent: e.value
                }
            )

        }
        if (name === 'startDate') {

            if (value.toString().length > 0) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        startDate: ''
                    }
                )
            } else {
                setObjecErrors(
                    {
                        ...objecErrors,
                        startDate: MESSAGE_REQUIRE
                    }
                )
            }

            setObjDiscount(
                {
                    ...objDiscount,
                    startDate: moment(e.value).format("DD/MM/yy")
                }
            )

        }
        if (name === 'endDate') {

            if (value.toString().length > 0) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        endDate: ''
                    }
                )
            } else {
                setObjecErrors(
                    {
                        ...objecErrors,
                        endDate: MESSAGE_REQUIRE
                    }
                )
            }

            setObjDiscount(
                {
                    ...objDiscount,
                    endDate: moment(e.value).format("DD/MM/yy")
                }
            )

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

        if (name === 'percentEdit') {
            if (e.value > 0) {
                setObjecErrors(
                    {
                        ...objecErrors,
                        percentEdit: ''
                    }
                )
            } else {
                setObjecErrors(
                    {
                        ...objecErrors,
                        percentEdit: MESSAGE_PERCENT_REQUIRE
                    }
                )
            }
            setObjectEdit(
                {
                    ...objectEdit,
                    percent: e.value
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

    const handleEditDiscountButton = async (discount) => {
        console.log(`discount`, discount)

        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_EDIT_CREATE);
            if (result?.status === 1000) {
                setEditDiscountDialog(true)
                setDiscountEditSelected(discount)

                setObjectEdit(
                    {
                        ...objectEdit,
                        name: discount?.name,
                        percent: discount?.percent
                    }
                )
                
            }
        } catch (error) {

            showError(error?.response?.data?.message)

        }

    }

    const handleDeleteDiscount = async (rowData) => {
        console.log(`handleDeleteDiscount`)
        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_DELETE);
            if (result?.status === 1000) {
                confirmDeleteProduct(rowData)
            }
        } catch (error) {
            showError(error?.response?.data?.message)
        }

    }

    const actionBodyTemplate = (rowData) => {
        // console.log(`rowData`, rowData)
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => handleEditDiscountButton(rowData)} disabled={rowData?.isDeleted === 1} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => handleDeleteDiscount(rowData)} disabled={rowData?.isDeleted === 1} />
            </React.Fragment>
        );
    }

    const bodyStartDate = (rowData) => {
        // console.log(`rowData`, rowData.startDate)
        // return (

        //     <React.Fragment>

        //         <Moment format="DD/MM/YYYY hh:mm:ss">{rowData.startDate}</Moment>
        //         {/* <span>{moment(rowData.startDate).format("DD/MM/yy HH:mm:ss")}</span> */}
        //     </React.Fragment>
        // );
        return (
            <React.Fragment>
                {/* <span className="p-column-title">Date</span> */}
                <span>{moment(rowData.startDate).format("DD/MM/yy")}</span>
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

    const renderStatusBodyTemplate = (rowData) => {
        let status = null;
        if (rowData.isDeleted === 1) {
            status = 'H???t h???n'
            return <Tag severity="danger" value={status} />;
        }
        else {
            status = 'Ho???t ?????ng'
            return <Tag severity="success" value={status} />;
        }
    }




    const deleteProduct = () => {

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





    const handleAddDiscount = async () => {
        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_ADD);
            if (result?.status === 1000) {
                seTdiscountDialog(true)
            }
        } catch (error) {
            showError(error?.response?.data?.message)
        }

    }

    const handleEditDiscount = async () => {
        try {
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_EDIT);
            if (result?.status === 1000) {
                seTupdadteDiscountDialog(true)
            }
        } catch (error) {
            showError(error?.response?.data?.message)
        }

    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Th??m" icon="pi pi-plus-circle" className="p-button-success p-mr-2" onClick={onClickHandleOrderButton} />
                <Button label="T???o" icon="pi pi-check-circle" className="p-button-warning p-mr-2" onClick={() => handleAddDiscount()} />
                <Button label="S???a" icon="pi pi-pencil" className="p-button-help p-mr-2" onClick={() => handleEditDiscount()} />
            </React.Fragment>
        )
    }

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
            let result = await permissionService.checkPermission(keycloak?.idTokenParsed?.preferred_username, history.location.pathname, ACTION_CREATE);
            if (result?.status === 1000) {
                openNew();
            }
        } catch (error) {
            showError(error?.response?.data?.message)
        }

    }


    const confirmDeleteProduct = (product) => {
        // console.log(`product`, product)
        setProductDeleteSelected(product);
        setDeleteProductDialog(true);
    }

    const fetchDiscount = async () => {
        showLoader()
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await discountService.getAll();
        // console.log(`result`, result)
        if (result?.status === 1000) {
            setProducts(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const fetchFoodForDiscountAPI = async () => {
        showLoader()
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await foodService.getAllFoodForDiscount();
        // console.log(`result`, result)
        if (result?.status === 1000) {
            setFoodForDiscount(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const fetchFoodHadDiscountAPI = async () => {
        showLoader()
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await foodService.getAllFoodHadDiscount();
        // console.log(`fetchFoodHadDiscountAPI`, result)
        if (result?.status === 1000) {
            setUpdateFoodForDiscount(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const fetchAllDiscountAPI = async () => {
        showLoader()
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await discountService.getAllForFood();
        // console.log(`fetchAllDiscountAPI`, result)
        if (result?.status === 1000) {
            setDiscountDropdown(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const addDiscountIdToFoodsAPI = async (dataBody) => {
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await foodService.updateDiscountIdToFoods(dataBody);
        // console.log(`addDiscountIdToFoods`, result)
        if (result?.status === 1000) {
            showSuccess('Th??nh c??ng!')

            setSelectedDiscount(null)
            setUnSelected(null)
            setFoodSelected(null)
            fetchFoodForDiscountAPI();

            //updateSelectedDiscount
            setUpdateSelectedDiscount(null)
            setUnUpdateSelected(null)
            setUpdatedFoodSelected(null)
            fetchFoodHadDiscountAPI()


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
        fetchFoodForDiscountAPI();
        fetchFoodHadDiscountAPI()
        fetchAllDiscountAPI();

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const hideDialog = () => {
        // setSubmitted(false);
        setProductDialog(false);
        seTdiscountDialog(false)
        seTupdadteDiscountDialog(false)

        setEditDiscountDialog(false)



        setUpdateSelectedDiscount(null)
        setSelectedUpdateDiscountForFood(null)
        setUnUpdateSelected(null)
        setUpdatedFoodSelected(null)


        setSelectedDiscountForFood(null)
        setSelectedDiscount(null)
        setUnSelected(null)
        setFoodSelected(null)


        setObjecErrors(
            {
                name: {},
                percent: {},
                startDate: {},
                endDate: {},
                nameEdit: {},
                percentEdit: {}
            }
        )


        setObjectEdit(
            {
                name: '',
                percent: 0
            }
        )




    }


    const saveDiscount = async () => {

        // console.log(`objDiscount`, objDiscount)
        // console.log(`object`, objecErrors)

        if (formValidation()) {
            try {
                let result = await discountService.save(objDiscount);
                // console.log(`result`, result)
                if (result?.status === 1000) {
                    showSuccess('Th??nh c??ng!')
                    setObjDiscount(
                        {
                            name: '',
                            percent: 0,
                            startDate: moment().format("DD/MM/yy"),
                            endDate: moment().format("DD/MM/yy")
                        }
                    )
                    fetchDiscount();
                    fetchAllDiscountAPI()
                } else {
                    showError(result?.message)
                }
            } catch (error) {
                showError(error?.response?.data?.message)
            }

            setProductDialog(false);
        }


    }

    const deleteDiscount = async (id) => {

        let result = await discountService.update(id);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            fetchDiscount();
            fetchAllDiscountAPI();
        }
        setProductDialog(false);
    }

    const editDiscount = async () => {

        // console.log(`c?? ch???y v??o ????y`)

        if (formValidationEdit()) {
            showLoader()

            try {
                console.log(`objectEdit`, objectEdit)
                let result = await discountService.updateNameAndPercent(objectEdit, discountEditSelected.id);
                // console.log(`getAllFoodAPI`, result)
                if (result?.status === 1000) {
                    fetchDiscount();
                }
                showSuccess('Th??nh c??ng')

            } catch (error) {
                // console.log(`error`)
                showError(error?.response?.data?.message)
                setSelectedProducts(null)
            }
            setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
            setEditDiscountDialog(false)
            //clear
            setObjectEdit(
                {
                    name: '',
                    percent: 0
                }
            )
        }

    }



    const deleteDiscountSelected = (rowData) => {
        // setUnSelected(rowData)
        // console.log(`rowData`, rowData)
        let foodSelectedRemain = foodSelected.filter(val => val.id !== rowData.id);
        console.log(`_products`, foodSelectedRemain)
        setFoodSelected(foodSelectedRemain)

        let selectedDiscountRemain = selectedDiscount.filter(val => val.id != rowData.id)
        setSelectedDiscount(selectedDiscountRemain)
    }

    const deleteUpdateDiscountSelected = (rowData) => {
        // setUnSelected(rowData)
        // console.log(`rowData`, rowData)
        let foodSelectedRemain = updatedFoodSelected.filter(val => val.id !== rowData.id);
        console.log(`_products`, foodSelectedRemain)
        setUpdatedFoodSelected(foodSelectedRemain)

        let selectedDiscountRemain = updateSelectedDiscount.filter(val => val.id != rowData.id)
        setUpdateSelectedDiscount(selectedDiscountRemain)
    }


    const productDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text"
                onClick={saveDiscount}
            />
        </React.Fragment>
    );

    const editDiscountDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text" onClick={editDiscount} />
        </React.Fragment>
    );


    const handleYesCreateDiscount = () => {
        if (selectedDiscountForFood === null) {
            showError('Ch??a ch???n t??n gi???m gi??')
        }
        if (foodSelected === null) {
            showError('Ch??a ch???n m??n ??n ????? gi???m gi??')
        }

        let arrayFoodIs = []
        foodSelected.forEach(element => {
            // console.log(`element`, element?.id)
            arrayFoodIs.push(element?.id)
        });
        const dataBody = {
            discountId: selectedDiscountForFood?.code,
            foodIds: arrayFoodIs
        }
        console.log(`dataBody`, dataBody)

        addDiscountIdToFoodsAPI(dataBody);
    }

    const handleYesUpdateDiscount = () => {
        if (selectedUpdateDiscountForFood === null) {
            showError('Ch??a ch???n t??n gi???m gi??')
        }
        if (updatedFoodSelected.length === 0) {
            showError('Ch??a ch???n m??n ??n ????? gi???m gi??')
        }

        let arrayFoodIs = []
        updatedFoodSelected.forEach(element => {
            // console.log(`element`, element?.id)
            arrayFoodIs.push(element?.id)
        });
        const dataBody = {
            discountId: selectedUpdateDiscountForFood?.code,
            foodIds: arrayFoodIs
        }
        // console.log(`dataBody`, dataBody)

        addDiscountIdToFoodsAPI(dataBody);
    }





    const discountDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text" onClick={() => handleYesCreateDiscount()} />
        </React.Fragment>
    );

    const updateDiscountDialogFooter = (
        <React.Fragment>
            <Button label="H???y" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="?????ng ??" icon="pi pi-check" className="p-button-text" onClick={() => handleYesUpdateDiscount()} />
        </React.Fragment>
    );





    const onDiscountChange = (e) => {
        setSelectedDiscountForFood(e.value);
    }

    const onUpdateDiscountChange = (e) => {
        setSelectedUpdateDiscountForFood(e.value);
    }

    const headerDiscount = (
        <div className="table-header">
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="T??m ki???m..." />
            </span>
        </div>
    );

    const header = (
        <div className="table-header">
            <h3>Danh s??ch m??n ??n</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="T??m ki???m..." />
            </span>
            <div className="p-fluid p-mt-2">
                <div className="p-field p-grid">
                    <div className="p-col-12 p-md-12">
                        <Dropdown value={selectedDiscountForFood} options={discountDropdown} onChange={onDiscountChange} optionLabel="name" placeholder="Ch???n t??n gi???m gi??" />
                    </div>
                </div>
            </div>

        </div>
    );

    const headerUpdateDiscount = (
        <div className="table-header">
            <h3>Danh s??ch m??n ??n ???? gi???m gi??</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilterForFoodUpdateSelected(e.target.value)} placeholder="T??m ki???m..." />
            </span>
            <div className="p-fluid p-mt-2">
                <div className="p-field p-grid">
                    <div className="p-col-12 p-md-12">
                        <Dropdown value={selectedUpdateDiscountForFood} options={discountDropdown} onChange={onUpdateDiscountChange} optionLabel="name" placeholder="Ch???n t??n gi???m gi??" />
                    </div>
                </div>
            </div>

        </div>
    );


    const deleteSelectedFoodDiscount = () => {
        let _products = foodSelected.filter(val => !unSelected.includes(val));
        // console.log(`_products`, _products)
        setFoodSelected(_products)

        let selectedDiscountRemain = selectedDiscount.filter(val => !unSelected.includes(val))
        setSelectedDiscount(selectedDiscountRemain)

    }

    const deleteUpdateSelectedFoodDiscount = () => {
        let _products = updatedFoodSelected.filter(val => !unUpdateSelected.includes(val));
        // console.log(`_products`, _products)
        setUpdatedFoodSelected(_products)

        let selectedDiscountRemain = updateFoodForDiscount.filter(val => !unUpdateSelected.includes(val))
        setUpdateFoodForDiscount(selectedDiscountRemain)

    }





    const headerTableSelectDiscount = (
        <div className="table-header">
            <h3>Danh s??ch m??n ??n ???????c ch???n</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilterForFoodSelected(e.target.value)} placeholder="T??m ki???m..." />
            </span>

            <div className="p-grid">
                <div className="p-col-12 p-md-2 p-lg-2 p-mt-2">
                    <Button icon="pi pi-trash" className="p-button-danger " disabled={!unSelected || !unSelected.length} onClick={() => deleteSelectedFoodDiscount()} />
                </div>
            </div>

        </div>
    );

    const headerTableUpdateSelectDiscount = (
        <div className="table-header">
            <h3>Danh s??ch m??n ??n ???????c ch???n</h3>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilterForFoodUnUpdateSelected(e.target.value)} placeholder="T??m ki???m..." />
            </span>

            <div className="p-grid">
                <div className="p-col-12 p-md-2 p-lg-2 p-mt-2">
                    <Button icon="pi pi-trash" className="p-button-danger " disabled={!unUpdateSelected || !unUpdateSelected.length} onClick={() => deleteUpdateSelectedFoodDiscount()} />
                </div>
            </div>

        </div>
    );



    const formatCurrency = (value) => {
        // return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }


    const imageBodyTemplate = (rowData) => {
        // console.log(`rowData`, rowData.path)
        return <img
            src={rowData.pathh}
            onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'}
            // alt={rowData.image}
            className="product-image" />
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const percentBodyTemplate = rowData => {
        return <span>{rowData.percent + '%'}</span>
    }

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    const actionBodyDiscountTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteDiscountSelected(rowData)} />
            </React.Fragment>
        );
    }

    const actionBodyUpdateDiscountTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deleteUpdateDiscountSelected(rowData)} />
            </React.Fragment>
        );
    }

    const handleSelectedDiscount = (e) => {
        // console.log(`e.value`, e.value)
        setSelectedDiscount(e.value)
        setFoodSelected(e.value)
    }

    const handleUpdatedSelectedDiscount = (e) => {
        // console.log(`e.value`, e.value)
        setUpdateSelectedDiscount(e.value)
        setUpdatedFoodSelected(e.value)
    }



    return (
        <div className="card">
            <div className="card-body">
                <Toast ref={toast} />

                <Toolbar className="p-mb-2 p-mt-2" left={leftToolbarTemplate} ></Toolbar>

                <DataTable ref={dt} value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => handleOnSelectedChange(e)}
                    dataKey="id"
                    paginator rows={10}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="T???ng {totalRecords} b???n ghi"
                    currentPageReportTemplate="T???ng {totalRecords} b???n ghi"
                    globalFilter={globalFilter}
                    emptyMessage="Kh??ng c?? d??? li???u"
                    header={headerDiscount}
                >

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="Id" style={{ textAlign: 'center' }} ></Column>
                    <Column field="name" header="T??n" style={{ textAlign: 'center' }} ></Column>
                    <Column field="percent" header="%" style={{ textAlign: 'center' }}></Column>
                    <Column field="startDate" body={bodyStartDate} header="Ng??y b???t ?????u" style={{ textAlign: 'center' }} ></Column>
                    <Column field="endDate" body={bodyEndDate} header="Ng??y k???t th??c" style={{ textAlign: 'center' }}></Column>
                    <Column body={renderStatusBodyTemplate} header="Tr???ng th??i" style={{ textAlign: 'center' }}></Column>
                    <Column headerStyle={{ width: '8rem' }} body={actionBodyTemplate} style={{ textAlign: 'center' }}></Column>
                </DataTable>

                {/* Th??m m??n ??n */}
                <Dialog visible={productDialog} style={{ width: '1000px' }}
                    header="Th??m m?? gi???m gi??" modal className="p-fluid"
                    footer={productDialogFooter} onHide={hideDialog}
                >
                    <div className="p-field">
                        <label htmlFor="name">T??n <span className="item-required">*</span> </label>
                        <InputText
                            className={Object.keys(objecErrors.name).length > 0 ? "error" : null}
                            id="name"
                            name="name"
                            value={objDiscount.name}
                            onChange={(e) => handleOnChange(e)}
                        />
                        {Object.keys(objecErrors.name).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{objecErrors.name[keyIndex]} </span>
                        })}
                    </div>

                    <div className="p-field">
                        <label htmlFor="percent">Ph???n tr??m gi???m <span className="item-required"> *</span></label>
                        <InputNumber
                            className={Object.keys(objecErrors.name).length > 0 ? "error" : null}
                            inputId="minmax"
                            name="percent"
                            value={objDiscount.percent}
                            onValueChange={(e) => handleOnChange(e)}
                            mode="decimal" min={0} max={100} showButtons
                        />
                        {Object.keys(objecErrors.percent).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{objecErrors.percent[keyIndex]} </span>
                        })}
                    </div>

                    <div className="p-field">
                        <label htmlFor="startDate">Ng??y b???t ?????u <span className="item-required"> *</span></label>
                        <Calendar
                            className={Object.keys(objecErrors.startDate).length > 0 ? "error" : null}
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
                        {Object.keys(objecErrors.startDate).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{objecErrors.startDate[keyIndex]} </span>
                        })}
                    </div>

                    <div className="p-field">
                        <label htmlFor="endDate">Ng??y k???t th??c <span className="item-required"> *</span></label>
                        <Calendar
                            className={Object.keys(objecErrors.endDate).length > 0 ? "error" : null}
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
                        {Object.keys(objecErrors.endDate).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{objecErrors.endDate[keyIndex]} </span>
                        })}
                    </div>
                </Dialog>

                <Dialog visible={editDiscountDialog} style={{ width: '450px' }} header="S???a gi???m gi??" modal footer={editDiscountDialogFooter} onHide={hideDialog}>
                    <div className="confirmation-content">
                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="name">T??n <span className="item-required">*</span></label>
                                <InputText
                                    name="nameEdit"
                                    className={Object.keys(objecErrors.nameEdit).length > 0 ? "error" : null}
                                    id="name"
                                    type="text"
                                    value={objectEdit.name || ''}
                                    onChange={handleOnChange}
                                />
                                {Object.keys(objecErrors.nameEdit).map((keyIndex, key) => {
                                    return <span className="errorMessage" key={key} >{objecErrors.nameEdit[keyIndex]} </span>
                                })}
                            </div>
                            <div className="p-field">
                                <label htmlFor="percentEdit">Gi?? <span className="item-required">*</span></label>
                                <InputNumber
                                    name="percentEdit"
                                    className={Object.keys(objecErrors.percentEdit).length > 0 ? "error" : null}
                                    inputId="percentEdit"
                                    value={objectEdit.price || ''}
                                    onValueChange={handleOnChange}
                                />
                                {Object.keys(objecErrors.percentEdit).map((keyIndex, key) => {
                                    return <span className="errorMessage" key={key} >{objecErrors.percentEdit[keyIndex]} </span>
                                })}
                            </div>
                        </div>
                    </div>
                </Dialog>





                <Dialog
                    visible={discountDialog}
                    style={{ width: '1200px' }}
                    header="T???o gi???m gi??"
                    modal
                    className="p-fluid"
                    footer={discountDialogFooter}
                    onHide={hideDialog}>

                    <div className="card">

                        <DataTable
                            ref={dtDiscount}
                            value={foodForDiscount}
                            selection={selectedDiscount}
                            // onSelectionChange={(e) => setSelectedDiscount(e.value)}
                            onSelectionChange={handleSelectedDiscount}
                            dataKey="id"
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="T???ng {totalRecords} b???n ghi"
                            emptyMessage="Kh??ng c?? d??? li???u"
                            globalFilter={globalFilter}
                            header={header}>

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="id" header="Id" ></Column>
                            <Column field="name" header="T??n" ></Column>
                            {/* <Column header="path" body={imageBodyTemplate}></Column> */}
                            <Column field="price" header="Gi??" body={priceBodyTemplate} ></Column>
                            {/* <Column body={actionBodyDiscountTemplate}></Column> */}
                        </DataTable>


                        <DataTable
                            ref={dtDiscount}
                            value={foodSelected}
                            selection={unSelected}
                            onSelectionChange={(e) => setUnSelected(e.value)}
                            dataKey="id"
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="T???ng {totalRecords} b???n ghi"
                            globalFilter={globalFilterForFoodSelected}
                            emptyMessage="Kh??ng c?? d??? li???u"
                            header={headerTableSelectDiscount}>

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="id" header="Id" ></Column>
                            <Column field="name" header="T??n" ></Column>
                            <Column field="price" header="Gi??" body={priceBodyTemplate} ></Column>
                            <Column headerStyle={{ width: '4rem' }} body={actionBodyDiscountTemplate}></Column>
                        </DataTable>

                    </div>
                </Dialog>

                <Dialog
                    visible={updadteDiscountDialog}
                    style={{ width: '1200px' }}
                    header="S???a gi???m gi??"
                    modal
                    className="p-fluid"
                    footer={updateDiscountDialogFooter}
                    onHide={hideDialog}>

                    <div className="card">
                        <DataTable
                            ref={dtUpdateDiscount}
                            value={updateFoodForDiscount}
                            selection={updateSelectedDiscount}
                            onSelectionChange={handleUpdatedSelectedDiscount}
                            dataKey="id"
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="T???ng {totalRecords} b???n ghi"
                            globalFilter={globalFilterForFoodUpdateSelected}
                            emptyMessage="Kh??ng c?? d??? li???u"
                            header={headerUpdateDiscount}>
                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="id" header="Id" ></Column>
                            <Column field="name" header="T??n" ></Column>
                            <Column field="price" header="Gi??" body={priceBodyTemplate} ></Column>
                            <Column field="percent" header=" % Gi???m gi??" body={percentBodyTemplate}></Column>
                        </DataTable>

                        <DataTable
                            ref={dtUpdateDiscount}
                            value={updatedFoodSelected}
                            selection={unUpdateSelected}
                            onSelectionChange={(e) => setUnUpdateSelected(e.value)}
                            dataKey="id"
                            paginator
                            rows={5}
                            rowsPerPageOptions={[5, 10, 20]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="T???ng {totalRecords} b???n ghi"
                            globalFilter={globalFilterForFoodUnUpdateSelected}
                            emptyMessage="Kh??ng c?? d??? li???u"
                            header={headerTableUpdateSelectDiscount}>
                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="id" header="Id" ></Column>
                            <Column field="name" header="T??n" ></Column>
                            <Column field="price" header="Gi??" body={priceBodyTemplate} ></Column>
                            <Column headerStyle={{ width: '4rem' }} body={actionBodyUpdateDiscountTemplate}></Column>
                        </DataTable>
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

export default Discount
