import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext'
import { Row } from 'primereact/row';
import React, { useState } from 'react'

const TraCuuGiayNopTien = () => {


    const [selectedCity1, setSelectedCity1] = useState(null);
    // const [dataOfTable, setDataOfTable] = useState([])

    const dataOfTable = [
        { stt: 1, sct: '', stc: '', sgnt: '', nlgnt: '', nggnt: '', nnt: '', nh: '', tknh: '', st: '', lt: '', tt: '', tv: '' },
        { stt: 2, sct: '', stc: '', sgnt: '', nlgnt: '', nggnt: '', nnt: '', nh: '', tknh: '', st: '', lt: '', tt: '', tv: '' },
        { stt: 3, sct: '', stc: '', sgnt: '', nlgnt: '', nggnt: '', nnt: '', nh: '', tknh: '', st: '', lt: '', tt: '', tv: '' },
    ]

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const [date, setDate] = useState(null);

    let headerGroup = <ColumnGroup>

        <Row>
            <Column header="STT" field="stt" style={{ textAlign: "center" }} />
            <Column header="Số chứng từ" field="sct" style={{ textAlign: "center" }} />
            <Column header="Số tham chiếu" field="ktnqdtb" style={{ textAlign: "center" }} />
            <Column header="Số GNT" field="ndcknnsnn" style={{ textAlign: "center" }} />
            <Column header="Ngày lập GNT" field="snt" style={{ textAlign: "center" }} />
            <Column header="Ngày gửi GNT" field="stVND" style={{ textAlign: "center" }} />
            <Column header="Ngày nộp thuế" field="mc" style={{ textAlign: "center" }} />
            <Column header="Ngân hàng" field="mtm" style={{ textAlign: "center" }} />
            <Column header="Tài khoản NH" field="tv" style={{ textAlign: "center" }} />
            <Column header="Số tiền" field="stVND" style={{ textAlign: "center" }} />
            <Column header="Loại tiền" field="mc" style={{ textAlign: "center" }} />
            <Column header="Trạng thái" field="mtm" style={{ textAlign: "center" }} />
            <Column header="Tác vụ" field="tv" style={{ textAlign: "center" }} />
        </Row>
    </ColumnGroup>;

    const renderTacVu = () => {
        return (
            <div>
                <i
                    className="pi pi-eye p-mr-2"
                    style={{ color: "red", cursor: "pointer", textAlign: "center" }}
                    title={"Chi tiết"}
                // onClick={()=> console.log('e', e.id)}
                // onClick={() => handleDeleteRow(id)}
                />

                <i
                    className="pi pi-download"
                    style={{ color: "red", cursor: "pointer", textAlign: "center" }}
                    title={"Tải xuống"}
                // onClick={()=> console.log('e', e.id)}
                // onClick={() => handleDeleteRow(id)}
                />
            </div>
        );
    }



    return (
        <React.Fragment>
            <div className="card ">
                <h1> Tra cứu giấy nộp tiền</h1>
                <div className="p-grid nested-grid card-body">
                  
                    <div className="p-col-4">

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Số chứng từ ngân hàng</label>
                                <div className="p-col">
                                    <InputText id="firstname3" type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngân hàng</label>
                                <div className="p-col">
                                    <Dropdown value={selectedCity1} options={cities} onChange={e => setSelectedCity1(e.value)} optionLabel="name" placeholder="Select a City" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Số tài khoản</label>
                                <div className="p-col">
                                    <InputText id="firstname3" type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Số GNT</label>
                                <div className="p-col">
                                    <InputText id="firstname3" type="text" />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Loại tiền</label>
                                <div className="p-col">
                                    <Dropdown value={selectedCity1} options={cities} onChange={e => setSelectedCity1(e.value)} optionLabel="name" placeholder="Select a City" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-12">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Số tham chiếu</label>
                                <div className="p-col">
                                    <InputText id="firstname3" type="text" />
                                </div>
                            </div>
                        </div>

                    </div>



                    {/* Phần bên phải */}
                    <div className="p-col-8">
                        <div className="p-grid">
                            {/* Dong 1 */}
                            <div className="p-col-6">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngày nộp GNT từ ngày</label>
                                        <div className="p-col">
                                            {/* <InputText id="firstname3" type="text" /> */}
                                            <Calendar id="time" value={date} onChange={(e) => setDate(e.value)} showTime showSeconds showIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-col-6">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến ngày</label>
                                        <div className="p-col">
                                            <Calendar id="time" value={date} onChange={(e) => setDate(e.value)} showTime showSeconds showIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Dong 1 */}

                            {/* Dong 2 */}
                            <div className="p-col-6">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngày nộp GNT từ ngày</label>
                                        <div className="p-col">
                                            <Calendar id="time" value={date} onChange={(e) => setDate(e.value)} showTime showSeconds showIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-col-6">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến ngày</label>
                                        <div className="p-col">
                                            <Calendar id="time" value={date} onChange={(e) => setDate(e.value)} showTime showSeconds showIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Dong 2 */}

                            {/* Dong 3 */}
                            <div className="p-col-6">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngày nộp thuế từ ngày</label>
                                        <div className="p-col">
                                            <Calendar id="time" value={date} onChange={(e) => setDate(e.value)} showTime showSeconds showIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-col-6">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến ngày</label>
                                        <div className="p-col">
                                            <Calendar id="time" value={date} onChange={(e) => setDate(e.value)} showTime showSeconds showIcon/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Dong 3 */}



                            {/* Dong 4 */}
                            <div className="p-col-12">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Trạng thái</label>
                                        <div className="p-col">
                                            <Dropdown value={selectedCity1} options={cities} onChange={e => setSelectedCity1(e.value)} optionLabel="name" placeholder="Select a City" style={{ width: '219px' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End dong 4 */}


                            {/* Dong 5 */}
                            <div className="p-col-6">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Tổng tiền nộp từ</label>
                                        <div className="p-col">
                                            <InputText id="firstname3" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-col-6">
                                <div className="p-col-12">
                                    <div className="p-field p-grid">
                                        <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến</label>
                                        <div className="p-col">
                                            <InputText id="firstname3" type="text" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Dong 5 */}

                        </div>
                    </div>
                    <div className="p-col-12 p-grid">
                        <div className="p-col p-col-align-center">
                            <Button label="Tra cứu" className="p-button-rounded p-button-success p-offset-4" />
                        </div>

                    </div>



                    <h1>Kết quả tra cứu</h1>
                    <DataTable value={dataOfTable} headerColumnGroup={headerGroup}>
                        <Column field="stt" />
                        <Column field="sct" />
                        <Column field="stc" />
                        <Column field="sgnt" />
                        <Column field="nlgnt" />
                        <Column field="nggnt" />
                        <Column field="nnt" />
                        <Column field="nh" />
                        <Column field="tknh" />
                        <Column field="st" />
                        <Column field="lt" />
                        <Column field="tt" />
                        <Column field="tv" body={renderTacVu} />
                    </DataTable>

                    <div>Tổng tiền:...... VND,...... USD</div>
                    <Button label="Kết xuất" className="p-button-rounded p-button-success p-offset-4" />
                    
                </div>
            </div>
        </React.Fragment>
    )
}

export default TraCuuGiayNopTien
