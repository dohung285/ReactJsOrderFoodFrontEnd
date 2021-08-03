

import React, { useEffect, useState } from 'react';
import CatalogService from '../../service/CatalogService';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
// import '../danhmuc/Catalog.css'
import './Catalog.css'
import { Link } from 'react-router-dom';


export const Catalog = ({ match }) => {
    // console.log(`match`, match.params.id)
    let idCatalog = match.params.id;

    const catalogService = new CatalogService();
    const [data, setData] = useState([])
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
    ];



    const fetchFoodByFoodGroup = async () => {

        const result = await catalogService.getAllFoodByFoodGroup(1, 5, idCatalog);
        console.log(`fetchFoodByFoodGroup`, result)
        if (result?.status == 1000) {
            // console.log(`có vao day`, result?.response?.listReturn)
            setData(result?.response?.listReturn)
        }
    };


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
                        <Button
                            icon="pi pi-shopping-cart"
                            label="Giỏ hàng" ></Button>
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
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
                </div>
                <div className="p-col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
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
                    <DataView value={data} layout={layout} header={header}
                        itemTemplate={itemTemplate} paginator rows={5}
                        sortOrder={sortOrder} sortField={sortField} />
                </div>
            </div>




        </div>
    )
}

export default Catalog;
