import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import React, { useEffect, useState } from 'react';
import InfoBusinessService from '../../../service/InfoBusinessService';
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
    const [adData, setAdData] = useState({emptyData});
    const [tencoquanthue,setTencoquanthue] = useState("Australia")
    // state check errors
    const [products, setProducts] = useState([
        { stt: "1", hoten: "Cyber Tax", email: "cybertax@gamim.com" }
    ])

    const updateField = (data, field) => {
        setAdData({
            ...adData,
            [field]: data,
        });
    }


    const fetDataInfoBusinessById = async () => {
        const result = await service.getDataInfoBusinessById("721029f6-7663-427c-950c-8bbabf426481")
        if (result && result.status === 1000) {
            setAdData(result.object);
            // setTotalRecord(result.totalItem);
            console.log(result.object)
        }
    };


    return (

        <div className=" ThongTinNguoiNopThue p-fluid">
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
                            <InputText id="tennguoinopthue"
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
                            <Dropdown id="matinh"
                                className="dropdowCus"
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
                            <Dropdown id="tencoquanthue"
                                className="dropdowCus"
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
                            <Dropdown id="maquanhuyen"
                                className="dropdowCus"
                                placeholder="Quận /Huyện"
                                name="maquanhuyen"
                                disabled
                                value={adData.maquanhuyen || ""}
                                onChange={(e) => updateField(e.target.value, 'maquanhuyen')}
                            />
                        </div>

                        <div className="p-field p-col">
                            <label htmlFor="maphuongxa">Phường /Xã</label>
                            <Dropdown id="maphuongxa"
                                className="dropdowCus"
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

                {/* <div className="card">
                    <DataTable value={products} >
                        <Column field="stt" header="STT"></Column>
                        <Column field="hoten" header="Họ Tên"></Column>
                        <Column field="email" header="Email"></Column>
                    </DataTable>
                </div> */}
            </div>
            <button type='button' onClick={fetDataInfoBusinessById}>Click for Data</button>
        </div>
    )
}

export default ThongTinNguoiNopThue