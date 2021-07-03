

import React from 'react'

export const DetailsThumb = (props) => {

    const {images, tab, myRef} = props;

    return (
        <div>
             <div className="thumb" ref={myRef}>
                {
                images?.map((img, index) =>(
                    <img src={'/img/'+img} alt="" key={index} 
                    onClick={() => tab(index)}
                    />
                ))
                }
            </div>
        </div>
    )
}
export default DetailsThumb;