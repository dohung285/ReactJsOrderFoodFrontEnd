


import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
// import ProductService from '../service/ProductService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import './ListOrder.css';
import OrderService from '../../service/OrderService';
import { useKeycloak } from '@react-keycloak/web';
import Moment from "react-moment";
import { Tag } from 'primereact/tag';
import { Link } from 'react-router-dom';

export const ListOrder = () => {

    // const data = [
    //     { "id": "1000", "code": "f230fh0g3", "name": "Bamboo Watch", "description": "Product Description", "image": "bamboo-watch.jpg", "price": 65, "category": "Accessories", "quantity": 24, "inventoryStatus": "INSTOCK", "rating": 5, "orders": [{ "id": "1000", "productCode": "f230fh0g3", "date": "2020-09-13", "amount": 65, "quantity": 1, "customer": "David James", "status": "PENDING" }, { "id": "1001", "productCode": "f230fh0g3", "date": "2020-05-14", "amount": 130, "quantity": 2, "customer": "Leon Rodrigues", "status": "DELIVERED" }, { "id": "1002", "productCode": "f230fh0g3", "date": "2019-01-04", "amount": 65, "quantity": 1, "customer": "Juan Alejandro", "status": "RETURNED" }, { "id": "1003", "productCode": "f230fh0g3", "date": "2020-09-13", "amount": 195, "quantity": 3, "customer": "Claire Morrow", "status": "CANCELLED" }] },
    //     { "id": "1001", "code": "nvklal433", "name": "Black Watch", "description": "Product Description", "image": "black-watch.jpg", "price": 72, "category": "Accessories", "quantity": 61, "inventoryStatus": "INSTOCK", "rating": 4, "orders": [{ "id": "2000", "productCode": "nvklal433", "date": "2020-05-14", "amount": 72, "quantity": 1, "customer": "Maisha Jefferson", "status": "DELIVERED" }, { "id": "2001", "productCode": "nvklal433", "date": "2020-02-28", "amount": 144, "quantity": 2, "customer": "Octavia Murillo", "status": "PENDING" }] },
    //     { "id": "1002", "code": "zz21cz3c1", "name": "Blue Band", "description": "Product Description", "image": "blue-band.jpg", "price": 79, "category": "Fitness", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 3, "orders": [{ "id": "3000", "productCode": "zz21cz3c1", "date": "2020-07-05", "amount": 79, "quantity": 1, "customer": "Stacey Leja", "status": "DELIVERED" }, { "id": "3001", "productCode": "zz21cz3c1", "date": "2020-02-06", "amount": 79, "quantity": 1, "customer": "Ashley Wickens", "status": "DELIVERED" }] },
    //     { "id": "1003", "code": "244wgerg2", "name": "Blue T-Shirt", "description": "Product Description", "image": "blue-t-shirt.jpg", "price": 29, "category": "Clothing", "quantity": 25, "inventoryStatus": "INSTOCK", "rating": 5, "orders": [] },
    //     { "id": "1004", "code": "h456wer53", "name": "Bracelet", "description": "Product Description", "image": "bracelet.jpg", "price": 15, "category": "Accessories", "quantity": 73, "inventoryStatus": "INSTOCK", "rating": 4, "orders": [{ "id": "5000", "productCode": "h456wer53", "date": "2020-09-05", "amount": 60, "quantity": 4, "customer": "Mayumi Misaki", "status": "PENDING" }, { "id": "5001", "productCode": "h456wer53", "date": "2019-04-16", "amount": 2, "quantity": 30, "customer": "Francesco Salvatore", "status": "DELIVERED" }] },
    //     { "id": "1005", "code": "av2231fwg", "name": "Brown Purse", "description": "Product Description", "image": "brown-purse.jpg", "price": 120, "category": "Accessories", "quantity": 0, "inventoryStatus": "OUTOFSTOCK", "rating": 4, "orders": [{ "id": "6000", "productCode": "av2231fwg", "date": "2020-01-25", "amount": 120, "quantity": 1, "customer": "Isabel Sinclair", "status": "RETURNED" }, { "id": "6001", "productCode": "av2231fwg", "date": "2019-03-12", "amount": 240, "quantity": 2, "customer": "Lionel Clifford", "status": "DELIVERED" }, { "id": "6002", "productCode": "av2231fwg", "date": "2019-05-05", "amount": 120, "quantity": 1, "customer": "Cody Chavez", "status": "DELIVERED" }] },
    //     { "id": "1006", "code": "bib36pfvm", "name": "Chakra Bracelet", "description": "Product Description", "image": "chakra-bracelet.jpg", "price": 32, "category": "Accessories", "quantity": 5, "inventoryStatus": "LOWSTOCK", "rating": 3, "orders": [{ "id": "7000", "productCode": "bib36pfvm", "date": "2020-02-24", "amount": 32, "quantity": 1, "customer": "Arvin Darci", "status": "DELIVERED" }, { "id": "7001", "productCode": "bib36pfvm", "date": "2020-01-14", "amount": 64, "quantity": 2, "customer": "Izzy Jones", "status": "PENDING" }] },
    //     { "id": "1007", "code": "mbvjkgip5", "name": "Galaxy Earrings", "description": "Product Description", "image": "galaxy-earrings.jpg", "price": 34, "category": "Accessories", "quantity": 23, "inventoryStatus": "INSTOCK", "rating": 5, "orders": [{ "id": "8000", "productCode": "mbvjkgip5", "date": "2020-06-19", "amount": 34, "quantity": 1, "customer": "Jennifer Smith", "status": "DELIVERED" }] },
    //     { "id": "1008", "code": "vbb124btr", "name": "Game Controller", "description": "Product Description", "image": "game-controller.jpg", "price": 99, "category": "Electronics", "quantity": 2, "inventoryStatus": "LOWSTOCK", "rating": 4, "orders": [{ "id": "9000", "productCode": "vbb124btr", "date": "2020-01-05", "amount": 99, "quantity": 1, "customer": "Jeanfrancois David", "status": "DELIVERED" }, { "id": "9001", "productCode": "vbb124btr", "date": "2020-01-19", "amount": 198, "quantity": 2, "customer": "Ivar Greenwood", "status": "RETURNED" }] },
    //     { "id": "1009", "code": "cm230f032", "name": "Gaming Set", "description": "Product Description", "image": "gaming-set.jpg", "price": 299, "category": "Electronics", "quantity": 63, "inventoryStatus": "INSTOCK", "rating": 3, "orders": [{ "id": "10000", "productCode": "cm230f032", "date": "2020-06-24", "amount": 299, "quantity": 1, "customer": "Kadeem Mujtaba", "status": "PENDING" }, { "id": "10001", "productCode": "cm230f032", "date": "2020-05-11", "amount": 299, "quantity": 1, "customer": "Ashley Wickens", "status": "DELIVERED" }, { "id": "10002", "productCode": "cm230f032", "date": "2019-02-07", "amount": 299, "quantity": 1, "customer": "Julie Johnson", "status": "DELIVERED" }, { "id": "10003", "productCode": "cm230f032", "date": "2020-04-26", "amount": 299, "quantity": 1, "customer": "Tony Costa", "status": "CANCELLED" }] }
    // ]

    const [keycloak] = useKeycloak();

    const orderService = new OrderService();



    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);
    const isMounted = useRef(false);

    const fetchAllOrderByUsername = async () => {

        // console.log(`keycloak && keycloak.authenticated`, keycloak?.idTokenParsed?.preferred_username)

        let result = await orderService.getAllOrderByUsername(keycloak?.idTokenParsed?.preferred_username);
        // console.log(`result`, result)
        if (result?.status === 1000) {

            setProducts(result?.list)
        }
    }


    useEffect(() => {
        if (isMounted.current) {
            const summary = expandedRows !== null ? 'Mở hết' : 'Đóng hết';
            toast.current.show({ severity: 'success', summary: `${summary}`, life: 3000 });
        }
    }, [expandedRows]);

    useEffect(() => {
        isMounted.current = true;

        fetchAllOrderByUsername()
        // productService.getProductsWithOrdersSmall().then(data => setProducts(data));
        // setProducts(data)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Mở', detail: event.data.name, life: 3000 });
    }

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Đóng', detail: event.data.name, life: 3000 });
    }

    const expandAll = () => {
        let _expandedRows = {};
        products.forEach(p => {
            console.log(`p`, p)
            _expandedRows[`${p.orderId}`] = true
        });

        setExpandedRows(_expandedRows);
    }

    const collapseAll = () => {
        setExpandedRows(null);
    }

    const formatCurrency = (value) => {
        // console.log(`value`, value)
        return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });

    }

    const totalMoneyBodyTemplate = (rowData) => {
        return formatCurrency(rowData.totalMoney);
    }

    const moneyBodyTemplate = (rowData) => {
        return formatCurrency(rowData.money);
    }

    const statusOrderBodyTemplate = (rowData) => {
        return <span className={`order-badge order-${rowData.status.toLowerCase()}`}>{rowData.status}</span>;
    }

    const searchBodyTemplate = (rowData) => {
        // console.log(`rowData`, rowData.orderId)
        return (
            <Link to={`/time-line/${rowData.orderId}`} style={{textDecoration: 'none'}} >
                <Button icon="pi pi-eye" className="p-button-rounded p-button-success" style={{textDecoration: 'none'}}>
                    {/* <span  >Xem</span> */}
                </Button>
            </Link>
        );
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={`../../img/${rowData.pathImage}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
    }

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    }

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    }

    const renderRowStatus = (rowData) => {
        let status = null;
        if (rowData.status === 0) {
            status = 'Tiếp nhận đơn'
            return <Tag severity="info" value={status} />;
        }
        if (rowData.status === 1) {
            status = 'Đang giao hàng '
            return <Tag severity="warning" value={status} />;
        }
        if (rowData.status === 2) {
            status = 'Giao hàng thành công '
            return <Tag severity="success" value={status} />;
        }

    };

    const renderDateOrder = (rowData) => {
        // console.log(`rowData`, rowData)
        return (
            <React.Fragment>
                <Moment format="DD/MM/YYYY HH:mm:ss">{rowData.dateOrder}</Moment>
            </React.Fragment>
        );
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="orders-subtable">
                {/* <h5>Orders for {data.name}</h5> */}
                <DataTable value={data.listObjectOrderDetailOfUserResponseDto}>
                    <Column field="foodId" header="Id" ></Column>
                    <Column field="foodName" header="Tên" ></Column>
                    <Column field="Ảnh" header="Tên" body={imageBodyTemplate} ></Column>
                    <Column field="amount" header="Số lượng"  ></Column>
                    <Column field="money" header="Tiền" body={moneyBodyTemplate} ></Column>

                    {/* <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column> */}
                </DataTable>
            </div>
        );
    }

    const header = (
        <div className="table-header-container">
            <Button icon="pi pi-plus" label="Mở hết" onClick={expandAll} className="p-button-success p-mr-2" />
            <Button icon="pi pi-minus" label="Đóng hết" onClick={collapseAll} className="p-button-help" />
        </div>
    );

    return (
        <div className="datatable-rowexpansion-demo">
            <Toast ref={toast} />

            <div className="card">
                <DataTable
                    value={products}
                    expandedRows={expandedRows}
                    onRowToggle={(e) => setExpandedRows(e.data)}
                    // onRowExpand={onRowExpand}
                    // onRowCollapse={onRowCollapse}
                    rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="orderId"
                    paginator rows={10} rowsPerPageOptions={[10, 25]}
                    header={header}
                >
                    <Column expander style={{ width: '3em' }} />
                    <Column field="orderId" header="Mã đơn" sortable />
                    <Column field="dateOrder" body={renderDateOrder} header="Ngày đặt" />
                    <Column field="totalMoney" header="Tổng tiền" body={totalMoneyBodyTemplate} />
                    <Column field="status" body={renderRowStatus} header="Trạng thái" sortable />
                    <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
}
export default ListOrder;
