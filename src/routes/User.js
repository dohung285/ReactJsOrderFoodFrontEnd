import React, {useState} from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Dropdown from 'primereact/dropdown';
export default () => {
    const [selectedCity1, setSelectedCity1] = useState(null);
    const [search, setSearch] = useState({
        text:"",
        status:"",
        created_at: "",
    });
    const onHandleChangeSearch = (e) => {
        setSearch({...search, [e.target.name]:e.target.value});
    };
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    const onCityChange = (e) => {

    };
    console.log('Provider', Dropdown);
    const leftContents = (
        <React.Fragment>
            <InputText
                className={"p-mr-3 p-col-10"}
                value={search.text}
                onChange={onHandleChangeSearch}
                tooltip={"Mã, Tên, Tên đăng nhập"}
                name={"text"}
                placeholder={"Mã, tên, tên đăng nhập"}
            />
            <Dropdown optionLabel="name" value={selectedCity1} options={cities} onChange={onCityChange} placeholder="Select a City"/>
            <Dropdown/>
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-search" className="p-mr-2" />
        </React.Fragment>
    );

    return (
        <div className={"card"}>
            <div className={"card-header"}>
                <h1>Quản lý người dùng</h1>
                <Toolbar left={leftContents} right={rightContents} />
            </div>
        </div>
    )
}
