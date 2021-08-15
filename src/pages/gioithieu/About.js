

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
                        <h4>TRIPLE HAMBURGER WITH CHEESE MEAL</h4>
                        <p className="mt-2 text-left">Integer pulvinar leo id viverra feugiat.<strong className="text-capitalize"> Pellentesque libero justo, semper at tempus vel, ultrices in sed ligula. Nulla uter sollicitudin velit.</strong> Sed porttitor orci vel fermentum elit maximus. Curabitur ut turpis massa in condimentum libero. Pellentesque maximus Pellentesque libero justo Nulla uter sollicitudin velit. Sed porttitor orci vel ferm semper at vel, ultrices in ligula semper at vel.Curabitur ut turpis massa in condimentum libero.</p>
                    </div>
                    <div className="p-col-6">
                        <img src={`http://localhost:8083/downloadFile/about1.png`} alt="news image" className="img-fluid" />
                    </div>

                    <div className="p-col-6">
                        <img src={`http://localhost:8083/downloadFile/ab.png`} alt="news image" className="img-fluid" />
                    </div>
                    <div className="p-col-6">
                        <h4>TRIPLE HAMBURGER WITH CHEESE MEAL</h4>
                        <p className="mt-2 text-left">Integer pulvinar leo id viverra feugiat.<strong className="text-capitalize"> Pellentesque libero justo, semper at tempus vel, ultrices in sed ligula. Nulla uter sollicitudin velit.</strong> Sed porttitor orci vel fermentum elit maximus. Curabitur ut turpis massa in condimentum libero. Pellentesque maximus Pellentesque libero justo Nulla uter sollicitudin velit. Sed porttitor orci vel ferm semper at vel, ultrices in ligula semper at vel.Curabitur ut turpis massa in condimentum libero.</p>
                    </div>
                </div>




            </div>
        </div>
    )
}

export default About
