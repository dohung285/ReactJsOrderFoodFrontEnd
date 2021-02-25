import React from "react";
import { PERMISSION_EDIT } from "../constants/PermissionString";
import PermissionService from "../service/PermissionService";

export const useRole = () => {

  const fetPermission = async () => {

    const service = new PermissionService();
  
    const result = await service.getAllPermissionByUser();
    Object.values(result.list).forEach(x =>{
      for (let index = 0; index < x.chucNangChiTietTrees.length; index++) {
        // console.log('CNCT',x.chucNangChiTietTrees[index] )  
       console.log('x.chucNangChiTietTrees[i]',x.chucNangChiTietTrees[index].key, x.chucNangChiTietTrees[index].label )  
       x.chucNangChiTietTrees[index].children.forEach(element => {
        console.log('element', element.key,element.label)
      });
      }
      console.log("===================================================")
    })
  };

  fetPermission();
  return ["a","b", "c", "d", "e", "f", "g", "h", "i",PERMISSION_EDIT]; // fake "f", "g", "h", "i"
};
