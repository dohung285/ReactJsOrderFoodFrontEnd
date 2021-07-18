



import { useKeycloak } from '@react-keycloak/web';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import AccountService from '../../service/AccountService';
const UserInfor = () => {

    const accountService = new AccountService();

    const [keycloak] = useKeycloak();

    const [data, setData] = useState()

    const fetchInforOfAccount = async () => {

        // console.log(`keycloak`, keycloak?.idTokenParsed)

        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)

        let result = await accountService.getAccountDetail(keycloak?.idTokenParsed?.sub);
        // console.log(`result`, result)
        if (result) {
            setData(result)
            // setProducts(result?.list)
        }
    }


    useEffect(() => {
        fetchInforOfAccount();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    // console.log(`data`, data)


    return (
        <div className="card">
            <div className="card-body">

            <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="fristname">Họ </label>
                        <InputText id="fristname" type="text" defaultValue={data?.firstName } readOnly />
                    </div>
                    <div className="p-field">
                        <label htmlFor="lastname">Tên</label>
                        <InputText id="lastname" type="text" defaultValue={data?.lastName } readOnly />
                    </div>
                    <div className="p-field">
                        <label htmlFor="username">Tên tài khoản</label>
                        <InputText id="username" type="text" defaultValue={data?.username} readOnly/>
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" type="text" defaultValue={data?.email} readOnly/>
                    </div>
                </div>
              

            </div>
        </div>

    )
}

export default UserInfor
