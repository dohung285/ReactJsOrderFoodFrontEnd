import React, { Component } from 'react';
import { confirmPopup } from 'primereact/confirmpopup';

class DeleteHandle extends Component {

    accept = () => {
            console.log("stt",this.props.index);
        //     console.log("data:", dataUser);
        //   let temA = dataUser;
        //   temA.splice(0, 1);
        //   console.log("temA:", temA);
        
    }
    reject = () => {

    }

    onHandleDelete = (event) => {
         console.log("value:", event.currentTarget.value);
        confirmPopup({
             target: event.currentTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: this.accept(),
            reject: this.reject()
        });
    };

    render() {
        return (
            
            <i className="pi pi-trash icon-medium" style={{ color: "red", cursor: "pointer" }} title={"Xóa"} onClick={this.onHandleDelete} value="0" />
            
        )
    }
}

export default DeleteHandle;