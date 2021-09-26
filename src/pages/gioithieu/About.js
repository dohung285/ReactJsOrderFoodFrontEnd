

import React from 'react'

import './About.css'

const About = () => {
    return (
        <div className="card">
            <div className="card-body">
                {/* <section className="banner-bottom-wthree py-5" id="about">
                <div className="container py-md-3">
                    <div className="row banner-grids">
                        <div className="col-md-6 content-left-bottom text-left pr-lg-5">
                            <h4>TRIPLE HAMBURGER WITH CHEESE MEAL</h4>
                            <p className="mt-2 text-left">Integer pulvinar leo id viverra feugiat.<strong className="text-capitalize"> Pellentesque libero justo, semper at tempus vel, ultrices in sed ligula. Nulla uter sollicitudin velit.</strong> Sed porttitor orci vel fermentum elit maximus. Curabitur ut turpis massa in condimentum libero. Pellentesque maximus Pellentesque libero justo Nulla uter sollicitudin velit. Sed porttitor orci vel ferm semper at vel, ultrices in ligula semper at vel.Curabitur ut turpis massa in condimentum libero.</p>
                        </div>
                        <div className="col-md-6 content-right-bottom text-left">
                            <img src="images/ab1.png" alt="news image" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section> */}

                <div className="p-grid p-dir-row p-mt-6">
                    <div className="p-col-6">
                        <h4>Lịch sử</h4>
                        <p className="mt-2 text-left">Từ năm 2018 <strong className="text-capitalize"> orderfood</strong> là chuỗi cửa hàng thức ăn nhanh với 10 cửa hàng tại Hà Nội. Chúng tôi không chỉ mang đến những bữa ăn ngon, an toàn, bổ dưỡng mà còn làm hài lòng quý khách hàng về dịch vụ của chúng tôi. Hãy để chúng tôi phục vụ bạn với chất lượng và dịch vụ tuyệt hảo, mang đến cho bạn những trải nghiệm độc đáo. Tận hưởng bữa ăn của bạn với các món ăn được cập nhập tại <strong className="text-capitalize">orderfood</strong> </p>
                    </div>
                    <div className="p-col-6">
                        <img src={`http://localhost:8083/downloadFile/about1.png`} alt="news image" className="img-fluid" />
                    </div>

                    <div className="p-col-6">
                        <img src={`http://localhost:8083/downloadFile/ab.png`} alt="news image" className="img-fluid" />
                    </div>
                    <div className="p-col-6">
                        <h4>Xứ mệnh</h4>
                        <p className="mt-2 text-left">Món ăn ngon với hương vị độc đáo, phong cách phục vụ chuyên nghiệp, thân thiện tại các cửa hàng, đảm bảo vệ sinh thực phẩm và giá cả hợp lý là các tiêu chuẩn mà chúng tôi hướng tới khách hàng. Bên cạnh những món ăn truyền thống, một số món ăn mới và đồ uống đã được phát triển nhằm tăng thêm sự đa dạng của thực đơn tại <strong className="text-capitalize">orderfood</strong>.</p>
                    </div>
                </div>




            </div>
        </div>
    )
}

export default About
