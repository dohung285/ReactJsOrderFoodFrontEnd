import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { withRouter } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import "../css/style.scss"
import 'primeflex/primeflex.css';
import {Checkbox} from 'primereact/checkbox';
const Add = (props) => {
    const { visible, onHide, datachucnangct } = props;
    const [cities, setCities] = useState([]);
    const renderFooter = (name) => {
        return (
            <div>
                <Button label="No" icon="pi pi-times" onClick={onHide} className="p-button-text" />
                <Button label="Yes" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
            </div>
        );
    }
    const onCityChange = (e) => {
        let selectedCities = [...cities];
        if(e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);
    
        setCities(selectedCities);
    }
    return (
        <Dialog header="Thêm mới nhóm quyền" visible={visible} style={{ width: '50vw' }} onHide={onHide} footer={renderFooter('displayBasic')}>

            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="firstname1">Tên nhóm quyền</label>
                    <InputText id="firstname1" type="text" />
                </div>
                <div className="p-field">
                    <label htmlFor="lastname1">Mô tả</label>
                    <InputText id="lastname1" type="text" />
                </div>
            </div>

            <div className="bg-gr">
                    <div className="card">
                        <div >
                            {
                                datachucnangct.map(item =>
                                    <div className="p-grid">
                                        <div className="p-col">{item.tencn}

                                        </div>
                                        {item.lstCnCt.map(e =>(
                                            <div className="p-col">
                                            <Checkbox inputId="cb1" value={e.tenCnct} onChange={onCityChange} checked={cities.includes('{e.tenCnct}')}></Checkbox>
                                            <label htmlFor="cb1" className="p-checkbox-label">{e.tenCnct}</label>
                                        </div>
                                        )
                                            
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    </div>
            </div>
        </Dialog>
    )
}
export default withRouter(Add);