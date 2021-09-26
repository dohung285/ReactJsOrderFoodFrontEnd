
import axios from 'axios';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import React, { useEffect, useState } from 'react';
import { EXPRITIME_HIDER_LOADER } from '../../constants/ConstantString';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import OrderStatusService from '../../service/OrderStatusService';
import ReportService from '../../service/ReportService';




const TimeLineOrder = ({ match }) => {

    let idOrder = match.params.id;

    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const [events, setEvents] = useState([])
    const [report, setReport] = useState();


    const orderStatusService = new OrderStatusService()
    const reportService = new ReportService()

    const fetchOrderStatusAPI = async () => {
        showLoader();
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await orderStatusService.getAllByOrderId(idOrder);
        // console.log(`fetchOrderStatusAPI`, result)
        if (result?.status === 1000) {
            setEvents(result?.list)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }

    const fetchReportAPI = async () => {
        showLoader();
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await reportService.getReport(idOrder);
        console.log(`fetchReportAPI`, result?.object?.path)
        if (result?.status === 1000) {
            setReport(result?.object)
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
    }


    useEffect(() => {
        fetchOrderStatusAPI()
        fetchReportAPI();
    }, [])

    // const events = [
    //     { status: 'Tiếp nhận đơn', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'http://localhost:8083/downloadFile/order.png' },
    //     { status: 'Đang giao hàng', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7', image: 'http://localhost:8083/downloadFile/process.jpg' },
    //     { status: 'Đã giao hàng', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B', image: 'http://localhost:8083/downloadFile/delivered.jpg' }
    // ];


    const customizedMarker = (item) => {
        return (
            <span className="custom-marker p-shadow-2" style={{ backgroundColor: item.color }}>
                <i className={item.icon} style={{ fontSize: '3em', color: 'yellow' }}></i>
            </span>
        );
    };

    const downloadReport = () => {

        axios({
            url: `http://localhost:8086/downloadFile/hungdx_09092021232743.pdf`, //your url
            method: 'GET',
            responseType: 'blob', // important
        }).then((response) => {
            console.log(`response`, response)
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.pdf'); //or any other extension
            document.body.appendChild(link);
            link.click();
        }).catch((err) => {
            console.log("Error", { ...err });
        })
            ;

        // return axios.get(
        //     `http://localhost:8086/downloadFile/hungdx_09092021232743.pdf`,
        //     {
        //         headers: {
        //             'Content-Type': 'application/pdf',
        //             'Access-Control-Allow-Origin': '*',
        //         },
        //     }
        // )
        //     .then((response) => response.blob())
        //     .then((blob) => {
        //         // Create blob link to download
        //         const url = window.URL.createObjectURL(
        //             new Blob([blob]),
        //         );
        //         const link = document.createElement('a');
        //         link.href = url;
        //         link.setAttribute(
        //             'download',
        //             `FileName.pdf`,
        //         );

        //         // Append to html link element page
        //         document.body.appendChild(link);

        //         // Start download
        //         link.click();

        //         // Clean up and remove the link
        //         link.parentNode.removeChild(link);
        //     })
        //     .catch((err) => {
        //         console.log("Error");
        //     });



        // fetch(
        //     'http://localhost:8086/downloadFile/hungdx_09092021232743.pdf',
        //     {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/pdf',
        //         },
        //     })
        //     .then((response) => response.blob())
        //     .then((blob) => {
        //         // Create blob link to download
        //         const url = window.URL.createObjectURL(
        //             new Blob([blob]),
        //         );
        //         const link = document.createElement('a');
        //         link.href = url;
        //         link.setAttribute(
        //             'download',
        //             `FileName.pdf`,
        //         );

        //         // Append to html link element page
        //         document.body.appendChild(link);

        //         // Start download
        //         link.click();

        //         // Clean up and remove the link
        //         link.parentNode.removeChild(link);
        //     });
    }




    const customizedContent = (item) => {
        // console.log(`item`, item)
        return (
            <div>
                {item.color === '#9C27B0' &&

                    // <Button label="Xuất hóa đơn" className="p-button-text"  ></Button>
                    <a href={report?.path}>Xuất hóa đơn</a>
                }

                <Card title={item.status} subTitle={item.date}>
                    {item.image && <img src={`${item.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} width={200} className="p-shadow-2" />}
                </Card>
            </div>

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
