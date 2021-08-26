import axios from "axios";
import { FETCH_MENUS_REQUEST, FETCH_MENUS_SUCCESS } from "../reducers/menuType";


// const permissionService = new PermissionService();
// let history = useHistory();

// const [keycloak] = useKeycloak();


// const fetchAllNameOfSystemByUsernameAPI = async (username) => {
//     let result = await permissionService.getAllNameOfSystemByUsername(username);
//     console.log(`fetchAllNameOfSystemByUsernameAPI`, result)
//     if (result?.status === 1000) {
//         // console.log(`object`, result?.list)
//         //   setArrayPermissionOfUser(result?.list)
//         return result?.list
//     }
//     return null
// }

export const fetchMenus = async () => {
    return (dispatch) => {
        dispatch(fetchMenusRequest())
        // axios.get(`http://localhost:8082/services/orderfood/api/menu/byWithRole`)
        //     .then(res => {
        //         // console.log(`res`, res.data)
        //         let result = res.data

        //         let arrayRemain = result;
        //         // if (!keycloak?.authenticated) {
        //         //   arrayRemain = result.filter(item => item.label !== "Hệ thống");
        //         // }
        //         if (arrayRemain) {

        //             let arrayTmp = [];
        //             let x = arrayRemain.forEach(element => {
        //                 // console.log(`element`, element)
        //                 let arrayItems = []
        //                 if (element.label !== 'Trang chủ' && element.label !== 'Giới thiệu' && element.label !== 'Liên hệ') {

        //                     // if (element.label === 'Hệ thống' && keycloak?.authenticated && keycloak?.idTokenParsed?.preferred_username !== 'hungdx') {
        //                     if (element.label === 'Hệ thống' ) {

        //                         // fetchAllNameOfSystemByUsernameAPI(keycloak?.idTokenParsed?.preferred_username).then(data => {
        //                         //   console.log(`data`, data)

        //                         //   const filteredArray = element?.items.filter(value => data.includes(value.label));
        //                         //   console.log(`filteredArray`, filteredArray)


        //                         //   const y = filteredArray.forEach(item => {
        //                         //     // console.log(`items`, item)
        //                         //     const objItems = {
        //                         //       icon: item.icon,
        //                         //       label: item.label,
        //                         //       command: () => history.push(`${item.command}`)
        //                         //     }
        //                         //     // console.log(`objItems`, objItems)
        //                         //     arrayItems.push(objItems)
        //                         //   })
        //                         // })

        //                     } else {
        //                         const y = element?.items.forEach(item => {
        //                             // console.log(`items`, item)
        //                             const objItems = {
        //                                 icon: item.icon,
        //                                 label: item.label,
        //                                 command: () => history.push(`${item.command}`)
        //                             }
        //                             // console.log(`objItems`, objItems)
        //                             arrayItems.push(objItems)
        //                         })
        //                     }

        //                     const objHasItems = {
        //                         icon: element.icon,
        //                         label: element.label,
        //                         items: arrayItems
        //                     }
        //                     arrayTmp.push(objHasItems)
        //                 }
        //                 else {

        //                     const obj = {
        //                         icon: element.icon,
        //                         label: element.label,
        //                         command: () => history.push(`${element.command}`)
        //                     }
        //                     // console.log(`obj`, obj)
        //                     arrayTmp.push(obj)
        //                 }
        //             });
        //             //   setItems(arrayTmp);
        //             console.log(`arrayTmp`, arrayTmp)
        //             dispatch(fetchMenusSuccess(arrayTmp))
        //         }
        //     }).catch(err => {
        //         console.log("Error getDistinctDmcqt()", err);
        //         dispatch(fetchMenusFailure(err.message))
        //     })

    }
};







export const fetchMenusRequest = () => {
    return {
        type: FETCH_MENUS_REQUEST
    }
}

export const fetchMenusSuccess = users => {
    return {
        type: FETCH_MENUS_SUCCESS,
        payload: users
    }
}

export const fetchMenusFailure = error => {
    return {
        type: fetchMenusFailure,
        payload: error
    }
}


// export const getAllMenu = (menu) => {

//     return {
//         type:'GET',
//         payload: menu
//     }

// }

// export const saveMenu = (menu) => {

//     return {
//         type:'POST',
//         payload: menu
//     }

// }

