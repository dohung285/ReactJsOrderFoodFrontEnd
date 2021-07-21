

import React, { useEffect, useState } from "react";
import { PERMISSION_EDIT } from "../constants/PermissionString";
import PermissionService from "../service/PermissionService";

export const usePermission = () => {

    const [arrayRoles, setarrayRoles] = useState([])

    const [permission, setPermission] = useState(false)

    let arrayRole = [];


    const permissionService = new PermissionService();

    const fetchCheckPermission = async () => {
        let result = await permissionService.checkPermission(username, pathName, action);
        console.log(`checkPermissionAPI`, result)
        if (result?.status === 1000) {
            setPermission(true) ;
        } else {
           setPermission(false)
        }

    };


    // await fetPermission();

    // useEffect(() => {
    //     fetPermission();
    // }, [])

    // return ["a", "b", "c", "d", "e", "f", "g", "h", "i", PERMISSION_EDIT]; // fake "f", "g", "h", "i"
    return arrayRoles;
};
