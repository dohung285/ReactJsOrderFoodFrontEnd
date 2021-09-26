import PermissionService from "../service/PermissionService";



export function isNumber(n) {
    return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}


export async function checkPermissionAPI(username, pathName, action) {
    const permissionService = new PermissionService()
    let result = await permissionService.checkPermission(username, pathName, action);
    console.log(`checkPermissionAPI`, result)
    if (result?.status === 1000) {
        return true;
    } else {
        return false;
    }

}