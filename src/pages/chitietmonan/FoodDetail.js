

import { useKeycloak } from '@react-keycloak/web';
import * as moment from "moment";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';
import React, { useEffect, useRef, useState } from 'react';
import { MESSAGE_PHONE_FORMAT_ERROR, MESSAGE_REQUIRE, NOT_NUMBER } from '../../constants/ConstantString';
import { isNumber } from '../../constants/FunctionConstant';
import CardService from '../../service/CardService';
import FoodService from '../../service/FoodService';
import OrderService from '../../service/OrderService';
import DetailsThumb from './DetailsThumb';
import './FoodDetail.css';

export const FoodDetail = ({ match }) => {
    // console.log(`match`, match.params.id)
    let foodId = match.params.id;

    const foodService = new FoodService();
    const cardService = new CardService();
    const orderService = new OrderService();

    const [currentImage, setCurrentImage] = useState('')

    const [valueAmount, setValueAmount] = useState(1)

    const [keycloak] = useKeycloak();
    const toast = useRef(null);



    const showSuccess = (message) => {
        toast.current.show({ severity: 'Thành công', summary: 'Success Message', detail: message, life: 3000 });
    }

    const showInfo = (message) => {
        toast.current.show({ severity: 'Thông tin', summary: 'Info Message', detail: message, life: 3000 });
    }

    const showWarn = (message) => {
        toast.current.show({ severity: 'Cảnh báo', summary: 'Warn Message', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'Lỗi', summary: 'Lỗi', detail: message, life: 3000 });
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

    const fetchFoodDetailByFoodId = async () => {

        // console.log(`keycloak`, keycloak?.idTokenParsed?.preferred_username)

        const result = await foodService.getFoodDetailByFoodId(foodId);
        console.log(`result`, result)
        if (result?.status == 1000) {
            // console.log(`có vao day`, result?.object)

            setProducts(result?.object);

            // tạo sẵn dữ liệu
            const { price, percent } = result?.object;
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
    };

    const saveOrderFood = async (objParam) => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        // console.log(`product.cardId`, product.cardId)

        let result = await orderService.saveOrder(objParam);
        console.log(`result`, result)
        if (result?.status === 1000) {

            // fetchFoodIntoCard();
            toast.current.show({ severity: 'success', summary: 'Thành công', detail: 'Thành công', life: 3000 });
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
        let  money = null;

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


    const saveCard = async () => {

        const cardBody = {
            foodId: foodId,
            amount: valueAmount,
            username: keycloak?.idTokenParsed?.preferred_username,
        }

        console.log(`cardBody`, cardBody)

        const result = await cardService.saveCard(cardBody);
        // console.log(`result`, result)
        if (result?.status == 1000) {
            showSuccess("Thêm vào giỏ hàng thành công!")
        }
    };

    const onByProduct = () => {
        // console.log(`products`, products)
        console.log(`orderDetailObj`, orderDetailObj)
        console.log(`orderObj`, orderObj)

        setDisplayBasic(true)

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

    useEffect(() => {
        if (products?.listImage) {
            console.log(`products?.listImage[0]`, products?.listImage[0])
            setCurrentImage(products?.listImage[0]);
        }
    }, [products])
    useEffect(() => {
        fetchFoodDetailByFoodId();
        // myRef.current.children[index].className = "active";

    }, [])


    const [displayBasic, setDisplayBasic] = useState(false);
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

    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
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

                        <Button icon="pi pi-shopping-cart" label="Giỏ hàng" style={{ marginRight: '30px' }} onClick={() => saveCard()}></Button>
                        <Button icon="pi pi-shopping-cart" label="Mua ngay" onClick={() => onByProduct()} ></Button>


                    </div>
                </div>



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



                        {/* <DataTable ref={dt}
                            value={products}
                            dataKey="id"
                        >
                            <Column field="cardId" header="Id" ></Column>
                            <Column field="name" header="Tên" ></Column>
                            <Column field="price" header="Giá" body={priceBodyTemplate} ></Column>
                            <Column field="amount" header="Số lượng"  ></Column>
                            <Column header="Giảm giá" body={discountBodyTemplate} ></Column>
                            <Column field="money" header="Thành tiền" />
                        </DataTable> */}
                    </div>
                </Dialog>
            </div>
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
