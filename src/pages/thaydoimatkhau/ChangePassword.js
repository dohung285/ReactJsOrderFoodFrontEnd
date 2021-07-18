

import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import AccountService from '../../service/AccountService';
import { useKeycloak } from '@react-keycloak/web';
import { MESSAGE_REQUIRE, RETYPE_PASSWORD_UNLIKE } from '../../constants/ConstantString';
import { Toast } from 'primereact/toast';
import { useHistory } from 'react-router-dom';

export const ChangePassword = () => {

    const accountService = new AccountService();

    const toastTL = useRef(null);



    const [keycloak] = useKeycloak();
    const history = useHistory();

    const [data, setData] = useState(
        {
            currentPassword: '',
            username: keycloak?.idTokenParsed?.preferred_username,
            newPassword: '',
            renewPassword: ''
        }
    )

    const [currentPasswordErrors, setCurrentPasswordErrors] = useState({})
    const [newPasswordErrors, setNewPasswordErrors] = useState({})
    const [retypePasswordErrors, setRetypePasswordErrors] = useState({})

    const fetchChangePassword = async (bodyData) => {

        // console.log(`keycloak`, keycloak?.idTokenParsed)
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await accountService.changePassword(keycloak?.idTokenParsed?.sub, bodyData);
        console.log(`result`, result)
        if (result?.status === 1000) {
            setData(
                {
                    currentPassword: '',
                    username: keycloak?.idTokenParsed?.preferred_username,
                    newPassword: '',
                    renewPassword: ''
                }
            )
            toastTL.current.show({ severity: 'success', summary: 'Success  Message', detail: 'Đổi mật khẩu thành công', life: 3000 });
            history.push("");
            keycloak.logout();
         
        } else {
            toastTL.current.show({ severity: 'error', summary: 'Error Message', detail: 'Mật khẩu hiện tại không đúng', life: 3000 });
        }
    }


    useEffect(() => {

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const formValidation = () => {
        // console.log(`formValidation`)
        // debugger

        const currentPasswords = {}
        const newPasswords = {}
        const renewPasswords = {}

        let isValid = true;

        if (data.currentPassword === '') {
            currentPasswords.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        if (data.newPassword === '') {
            newPasswords.required = MESSAGE_REQUIRE;
            isValid = false;
        }

        if (data.renewPassword === '') {
            renewPasswords.required = MESSAGE_REQUIRE;
            isValid = false;
        }
        // debugger
        // console.log(`data?.renewPassword`, data?.renewPassword)
        // console.log(`data?.newPassword`, data?.newPassword)
        if (data?.renewPassword != data?.newPassword) {
            renewPasswords.error = RETYPE_PASSWORD_UNLIKE;
            isValid = false;
        }



        setCurrentPasswordErrors(currentPasswords)
        setNewPasswordErrors(newPasswords)
        setRetypePasswordErrors(renewPasswords);


        return isValid;
    }



    const handleOnChange = (e) => {
        // console.log(`e.value`, e.target.value)
        // console.log(`e.target`, e.target)
        if (e.target.name === 'currentpassword') {
            if (e.target.value.length > 0) {
                setCurrentPasswordErrors("")
            } else {
                setCurrentPasswordErrors(MESSAGE_REQUIRE)
            }
            setData(
                {
                    ...data,
                    currentPassword: e.target.value
                }
            )
        }
        if (e.target.name === 'newpassword') {
            if (e.target.value.length > 0) {
                setNewPasswordErrors("")
            } else {
                setNewPasswordErrors(MESSAGE_REQUIRE)
            }
            setData(
                {
                    ...data,
                    newPassword: e.target.value
                }
            )
        }
        if (e.target.name === 'renewmpassword') {
            if (e.target.value.length > 0) {
                setRetypePasswordErrors("")
            } else if (data?.renewPassword !== data?.newPassword) {
                setRetypePasswordErrors(RETYPE_PASSWORD_UNLIKE);

            }
            else {
                setRetypePasswordErrors(MESSAGE_REQUIRE)
            }
            setData(
                {
                    ...data,
                    renewPassword: e.target.value
                }
            )
        }

    }

    const changePassword = () => {
        console.log(`data`, data)
        if (formValidation()) {
            console.log(`data`, data)
            delete data.renewPassword
            console.log(`data`, data)
            fetchChangePassword(data)
        }
    }


    return (
        <div className="card">

            <Toast ref={toastTL} position="top-left" />

            <div className="card-body">

                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="currentpassword">Mật khẩu hiện tại <span className="item-required"> *</span> </label>
                        <InputText
                            className={Object.keys(currentPasswordErrors).length > 0 ? "error" : null}
                            id="currentpassword"
                            name="currentpassword"
                            type="text"
                            value={data.currentPassword || ''}
                            onChange={handleOnChange} />
                        {Object.keys(currentPasswordErrors).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{currentPasswordErrors[keyIndex]}</span>
                        })}
                    </div>
                    <div className="p-field">
                        <label htmlFor="newpassword">Mật khẩu mới <span className="item-required"> *</span> </label>
                        <InputText
                            className={Object.keys(newPasswordErrors).length > 0 ? "error" : null}
                            id="newpassword"
                            name="newpassword"
                            type="text"
                            value={data.newPassword || ''}
                            onChange={handleOnChange} />
                        {Object.keys(newPasswordErrors).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{newPasswordErrors[keyIndex]}</span>
                        })}
                    </div>
                    <div className="p-field">
                        <label htmlFor="renewmpassword">Nhập lại mật khẩu <span className="item-required"> *</span> </label>
                        <InputText
                            className={Object.keys(retypePasswordErrors).length > 0 ? "error" : null}
                            id="renewmpassword"
                            name="renewmpassword"
                            type="text"
                            value={data.renewPassword || ''}
                            onChange={handleOnChange} />
                        {Object.keys(retypePasswordErrors).map((keyIndex, key) => {
                            return <span className="errorMessage" key={key} >{retypePasswordErrors[keyIndex]}</span>
                        })}
                    </div>

                    <div className="p-field">
                        <Button label="Đổi mật khẩu" className="p-button-warning" onClick={changePassword} />
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ChangePassword;
