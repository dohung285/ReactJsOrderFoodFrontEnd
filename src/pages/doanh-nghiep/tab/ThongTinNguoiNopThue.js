import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { TIME_OUT_CLOSE_NOTIFY } from '../../../constants/ConstantString';
import InfoBusinessService from '../../../service/InfoBusinessService';
import ThemChungThuSoChoUser from './ThemChungThuSoChoUser';
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
    const [adData, setAdData] = useState({ emptyData });
    const [first, setFirst] = useState(0);
    const [products, setProducts] = useState([])


    const updateField = (data, field) => {
        setAdData({
            ...adData,
            [field]: data,
        });
    }

    const updateFieldProduct = (data, field) => {
        console.log('data: ', data)
        console.log('field', field)
        setProducts({
            ...products,
            [field]: data,
        });
    }

    useEffect(() => {
        fetDataInfoBusinessById();
    }, [])

    const fetDataInfoBusinessById = async () => {
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

    const nameEditor  = (props) => {
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
        console.log('[...data]', [...data])
        setProducts([...data])
        console.log(products)
    };

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
                        // value={data}
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
                <Button label="Thêm dòng" className="p-button-success" onClick={addRow} />

                <div className="buttonright">
                    <Link to="/tao-chung-thu-so-cho-user" >
                        <Button className="p-button-success" label="Tiếp tục" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ThongTinNguoiNopThue