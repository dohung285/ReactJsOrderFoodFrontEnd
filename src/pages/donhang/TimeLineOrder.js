
import { Card } from 'primereact/card';
import { Timeline } from 'primereact/timeline';
import React from 'react';

const TimeLineOrder = () => {

    const events1 = [
        { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
        { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
        { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
        { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    ];


    const customizedMarker = (item) => {
        return (
            <span className="custom-marker p-shadow-2" style={{ backgroundColor: item.color }}>
                <i className={item.icon}></i>
            </span>
        );
    };

    const customizedContent = (item) => {
        return (
            <Card title={item.status} subTitle={item.date}>
                {/* { item.image && <img src={`showcase/demo/images/product/${item.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} width={200} className="p-shadow-2" />} */}
                {/* <Button label="Read more" className="p-button-text"></Button> */}
            </Card>
        );
    };


    return (
        <div>
            <div className="card">
                <Timeline value={events1} align="alternate" className="customized-timeline" marker={customizedMarker} content={customizedContent} />
            </div>
        </div>
    )
}

export default TimeLineOrder
