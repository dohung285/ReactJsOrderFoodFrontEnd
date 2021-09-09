
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';


const Contact = () => {


    const [googleMapsReady, setGoogleMapsReady] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [markerTitle, setMarkerTitle] = useState('');
    const [draggableMarker, setDraggableMarker] = useState(false);
    const [overlays, setOverlays] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);

    const toast = useRef(null);

    useEffect(() => {
        // loadGoogleMaps(() => {
        //     setGoogleMapsReady(true);
        // });

        // return () => {
        //     removeGoogleMaps();
        // }
    }, [])





    const onMapClick = (event) => {
        setDialogVisible(true);
        setSelectedPosition(event.latLng)
    }

    // const onOverlayClick = (event) => {
    //     let isMarker = event.overlay.getTitle !== undefined;

    //     if (isMarker) {
    //         let title = event.overlay.getTitle();
    //         infoWindow = infoWindow || new google.maps.InfoWindow();
    //         infoWindow.setContent('<div>' + title + '</div>');
    //         infoWindow.open(event.map, event.overlay);
    //         event.map.setCenter(event.overlay.getPosition());

    //         toast.current.show({ severity: 'info', summary: 'Marker Selected', detail: title });
    //     }
    //     else {
    //         toast.current.show({ severity: 'info', summary: 'Shape Selected', detail: '' });
    //     }
    // }

    const handleDragEnd = (event) => {
        toast.current.show({ severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle() });
    }

    // const addMarker = () => {
    //     let newMarker = new google.maps.Marker({
    //         position: {
    //             lat: selectedPosition.lat(),
    //             lng: selectedPosition.lng()
    //         },
    //         title: markerTitle,
    //         draggable: draggableMarker
    //     });

    //     setOverlays([...overlays, newMarker]);
    //     setDialogVisible(false);
    //     setDraggableMarker(false);
    //     setMarkerTitle('');
    // }

    // const onMapReady = (event) => {
    //     setOverlays(
    //         [
    //             new google.maps.Marker({ position: { lat: 36.879466, lng: 30.667648 }, title: "Konyaalti" }),
    //             new google.maps.Marker({ position: { lat: 36.883707, lng: 30.689216 }, title: "Ataturk Park" }),
    //             new google.maps.Marker({ position: { lat: 36.885233, lng: 30.702323 }, title: "Oldtown" }),
    //             new google.maps.Polygon({
    //                 paths: [
    //                     { lat: 36.9177, lng: 30.7854 }, { lat: 36.8851, lng: 30.7802 }, { lat: 36.8829, lng: 30.8111 }, { lat: 36.9177, lng: 30.8159 }
    //                 ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
    //             }),
    //             new google.maps.Circle({ center: { lat: 36.90707, lng: 30.56533 }, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500 }),
    //             new google.maps.Polyline({ path: [{ lat: 36.86149, lng: 30.63743 }, { lat: 36.86341, lng: 30.72463 }], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2 })
    //         ]
    //     );
    // }

    // const onHide = (event) => {
    //     setDialogVisible(false);
    // }

    // const options = {
    //     center: { lat: 36.890257, lng: 30.707417 },
    //     zoom: 12
    // };

    // const footer = <div>
    //     <Button label="Yes" icon="pi pi-check" onClick={addMarker} />
    //     <Button label="No" icon="pi pi-times" onClick={onHide} />
    // </div>;


    return (
        <div className="card">
            <div className="card-body">
                <h1 className="rowOne">Liên hệ</h1>
                <div className="p-grid p-mt-4">
                    <div className="p-col rowTwo">
                        <Card style={{ width: '25rem', marginBottom: '2em' }}>
                            <p >
                                <span><i className="pi pi-caret-down" style={{ 'fontSize': '2em' }}></i></span>
                                <p style={{ display: 'flex', justifyContent: 'center' }}>số 59 Giải Phóng, phường Đồng Tâm , quận Hai Bà Trưng, tp Hà Nội</p>
                            </p>
                        </Card>

                    </div>
                    <div className="p-col rowTwo">
                        <Card style={{ width: '25rem', marginBottom: '2em' }}>
                            <p >
                                <span><i className="pi pi-phone" style={{ 'fontSize': '2em' }}></i></span>
                                <p style={{ display: 'flex', justifyContent: 'center' }}>số 59 Giải Phóng, phường Đồng Tâm , quận Hai Bà Trưng, tp Hà Nội</p>
                                <p style={{ display: 'flex', justifyContent: 'center' }}>orderfood@yahoo.com</p>
                            </p>
                        </Card>

                    </div>
                    <div className="p-col rowTwo">
                        <Card style={{ width: '25rem', marginBottom: '2em' }}>
                            <p >
                                <span><i className="pi pi-clock" style={{ 'fontSize': '2em' }}></i></span>
                                <p style={{ display: 'flex', justifyContent: 'center' }}>Sáng: 06:00 - 12:00</p>
                                <p style={{ display: 'flex', justifyContent: 'center' }}>Trưa: 13:00 - 15:00</p>
                                <p style={{ display: 'flex', justifyContent: 'center' }}>Tối: 18:00 - 20:00</p>
                            </p>
                        </Card>
                    </div>

                </div>

                <div className="p-grid">
                    <div className="p-col-6">

                        <div className="p-fluid">
                            <div className="p-field">
                                <label htmlFor="firstname1">Tên</label>
                                <InputText id="firstname1" type="text" />
                            </div>
                            <div className="p-field">
                                <label htmlFor="lastname1">Email</label>
                                <InputText id="lastname1" type="text" />
                            </div>
                            <div className="p-field">
                                <label htmlFor="address">Lời nhắn</label>
                                <InputTextarea id="address" type="text" rows="4" />
                            </div>
                            <div className="p-field p-col-2">
                                <Button label="Gửi" className="p-button-rounded p-button-danger" />
                            </div>
                        </div>

                    </div>

                    <div className="p-col-6">
                        <img src={`http://localhost:8083/downloadFile/about1.png`} alt="news image" className="img-fluid" />
                    </div>



                </div>

            </div>
        </div>
    )
}

export default Contact
