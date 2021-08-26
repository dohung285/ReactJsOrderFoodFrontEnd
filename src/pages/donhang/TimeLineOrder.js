
import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import React, { useEffect, useState } from 'react';
import { EXPRITIME_HIDER_LOADER } from '../../constants/ConstantString';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import OrderStatusService from '../../service/OrderStatusService';




const TimeLineOrder = ({match}) => {

    let idOrder = match.params.id;

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const [events, setEvents] = useState([])
    

    const orderStatusService = new OrderStatusService()

    const fetchOrderStatusAPI = async () => {
        showLoader();
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await orderStatusService.getAllByOrderId(idOrder);
        console.log(`fetchOrderStatusAPI`, result)
        if (result?.status === 1000) {
          setEvents(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }


    useEffect(() => {
        fetchOrderStatusAPI()
    }, [])

    // const events = [
    //     { status: 'Tiếp nhận đơn', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'http://localhost:8083/downloadFile/order.png' },
    //     { status: 'Đang giao hàng', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7', image: 'http://localhost:8083/downloadFile/process.jpg' },
    //     { status: 'Đã giao hàng', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', image: 'http://localhost:8083/downloadFile/delivered.jpg' }
    // ];


    const customizedMarker = (item) => {
        return (
            <span className="custom-marker p-shadow-2" style={{ backgroundColor: item.color  }}>
                <i className={item.icon} style={{ fontSize: '3em', color:'yellow' }}></i>
            </span>
        );
    };

    const customizedContent = (item) => {
        return (
            <Card title={item.status} subTitle={item.date}>
                 { item.image && <img src={`${item.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} width={200} className="p-shadow-2" />} 
                {/* <Button label="Read more" className="p-button-text"></Button> */}
            </Card>
        );
    };


    return (
        <div>
            <div className="card p-mt-4">
                <Timeline value={events} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
            </div>
            {loader}
        </div>
    )
}

export default TimeLineOrder
