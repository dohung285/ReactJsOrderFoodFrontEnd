



import { useKeycloak } from '@react-keycloak/web';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tree } from 'primereact/tree';
import React, { useEffect, useState } from 'react';
import AccountService from '../../service/AccountService';
import PermissionService from '../../service/PermissionService';
const UserInfor = () => {



    let root = [
        {
            "key": "0",
            "label": "Documents",
            "children": [
                { "key": "0-0", "label": "Work" },
                { "key": "0-1", "label": "Home" }
            ]
        },
        {
            "key": "1",
            "label": "Events",
            "children": [
                { "key": "a", "label": "Meeting", },
                { "key": "b", "label": "Product Launch" },
                { "key": "c", "label": "Report Review" }
            ]
        }
    ]






    const accountService = new AccountService();
    const permissionService = new PermissionService();


    const [keycloak] = useKeycloak();

    const [data, setData] = useState()

    const [selectedKeys, setSelectedKeys] = useState(null);
    const [nodes, setNodes] = useState(null);

    const [expandedKeys, setExpandedKeys] = useState({});

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

    const fetchAllPermission = async () => {
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await permissionService.getAllPermission();
        // console.log(`result`, result)
        if (result?.status === 1000) {
            setNodes(result?.list)
            fetchAllPermissionOfUser(keycloak?.idTokenParsed?.preferred_username)
        } else {
            console.log(`Error`, result?.message)
        }
    }

    const fetchAllPermissionOfUser = async (username) => {
        // console.log(`keycloak && keycloak.authenticated`, keycloak && keycloak.authenticated)
        let result = await permissionService.getAllPermissionOfUser(username);
        console.log(`resultFetchAllPermissionOfUser`, result)

        if (result?.status === 1000) {
            // setSelectedKeys(result?.list)
            console.log(`JSON.pase()`, JSON.parse(result?.message))
            setSelectedKeys(JSON.parse(result?.message))

        } 
    }


    useEffect(() => {
        fetchInforOfAccount();
        fetchAllPermission();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    const expandAll = () => {
        let _expandedKeys = {};
        for (let node of nodes) {
            expandNode(node, _expandedKeys);
        }

        setExpandedKeys(_expandedKeys);
    }

    const collapseAll = () => {
        setExpandedKeys({});
    }

    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    }


    return (
        <div className="card">
            <div className="card-body">

                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="fristname">Họ </label>
                        <InputText id="fristname" type="text" defaultValue={data?.firstName} readOnly />
                    </div>
                    <div className="p-field">
                        <label htmlFor="lastname">Tên</label>
                        <InputText id="lastname" type="text" defaultValue={data?.lastName} readOnly />
                    </div>
                    <div className="p-field">
                        <label htmlFor="username">Tên tài khoản</label>
                        <InputText id="username" type="text" defaultValue={data?.username} readOnly />
                    </div>
                    <div className="p-field">
                        <label htmlFor="email">Email</label>
                        <InputText id="email" type="text" defaultValue={data?.email} readOnly />
                    </div>
                </div>



                <h5>Danh sách quyền</h5>
                <div className="p-mb-4">
                    <Button type="button" icon="pi pi-plus" label="Expand All" onClick={expandAll} className="p-mr-2" />
                    <Button type="button" icon="pi pi-minus" label="Collapse All" onClick={collapseAll} />
                </div>
                <Tree value={nodes} expandedKeys={expandedKeys}
                    onToggle={e => setExpandedKeys(e.value)}
                    selectionMode="checkbox"
                    selectionKeys={selectedKeys}
                    // onSelectionChange={e => setSelectedKeys(e.value)}
                    selectable = {false}
                />



            </div>
        </div>

    )
}

export default UserInfor
