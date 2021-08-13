

import axios from 'axios';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EXPRITIME_HIDER_LOADER } from '../../constants/ConstantString';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import CatalogService from '../../service/CatalogService';
// import '../danhmuc/Catalog.css'
import './Catalog.css';


export const Catalog = ({ match }) => {
    // console.log(`match`, match.params.id)
    let idCatalog = match.params.id;


    const [loader, showLoader, hideLoader] = useFullPageLoader();

    // const {card,setCard}  =  useContext(CardContext)

    const catalogService = new CatalogService();
    const [data, setData] = useState([])
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        { label: 'Cao đến thấp', value: '!price' },
        { label: 'Thấp đến cao', value: 'price' },
    ];


    const fetchFoodByFoodGroup = async () => {
        showLoader();

        axios.get(`http://localhost:8082/services/orderfood/api/food/byFoodGroup?foodGroupId=${idCatalog}`)
            .then(res => {
                //   console.log(`res`, res?.data?.response?.listReturn)
                let result = res?.data?.response?.listReturn
                if (result) {
                    setData(result)
                }
            }).catch(err => {
                console.log("Error fetchFoodByFoodGroup()", { ...err });
            })

            setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);




    };



    // const fetchFoodByFoodGroup = async () => {

    //     const result = await catalogService.getAllFoodByFoodGroup(1, 5, idCatalog);
    //     console.log(`fetchFoodByFoodGroup`, result)
    //     if (result?.status == 1000) {
    //         // console.log(`có vao day`, result?.response?.listReturn)
    //         setData(result?.response?.listReturn)
    //     }
    // };


    useEffect(() => {
        fetchFoodByFoodGroup()
    }, [idCatalog]);



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
    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }

    const renderListItem = (data) => {
        return (
            <div className="p-col-12">
                <div className="product-list-item">
                    <Link to={`/food/${data.id}`} className="linkFoodDetail">
                        <img src={data.path} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                        <div className="product-list-detail">
                            <div className="product-name">{data.name}</div>
                            <Rating value={data.rating} readOnly cancel={false}></Rating>
                        </div>
                    </Link>
                    <div className="product-list-action">
                        <span className="product-price">{data.price} VND</span>
                        <Button icon="pi pi-shopping-cart" label="Giỏ hàng" ></Button>
                    </div>

                </div>

            </div>
        );
    }


    const renderGridItem = (data) => {
        return (
            <>
                <div className="p-col-12 p-md-3">
                    <div className="product-grid-item card">
                        <Link to={`/food/${data.id}`} className="linkFoodDetail">
                            <div className="product-grid-item-content">
                                <img src={data.path} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                                <div className="product-name">{data.name}</div>
                                <Rating value={data.rating} readOnly cancel={false}></Rating>
                            </div>
                        </Link>
                        <div className="product-grid-item-bottom">
                            <span className="product-price">{data.price} VND</span>
                            {data.percent && <span className="product-has-discount">- {data.percent} %</span>}
                            {data.percent === null && <span className="product-no-discount">- 0 %</span>}
                            {/* <Button icon="pi pi-shopping-cart" onClick={() => addToCard(data)} ></Button> */}
                        </div>


                    </div>
                </div>

                {/* <div className="p-col-12 p-md-4">
                    <div className="product-grid-item card">
                        <div className="product-grid-item-top">
                            <div>
                                <i className="pi pi-tag product-category-icon"></i>
                                <span className="product-category">{data.category}</span>
                            </div>
                            <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span>
                        </div>
                        <div className="product-grid-item-content">
                            <img src={`showcase/demo/images/product/${data.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                            <div className="product-name">{data.name}</div>
                            <div className="product-description">{data.description}</div>
                            <Rating value={data.rating} readOnly cancel={false}></Rating>
                        </div>
                        <div className="product-grid-item-bottom">
                            <span className="product-price">${data.price}</span>
                            <Button icon="pi pi-shopping-cart" label="Add to Cart" disabled={data.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        </div>
                    </div>
                </div> */}

            </>
        );
    }
    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-6" style={{ textAlign: 'left' }}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sắp xếp theo giá" onChange={onSortChange} />
                </div>
                {/* <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div> */}
            </div>
        );
    }

    const header = renderHeader();

    // console.log(`data.path`, data)

    // const onBuyProduct= (id)=>{
    //     console.log(`data`, data)
    //     console.log(`idCard: =`, id)
    // }



    return (
        <div>
            {/* Catalog {idCatalog} */}

            <div className="dataview-demo">
                <div className="card">
                    <DataView
                        value={data}
                        layout={layout}
                        header={header}
                        itemTemplate={itemTemplate}
                        paginator
                        rows={8}
                        sortOrder={sortOrder}
                        sortField={sortField}
                        emptyMessage="Không có dữ liệu"
                    />
                </div>
            </div>



            {loader}
        </div>
    )
}

export default Catalog;
