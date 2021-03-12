import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext'
import { Row } from 'primereact/row';
import React, { useState } from 'react'

const TraCuuThuTraSoat = () => {


    const [selectedCity1, setSelectedCity1] = useState(null);

    const [dateNLTN, setdateNLTN] = useState(null);
    const [dateNLDN, setDateNLDN] = useState(null);

    const [dateNGTN, setDateNGTN] = useState(null)
    const [dateNGDN, setdateNGDN] = useState(null)


    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];



    const dataOfTable = [
        { stt: 1, sts: '', stcsgnt: '', sct: '', cqt: '', ng: '', tt: '', tb: '', tv: '' },
        { stt: 2, sts: '', stcsgnt: '', sct: '', cqt: '', ng: '', tt: '', tb: '', tv: '' },
        { stt: 3, sts: '', stcsgnt: '', sct: '', cqt: '', ng: '', tt: '', tb: '', tv: '' },

    ]


    let headerGroup = <ColumnGroup>

        <Row>
            <Column header="STT" field="stt" style={{ textAlign: "center" }} />
            <Column header="Số tra soát" field="sts" style={{ textAlign: "center" }} />
            <Column header="Số tham chiếu/Số GNT" field="stcsgnt" style={{ textAlign: "center" }} />
            <Column header="Số chứng từ" field="sct" style={{ textAlign: "center" }} />
            <Column header="Cơ quan thuế" field="cqt" style={{ textAlign: "center" }} />
            <Column header="Ngày gửi" field="ng" style={{ textAlign: "center" }} />
            <Column header="Trạng thái" field="tt" style={{ textAlign: "center" }} />
            <Column header="Thông báo" field="tb" style={{ textAlign: "center" }} />
            <Column header="Tác vụ" field="tv" style={{ textAlign: "center" }} />
        </Row>
    </ColumnGroup>;

    const renderThongBao = () => {
        return (
            <div>
                <i
                    className="pi pi-info p-mr-2"
                    style={{ color: "red", cursor: "pointer", textAlign: "center" }}
                    title={"Xem thông báo"}
                />

            </div>
        )
    }

    const renderTacVu = () => {
        return (
            <div>
                <i
                    className="pi pi-pencil p-mr-2"
                    style={{ color: "red", cursor: "pointer", textAlign: "center" }}
                    title={"Sửa"}
                // onClick={()=> console.log('e', e.id)}
                // onClick={() => handleDeleteRow(id)}
                />

                <i
                    className="pi pi-times p-mr-2"
                    style={{ color: "green", cursor: "pointer", textAlign: "center" }}
                    title={"Xóa"}
                />

                <i
                    className="pi pi-eye p-mr-2"
                    style={{ color: "blue", cursor: "pointer", textAlign: "center" }}
                    title={"Chi tiết"}
                // onClick={()=> console.log('e', e.id)}
                // onClick={() => handleDeleteRow(id)}
                />

                <i
                    className="pi pi-download p-mr-2"
                    style={{ color: "##00ff83", cursor: "pointer", textAlign: "center" }}
                    title={"Tải xuống"}
                />

                <i
                    className="pi pi-plus-circle"
                    style={{ color: "#4d0000", cursor: "pointer", textAlign: "center" }}
                    title={"Tệp đính kèm"}
                />


            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-body">
                {/* <h1>Tra cứu thư tra soát</h1> */}

                <fieldset>
                    <legend>Tra cứu thư tra soát</legend>
                    <div className="p-grid nested-grid">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Số tra soát</label>
                                <div className="p-col">
                                    <InputText id="firstname3" type="text" />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="p-grid nested-grid">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngày lập từ ngày</label>
                                <div className="p-col">
                                    {/* <InputText id="firstname3" type="text" /> */}
                                    <Calendar id="time24" value={dateNLTN} onChange={(e) => setdateNLTN(e.value)} showTime showSeconds showIcon />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến ngày</label>
                                <div className="p-col">
                                    <Calendar id="time24" value={dateNLDN} onChange={(e) => {setDateNLDN(e.value)}} showTime showSeconds showIcon />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="p-grid nested-grid">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngày gửi từ ngày</label>
                                <div className="p-col">
                                    <Calendar id="time24" value={dateNGTN} onChange={(e) => setDateNGTN(e.value)} showTime showSeconds showIcon />
                                </div>
                            </div>
                        </div>

                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến ngày</label>
                                <div className="p-col">
                                    <Calendar id="time24" value={dateNGDN} onChange={(e) => setdateNGDN(e.value)} showTime showSeconds showIcon />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="p-grid nested-grid">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Trạng thái</label>
                                <div className="p-col">
                                    <Dropdown value={selectedCity1} options={cities} onChange={e => setSelectedCity1(e.value)} optionLabel="name" placeholder="Select a City" style={{ width: '219px' }} />
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className="p-grid nested-grid">
                        <div className="p-col-6">
                            <div className="p-field p-grid">
                                <Button label="Tra cứu" />
                            </div>
                        </div>
                    </div>

                </fieldset>

                <fieldset>
                    <legend>Kết quả tra cứu</legend>
                    <DataTable value={dataOfTable} headerColumnGroup={headerGroup}>
                        <Column field="stt" />
                        <Column field="sts" />
                        <Column field="stcsgnt" />
                        <Column field="sct" />
                        <Column field="cqt" />
                        <Column field="ng" />
                        <Column field="tt" />
                        <Column field="tb" body={renderThongBao} />
                        <Column field="tv" body={renderTacVu} />
                    </DataTable>
                    <Button label="Xuất Excel" />
                </fieldset>







            </div>
        </div>
    )
}

export default TraCuuThuTraSoat
