import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext'
import { Row } from 'primereact/row';
import React, { useState } from 'react'
import * as moment from "moment";

// moment(rowData.thoiGian).format("DD/MM/yy HH:mm:ss")

const TraCuuGiayNopTien = () => {


    const [selectedCity1, setSelectedCity1] = useState(null);
    // const [dataOfTable, setDataOfTable] = useState([])

    const dataOfTable = [
        { stt: 1, sct: '', stc: '', sgnt: '', nlgnt: '', nggnt: '', nnt: '', nh: '', tknh: '', st: '', lt: '', tt: '', tv: '' },
        { stt: 2, sct: '', stc: '', sgnt: '', nlgnt: '', nggnt: '', nnt: '', nh: '', tknh: '', st: '', lt: '', tt: '', tv: '' },
        { stt: 3, sct: '', stc: '', sgnt: '', nlgnt: '', nggnt: '', nnt: '', nh: '', tknh: '', st: '', lt: '', tt: '', tv: '' },
    ]

    const nganHangs = [
        { name: 'Ngân hàng New York', code: 'NY' },
        { name: 'Ngân hàng Rome', code: 'RM' },
        { name: 'Ngân hàng London', code: 'LDN' },
        { name: 'Ngân hàng Istanbul', code: 'IST' },
        { name: 'Ngân hàng Paris', code: 'PRS' }
    ];


    const loaiTiens = [
        { name: 'VND', code: 'NY' },
        { name: 'USA', code: 'RM' },
        { name: 'Tất cả', code: 'LDN' },

    ];

    const trangThais = [
        { name: 'Lấy từ danh mục trạng thái New York', code: 'NY' },
        { name: 'Lấy từ danh mục trạng thái Rome', code: 'RM' },
        { name: 'Lấy từ danh mục trạng thái London', code: 'LDN' },
        { name: 'Lấy từ danh mục trạng thái Istanbul', code: 'IST' },
        { name: 'Lấy từ danh mục trạng thái Paris', code: 'PRS' }
    ];







    const [date, setDate] = useState(null);
    const [ngayNopGNTTuNgay, setNgayNopGNTTuNgay] = useState(null)
    const [ngayNopGNTDenNgay, setNgayNopGNTDenNgay] = useState(null)
    const [ngayGuiGNTTuNgay, setNgayGuiGNTTuNgay] = useState(null)
    const [ngayGuiGNTDenNgay, setNgayGuiGNTDenNgay] = useState(null)
    const [ngayNopThueTuNgay, setNgayNopThueTuNgay] = useState(null)
    const [ngayNopThueDenNgay, setNgayNopThueDenNgay] = useState(null)

    const [nganHang, setNganHang] = useState(null)
    const [loaiTien, setLoaiTien] = useState(null)
    const [trangThai, setTrangThai] = useState(null)



    const handleOnChange = (e) => {
        // console.log('e', e);
        const { name, value } = e.target;
        // console.log('name', name)
        // console.log('value', value)


        let valueName = value.name;

        switch (name) {
            case 'ngayNopGNTTuNgay':
                setNgayNopGNTTuNgay(moment(value).format("DD/MM/yy HH:mm:ss"))
                break;
            case 'ngayNopGNTDenNgay':
                setNgayNopGNTDenNgay(moment(value).format("DD/MM/yy HH:mm:ss"))
                break;
            case 'ngayGuiGNTTuNgay':
                setNgayGuiGNTTuNgay(moment(value).format("DD/MM/yy HH:mm:ss"))
                break;
            case 'ngayGuiGNTDenNgay':
                setNgayGuiGNTDenNgay(moment(value).format("DD/MM/yy HH:mm:ss"))
                break;
            case 'ngayNopThueTuNgay':
                // console.log('moment(value).format("DD/MM/yy HH:mm:ss")', moment(value).format("DD/MM/yy HH:mm:ss"))
                setNgayNopThueTuNgay(moment(value).format("DD/MM/yy HH:mm:ss"))
                break;
            case 'ngayNopThueDenNgay':
                setNgayNopThueDenNgay(moment(value).format("DD/MM/yy HH:mm:ss"))
                break;

            case 'nganHang':
                setNganHang(value)
                break;
            case 'loaiTien':
                setLoaiTien(value)
                break;
            case 'trangThai':
                setTrangThai(value)
                break;
        }





    }





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

                <fieldset>
                    <legend>Nhập liệu</legend>
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
                                        <Dropdown
                                            value={nganHang}
                                            name="nganHang"
                                            options={nganHangs}
                                            onChange={handleOnChange}
                                            // onChange={e => setSelectedCity1(e.value)}
                                            optionLabel="name" placeholder="==== Chọn ====" style={{ width: '219px' }} />
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
                                        <Dropdown
                                            value={loaiTien}
                                            name="loaiTien"
                                            options={loaiTiens}
                                            // onChange={e => setSelectedCity1(e.value)}
                                            onChange={handleOnChange}
                                            optionLabel="name" placeholder="==== Chọn ====" style={{ width: '219px' }} />
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
                                                <Calendar
                                                    id="ngayNopGNTTuNgay"
                                                    value={ngayNopGNTTuNgay}
                                                    name="ngayNopGNTTuNgay"
                                                    // onChange={(e) => setDate(e.value)}
                                                    onChange={handleOnChange}
                                                    showTime showSeconds showIcon
                                                    dateFormat="dd/mm/yy"

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-6">
                                    <div className="p-col-12">
                                        <div className="p-field p-grid">
                                            <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến ngày</label>
                                            <div className="p-col">
                                                <Calendar
                                                    id="ngayNopGNTDenNgay"
                                                    value={ngayNopGNTDenNgay}
                                                    name="ngayNopGNTDenNgay"
                                                    // onChange={(e) => setDate(e.value)}
                                                    onChange={handleOnChange}
                                                    showTime showSeconds showIcon
                                                    dateFormat="dd/mm/yy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End Dong 1 */}

                                {/* Dong 2 */}
                                <div className="p-col-6">
                                    <div className="p-col-12">
                                        <div className="p-field p-grid">
                                            <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Ngày gửi GNT từ ngày</label>
                                            <div className="p-col">
                                                <Calendar
                                                    id="ngayGuiGNTTuNgay"
                                                    value={ngayGuiGNTTuNgay}
                                                    name="ngayGuiGNTTuNgay"
                                                    onChange={handleOnChange}
                                                    showTime showSeconds showIcon
                                                    dateFormat="dd/mm/yy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-6">
                                    <div className="p-col-12">
                                        <div className="p-field p-grid">
                                            <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến ngày</label>
                                            <div className="p-col">
                                                <Calendar
                                                    id="ngayGuiGNTDenNgay"
                                                    value={ngayGuiGNTDenNgay}
                                                    name="ngayGuiGNTDenNgay"
                                                    // onChange={(e) => setDate(e.value)}
                                                    onChange={handleOnChange}
                                                    showTime showSeconds showIcon
                                                    dateFormat="dd/mm/yy"
                                                />
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
                                                <Calendar
                                                    id="ngayNopThueTuNgay"
                                                    value={ngayNopThueTuNgay}
                                                    name="ngayNopThueTuNgay"
                                                    // onChange={(e) => setDate(e.value)}
                                                    onChange={handleOnChange}
                                                    showTime showSeconds showIcon
                                                    dateFormat="dd/mm/yy"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-col-6">
                                    <div className="p-col-12">
                                        <div className="p-field p-grid">
                                            <label htmlFor="firstname3" className="p-col-fixed" style={{ width: '200px' }}>Đến ngày</label>
                                            <div className="p-col">
                                                <Calendar
                                                    id="ngayNopThueDenNgay"
                                                    value={ngayNopThueDenNgay}
                                                    name="ngayNopThueDenNgay"
                                                    // onChange={(e) => setDate(e.value)}
                                                    onChange={handleOnChange}
                                                    showTime showSeconds showIcon
                                                    dateFormat="dd/mm/yy"
                                                />
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
                                                <Dropdown
                                                    value={trangThai}
                                                    name="trangThai"
                                                    options={trangThais}
                                                    // onChange={e => setSelectedCity1(e.value)}
                                                    onChange={handleOnChange}
                                                    optionLabel="name" placeholder="==== Chọn ====" style={{ width: '219px' }} />
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
                    </div>
                </fieldset>



                <fieldset>
                    <legend>Hành động</legend>
                    <div className="p-grid">
                        <div className="p-col">
                            <Button label="Tra cứu" className="p-button-success" />
                        </div>
                    </div>

                </fieldset>


                <fieldset>
                    <legend>Kết quả tra cứu</legend>
                    {/* <h1>Kết quả tra cứu</h1> */}
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

                    <div style={{ float: "right" }}>Tổng tiền:...... VND,...... USD</div>
                </fieldset>

                <fieldset>
                    <legend></legend>
                    <Button label="Kết xuất" className="p-button-success" />
                </fieldset>






            </div>
        </React.Fragment>
    )
}

export default TraCuuGiayNopTien
