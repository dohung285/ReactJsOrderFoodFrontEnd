

import axios from 'axios';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Rating } from 'primereact/rating';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { EXPRITIME_HIDER_LOADER } from '../../constants/ConstantString';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import CatalogService from '../../service/CatalogService';
// import '../danhmuc/Catalog.css'
import './Catalog.css';


export const Catalog = ({ match }) => {
    // console.log(`match`, match.params.id)
    let idCatalog = match.params.id;

    const { id } = useParams()

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

    const [txtSearch, setTxtSearch] = useState(null);


    const fetchFoodByFoodGroup = async () => {
        showLoader();

        axios.get(`http://localhost:8082/services/orderfood/api/food/byFoodGroup?foodGroupId=${idCatalog}`)
            .then(res => {
                // console.log(`res`, res?.data?.response?.listReturn)
                let result = res?.data?.response?.listReturn
                if (result) {
                    setData(result)
                }
            }).catch(err => {
                console.log("Error fetchFoodByFoodGroup()", { ...err });
            })

        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);

    };

    const fetchFoodLikeNameAndFoodGroup = async (foodGroup, txtName) => {
        showLoader();

        axios.get(`http://localhost:8082/services/orderfood/api/food/search?foodGroupId=${foodGroup}&foodName=${txtName}`)
            .then(res => {
                console.log(`res`, res?.data?.list)
                let result = res?.data?.list
                if (result) {
                    setData(result)
                }
            }).catch(err => {
                console.log("Error fetchFoodLikeNameAndFoodGroup()", { ...err });
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
        // console.log('id', idCatalog, id);
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
        // console.log(`product`, product)
        if (!product) {
            return;
        }

        if (layout === 'grid')
            return renderGridItem(product);
    }



    const renderGridItem = (data) => {
        // console.log(`data`, data.percent)
        if (data.isDeleted !== 1) {
            return (
                <>
                    <div className="p-col-12 p-md-3">
                        <div className="product-grid-item card">
                            <Link to={`/food/${data.id}`} className="linkFoodDetail">
                                <div className="product-grid-item-content">
                                    <img src={`${data.path}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                                    <div className="product-name">{data.name}</div>
                                    {/* <Rating value={data.rating} readOnly cancel={false}></Rating> */}
                                    {data.percent !== null && <span className="product-has-discount">- {data.percent} %</span>}
                                    {/* {data.percent === null && <span className="product-no-discount">- 0 %</span>} */}
                                </div>
                            </Link>
                            {/* <div className="product-grid-item-bottom ">
                                <span className="product-price p-d-flex p-jc-center " style={{textAlign: 'center'}}>{data.price} VND</span>
                            </div> */}

                            <div className="p-d-flex p-jc-center ">
                                <span className="product-price" style={{ textAlign: 'center' }}>{data.price} VND</span>
                            </div>
                        </div>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className="p-col-12 p-md-3">
                        <div className="product-grid-item card">
                            <div className="product-grid-item-content">
                                <img src={`${data.path}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} />
                                <div className="product-name">{data.name}</div>
                            </div>
                            <div className="p-d-flex p-jc-center ">
                                <span className="product-price" style={{ textAlign: 'center' }}>{data.price} VND</span>
                            </div>
                            <div className="p-d-flex p-jc-center ">
                                <span className="product-price" style={{ textAlign: 'center',color:'red',fontSize:'18px',fontWeight:'500' }}>Ngừng kinh doanh</span>
                            </div>
                        </div>
                    </div>
                </>
            );
        }

    }
    const handleSearch = () => {

        console.log(`txtSearch`, txtSearch)
        console.log(`idCatalog`, idCatalog)
        fetchFoodLikeNameAndFoodGroup(idCatalog, txtSearch)
    }

    const handleRefersh = () => {
        fetchFoodByFoodGroup()
    }

    const handleOnchange = (e) => {
        // console.log(`e.target.value`, e.target.value)
        setTxtSearch(e.target.value)
    }




    const renderHeader = () => {
        return (
            <div className="p-grid p-nogutter">
                <div className="p-col-12 p-d-flex" style={{ textAlign: 'left' }}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sắp xếp theo giá" onChange={onSortChange} className="p-mr-2" />
                    <InputText defaultValue={txtSearch === null ? '' : txtSearch} placeholder="Tìm kiếm" className="p-mr-2" onChange={(e) => handleOnchange(e)} />
                    <Button type="button" icon="pi pi-search" onClick={() => handleSearch()} className="p-mr-2" />
                    <Button type="button" icon="pi pi-refresh" onClick={() => handleRefersh()} className="p-mr-2 p-button-help" />
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
                        alwaysShowPaginator={false}
                    />
                </div>
            </div>



            {loader}
        </div>
    )
}

export default Catalog;
