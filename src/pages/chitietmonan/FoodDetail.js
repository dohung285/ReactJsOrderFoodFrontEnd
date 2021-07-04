

import React, { useEffect, useRef, useState } from 'react'
import { Galleria } from 'primereact/galleria';
import DetailsThumb from './DetailsThumb';
import { Button } from 'primereact/button';
import './FoodDetail.css'
import FoodService from '../../service/FoodService';
import { InputNumber } from 'primereact/inputnumber';
import CardService from '../../service/CardService';
import { useKeycloak } from '@react-keycloak/web';
import { Toast } from 'primereact/toast';

export const FoodDetail = ({ match }) => {
    // console.log(`match`, match.params.id)
    let foodId = match.params.id;

    const foodService = new FoodService();
    const cardService = new CardService();

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




    const [products, setProducts] = useState({})

    const fetchFoodDetailByFoodId = async () => {

        console.log(`keycloak`, keycloak?.idTokenParsed?.preferred_username)

        const result = await foodService.getFoodDetailByFoodId(foodId);
        // console.log(`result`, result)
        if (result?.status == 1000) {
            // console.log(`có vao day`, result)
            setProducts(result?.object);
        }
    };

    const onChangeAmount = (e)=> {
        console.log(`e`, e);
        setValueAmount(e.value)
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




    // console.log(`check`, Array.isArray(products))


    const [index, setIndex] = useState(0)




    // const products = [
    //     {
    //         "_id": "1",
    //         "title": "Bánh mì chứng",
    //         "src": [
    //             "../../img/banh-mi-cay-hai-phong.jpg",
    //             "../../img/banh-mi-chung.jpg",
    //             "../../img/banh-mi-nuong-muoi-ot.jpg",
    //             "../../img/banh-mi-thit-nuong.jpg"
    //         ],
    //         "description": "UI/UX designing, html css tutorials",
    //         "content": "Sản phẩm rất ngon ăn một lần là nghiền",
    //         "price": 15000,
    //         "colors": ["red", "black",q "crimson", "teal"],
    //         "count": 1
    //     }
    // ]

    const myRef = React.createRef();

    const handleTab = index => {
        setCurrentImage(products.listImage[index]);
        const images = myRef.current.children;
        for (let i = 0; i < images.length; i++) {
            images[i].className = images[i].className.replace("active", "");
        }
        images[index].className = "active";
    };

    useEffect(() => {
        if (products?.listImage) {
            setCurrentImage(products.listImage[0]);
        }
    }, [products])
    useEffect(() => {
        fetchFoodDetailByFoodId();
        // myRef.current.children[index].className = "active";

    }, [])

   


    return (
        <div>
            <Toast ref={toast} position="top-right" />
            <div className="app card">

                <div className="details" >
                    <div className="big-img">
                        <img src={'/img/' + currentImage} alt="" key={index} />
                    </div>

                    <div className="box">
                        <div className="row">
                            <h2 style={{ fontWeight: '600', fontSize: '1rem' }}>{products.name}</h2>
                            <span style={{ fontSize: '1.5rem', fontWeight: '600' }}>{products.price} VNĐ</span>
                        </div>


                        <p style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>{products.description}</p>

                        <DetailsThumb images={products?.listImage} tab={handleTab} myRef={myRef} />

                        <div className="p-field p-col-12 p-md-3">
                            <InputNumber inputId="minmax-buttons" value={valueAmount} onValueChange={e => onChangeAmount(e)} mode="decimal" showButtons min={0} max={20} />
                        </div>

                        <Button icon="pi pi-shopping-cart" label="Giỏ hàng" style={{ marginRight: '30px' }} onClick={() => saveCard()}></Button>
                        <Button icon="pi pi-shopping-cart" label="Mua ngay" ></Button>


                    </div>
                </div>



                <div className="card">
                </div>
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
