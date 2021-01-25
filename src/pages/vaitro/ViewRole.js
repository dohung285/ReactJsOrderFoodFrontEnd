import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tree } from "primereact/tree";
import React from "react";

export const ViewRole = (props) => {
  const { visible, onHide, listNhomQuyenView } = props;
  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          // onClick={onHide}
          //   onClick={handleOnCloseDialog}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          // onClick={() => onHide(name)}
          //   onClick={() => handleOnYesDialog(name)}
          autoFocus
        />
      </div>
    );
  };
  return (
    <div>
      <Dialog
        header="Danh sách nhóm quyền"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={onHide}
        footer={renderFooter("displayBasic")}
      >
        <div className="bg-gr">
          <Tree value={listNhomQuyenView} />
        </div>
      </Dialog>
    </div>
  );
};
