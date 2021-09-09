import React from 'react';
export const Footer = () => {
    return (
        <footer>
            <div className="page">
                <div className="content"></div>
                <div className="footer">
                    <div className="left"></div>
                    <div className="center">
                        <div className="top">
                            <div className="textFirst">
                                <h3>Địa chỉ</h3>
                                <p>số 59 Giải Phóng, phường Đồng Tâm, quận Hai Bà Trưng, tp Hà Nội</p>
                                <span>orderfood@gmail.com</span>
                            </div>

                            <div className="textTwo">
                                <h3>Cửa hàng</h3>
                                <p>số 59 Giải Phóng, phường Đồng Tâm, quận Hai Bà Trưng, tp Hà Nội</p>
                                <span>0398552599</span>
                            </div>

                            <div className="textThree">
                                <h3>Mở cửa</h3>
                                <p>Sáng: 06:00 - 12:00</p>
                                <p>Trưa: 13:00 - 15:00</p>
                                <p>Tối: 18:00 - 20:00</p>
                                <span>0398552599</span>
                            </div>

                            <div className="textFour">
                                <h3>Twitter feed</h3>
                                <p>Các sản phẩm rất ngon và rẻ</p>
                                <span>0398552599</span>
                            </div>
                        </div>
                        <div className="bottom p-mb-6">
                            <span>@2021 Orderfood.</span>
                            <div className="icon-footer">
                                <span><i className="pi pi-facebook p-mr-2" style={{ 'fontSize': '2em'  }}></i></span>
                                <span><i className="pi pi-google p-mr-2" style={{ 'fontSize': '2em' }}></i></span>
                                <span><i className="pi pi-twitter p-mr-2" style={{ 'fontSize': '2em' }}></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="right"></div>
                </div>
            </div>
        </footer>
    );
};