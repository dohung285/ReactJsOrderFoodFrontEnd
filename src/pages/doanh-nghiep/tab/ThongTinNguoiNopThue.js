import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { TIME_OUT_CLOSE_NOTIFY } from '../../../constants/ConstantString';
import InfoBusinessService from '../../../service/InfoBusinessService';
import ThongTinNganHangService from '../../../service/ThongTinNganHangService';

const emptyData = {
    mst: "",
    fax: "",
    thudientu: "",
    website: "",
    macongty: "",
    matinh: "",
    maquanhuyen: "",
    maphuongxa: "",
    diachi: "",
    tendoanhnghiep: "",
    tenthuongmai: "",
    tencoquanthue: "",
    linhvuckinhdoanh: "",
    lachinhanh: "",
    masothuedoanhnghiepme: "",
    tendoanhnghiepme: "",
    loaihinhkinhdoanh: "",
    mota: "",
    macoquanthue: "",
    tennguoidaidien: "",
    tennguoinopthue: "",
    sodienthoai: ""
}

function ThongTinNguoiNopThue() {
    const service = new InfoBusinessService();
    const serviceNganHang = new ThongTinNganHangService();
    const [adData, setAdData] = useState({});//thong tin nguoi nop thue
    const [adData1, setAdData1] = useState({});// chung thu so
    const [adData2, setAdData2] = useState({});// tai khoan ngan hang
    const [first, setFirst] = useState(0);
    const [products, setProducts] = useState([])//
    const [isShow, setIsShow] = useState(1);
    const [checked, setChecked] = useState(false);
    const [listBanks, setListBanks] = useState([])

    // Encode the String
    const emptyDataTong = {
        "mst": "",
        "latochuc": 0,
        "thoigianapdung": "",
        "xmlgoc": "",
        "xmldnky": "",
        "xmltct": "",
        "pdf": "",
        "mota": "",
        "ttdnRequest": adData,
        "chungThuSoRequest": adData1,
        "nganHangRequest": adData2,
        "jsonThuTuc": [{"stt": "1",
            "thuDienTu": "",
            "hoTenNguoiSdung": "",
            "thuTuc": ""}]
    }
    const [tong, setTong] = useState({emptyDataTong});



    const updateField = (data, field) => {
        setAdData({
            ...adData,
            [field]: data,
        });
    }
    const updateField1 = (data, field) => {
        setAdData1({
            ...adData1,
            [field]: data,
        });
    }

    const updateField2 = (data, field) => {
        setAdData2({
            ...adData2,
            [field]: data,
        });
        console.log(adData2)
    }

    const updateFieldProduct = (data, field) => {
        setProducts({
            ...products,
            [field]: data,
        });
    }

    useEffect(() => {
        fetData();
        getInfoBank2();
    }, [])

    const fetData = async () => {
        const result = await service.getDataInfoBusinessById();
        if (result && result.status === 1000) {
            setAdData(result.object);
            // setTotalRecord(result.totalItem);
        }
    };
    const onEditorValueChange = (props, value) => {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        setProducts(updatedProducts);
    }

    const inputTextEditor = (props, field) => {
        return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(props, e.target.value)} />;
    }

    const nameEditor = (props) => {
        return inputTextEditor(props, 'hoten');
    }

    const emailEditor = (props) => {
        return inputTextEditor(props, 'email');
    }

    const renderRowIndex = (products, column) => {
        return column.rowIndex + 1 + first;
    };


    const addRow = async e => {
        var obj = {
            hoten: "",
            email: ""
        };
        let data = products;
        data.push(obj)
        setProducts([...data])
    };

    const banks = [
        { name: 'Agribank', code: 'AG' },
        { name: 'Techcombank', code: 'TC' },
        { name: 'Vietcombank', code: 'VC' },
        { name: 'MBBank', code: 'MB' },
        { name: 'VietTinBank', code: 'VT' }
    ];

    const eventTieptuc = () => {
        setIsShow(2);
    }
    const eventTieptuc1 = () => {
        setIsShow(3);
    }
    const eventQuayLai = () => {
        setIsShow(1);
    }
    const eventQuayLai1 = () => {
        setIsShow(2);
    }
    const eventTieptuc2 = () => {
        setIsShow(4);
    }
    const eventQuayLai2 = () => {
        setIsShow(3);
    }

    const showbtntieptuc = () => {
        console.log('adData', adData)
        if (isShow === 1) {
            return <Button label="Tiếp tục" onClick={eventTieptuc} className="p-button-raised p-button-rounded" />;
        }
    }

    const showbtnquaylai = () => {
        if (isShow === 2) {
            return <Button label="Quay lại" onClick={eventQuayLai} className="p-button-raised p-button-rounded p-mr-5" />;
        }
    }
    const showbtntieptuc1 = () => {
        if (isShow === 2) {
            return <Button label="Tiếp Tục" onClick={eventTieptuc1} className="p-button-raised p-button-rounded" />;
        }
    }
    const showbtnquaylai1 = () => {
        if (isShow === 3) {
            return <Button label="Quay lại" onClick={eventQuayLai1} className="p-button-raised p-button-rounded p-mr-5" />;
        }
    }

    const showbtntieptuc2 = () => {
        console.log(tong);
        if (isShow === 3) {
            return <Button label="Tiếp Tục" onClick={eventTieptuc2} className="p-button-raised p-button-rounded" />;
        }
    }
    const showbtnquaylai2 = () => {
        if (isShow === 4) {
            return <Button label="Quay lại" onClick={eventQuayLai2} className="p-button-raised p-button-rounded p-mr-5" />;
        }
    }

    const getInfoBank2 = async () => {
        const result = await serviceNganHang.layThongTinNganHangTheoDoanhNghiep();
        if (result && result.status === 1000) {
            const data = result.object;
            let arr = [];
            data.map((e) => {
                // console.log('e', e);
                arr.push({ code: e.id, name: e.tenNganHang + " - " + e.soTaiKhoan })
            });

            setListBanks(arr)
        }
    };


    const [setTenNganHangTest, setSetTenNganHangTest] = useState(null)
    const onCityChangeTest = async (e) => {
        setSetTenNganHangTest(e.value);
        console.log('listBanks', listBanks)
        listBanks.forEach(x => {
            if (x.name === e.value) {
                xFn(x.code)
            }
        }
        )
    }

    async function xFn(checkValue) {
        const result = await serviceNganHang.layNganHangTheoTen(checkValue)
        console.log('result', result)
        if (result && result.status === 1000) {
            setAdData2(result.object)
        }
    }

    const taiKhoanNganHangChoUser = () => {
        return (
            <div className="TaiKhoanNganHangChoUser">
                <div className="centers">
                    <form>
                        <div className="p-fluid p-formgrid p-grid buttom">
                            <label htmlFor="tenNganHang" >Tên ngân hàng</label>
                            <Dropdown
                                className="dropdowCusNH"
                                // value={adData2.tenNganHang}
                                value={setTenNganHangTest}
                                optionValue={"name"}
                                options={listBanks}
                                optionLabel="name"
                                // onChange={(e) => updateField2(e.target.value, 'tenNganHang')}
                                onChange={onCityChangeTest}
                                className="dropdowCusNH"
                                placeholder="---Chọn ngân hàng---" />
                        </div>

                        <div className="p-fluid p-formgrid p-grid buttom">
                            <label htmlFor="soTaiKhoan" >Số tài khoản</label>
                            <InputText id="soTaiKhoan"
                                // className
                                placeholder="Số tài khoản"
                                value={adData2.soTaiKhoan || ""}
                                name="mst"
                                onChange={(e) => updateField2(e.target.value, 'soTaiKhoan')}
                            />
                        </div>

                        <div className="p-fluid p-formgrid p-grid buttom">
                            <label htmlFor="tenChuTaiKhoan" >Tên chủ tài khoản</label>
                            <InputText id="tenChuTaiKhoan"
                                // className
                                placeholder="Tên chủ tài khoản"
                                value={adData2.tenChuTaiKhoan || ""}
                                name="mst"
                                onChange={(e) => updateField2(e.target.value, 'tenChuTaiKhoan')}
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const themChungThuSoCompoment = () => {
        return (
            <div className="ThemChungThuSoChoUser">
                <ToastContainer
                    position="top-right"
                    autoClose={TIME_OUT_CLOSE_NOTIFY}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="centers" >
                    <form>

                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="servicehost" >Service Host</label>
                                <InputText id="hostHsm"
                                    placeholder="Service Host"
                                    value={adData1.hostHsm || ""}
                                    name="hostHsm"

                                    onChange={(e) => updateField1(e.target.value, 'hostHsm')}
                                />
                            </div>
                        </div>

                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="apiKey">Tài khoản</label>
                                <InputText id="apiKey"
                                    placeholder="Tài Khoản"
                                    value={adData1.apiKey || ""}
                                    name="apiKey"
                                    onChange={(e) => updateField1(e.target.value, 'apiKey')}
                                />
                            </div>

                            <div className="p-field p-col">
                                <label htmlFor="passHsm" >Mật khẩu</label>
                                <InputText id="passHsm"
                                    placeholder="Mật khẩu"
                                    className="pi pi-search"
                                    name="passHsm"
                                    value={adData1.passHsm || ""}
                                    onChange={(e) => updateField1(e.target.value, 'passHsm')} />
                            </div>
                        </div>

                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="chungThuSo" >Serial</label>
                                <InputText id="chungThuSo"
                                    placeholder="Chứng thư số"

                                    value={adData1.chungThuSo || ""}
                                    name="chungThuSo"

                                    onChange={(e) => updateField1(e.target.value, 'chungThuSo')}
                                />
                            </div>
                        </div>

                        <div className="p-fluid p-formgrid p-grid">

                            <div className="p-field p-col">
                                <label htmlFor="dnChungThuSo">Sở hữu</label>
                                <InputText id="dnChungThuSo"
                                    placeholder="Doanh nghiệp chứng thư sô"

                                    value={adData1.dnChungThuSo || ""}
                                    name="dnChungThuSo"

                                    onChange={(e) => updateField1(e.target.value, 'dnChungThuSo')}
                                />
                            </div>


                            <div className="p-field p-col">
                                <label htmlFor="nhaCungCap" >Nhà cung cấp</label>
                                <InputText id="nhaCungCap"

                                    placeholder="Nhà cung cấp"
                                    name="nhaCungCap"

                                    value={adData1.nhaCungCap || ""}
                                    onChange={(e) => updateField1(e.target.value, 'nhaCungCap')} />

                            </div>
                        </div>


                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col">
                                <label htmlFor="pkcs10">Dạng Base64</label>
                                <InputTextarea type="text" rows="4" id="pkcs10"

                                    placeholder="Địa chỉ"
                                    name="pkcs10"

                                    value={adData1.pkcs10 || ""}
                                    onChange={(e) => updateField1(e.target.value, 'pkcs10')}
                                />
                            </div>
                        </div>


                        <div className="p-fluid p-formgrid p-grid">

                            <div className="p-field p-col">
                                <label htmlFor="ngayBatDau">Ngày bắt đầu</label>
                                <InputText id="ngayBatDau"
                                    placeholder="Ngày bắt đầu"

                                    value={adData1.ngayBatDau || ""}
                                    name="tendoanhnghiep"

                                    onChange={(e) => updateField1(e.target.value, 'ngayBatDau')}
                                />
                            </div>

                            <div className="p-field p-col">
                                <label htmlFor="ngayKetThuc" >Ngày kết thúc</label>
                                <InputText id="ngayKetThuc"
                                    placeholder="Ngày kết thúc"
                                    name="ngayKetThuc"
                                    value={adData1.ngayKetThuc || ""}
                                    onChange={(e) => updateField1(e.target.value, 'ngayKetThuc')} />

                            </div>
                        </div>
                        <div className="p-field-checkbox">
                            <label htmlFor="trangThai">Hiệu lực:   </label>
                            <Checkbox inputId="trangThai" checked={checked} onChange={e => setChecked(e.checked)} />
                        </div>
                    </form>
                    <div className="p-mt-5 p-mb-5 buttonCenter">
                        {/* <Button label="Hủy" className="p-mr-2 p-button-warning" />
                            <Button label="Lưu" className="p-mr-2" icon="pi pi-user" /> */}
                    </div>
                </div>
            </div>
        )
    }

    const thongTinNguoiNopThue = () => {
        if (isShow === 1) {
            return (
                <div className=" ThongTinNguoiNopThue">
                    <div className="infoUser">
                        <form>
                            <div className="p-fluid p-formgrid p-grid">

                                <div className="p-field p-col">
                                    <label htmlFor="mst"  >Mã số thuế</label>
                                    <InputText id="mst"
                                        className="inputCus"
                                        placeholder="Mã số thuế"
                                        value={adData.mst || ""}
                                        name="mst"
                                        disabled
                                        onChange={(e) => updateField(e.target.value, 'mst')}
                                    />
                                </div>

                                <div className="p-field p-col">
                                    <label htmlFor="tennguoinopthue" >Tên Người Nộp</label>
                                    <InputText id="tennguoinopthue"
                                        placeholder="Tên người nộp"
                                        className="inputCus"
                                        value={adData.tennguoinopthue || ""}
                                        name="tendoanhnghiep"
                                        disabled
                                        onChange={(e) => updateField(e.target.value, 'tennguoinopthue')}
                                    />
                                </div>
                            </div>

                            <div className="p-fluid p-formgrid p-grid">

                                <div className="p-field p-col">
                                    <label htmlFor="tennguoidaidien">Tên người đại diện</label>
                                    <InputText id="tennguoidaidien"
                                        placeholder="Tên người nộp"
                                        className="inputCus"
                                        value={adData.tennguoinopthue || ""}
                                        name="tendoanhnghiep"
                                        disabled
                                        onChange={(e) => updateField(e.target.value, 'tennguoinopthue')}
                                    />
                                </div>

                                <div className="p-field p-col">
                                    <label htmlFor="matinh" >Tỉnh /TP</label>
                                    <InputText id="matinh"
                                        className="inputCus"
                                        placeholder="Tỉnh/TP"
                                        name="matinh"
                                        disabled
                                        value={adData.matinh || ""}
                                        onChange={(e) => updateField(e.target.value, 'matinh')} />

                                </div>
                            </div>


                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="diachi">Địa chỉ</label>
                                    <InputText id="diachi"
                                        className="inputCus"
                                        placeholder="Địa chỉ"
                                        name="diachi"
                                        disabled
                                        value={adData.diachi || ""}
                                        onChange={(e) => updateField(e.target.value, 'diachi')}
                                    />
                                </div>
                            </div>


                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="tencoquanthue" >Tên cơ quan thuế</label>
                                    <InputText id="tencoquanthue"
                                        className="inputCus"
                                        placeholder="Tên cơ quan thuế"
                                        name="tencoquanthue"
                                        disabled
                                        value={adData.tencoquanthue || ""}
                                        onChange={(e) => updateField(e.target.value, 'tencoquanthue')}
                                    />
                                </div>
                            </div>


                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="maquanhuyen" >Quận /Huyện</label>
                                    <InputText id="maquanhuyen"
                                        className="inputCus"
                                        placeholder="Quận /Huyện"
                                        name="maquanhuyen"
                                        disabled
                                        value={adData.maquanhuyen || ""}
                                        onChange={(e) => updateField(e.target.value, 'maquanhuyen')}
                                    />
                                </div>

                                <div className="p-field p-col">
                                    <label htmlFor="maphuongxa">Phường /Xã</label>
                                    <InputText id="maphuongxa"
                                        className="inputCus"
                                        placeholder="Phường /Xã"
                                        name="maphuongxa"
                                        disabled
                                        value={adData.maphuongxa || ""}
                                        onChange={(e) => updateField(e.target.value, 'maphuongxa')}
                                    />
                                </div>

                            </div>



                            <div className="p-fluid p-formgrid p-grid">
                                <div className="p-field p-col">
                                    <label htmlFor="sodienthoai" >Số điện thoại</label>
                                    <InputText id="sodienthoai"
                                        className="inputCus"
                                        placeholder="Số điện thoại"
                                        name="sodienthoai"
                                        disabled
                                        onChange={(e) => updateField(e.target.value, 'sodienthoai')}
                                        value={adData.sodienthoai || ""} />
                                </div>

                                <div className="p-field p-col">
                                    <label htmlFor="thudientu">Email</label>
                                    <InputText id="thudientu"
                                        className="inputCus"
                                        placeholder="Email"
                                        name="thudientu"
                                        disabled
                                        value={adData.thudientu || ""}
                                        onChange={(e) => updateField(e.target.value, 'thudientu')}
                                    />
                                </div>

                            </div>

                        </form>

                        <div className="card">
                            <DataTable
                                value={products}
                                editMode="cell"
                                className="editable-cells-table"
                            >
                                <Column body={renderRowIndex} header="STT" headerStyle={{ width: '4rem' }}
                                    className="p-text-center" />
                                <Column
                                    field="hoten"
                                    header="Họ tên"
                                    editor={nameEditor}
                                ></Column>
                                <Column
                                    field="email"
                                    header="Email"
                                    editor={emailEditor}
                                ></Column>
                            </DataTable>
                        </div>
                        <Button label="Thêm dòng" className="p-button-success p-button-rounded" onClick={addRow} />
                    </div>
                </div>
            )
        } else if (isShow === 2) {
            return themChungThuSoCompoment();
        } else if (isShow === 3) {
            return taiKhoanNganHangChoUser();
        }
    }

    return (
        <React.Fragment>
            <div className={"card"}>
                <div className={"card-body"}>
                    <div>
                        {thongTinNguoiNopThue()}
                    </div>
                    <div className="center-button" >
                        <br />
                        {showbtntieptuc()}
                        {showbtnquaylai()}
                        {showbtntieptuc1()}
                        {showbtnquaylai1()}
                        {showbtntieptuc2()}
                        {showbtnquaylai2()}
                    </div>
                </div>
            </div>
            <div>

            </div>
        </React.Fragment>
    )
}

export default ThongTinNguoiNopThue