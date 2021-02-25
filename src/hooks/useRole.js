import React, { useEffect, useState } from "react";
import { PERMISSION_EDIT } from "../constants/PermissionString";
import PermissionService from "../service/PermissionService";

export const useRole = () => {
    const [arrayRoles, setarrayRoles] = useState([])

    let arrayRole = [];

    const fetPermission = async () => {

        const service = new PermissionService();

        const result = await service.getAllPermissionByUser();
        Object.values(result.list).forEach(x => {
            for (let index = 0; index < x.chucNangChiTietTrees.length; index++) {
                // console.log('CNCT',x.chucNangChiTietTrees[index] )  
                console.log('x.chucNangChiTietTrees[i]', x.chucNangChiTietTrees[index].key, x.chucNangChiTietTrees[index].label)
                arrayRole.push(x.chucNangChiTietTrees[index].key)
                x.chucNangChiTietTrees[index].children.forEach(element => {
                    console.log('element', element.key, element.label)
                    arrayRole.push(element.key)
                });
            }
            console.log("===================================================")
        })
        console.log('arrayRole', arrayRole, arrayRole.length)
        setarrayRoles(arrayRole)
    };

    useEffect(() => {
        fetPermission();
    }, [])

    // return ["a", "b", "c", "d", "e", "f", "g", "h", "i", PERMISSION_EDIT]; // fake "f", "g", "h", "i"
    return arrayRoles;
};
