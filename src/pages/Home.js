// import React from "react";
// import { useKeycloak } from '@react-keycloak/web';
// export default () => {

//   const [keycloak, initialized] = useKeycloak();

//   console.log('keycloak', keycloak)

//   return (
//     <h1>Home page</h1>
//   );
// };


import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
// import ProductService from '../service/ProductService';
import { Rating } from 'primereact/rating';
import { Link, withRouter } from "react-router-dom";
import { Carousel } from 'primereact/carousel';

import './Home.css'
import './Home-more.css'
import './CarouselDemo.css'

export const Home = () => {


    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    const data = [
        { "id": "1000", "name": "Bamboo Watch", "description": "Product Description", "image": "bamboo-watch.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 1 },
        { "id": "1001", "code": "nvklal433", "name": "Black Watch", "description": "Product Description", "image": "black-watch.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4 },
        { "id": "1002", "code": "zz21cz3c1", "name": "Blue Band", "description": "Product Description", "image": "blue-band.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3 },
        { "id": "1003", "code": "244wgerg2", "name": "Blue T-Shirt", "description": "Product Description", "image": "blue-t-shirt.jpg", "price": 29, "category": "Clothing", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 5 },
        { "id": "1004", "code": "h456wer53", "name": "Bracelet", "description": "Product Description", "image": "bracelet.jpg", "price": 15, "category": "Accessories", "quantity": 73, "inventoryStatus": "INSTOCK", "rating": 4 },
        { "id": "1005", "code": "av2231fwg", "name": "Brown Purse", "description": "Product Description", "image": "brown-purse.jpg", "price": 120, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
        // { "id": "1006", "code": "bib36pfvm", "name": "Chakra Bracelet", "description": "Product Description", "image": "chakra-bracelet.jpg", "price": 32, "category": "Accessories", "quantity": 5, "inventoryStatus": "LOWSTOCK", "rating": 3 },
        // { "id": "1007", "code": "mbvjkgip5", "name": "Galaxy Earrings", "description": "Product Description", "image": "galaxy-earrings.jpg", "price": 34, "category": "Accessories", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 5 },
        // { "id": "1008", "code": "vbb124btr", "name": "Game Controller", "description": "Product Description", "image": "game-controller.jpg", "price": 99, "category": "Electronics", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 4 },
        // { "id": "1009", "code": "cm230f032", "name": "Gaming Set", "description": "Product Description", "image": "gaming-set.jpg", "price": 299, "category": "Electronics", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 3 },
        // { "id": "1010", "code": "plb34234v", "name": "Gold Phone Case", "description": "Product Description", "image": "gold-phone-case.jpg", "price": 24, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
        // { "id": "1011", "code": "4920nnc2d", "name": "Green Earbuds", "description": "Product Description", "image": "green-earbuds.jpg", "price": 89, "category": "Electronics", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 4 },
        // { "id": "1012", "code": "250vm23cc", "name": "Green T-Shirt", "description": "Product Description", "image": "green-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 74, "inventoryStatus": "INSTOCK", "rating": 5 },
        // { "id": "1013", "code": "fldsmn31b", "name": "Grey T-Shirt", "description": "Product Description", "image": "grey-t-shirt.jpg", "price": 48, "category": "Clothing", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 3 },
        // { "id": "1014", "code": "waas1x2as", "name": "Headphones", "description": "Product Description", "image": "headphones.jpg", "price": 175, "category": "Electronics", "quantity": 8, "inventoryStatus": "LOWSTOCK", "rating": 5 },
        // { "id": "1015", "code": "vb34btbg5", "name": "Light Green T-Shirt", "description": "Product Description", "image": "light-green-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 34, "inventoryStatus": "INSTOCK", "rating": 4 },
        // { "id": "1016", "code": "k8l6j58jl", "name": "Lime Band", "description": "Product Description", "image": "lime-band.jpg", "price": 79, "category": "Fitness", "quantity": 12, "inventoryStatus": "INSTOCK", "rating": 3 },
        // { "id": "1017", "code": "v435nn85n", "name": "Mini Speakers", "description": "Product Description", "image": "mini-speakers.jpg", "price": 85, "category": "Clothing", "quantity": 42, "inventoryStatus": "INSTOCK", "rating": 4 },
        // { "id": "1018", "code": "09zx9c0zc", "name": "Painted Phone Case", "description": "Product Description", "image": "painted-phone-case.jpg", "price": 56, "category": "Accessories", "quantity": 41, "inventoryStatus": "INSTOCK", "rating": 5 },
        // { "id": "1019", "code": "mnb5mb2m5", "name": "Pink Band", "description": "Product Description", "image": "pink-band.jpg", "price": 79, "category": "Fitness", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 4 },
        // { "id": "1020", "code": "r23fwf2w3", "name": "Pink Purse", "description": "Product Description", "image": "pink-purse.jpg", "price": 110, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
        // { "id": "1021", "code": "pxpzczo23", "name": "Purple Band", "description": "Product Description", "image": "purple-band.jpg", "price": 79, "category": "Fitness", "quantity": 6, "inventoryStatus": "LOWSTOCK", "rating": 3 },
        // { "id": "1022", "code": "2c42cb5cb", "name": "Purple Gemstone Necklace", "description": "Product Description", "image": "purple-gemstone-necklace.jpg", "price": 45, "category": "Accessories", "quantity": 62, "inventoryStatus": "INSTOCK", "rating": 4 },
        // { "id": "1023", "code": "5k43kkk23", "name": "Purple T-Shirt", "description": "Product Description", "image": "purple-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 5 },
        // { "id": "1024", "code": "lm2tny2k4", "name": "Shoes", "description": "Product Description", "image": "shoes.jpg", "price": 64, "category": "Clothing", "quantity": 0, "inventoryStatus": "INSTOCK", "rating": 4 },
        // { "id": "1025", "code": "nbm5mv45n", "name": "Sneakers", "description": "Product Description", "image": "sneakers.jpg", "price": 78, "category": "Clothing", "quantity": 52, "inventoryStatus": "INSTOCK", "rating": 4 },
        // { "id": "1026", "code": "zx23zc42c", "name": "Teal T-Shirt", "description": "Product Description", "image": "teal-t-shirt.jpg", "price": 49, "category": "Clothing", "quantity": 3, "inventoryStatus": "LOWSTOCK", "rating": 3 },
        // { "id": "1027", "code": "acvx872gc", "name": "Yellow Earbuds", "description": "Product Description", "image": "yellow-earbuds.jpg", "price": 89, "category": "Electronics", "quantity": 35, "inventoryStatus": "INSTOCK", "rating": 3 },
        // { "id": "1028", "code": "tx125ck42", "name": "Yoga Mat", "description": "Product Description", "image": "yoga-mat.jpg", "price": 20, "category": "Fitness", "quantity": 15, "inventoryStatus": "INSTOCK", "rating": 5 },
        // { "id": "1029", "code": "gwuby345v", "name": "Yoga Set", "description": "Product Description", "image": "yoga-set.jpg", "price": 20, "category": "Fitness", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 8 },

    ]

    const carouselItems = [
        { "id": "1000", "code": "f230fh0g3", "name": "", "description": "Product Description", "image": "http://localhost:8083/downloadFile/banh-mi-thit-nuong.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5 },
        { "id": "1001", "code": "nvklal433", "name": "Bún chả Hà Nội", "description": "Product Description", "image": "http://localhost:8083/downloadFile/bun-cha-ha-noi.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4 },
        { "id": "1002", "code": "zz21cz3c1", "name": "Cơm rang dưa bò", "description": "Product Description", "image": "http://localhost:8083/downloadFile/com-rang-dua-bo.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3 },
        { "id": "1003", "code": "244wgerg2", "name": "Cơm thố", "description": "Product Description", "image": "http://localhost:8083/downloadFile/com-tho.jpg", "price": 29, "category": "Clothing", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 5 },
        { "id": "1004", "code": "h456wer53", "name": "Phở bát đàn", "description": "Product Description", "image": "http://localhost:8083/downloadFile/pho-bat-dan.jpg", "price": 15, "category": "Accessories", "quantity": 73, "inventoryStatus": "INSTOCK", "rating": 4 },
        { "id": "1005", "code": "av2231fwg", "name": "Xôi xéo", "description": "Product Description", "image": "http://localhost:8083/downloadFile/xoi-xeo.jpg", "price": 120, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4 },
        { "id": "1006", "code": "bib36pfvm", "name": "Bún bò huế", "description": "Product Description", "image": "http://localhost:8083/downloadFile/bun-bo-hue.jpg", "price": 32, "category": "Accessories", "quantity": 5, "inventoryStatus": "LOWSTOCK", "rating": 3 },
        { "id": "1007", "code": "mbvjkgip5", "name": "Humberger bò", "description": "Product Description", "image": "http://localhost:8083/downloadFile/5.jpg", "price": 34, "category": "Accessories", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 5 },
        { "id": "1008", "code": "vbb124btr", "name": "Humberger gà", "description": "Product Description", "image": "http://localhost:8083/downloadFile/6.jpg", "price": 99, "category": "Electronics", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 4 },
        { "id": "1009", "code": "cm230f032", "name": "Humberger thập cẩm", "description": "Product Description", "image": "http://localhost:8083/downloadFile/7.jpg", "price": 299, "category": "Electronics", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 3 }
    ]


    const productTemplate = (product) => {
        return (
            <div className="product-item">
                <div className="product-item-content">
                    <div className="p-mb-3" style={{ height: '60%' }}>
                        <div>
                            <img src={`${product.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />
                        </div>
                    </div>
                    <div>
                        <div className="car-buttons p-mt-5">
                            <Button icon="pi pi-search" className="p-button p-button-rounded p-mr-2" />
                            <Button icon="pi pi-star" className="p-button-success p-button-rounded p-mr-2" />
                            <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    const [products, setProducts] = useState(null);
    const [carousel, setCarousel] = useState(null)
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
    ];
    const imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png'

    // const productService = new ProductService();

    useEffect(() => {
        // productService.getProducts().then(data => setProducts(data));
        setProducts(data)
        setCarousel(carouselItems)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <img src={`../../img/bun-thang.jpg`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <Rating value={data.rating} readOnly cancel={false}></Rating>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${data.price}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (data) => {
        return (
            <div className="p-col-12 p-md-4">
                <div className="product-grid-item card">
                    {/* <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.category}</span>
                        </div>
                        <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                    </div> */}
                    <div className="product-grid-item-content">

                        <img src={`http://localhost:8083/downloadFile/che-com-dau-xanh.jpg`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        {/* 
                        <img src={`../../img/ab1.jpg`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} /> */}
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.description}</div>
                        <Rating value={data.rating} readOnly cancel={false}></Rating>
                    </div>
                    {/* <div className="product-grid-item-bottom">
                        <span className="product-price">${data.price}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'} onClick={() => alert("0k")} ></Button>
                    </div> */}
                </div>
            </div>
        );
    }

    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
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

    return (
        <div>

            <div className="carousel-demo">
                <Carousel
                    value={carousel}
                    numVisible={3}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    className="custom-carousel"
                    circular
                    autoplayInterval={3000}
                    itemTemplate={productTemplate}
                />
            </div>



            <div className="add-products">
                <div className="container">
                    <div className="add-products-row">
                        <div className="w3ls-add-grids">
                            <Link to={''}>
                                <h4>
                                    Nhận{" "}
                                    <span>
                                        20%
                                        <br />
                                        Hoàn lại
                                    </span>
                                </h4>
                                <h5>Đặt hàng qua ứng dụng</h5>
                                <h6>
                                    Đặt ngay{" "}
                                    <i className="fa fa-arrow-circle-right" aria-hidden="true" />
                                </h6>
                            </Link>
                        </div>
                        <div className="w3ls-add-grids w3ls-add-grids-right">
                            <Link to={''}>
                                <h4>
                                    Giảm
                                    <span>
                                        <br />
                                        40% Đặt hàng
                                    </span>
                                </h4>
                                <h5>Ngày cuối tuần và ngày lễ</h5>
                                <h6>
                                    Đặt ngay{" "}
                                    <i className="fa fa-arrow-circle-right" aria-hidden="true" />
                                </h6>
                            </Link>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>

            <div className="wthree-order">
                {/* <img src="images/i2.jpg" className="w3order-img" alt="" /> */}
                <img src={`../../i2.png`} className="w3order-img" alt="" />
                <div className="container">
                    <h3 className="w3ls-title">Cách Mua Hàng Trực Tuyến</h3>
                    <p className="w3lsorder-text">
                        Chỉ với 4 bước.
                    </p>
                    <div className="order-agileinfo">
                        <div className="col-md-3 col-sm-3 col-xs-6 order-w3lsgrids">
                            <div className="order-w3text">
                                <i className="fa fa-map" aria-hidden="true"></i>
                                <h5>Tìm kiếm</h5>
                                <span>1</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6 order-w3lsgrids">
                            <div className="order-w3text">
                                <i className="fa fa-cutlery" aria-hidden="true"></i>
                                <h5>Chọn món</h5>
                                <span>2</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6 order-w3lsgrids">
                            <div className="order-w3text">
                                <i className="fa fa-credit-card" aria-hidden="true"></i>
                                <h5>Thanh toán</h5>
                                <span>3</span>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-6 order-w3lsgrids">
                            <div className="order-w3text">
                                <i className="fa fa-truck" aria-hidden="true"></i>
                                <h5>Nhận hàng</h5>
                                <span>4</span>
                            </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>

            <div className="w3agile-deals">
                <div className="container">
                    <h3 className="w3ls-title">Dịch vụ</h3>
                    <div className="dealsrow">
                        <div className="col-md-6 col-sm-6 deals-grids">
                            <div className="deals-left">
                                <i className="fa fa-truck" aria-hidden="true" />
                            </div>
                            <div className="deals-right">
                                <h4>Miễn phí giao hàng</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                                    tempus justo ac{" "}
                                </p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                        <div className="col-md-6 col-sm-6 deals-grids">
                            <div className="deals-left">
                                <i className="fa fa-birthday-cake" aria-hidden="true" />
                            </div>
                            <div className="deals-right">
                                <h4>Đặt tiệc sinh nhật</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                                    tempus justo ac{" "}
                                </p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                        <div className="col-md-6 col-sm-6 deals-grids">
                            <div className="deals-left">
                                <i className="fa fa-users" aria-hidden="true" />
                            </div>
                            <div className="deals-right">
                                <h4>Tiệc nhóm</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                                    tempus justo ac{" "}
                                </p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                        <div className="col-md-6 col-sm-6 deals-grids">
                            <div className="deals-left">
                                <i className="fa fa-building" aria-hidden="true" />
                            </div>
                            <div className="deals-right">
                                <h4>Tiệc công ty</h4>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                                    tempus justo ac{" "}
                                </p>
                            </div>
                            <div className="clearfix"> </div>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>



            <div className="subscribe agileits-w3layouts">
                <div className="container">
                    <div className="col-md-6 social-icons w3-agile-icons">
                        <h4>Liên hệ</h4>
                        <ul>
                            <li>
                                <a href="#" className="fa fa-facebook icon facebook">
                                    {" "}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="fa fa-twitter icon twitter">
                                    {" "}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="fa fa-google-plus icon googleplus">
                                    {" "}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="fa fa-dribbble icon dribbble">
                                    {" "}
                                </a>
                            </li>
                            <li>
                                <a href="#" className="fa fa-rss icon rss">
                                    {" "}
                                </a>
                            </li>
                        </ul>
                        <ul className="apps">
                            <li>
                                <h4>Tải ứng dụng: </h4>{" "}
                            </li>
                            <li>
                                <a href="#" className="fa fa-apple" />
                            </li>
                            <li>
                                <a href="#" className="fa fa-windows" />
                            </li>
                            <li>
                                <a href="#" className="fa fa-android" />
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 subscribe-right">
                        <h3 className="w3ls-title">
                            Đăng ký để nhận <br />
                            <span>Thông báo</span>
                        </h3>
                        <form action="#" method="post">
                            <input
                                type="email"
                                name="email"
                                placeholder="Nhập Email..."
                                required
                            />
                            <input type="submit" defaultValue="Subscribe" />
                            <div className="clearfix"> </div>
                        </form>
                        <img
                            src={`../../i1.jpg`}
                            className="sub-w3lsimg"
                            alt=""
                        />
                    </div>
                    <div className="clearfix"> </div>
                </div>
            </div>
            {/* <DataView
                    value={products}
                    layout={layout}
                    //    header={header}
                    itemTemplate={itemTemplate}
                    // paginator
                    rows={6}
                    sortOrder={sortOrder}
                    sortField={sortField}
                /> */}


        </div>
    );
}

export default withRouter(Home);