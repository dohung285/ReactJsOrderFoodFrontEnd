import React, { createContext, useState } from "react";


export const CardContext = createContext(null);

// export const CardProvider = ({ children }) => {
//     const [card, setCard] = useState(
//         {
//             number: 0,
//             value: ''
//         }
//     );

//     return (
//         <CardContext.Provider value={ {card, setCard} }>
//             {children}
//         </CardContext.Provider>
//     )
// }
