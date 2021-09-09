
import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CardService from '../../service/CardService';
import OrderService from '../../service/OrderService';
import './Card.css';
import * as moment from "moment";
import { DATA_CARD, MESSAGE_PHONE_FORMAT_ERROR, MESSAGE_REQUIRE, NOT_NUMBER } from '../../constants/ConstantString';
import { isNumber } from '../../constants/FunctionConstant';
import { CardContext } from '../../context/CardContext';





export const Card = ({ match }) => {
    // console.log(`match`, match.params.username)

    const { card, setCard } = useContext(CardContext)


    const [keycloak] = useKeycloak();

    let username = keycloak?.idTokenParsed?.preferred_username;

    let emptyProduct = {
        cardId: null,
        foodId: null,
        name: '',
        imagePath: '',
        price: 0,
        amount: 0,
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    const [position, setPosition] = useState('center');

    const [visibleOrderCard, setVisibleOrderCard] = useState(false)


    const cardService = new CardService();
    const orderService = new OrderService();

    const fetchFoodIntoCard = async () => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)

        let result = await cardService.getAllFoodIntoCardByUsername(1, 5, username);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            // setData(result?.response.listReturn)
            // console.log(`result?.response.listReturn`, result?.response.listReturn)
            setProducts1(result?.response.listReturn)
        }


    }

    const deleteFoodIntoCard = async () => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)

        let result = await cardService.deleteFoodIntoCardByUsername(product.cardId);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            // setData(result?.response.listReturn)
            setProduct({})
            fetchFoodIntoCard();
        }
    }


    const deleteAllFoodIntoCard = async (cardIds) => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)

        let result = await cardService.deleteFoodIntoCardSelected(cardIds);
        if (result?.status === 1000) {
            setProduct({})
            fetchFoodIntoCard();
        }
    }


    const updateAmountIntoCard = async (cardIdParam, amountParam) => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)
        const cardBody = {
            amount: amountParam
        }
        let result = await cardService.updateAmountOfFoodIntoCardById(cardIdParam, cardBody);
        // console.log(`result`, result)
        if (result?.status === 1000) {
            // // setData(result?.response.listReturn)
            // setProduct({})
            fetchFoodIntoCard();
            toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Cập nhập số lượng sản phẩm thành công', life: 3000 });
        }

    }


    const saveOrderFood = async (objParam) => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)

        let result = await orderService.saveOrder(objParam);
        // console.log(`result`, result)
        if (result?.status === 1000) {


            // fetchFoodIntoCard();
            toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Thành công', life: 3000 });
        }

    }








    // const data = [
    //     { "id": "1000", "name": "Bamboo Watch", "description": "Product Description", "image": "bamboo-watch.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 1 },
    //     { "id": "1001", "code": "nvklal433", "name": "Black Watch", "description": "Product Description", "image": "black-watch.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1002", "code": "zz21cz3c1", "name": "Blue Band", "description": "Product Description", "image": "blue-band.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //     { "id": "1003", "code": "244wgerg2", "name": "Blue T-Shirt", "description": "Product Description", "image": "blue-t-shirt.jpg", "price": 29, "category": "Clothing", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 5 },
    //     { "id": "1004", "code": "h456wer53", "name": "Bracelet", "description": "Product Description", "image": "bracelet.jpg", "price": 15, "category": "Accessories", "quantity": 73, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1005", "code": "av2231fwg", "name": "Brown Purse", "description": "Product Description", "image": "brown-purse.jpg", "price": 120, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    //     { "id": "1006", "code": "bib36pfvm", "name": "Chakra Bracelet", "description": "Product Description", "image": "chakra-bracelet.jpg", "price": 32, "category": "Accessories", "quantity": 5, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //     { "id": "1007", "code": "mbvjkgip5", "name": "Galaxy Earrings", "description": "Product Description", "image": "galaxy-earrings.jpg", "price": 34, "category": "Accessories", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 5 },
    //     { "id": "1008", "code": "vbb124btr", "name": "Game Controller", "description": "Product Description", "image": "game-controller.jpg", "price": 99, "category": "Electronics", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 4 },
    //     { "id": "1009", "code": "cm230f032", "name": "Gaming Set", "description": "Product Description", "image": "gaming-set.jpg", "price": 299, "category": "Electronics", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 3 },
    //     { "id": "1010", "code": "plb34234v", "name": "Gold Phone Case", "description": "Product Description", "image": "gold-phone-case.jpg", "price": 24, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    //     { "id": "1011", "code": "4920nnc2d", "name": "Green Earbuds", "description": "Product Description", "image": "green-earbuds.jpg", "price": 89, "category": "Electronics", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1012", "code": "250vm23cc", "name": "Green T-Shirt", "description": "Product Description", "image": "green-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 74, "inventoryStatus": "INSTOCK", "rating": 5 },
    //     { "id": "1013", "code": "fldsmn31b", "name": "Grey T-Shirt", "description": "Product Description", "image": "grey-t-shirt.jpg", "price": 48, "category": "Clothing", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 3 },
    //     { "id": "1014", "code": "waas1x2as", "name": "Headphones", "description": "Product Description", "image": "headphones.jpg", "price": 175, "category": "Electronics", "quantity": 8, "inventoryStatus": "LOWSTOCK", "rating": 5 },
    //     { "id": "1015", "code": "vb34btbg5", "name": "Light Green T-Shirt", "description": "Product Description", "image": "light-green-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 34, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1016", "code": "k8l6j58jl", "name": "Lime Band", "description": "Product Description", "image": "lime-band.jpg", "price": 79, "category": "Fitness", "quantity": 12, "inventoryStatus": "INSTOCK", "rating": 3 },
    //     { "id": "1017", "code": "v435nn85n", "name": "Mini Speakers", "description": "Product Description", "image": "mini-speakers.jpg", "price": 85, "category": "Clothing", "quantity": 42, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1018", "code": "09zx9c0zc", "name": "Painted Phone Case", "description": "Product Description", "image": "painted-phone-case.jpg", "price": 56, "category": "Accessories", "quantity": 41, "inventoryStatus": "INSTOCK", "rating": 5 },
    //     { "id": "1019", "code": "mnb5mb2m5", "name": "Pink Band", "description": "Product Description", "image": "pink-band.jpg", "price": 79, "category": "Fitness", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1020", "code": "r23fwf2w3", "name": "Pink Purse", "description": "Product Description", "image": "pink-purse.jpg", "price": 110, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
    //     { "id": "1021", "code": "pxpzczo23", "name": "Purple Band", "description": "Product Description", "image": "purple-band.jpg", "price": 79, "category": "Fitness", "quantity": 6, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //     { "id": "1022", "code": "2c42cb5cb", "name": "Purple Gemstone Necklace", "description": "Product Description", "image": "purple-gemstone-necklace.jpg", "price": 45, "category": "Accessories", "quantity": 62, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1023", "code": "5k43kkk23", "name": "Purple T-Shirt", "description": "Product Description", "image": "purple-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 5 },
    //     { "id": "1024", "code": "lm2tny2k4", "name": "Shoes", "description": "Product Description", "image": "shoes.jpg", "price": 64, "category": "Clothing", "quantity": 0, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1025", "code": "nbm5mv45n", "name": "Sneakers", "description": "Product Description", "image": "sneakers.jpg", "price": 78, "category": "Clothing", "quantity": 52, "inventoryStatus": "INSTOCK", "rating": 4 },
    //     { "id": "1026", "code": "zx23zc42c", "name": "Teal T-Shirt", "description": "Product Description", "image": "teal-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 3, "inventoryStatus": "LOWSTOCK", "rating": 3 },
    //     { "id": "1027", "code": "acvx872gc", "name": "Yellow Earbuds", "description": "Product Description", "image": "yellow-earbuds.jpg", "price": 89, "category": "Electronics", "quantity": 35, "inventoryStatus": "INSTOCK", "rating": 3 },
    //     { "id": "1028", "code": "tx125ck42", "name": "Yoga Mat", "description": "Product Description", "image": "yoga-mat.jpg", "price": 20, "category": "Fitness", "quantity": 15, "inventoryStatus": "INSTOCK", "rating": 5 },
    //     { "id": "1029", "code": "gwuby345v", "name": "Yoga Set", "description": "Product Description", "image": "yoga-set.jpg", "price": 20, "category": "Fitness", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 8 },

    // ]





    useEffect(() => {
        // fetchFoodIntoCard();
        let data = sessionStorage.getItem(DATA_CARD)
        // console.log(`data`, data)
        setProducts1(JSON.parse(data))

    }, []); // eslint-disable-line react-hooks/exhaustive-deps





    // const productService = new ProductService();

    useEffect(() => {
        // productService.getProducts().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    const openNew = () => {
        // alert('ok')

        setVisibleOrderCard(true);

        // setProduct(emptyProduct);
        // setSubmitted(false);
        // setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        // console.log(`product`, product)
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        // let _products = products.filter(val => val.id !== product.id);
        // setProduct(_products);
        // console.log(`productDelete`, product)

        // deleteFoodIntoCard();

        //Xóa trên table
        let remain = products1.filter((item => item.cardId !== product.cardId));
        console.log(`remain`, remain)
        setProducts1(remain)

        //trên giỏ hàng 
        setCard((card - 1))

        //trong session
        let dataCard = (sessionStorage.getItem(DATA_CARD)?.length < 0 || sessionStorage.getItem(DATA_CARD) === null || sessionStorage.getItem(DATA_CARD) === undefined) ? [] : JSON.parse(sessionStorage.getItem(DATA_CARD))
        console.log(`dataCard`, dataCard)
        let dataCardRemain = dataCard.filter((item => item.cardId !== product.cardId));
        console.log(`dataCardRemain`, dataCardRemain)
        sessionStorage.setItem(DATA_CARD, JSON.stringify(dataCardRemain))

        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Xóa sản phẩm khỏi giỏ hàng thành công', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        // console.log(`selectedProducts`, selectedProducts)
        setDeleteProductsDialog(true);
    }

    const deleteSelectedProducts = () => {
        // let _products = products.filter(val => !selectedProducts.includes(val));
        // setProducts(_products);

        // console.log(`selectedProducts`, Object.values(selectedProducts))
        // let strCardIds = '';
        // selectedProducts.map(e => {
        //     console.log(`e.cardId`, e.cardId)
        //     strCardIds += e.cardId + ','
        // })
        // console.log(`strCardIds`, strCardIds)

        // deleteAllFoodIntoCard(strCardIds);
        sessionStorage.removeItem(DATA_CARD)
        setProducts1(null)
        setCard(0)


        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Xóa các sản phẩm thành công', life: 3000 });
    }

    //  const onCategoryChange = (e) => {
    //     let _product = { ...product };
    //     _product['category'] = e.value;
    //     setProduct(_product);
    // }

    // const onInputChange = (e, name) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _product = { ...product };
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    // }

    // const onInputNumberChange = (e, name) => {
    //     const val = e.value || 0;
    //     let _product = { ...product };
    //     _product[`${name}`] = val;

    //     setProduct(_product);
    // }


    const onClickHandleOrderButton = () => {
        // console.log(`selectedProducts`, selectedProducts)
        if (!keycloak.authenticated) {
            keycloak.login();
            console.log(`username`, username)
            // let username = keycloak?.idTokenParsed?.preferred_username;
            // if (username != undefined) {
            //     sessionStorage.setItem('username', username)
            // }
        } {
            onClick('displayBasic')
        }

    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Đặt hàng" icon="pi pi-plus" className="p-button-success p-mr-2" onClick={onClickHandleOrderButton} disabled={!selectedProducts || !selectedProducts.length} />

                <Button label="Xóa" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
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

    const imageBodyTemplate = (rowData) => {
        // console.log(`rowData`, rowData)
        return <img src={`${rowData.imagePath}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.imagePath} className="product-image" />
    }

    const discountBodyTemplate = (rowData) => {
        if (rowData.percent === null) {
            return <span>{`0 %`}</span>
        } else {
            return <span>{`${rowData.percent} %`}</span>
        }
    }

    const priceBodyTemplate = (rowData) => {
        // console.log(`rowData`, rowData)
        return formatCurrency(rowData.price);
    }

    // const ratingBodyTemplate = (rowData) => {
    //     return <Rating value={rowData.rating} readOnly cancel={false} />;
    // }

    const statusBodyTemplate = (rowData) => {
        return <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                {/* <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={() => editProduct(rowData)} /> */}
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }

    const actionThanhTien = (rowData) => {
        return (
            <React.Fragment>
                <span>{(rowData.amount * rowData.price) - (rowData.amount * rowData.price * rowData.percent) / 100}</span>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="p-m-0">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="Hủy" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Đồng ý" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );


    const [products1, setProducts1] = useState(null);


    const dataTableFuncMap = {
        'products1': setProducts1,

    };

    // useEffect(() => {
    //    setProducts1(data)
    // }, [])



    const onEditorValueChange = (productKey, props, value) => {

        console.log(`productKey`, productKey)
        console.log(`props => cardId`, props.rowData.cardId)
        console.log(`value`, value)

        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        dataTableFuncMap[`${productKey}`](updatedProducts);

        updateAmountIntoCard(props.rowData.cardId, value);


    }

    const amountEditor = (productKey, props) => {
        // console.log(`productKey`, productKey)
        // console.log(`props`, props)
        // console.log(`props.rowData['amount']`, props.rowData['amount'])
        return <InputNumber value={props.rowData['amount']} onValueChange={(e) => onEditorValueChange(productKey, props, e.value)} showButtons min={1} max={50} />
    }


    const [displayBasic, setDisplayBasic] = useState(false);

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }



    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,

    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const onResetInput = () => {

    }

    const handleOnYesDialog = (name) => {

        // console.log(`objOrder`, objOrder)
        // console.log(`dataOder`, dataOrder)

        if (formValidation()) {

            let newData = dataOrder.map(obj => {
                // console.log(`obj`, obj.foodId)
                return {
                    foodId: obj.foodId,
                    amount: obj.amount,
                    money: obj.money
                }
            })

            // console.log(`newData`, newData)
            const objParam = {
                ...objOrder,
                orderDetails: newData
            }
            // console.log(`objParam`, objParam)

            // console.log(`keycloak`, keycloak?.idTokenParsed);

            saveOrderFood(objParam)
            setSelectedProducts(null);


            setObjOrder(
                {
                    username: keycloak?.idTokenParsed?.preferred_username,
                    address: '',
                    phone: '',
                    note: '',
                    dateOrder: moment().format("DD/MM/yy HH:mm:ss"),

                }
            )
            // xong thì tắt dialog
            onHide(name)


        }

    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button
                    label="Hủy"
                    icon="pi pi-times"
                    onClick={() => onHide('displayBasic')}
                    // onClick={handleOnCloseDialog}
                    className="p-button-text"
                />
                <Button
                    label="Đồng ý"
                    icon="pi pi-check"
                    // onClick={() => onHide(name)}
                    onClick={() => handleOnYesDialog('displayBasic')}
                    autoFocus
                />
            </div>
        );
    };

    // const [cities2, setCities2] = useState([]);
    // const [city2, setCity2] = useState(null);
    const [dataOrder, setDataOrder] = useState([]);
    // const [chooseAddress, setChooseAddress] = useState(null);

    const handleOnSelectedChange = (e) => {
        console.log(`username`, username)
        setObjOrder({
            ...objOrder,
            username: username
        })
        let array = [];
        setSelectedProducts(e.value)
        e.value.forEach(element => {
            element.money = (element.amount * element.price) - (element.amount * element.price * element.percent) / 100
            array.push(element);
        });
        setDataOrder(array)
    }

    // console.log(`keycloak`, keycloak?.idTokenParsed)

    const [objOrder, setObjOrder] = useState({
        username: sessionStorage.getItem('username'),
        address: '',
        phone: '',
        note: '',
        dateOrder: moment().format("DD/MM/yy HH:mm:ss"),

    })

    const handleOnChange = (e) => {
        // debugger
        // console.log(`e`, e)
        const eTN = e.target.name;
        const value = e.target.value
        // console.log(`eTN`, eTN)
        if (eTN === 'address') {
            // console.log(`e.target.value`, e.target.value)
            if (value.length > 0) {
                setAddressErrors("")
            } else {
                setAddressErrors(MESSAGE_REQUIRE)
            }

            // console.log(`e.value`, e.target.value)
            setObjOrder(
                {
                    ...objOrder,
                    address: e.target.value
                }
            )
        }
        if (eTN === 'phone') {
            setObjOrder(
                {
                    ...objOrder,
                    phone: e.target.value
                }
            )
        }
        if (eTN === 'note') {
            setObjOrder(
                {
                    ...objOrder,
                    note: e.target.value
                }
            )
        }


    }

    const [addressErrors, setAddressErrors] = useState({});
    const [phoneErrors, setPhoneErrors] = useState({});

    const formValidation = () => {
        // console.log(`formValidation`)
        // debugger
        const addressErrors = {}
        const phoneErrors = {}

        // console.log(`String(objOrder.phone).length`, String(objOrder.phone).length)

        let isValid = true;

        if (objOrder.address === '') {
            addressErrors.addressRequired = MESSAGE_REQUIRE;
            isValid = false;
        }

        if (objOrder.phone === '') {
            phoneErrors.phoneErrorRequired = MESSAGE_REQUIRE;
            isValid = false;
        }
        if (!isNumber(objOrder.phone)) {
            console.log(`cisNumber`)
            phoneErrors.phoneErrorNotNumber = NOT_NUMBER;
            isValid = false;
        }
        if ((String(objOrder.phone).length < 0 && String(objOrder.phone).length > 10) || String(objOrder.phone).length != 10) {
            // console.log(`co vao `)
            phoneErrors.phoneErrorNotFormat = MESSAGE_PHONE_FORMAT_ERROR;
            isValid = false;
        }
        //=====================

        setAddressErrors(addressErrors);
        setPhoneErrors(phoneErrors);

        return isValid;
    }



    return (

        <div className={"card"}>
            <div className="card-body">
                <div className="datatable-crud-demo ">
                    <Toast ref={toast} />

                    <div className="card">

                        <Toolbar className="p-mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                        <DataTable ref={dt} value={products1}
                            selection={selectedProducts}
                            onSelectionChange={(e) => handleOnSelectedChange(e)}
                            dataKey="cardId"
                            paginator rows={5}
                            rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            currentPageReportTemplate="Tổng {totalRecords} món"
                            globalFilter={globalFilter}
                            emptyMessage="Không có dữ liệu"
                        // header={header}
                        >

                            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                            <Column field="cardId" header="Id" ></Column>
                            <Column field="name" header="Tên" ></Column>
                            {/* <Column field="price" header="Giá" body={priceBodyTemplate} ></Column> */}
                            <Column field="amount" header="Số lượng" editor={(props) => amountEditor('products1', props)} ></Column>
                            <Column header="Ảnh" body={imageBodyTemplate}></Column>

                            <Column header="Giảm giá" body={discountBodyTemplate} ></Column>
                            {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column> */}
                            {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable></Column> */}
                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>
                    </div>



                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Bạn có chắc chắn muốn xóa <b>{product.name}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Xác nhận" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle p-mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Bạn có chắc chắn xóa hết các sản phẩm đang chọn?</span>}
                        </div>
                    </Dialog>
                </div>


                <Dialog header="Đặt hàng" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                    <div className="p-fluid">
                        <div className="p-field p-grid">
                            <label htmlFor="tenkhachhang" className="p-col-12 p-md-3">Tên khách hàng <span className="item-required"> *</span></label>
                            <div className="p-col-12 p-md-9">
                                <InputText id="tenkhachhang" type="text" value={objOrder.username || ''} onChange={handleOnChange} readOnly={true} />
                            </div>
                        </div>

                        {/* <div className="p-field p-grid">
                        <label htmlFor="chondiachi" className="p-col-12 p-md-3">Chọn địa chỉ</label>
                        <div className="p-col-12 p-md-9 p-formgroup-inline">
                            <div className="p-field-checkbox">
                                <RadioButton inputId="chooseAddress1" name="chooseAddress" value="default" onChange={handleOnChange} checked={chooseAddress === 'default'} />
                                <label htmlFor="chooseAddress1">Mặc định</label>
                            </div>
                            <div className="p-field-checkbox">
                                <RadioButton inputId="chooseAddress2" name="chooseAddress" value="other" onChange={handleOnChange} checked={chooseAddress === 'other'} />
                                <label htmlFor="chooseAddress2">Khác</label>
                            </div>
                        </div>
                    </div> */}


                        <div className="p-field p-grid">
                            <label htmlFor="address" className="p-col-12 p-md-3">Địa chỉ  <span className="item-required"> *</span></label>
                            <div className="p-col-12 p-md-9">
                                <InputTextarea
                                    className={Object.keys(addressErrors).length > 0 ? "error" : null}
                                    name="address"
                                    rows={2}
                                    cols={30}
                                    autoResize
                                    value={objOrder.address}
                                    onChange={handleOnChange} />
                                {Object.keys(addressErrors).map((keyIndex, key) => {
                                    return <span className="errorMessage" key={key} >{addressErrors[keyIndex]} <br></br></span>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="p-fluid">
                        <div className="p-field p-grid">
                            <label htmlFor="phone" className="p-col-12 p-md-3">Số điện thoại <span className="item-required">*</span></label>
                            <div className="p-col-12 p-md-9">
                                <InputText
                                    className={Object.keys(phoneErrors).length > 0 ? "error" : null}
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    value={objOrder.phone}
                                    onChange={handleOnChange} />
                                {Object.keys(phoneErrors).map((keyIndex, key) => {
                                    return <span
                                        className="errorMessage"
                                        key={key}
                                    >{phoneErrors[keyIndex]}
                                        <br></br>
                                    </span>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="p-fluid">
                        <div className="p-field p-grid">
                            <label htmlFor="note" className="p-col-12 p-md-3">Ghi chú</label>
                            <div className="p-col-12 p-md-9">
                                <InputTextarea
                                    name="note"
                                    rows={4}
                                    cols={30}
                                    autoResize
                                    value={objOrder.note}
                                    onChange={handleOnChange} />
                            </div>
                        </div>

                    </div>

                    <div className="datatable-crud-demo ">
                        <DataTable ref={dt}
                            value={dataOrder}
                            dataKey="id"
                        >

                            {/* <Column headerStyle={{ width: '3rem' }}></Column> */}
                            <Column field="cardId" header="Id" ></Column>
                            <Column field="name" header="Tên" ></Column>
                            <Column field="price" header="Giá" body={priceBodyTemplate} ></Column>
                            <Column field="amount" header="Số lượng"  ></Column>
                            <Column header="Giảm giá" body={discountBodyTemplate} ></Column>
                            <Column field="money" header="Thành tiền" />
                        </DataTable>
                    </div>
                </Dialog>

            </div>

        </div>
    );

















}
export default Card;