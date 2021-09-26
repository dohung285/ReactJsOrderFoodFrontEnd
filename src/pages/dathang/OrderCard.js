


// import React, { useState } from 'react'
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { withRouter } from "react-router-dom";

// export const OrderCard = () => {



//     const [displayBasic, setDisplayBasic] = useState(false);



//     const dialogFuncMap = {
//         'displayBasic': setDisplayBasic,
       
//     }

//     const onHide = (name) => {
//         dialogFuncMap[`${name}`](false);
//     }


//     function handleOnCloseDialog() {

//         // onHide();
//     }

//     const handleOnYesDialog = async (name) => {


//         // onHide(name);
//     };

//     const handleOnCloseXDialog = () => {
//         // onHide();
//     };

//     const renderFooter = (name) => {
//         return (
//             <div>
//                 <Button
//                     label="Hủy"
//                     icon="pi pi-times"
//                     // onClick={onHide}
//                     onClick={handleOnCloseDialog}
//                     className="p-button-text"
//                 />
//                 <Button
//                     label="Đồng ý"
//                     icon="pi pi-check"
//                     // onClick={() => onHide(name)}
//                     onClick={() => handleOnYesDialog(name)}
//                     autoFocus
//                 />
//             </div>
//         );
//     };

//     const onClick = (name, position) => {
//         dialogFuncMap[`${name}`](true);

//         if (position) {
//             setPosition(position);
//         }
//     }

//     return (
//         <div>

//             <Dialog header="Header" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
//                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
//             </Dialog>
//         </div>
//     );
// }

// export default OrderCard;
