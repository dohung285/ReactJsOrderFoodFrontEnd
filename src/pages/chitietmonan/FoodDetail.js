

import { useKeycloak } from '@react-keycloak/web';
import axios from 'axios';
import * as moment from "moment";
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DATA_CARD, MESSAGE_PHONE_FORMAT_ERROR, MESSAGE_REQUIRE, NOT_NUMBER } from '../../constants/ConstantString';
import { isNumber } from '../../constants/FunctionConstant';
import { CardContext } from '../../context/CardContext';
import CardService from '../../service/CardService';
import CommentService from '../../service/CommentService';
import FoodService from '../../service/FoodService';
import OrderService from '../../service/OrderService';
import DetailsThumb from './DetailsThumb';
import './FoodDetail.css';

export const FoodDetail = ({ match }) => {
    // console.log(`match`, match.params.id)
    let foodId = match.params.id;

    const { card, setCard } = useContext(CardContext)

    const foodService = new FoodService();
    const cardService = new CardService();
    const orderService = new OrderService();
    const commentService = new CommentService();

    const [currentImage, setCurrentImage] = useState('')

    const [valueAmount, setValueAmount] = useState(1)
    const [stars, setStars] = useState([])

    // const [dataOfCard, setdataOfCard] = useState([])

    const [keycloak] = useKeycloak();
    const toast = useRef(null);



    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: message, life: 3000 });
    }

    const showInfo = (message) => {
        toast.current.show({ severity: 'info', summary: 'Info Message', detail: message, life: 3000 });
    }

    const showWarn = (message) => {
        toast.current.show({ severity: 'warn', summary: 'Warn Message', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Lỗi', detail: message, life: 3000 });
    }



    const [products, setProducts] = useState([])
    const [orderObj, setOrderObj] = useState(
        {
            address: '',
            phone: '',
            username: keycloak?.idTokenParsed?.preferred_username,
            dateOrder: moment().format("DD/MM/yy HH:mm:ss"),
            note: '',
        }
    )

    const [orderDetailObj, setOrderDetailObj] = useState({
        foodId: foodId,
        amount: 1,
        money: null
    })

    const [objectCommentErrors, setObjectCommentErrors] = useState({

        rating: 0,
        comment: ''

    })

    const [objectComment, setObjectComment] = useState({
        foodId: foodId,
        username: keycloak?.idTokenParsed?.preferred_username,
        rating: 0,
        content: ''
    })

    // const fetchFoodDetailByFoodId = async () => {
    //     // console.log(`keycloak`, keycloak?.idTokenParsed?.preferred_username)
    //     const result = await foodService.getFoodDetailByFoodId(foodId);
    //     // console.log(`result`, result)
    //     if (result?.status == 1000) {
    //         // console.log(`có vao day`, result?.object)

    //         setProducts(result?.object);
    //         // tạo sẵn dữ liệu
    //         const { price, percent } = result?.object;
    //         let money = null;
    //         if (percent === null) {

    //             //th giảm giá bằng 0
    //             money = valueAmount * price
    //         } else {
    //             // có giảm giá
    //             money = (valueAmount * price) - (valueAmount * price * percent) / 100
    //         }
    //         //update orderDetailObj
    //         setOrderDetailObj(
    //             {
    //                 ...orderDetailObj,
    //                 money: money
    //             }
    //         )
    //     }
    // };

    const fetchFoodDetailByFoodId = async () => {

        axios.get(`http://localhost:8082/services/orderfood/api/food/foodDetail?foodId=${foodId}`)
            .then(res => {
                // console.log(`res`, res?.data?.object)
                let result = res?.data?.object
                if (result) {

                    setProducts(result);
                    // tạo sẵn dữ liệu
                    const { price, percent } = result;
                    let money = null;
                    if (percent === null) {

                        //th giảm giá bằng 0
                        money = valueAmount * price
                    } else {
                        // có giảm giá
                        money = (valueAmount * price) - (valueAmount * price * percent) / 100
                    }
                    //update orderDetailObj
                    setOrderDetailObj(
                        {
                            ...orderDetailObj,
                            money: money
                        }
                    )
                }
            }).catch(err => {
                console.log("Error fetchFoodDetailByFoodId()", { ...err });
            })
    };




    const saveOrderFood = async (objParam) => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)

        let result = await orderService.saveOrder(objParam);
        // console.log(`saveOrderFood`, result)
        if (result?.status === 1000) {

            // fetchFoodIntoCard();
            toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Thành công', life: 3000 });
        }

    }

    // const countStarAPI = async () => {
    //     // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
    //     // console.log(`product.cardId`, product.cardId)
    //     let result = await commentService.countStar(foodId);
    //     // console.log(`countStarAPI`, result)
    //     if (result?.status === 1000) {
    //         setStars(result?.object);
    //     }

    // }

    const countStarAPI = async () => {

        axios.get(`http://localhost:8082/services/orderfood/api/countStar?foodId=${foodId}`)
            .then(res => {
                // console.log(`res`, res?.data?.object)
                let result = res?.data?.object
                if (result) {
                    setStars(result);
                }
            }).catch(err => {
                console.log("Error countStarAPI()", { ...err });
            })
    }


    // const getAllCommentByFoodIdAPI = async () => {

    //     // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
    //     // console.log(`product.cardId`, product.cardId)

    //     let result = await commentService.getAllCommentByFoodId(foodId);
    //     console.log(`getAllCommentByFoodIdAPI`, result)
    //     if (result?.status === 1000) {
    //         setComments(result?.list)
    //     }

    // }

    const getAllCommentByFoodIdAPI = async () => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)
        axios.get(`http://localhost:8082/services/orderfood/api/comment/${foodId}`)
            .then(res => {
                // console.log(`res`, res?.data?.list)
                let result = res?.data?.list
                if (result) {
                    setComments(result)
                }
            }).catch(err => {
                console.log("Error getAllCommentByFoodIdAPI()", { ...err });
            })
    }






    const saveCommentAPI = async (dataBody) => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)

        let result = await commentService.save(dataBody);
        console.log(`saveCommentAPI`, result)
        if (result?.status === 1000) {
            showSuccess('Thành công!')
            getAllCommentByFoodIdAPI();
        }

    }




    const onChangeAmount = (e) => {
        // console.log(`e`, e);
        setValueAmount(e.value)
        setOrderDetailObj(
            {
                ...orderDetailObj,
                amount: e.value
            }
        )

        let price = products?.price;
        let amount = e.value;
        let percent = products?.percent;
        let money = null;

        if (percent === null) {

            //th giảm giá bằng 0
            money = valueAmount * price
            // console.log(`case nay percent`, money)
        } else {
            // có giảm giá
            money = (valueAmount * price) - (valueAmount * price * percent) / 100
        }


        setOrderDetailObj(
            {
                ...orderDetailObj,
                money: money
            }
        )

    }


    const saveCard = async (products) => {

        // console.log(`products`, products)
        const obj = {
            cardId: products?.id,
            name: products?.name,
            price: products?.price,
            amount: valueAmount,
            imagePath: products?.listImage[0],
            percent: products.percent
        }

        // Lấy ra được mảng hiện tại trong session
        let dataCard = (sessionStorage.getItem(DATA_CARD)?.length < 0  || sessionStorage.getItem(DATA_CARD) === null || sessionStorage.getItem(DATA_CARD) === undefined )? [] : JSON.parse(sessionStorage.getItem(DATA_CARD))
        console.log(`dataCard`, dataCard)

        // Kiểm tra xem nó đã tồn tại hay chưa nếu rồi thì update nó
        let x = dataCard?.filter(e => e.cardId === obj.cardId);
        if (x?.length > 0){
            let objIndex = dataCard.findIndex((item => item.cardId == obj.cardId));
            console.log(`objIndex`, objIndex)
            //update
            dataCard[objIndex] = obj
            console.log(`after dataCard`, dataCard)
        }else{
            dataCard.push(obj)
            setCard(1 + card)
        }

        sessionStorage.setItem(DATA_CARD, JSON.stringify(dataCard))

       

        // if (!keycloak.authenticated) {
        //     keycloak.login();
        // } else {

        // const cardBody = {
        //     foodId: foodId,
        //     amount: valueAmount,
        //     username: keycloak?.idTokenParsed?.preferred_username,
        // }
        // const result = await cardService.saveCard(cardBody);
        // // console.log(`result`, result)
        // if (result?.status == 1000) {
        //     showSuccess("Thêm vào giỏ hàng thành công!")
        // }

        // }

    };

    const onByProduct = () => {
        if (!keycloak.authenticated) {
            keycloak.login();
        } else {
            setDisplayBasic(true)
        }


    }




    // console.log(`check`, Array.isArray(products))


    const [index, setIndex] = useState(0)


    const myRef = React.createRef();

    const handleTab = index => {
        setCurrentImage(products?.listImage[index]);
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };

    let dataOfCard = [];

    useEffect(() => {
        if (products?.listImage) {
            // console.log(`products?.listImage[0]`, products?.listImage[0])
            setCurrentImage(products?.listImage[0]);
        }
    }, [products])
    useEffect(() => {
        fetchFoodDetailByFoodId();
        countStarAPI();
        getAllCommentByFoodIdAPI()


        // myRef.current.children[index].className = "active";

    }, [])


    const [displayBasic, setDisplayBasic] = useState(false);
    const [displayComment, setDisplayComment] = useState(false)


    const [position, setPosition] = useState('center');
    const dt = useRef(null);


    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const formatCurrency = (value) => {
        return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    }

    const priceBodyTemplate = (rowData) => {
        // console.log(`rowData`, rowData)
        return formatCurrency(rowData.price);
    }

    const discountBodyTemplate = (rowData) => {
        if (rowData.percent === null) {
            return <span>{`0 %`}</span>
        } else {
            return rowData.percent
        }
    }


    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'displayComment': setDisplayComment,

    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);

        setPhoneErrors({})
        setAddressErrors({})
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

    const renderCommentFooter = (name) => {
        return (
            <div>
                <Button
                    label="Hủy"
                    icon="pi pi-times"
                    onClick={() => onHide('displayComment')}
                    className="p-button-text"
                />
                <Button
                    label="Đồng ý"
                    icon="pi pi-check"
                    // onClick={() => onHide(name)}
                    onClick={() => handleOnYesDialogComment('displayComment')}
                    autoFocus
                />
            </div>
        );
    };


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
            setOrderObj(
                {
                    ...orderObj,
                    address: e.target.value
                }
            )
        }
        if (eTN === 'phone') {
            setOrderObj(
                {
                    ...orderObj,
                    phone: e.target.value
                }
            )
        }
        if (eTN === 'note') {
            setOrderObj(
                {
                    ...orderObj,
                    note: e.target.value
                }
            )
        }

        if (eTN === 'rating') {
            // console.log(`valueRating`, value)
            if (value > 0) {
                setObjectCommentErrors(
                    {
                        ...objectCommentErrors,
                        rating: ''
                    }
                )
            } else {
                setObjectCommentErrors(
                    {
                        ...objectCommentErrors,
                        rating: MESSAGE_REQUIRE
                    }
                )
            }

            setObjectComment(
                {
                    ...objectComment,
                    rating: e.target.value
                }
            )
        }

        if (eTN === 'comment') {
            if (value.length > 0) {
                setObjectCommentErrors(
                    {
                        ...objectCommentErrors,
                        comment: ''
                    }
                )
            } else {
                setObjectCommentErrors(
                    {
                        ...objectCommentErrors,
                        comment: MESSAGE_REQUIRE
                    }
                )
            }
            setObjectComment(
                {
                    ...objectComment,
                    content: e.target.value
                }
            )
        }


    }

    const [addressErrors, setAddressErrors] = useState({});
    const [phoneErrors, setPhoneErrors] = useState({});

    const formValidationComment = () => {
        const ratingErrors = {}
        const commentErrors = {}
        let isValid = true;

        if (objectComment.rating === 0) {
            ratingErrors.required = MESSAGE_REQUIRE
            isValid = false
        }

        if (objectComment.content === '') {
            commentErrors.required = MESSAGE_REQUIRE
            isValid = false
        }

        setObjectCommentErrors(
            {
                ...objectCommentErrors,
                rating: ratingErrors,
                comment: commentErrors
            }
        )
        return isValid;
    }

    const formValidation = () => {
        // console.log(`formValidation`)
        // debugger
        const addressErrors = {}
        const phoneErrors = {}

        // console.log(`String(objOrder.phone).length`, String(objOrder.phone).length)

        let isValid = true;

        if (orderObj.address === '') {
            addressErrors.addressRequired = MESSAGE_REQUIRE;
            isValid = false;
        }

        if (orderObj.phone === '') {
            phoneErrors.phoneErrorRequired = MESSAGE_REQUIRE;
            isValid = false;
        }
        if (!isNumber(orderObj.phone)) {
            console.log(`isNumber`)
            phoneErrors.phoneErrorNotNumber = NOT_NUMBER;
            isValid = false;
        }
        if ((String(orderObj.phone).length < 0 && String(orderObj.phone).length > 10) || String(orderObj.phone).length != 10) {
            // console.log(`co vao `)
            phoneErrors.phoneErrorNotFormat = MESSAGE_PHONE_FORMAT_ERROR;
            isValid = false;
        }
        //=====================

        setAddressErrors(addressErrors);
        setPhoneErrors(phoneErrors);

        return isValid;
    }


    const handleOnYesDialog = (name) => {
        // console.log("handleOnYesDialog")
        // console.log(`orderObj`, orderObj)
        // console.log(`orderDetailObj`, orderDetailObj)

        if (formValidation()) {

            let newArrayDetail = [];
            newArrayDetail.push(orderDetailObj)

            const objParam = {
                ...orderObj,
                orderDetails: newArrayDetail
            }

            console.log(`objParam`, objParam)
            saveOrderFood(objParam)

            // let newData = dataOrder.map(obj => {
            //     // console.log(`obj`, obj.foodId)
            //     return {
            //         foodId: obj.foodId,
            //         amount: obj.amount,
            //         money: obj.money
            //     }
            // })

            // // console.log(`newData`, newData)
            // const objParam = {
            //     ...objOrder,
            //     orderDetails: newData
            // }
            // console.log(`objParam`, objParam)

            // saveOrderFood(objParam)
            // setSelectedProducts(null);


            // setObjOrder(
            //     {
            //         username: keycloak?.idTokenParsed?.name,
            //         address: '',
            //         phone: '',
            //         note: '',
            //         dateOrder: moment().format("DD/MM/yy HH:mm:ss"),

            //     }
            // )


            // xong thì tắt dialog
            onHide(name)
        }

    }

    const handleOnYesDialogComment = (name) => {


        if (formValidationComment()) {

            console.log(`objecComment`, objectComment)
            saveCommentAPI(objectComment);
            // getAllCommentByFoodIdAPI();

            onHide(name)
        }

    }


    useEffect(() => {
        // setComments(data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const [comments, setComments] = useState(null)
    const [layout, setLayout] = useState('list');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
    ];

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    const renderListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <img style={{ width: '80px' }} src={`showcase/demo/images/product/${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name" style={{ fontSize: '1rem', fontWeight: '500' }}>{data.username}</div>
                        <div className="product-description" style={{ fontSize: '1rem', fontWeight: '300' }}>{data.content}</div>
                        <Rating value={data.rating} readOnly cancel={false}></Rating>
                        {/* <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span> */}
                    </div>
                    <div className="product-list-action">
                        {/* <span className="product-price">${data.price}</span> */}
                        {/* <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                    </div>
                </div>
            </div>
        );
    }


    const itemTemplate = (comment, layout) => {
        if (!comment) {
            return;
        }

        if (layout === 'list')
            return renderListItem(comment);

    }

    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{ textAlign: 'left' }}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const header = renderHeader();

    const handleOnCommet = () => {
        if (!keycloak.authenticated) {
            keycloak.login();
        } else {
            setDisplayComment(true)
        }

    }







    return (
        <div>
            <Toast ref={toast} position="top-right" />
            <div className="app card">

                <div className="details" >
                    <div className="big-img">
                        <img src={currentImage} alt="" key={index} />
                    </div>

                    <div className="box">
                        <div className="row">
                            <h2 style={{ fontWeight: '600', fontSize: '1rem' }}>{products.name}</h2>
                            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{products.price} VNĐ</span>
                        </div>

                        <span style={{ fontWeight: '600', fontSize: '1rem' }}>Giảm giá: {products.percent === null ? 0 : products.percent} %</span>


                        <p style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>{products.description}</p>

                        <DetailsThumb images={products?.listImage} tab={handleTab} myRef={myRef} />

                        <div className="p-field p-col-12 p-md-3">
                            <InputNumber inputId="minmax-buttons" value={valueAmount} onValueChange={e => onChangeAmount(e)} mode="decimal" showButtons min={0} max={20} />
                        </div>

                        <Button icon="pi pi-shopping-cart" label="Giỏ hàng" style={{ marginRight: '30px' }} onClick={() => saveCard(products)}></Button>
                        <Button icon="pi pi-shopping-cart" label="Mua ngay" onClick={() => onByProduct()} ></Button>
                    </div>
                </div>



            </div>

            <div className="app card">

                <div className="p-d-flex p-flex-row ">

                </div>

                <div className="p-d-flex p-jc-between p-pl-6 p-pt-4">
                    <div>
                        <span className="heading ">Đánh giá</span>

                    </div>

                    <div>
                        <Rating className="p-pt-2" value={5} readOnly stars={5} cancel={false} />
                    </div>

                    <div className="p-mr-4">
                        <Button label="Bình luận" className="p-button-raised p-button-success p-button-text" onClick={handleOnCommet} />
                    </div>
                </div>




                <hr style={{ border: '3px solid #f1f1f1' }} />
                <div className="row">
                    <div className="side">
                        <div>5 sao</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar-5" />
                        </div>
                    </div>
                    <div className="side right">
                        <div>{stars[0]}</div>
                    </div>
                    <div className="side">
                        <div>4 sao</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar-4" />
                        </div>
                    </div>
                    <div className="side right">
                        {/* <div>63</div> */}
                        <div>{stars[1]}</div>
                    </div>
                    <div className="side">
                        <div>3 sao</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar-3" />
                        </div>
                    </div>
                    <div className="side right">
                        {/* <div>15</div> */}
                        <div>{stars[2]}</div>
                    </div>
                    <div className="side">
                        <div>2 sao</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar-2" />
                        </div>
                    </div>
                    <div className="side right">
                        {/* <div>6</div> */}
                        <div>{stars[3]}</div>
                    </div>
                    <div className="side">
                        <div>1 sao</div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar-1" />
                        </div>
                    </div>
                    <div className="side right">
                        {/* <div>20</div> */}
                        <div>{stars[4]}</div>
                    </div>
                </div>

                <div className="dataview-demo p-pt-4">
                    <div className="card">
                        <DataView
                            value={comments}
                            layout={layout}
                            // header={header}
                            itemTemplate={itemTemplate}
                            paginator
                            rows={5}
                            sortOrder={sortOrder}
                            sortField={sortField}
                        />
                    </div>
                </div>


            </div>


            <Dialog
                header="Đánh giá sản phẩm"
                visible={displayComment}
                style={{ width: '50vw' }}
                footer={renderCommentFooter('displayBasic')}
                onHide={() => onHide('displayComment')}
            >
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="rating">Đánh giá <span className="item-required">*</span></label>
                        <Rating
                            className={Object.keys(objectCommentErrors.rating).length > 0 ? "error" : null}
                            name="rating"
                            id="rating"
                            cancel={false}
                            value={objectComment.rating}
                            onChange={handleOnChange}
                        />
                        {Object.keys(objectCommentErrors.rating).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{objectCommentErrors.rating[keyIndex]} <br></br></span>
                        })}
                    </div>
                    <div className="p-field">
                        <label htmlFor="comment">Bình luận <span className="item-required">*</span></label>
                        <InputTextarea
                            className={Object.keys(objectCommentErrors.comment).length > 0 ? "error" : null}
                            name="comment"
                            id="comment"
                            rows={5}
                            cols={30}
                            value={objectComment.content}
                            onChange={handleOnChange} />
                        {Object.keys(objectCommentErrors.comment).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{objectCommentErrors.comment[keyIndex]} <br></br></span>
                        })}
                    </div>
                </div>
            </Dialog>




            <Dialog header="Đặt hàng" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
                <div className="p-fluid">
                    <div className="p-field p-grid">
                        <label htmlFor="tenkhachhang" className="p-col-12 p-md-3">Tên khách hàng <span className="item-required"> *</span></label>
                        <div className="p-col-12 p-md-9">
                            <InputText id="tenkhachhang" type="text" value={orderObj.username} readOnly={true} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="address" className="p-col-12 p-md-3">Địa chỉ  <span className="item-required"> *</span></label>
                        <div className="p-col-12 p-md-9">
                            <InputTextarea
                                className={Object.keys(addressErrors).length > 0 ? "error" : null}
                                name="address"
                                rows={2}
                                cols={30}
                                autoResize
                                value={orderObj.address}
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
                                value={orderObj.phone}
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
                                value={orderObj.note}
                                onChange={handleOnChange} />
                        </div>
                    </div>
                </div>

                <div className="datatable-crud-demo ">

                    <div className="p-field p-grid">
                        <label htmlFor="name" className="p-col-12 p-md-3">Tên món ăn <span className="item-required"> *</span></label>
                        <div className="p-col-12 p-md-9">
                            <InputText id="name" type="text" value={products.name} readOnly={true} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="price" className="p-col-12 p-md-3">Giá <span className="item-required"> *</span></label>
                        <div className="p-col-12 p-md-9">
                            <InputText id="price" type="text" value={`${products.price} VNĐ`} readOnly={true} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="amount" className="p-col-12 p-md-3">Số lượng <span className="item-required"> *</span></label>
                        <div className="p-col-12 p-md-9">
                            <InputText id="amount" type="text" value={valueAmount} readOnly={true} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="discount" className="p-col-12 p-md-3">Giám giá <span className="item-required"> *</span></label>
                        <div className="p-col-12 p-md-9">
                            <InputText id="discount" type="text" value={`${((products.percent === null) ? 0 : products.percent)} %`} onChange={handleOnChange} readOnly={true} />
                        </div>
                    </div>

                    <div className="p-field p-grid">
                        <label htmlFor="money" className="p-col-12 p-md-3">Tiền <span className="item-required"> *</span></label>
                        <div className="p-col-12 p-md-9">
                            <InputText id="money" type="text" value={`${orderDetailObj.money} VNĐ`} onChange={handleOnChange} readOnly={true} />
                        </div>
                    </div>
                </div>
            </Dialog>




        </div>
    );


















    // const images = [
    //     {
    //         "itemImageSrc": "../../img/banh-mi-cay-hai-phong.jpg",
    //         "thumbnailImageSrc": "../../img/banh-mi-cay-hai-phong.jpg",
    //         "alt": "Description for Image 1",
    //         "title": "Title 1"
    //     },
    //     {
    //         "itemImageSrc": "../../img/banh-mi-chung.jpg",
    //         "thumbnailImageSrc": "../../img/banh-mi-chung.jpg",
    //         "alt": "Description for Image 2",
    //         "title": "Title 2"
    //     },
    //     {
    //         "itemImageSrc": "../../img/banh-mi-dan-to.jpg",
    //         "thumbnailImageSrc": "../../img/banh-mi-dan-to.jpg",
    //         "alt": "Description for Image 3",
    //         "title": "Title 3"
    //     },
    //     {
    //         "itemImageSrc": "../../img/banh-mi-kep-thit-nguoi.jpg",
    //         "thumbnailImageSrc": "../../img/banh-mi-kep-thit-nguoi.jpg",
    //         "alt": "Description for Image 4",
    //         "title": "Title 4"
    //     },
    //     {
    //         "itemImageSrc": "../../img/banh-mi-nuong-muoi-ot.jpg",
    //         "thumbnailImageSrc": "../../img/banh-mi-nuong-muoi-ot.jpg",
    //         "alt": "Description for Image 5",
    //         "title": "Title 5"
    //     },
    //     {
    //         "itemImageSrc": "../../img/banh-mi-pate.jpg",
    //         "thumbnailImageSrc": "../../img/banh-mi-pate.jpg",
    //         "alt": "Description for Image 6",
    //         "title": "Title 6"
    //     },
    // ];

    // const responsiveOptions = [
    //     {
    //         breakpoint: '1024px',
    //         numVisible: 5
    //     },
    //     {
    //         breakpoint: '768px',
    //         numVisible: 3
    //     },
    //     {
    //         breakpoint: '560px',
    //         numVisible: 1
    //     }
    // ];


    // const itemTemplate = (item) => {
    //     return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
    // }

    // const thumbnailTemplate = (item) => {
    //     return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
    // }


    // return (
    //     <div>
    //         FoodDetail {match.params.id}
    //         <div className="p-grid">
    //             <div className="p-col-6">
    //                 <div>
    //                     <div className="card">
    //                         <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '640px' }}
    //                             item={itemTemplate} thumbnail={thumbnailTemplate} circular autoPlay transitionInterval={2000} />
    //                     </div>
    //                 </div>
    //             </div>
    //             <div className="p-col-6">6</div>

    //         </div>
    //     </div>
    // )
}
export default FoodDetail;
