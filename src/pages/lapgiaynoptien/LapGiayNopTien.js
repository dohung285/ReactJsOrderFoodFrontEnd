import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import './lapgiaynoptien.css';
import './lapgiaynoptien.scss';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';

const LapGiayNopTien = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const toast = useRef(null);
	const [selectedStep, setSelectedStep] = useState(null);
	const [selectedBank, setSelectedBank] = useState(null);



	const items = [
		{
			label: 'Chọn ngân hàng nộp thuế',
			command: (event) => {
				toast.current.show({
					severity: 'info',
					summary: 'First Step',
					detail: event.item.label,
				});
			},
		},
		{
			label: 'Lập giấy nộp tiền',
			command: (event) => {
				toast.current.show({
					severity: 'info',
					summary: 'Seat Selection',
					detail: event.item.label,
				});
			},
		},
	];

	const banks = [
		{ name: 'BIDV', code: 'BIDV' },
		{ name: 'Agribank', code: 'BIDV' },
		{ name: 'TP', code: 'LDN' },
		{ name: 'MB', code: 'IST' },
		{ name: 'TechCombank', code: 'PRS' },
	];

	const onChangeBank = (e) => {
		console.log(e.target.value.name)
		setSelectedBank(e.value);

	};
	const processSelectedBank = () => {
		// alert('ok');
		if (selectedBank === null) {
			onClick('displayBasic');
			return;
		}

	};

	// Dialog

	const [displayBasic, setDisplayBasic] = useState(false);
	const [position, setPosition] = useState('center');

	const dialogFuncMap = {
		displayBasic: setDisplayBasic,
	};

	const onClick = (name, position) => {
		dialogFuncMap[`${name}`](true);

		if (position) {
			setPosition(position);
		}
	};

	const onHide = (name) => {
		dialogFuncMap[`${name}`](false);
	};

	const renderFooter = (name) => {
		return (
			<div>
				<Button label="Tắt" icon="pi pi-check" onClick={() => onHide(name)} autoFocus />
			</div>
		);
	};

	//End Dialog

	const renderTacVu = (listData, rowData) => {
		// console.log('listData', listData)
		// console.log('rowData', rowData.rowIndex)
		let index = rowData.rowIndex;
		return (
			<div>
				<i
					className="pi pi-trash icon-medium"
					style={{ color: "red", cursor: "pointer", textAlign: "center" }}
					title={"Xóa"}
					onClick={() => handleDeleteRow(index)}

				/>
			</div>
		);
	}

	let headerGroup = <ColumnGroup>

		<Row>
			<Column header="Phần dành cho NNT ghi" colSpan={6} style={{ textAlign: "center" }} />
			<Column header="Phần dành cho NH ủy nhiệm thu / NH phối hợp thu / KBNN ghi" colSpan={3} style={{ textAlign: "center" }} />
		</Row>

		<Row>
			<Column header="STT" field="stt" style={{ textAlign: "center" }} />
			<Column header="Số quyết định/thông báo" field="sqdtb" style={{ textAlign: "center" }} />
			<Column header="Kỳ thuế/Ngày quyết định/Thông báo" field="ktnqdtb" style={{ textAlign: "center" }} />
			<Column header="Nội dung các khoản NSNN" field="ndcknnsnn" style={{ textAlign: "center" }} />
			<Column header="Số nguyên tệ" field="snt" style={{ textAlign: "center" }} />
			<Column header="Số tiền VNĐ" field="stVND" style={{ textAlign: "center" }} />
			<Column header="Mã chương" field="mc" style={{ textAlign: "center" }} />
			<Column header="Mã tiểu mục" field="mtm" style={{ textAlign: "center" }} />
			<Column header="Tác vụ" field="tv" style={{ textAlign: "center" }} />
		</Row>
	</ColumnGroup>;



	//edit table 
	const [listData, setListData] = useState([]);
	const [stt, setStt] = useState(null);


	const dataTableFuncMap = {
		'stt': setStt,
	};

	const onEditorValueChange = (productKey, props, value) => {
		// console.log('productKey', productKey)
		// console.log('props', props)
		// console.log('value', value)

		let updatedProducts = [...props.value];
		// console.log('Before: updatedProducts', updatedProducts)
		updatedProducts[props.rowIndex][props.field] = value;
		// console.log('After: updatedProducts', updatedProducts)
		// dataTableFuncMap[`${productKey}`](updatedProducts);
		setStt(updatedProducts)
	}

	const codeEditor = (productKey, props) => {

		// console.log('props', props.field)

		if (props.field === 'sqdtb') {
			return inputTextEditor(productKey, props, 'sqdtb');
		}
		if (props.field === 'ktnqdtb') {
			return inputTextEditor(productKey, props, 'ktnqdtb');
		}
		if (props.field === 'ndcknnsnn') {
			return inputTextEditor(productKey, props, 'ndcknnsnn');
		}
		if (props.field === 'snt') {
			return inputTextEditor(productKey, props, 'snt');
		}
		if (props.field === 'stVND') {
			return inputTextEditor(productKey, props, 'stVND');
		}
		if (props.field === 'mc') {
			return inputTextEditor(productKey, props, 'mc');
		}
		if (props.field === 'mtm') {
			return inputTextEditor(productKey, props, 'mtm');
		}
	}

	const inputTextEditor = (productKey, props, field) => {
		return <InputText type="text" value={props.rowData[field]} onChange={(e) => onEditorValueChange(productKey, props, e.target.value)} />;
	}

	const addRow = async e => {
		var obj = {
			stt: '', sqdtb: '', ktnqdtb: '', ndcknnsnn: '', snt: '', stVND: '', mc: '', mtm: '', tv: ''
		};
		let data = listData;
		data.push(obj)
		// console.log('[...data]', [...data])
		setListData([...data])
		// console.log(listData)
	};

	const renderRowIndex = (listData, column) => {
		// console.log('column', column)
		return column.rowIndex;
	};

	const handleDeleteRow = (index) => {
		// debugger
		console.log('listData', listData)
		console.log('index', index)
		// if (index === 0) {
		// 	const arrayCopy = listData.splice(0, listData.length)
		// 	setListData(arrayCopy)
		// }

		
		delete listData[index];

		console.log('listData', listData)

		setListData(listData)



		// let arrayCopy = listData.splice(index, 1)
		// console.log(arrayCopy);
		// console.log('After listData', arrayCopy)
		// setListData(arrayCopy)

		// let arrayCopy = listData;
		// arrayCopy.splice(index,1)
		// setListData(arrayCopy)
		// console.log('After listData', arrayCopy)

	}



	return (
		<div>
			<Toast ref={toast}></Toast>
			<Dialog
				header="Thông báo"
				visible={displayBasic}
				style={{ width: '25vw' }}
				footer={renderFooter('displayBasic')}
				onHide={() => onHide('displayBasic')}
			>
				<p>
					Bạn chưa chọn ngân hàng!
				</p>
			</Dialog>

			<div className="card">
				{/* <Steps
					model={items}
					activeIndex={activeIndex}
					onSelect={(e) => setActiveIndex(e.index)}
					readOnly={false}
				/> */}

				{/* Chọn ngân hàng */}

				{/* <div className="container center">
					<div className="card-select">
						<h2>Chọn ngân hàng nộp thuế</h2>
						<hr />
						<div className="p-fluid">
							<div className="p-field p-grid" style={{ marginTop: '35px' }}>
								<label htmlFor="firstname4" className="p-col-12 p-md-3" >
									Ngân hàng
								</label>
								<div className="p-col-12 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>
						<button onClick={processSelectedBank} >
							Tiếp theo
						</button>
					</div>
				</div> */}


				<h1 className="item-title">Thông tin người nộp thuế</h1>
				<div className="parent">
					<div className="item item1">
						<div>Ngày: </div>
						<div>Mã số thuế: </div>
						<div>Tên người nộp thuế: </div>
						<div>Địa chỉ: </div>
					</div>





					<h1 className="item-title">Thông tin ngân hàng</h1>
					<div className="item p-grid">

						<div className="p-col-12 p-md-6 p-lg-6" >
							<div className="p-grid">
								<label htmlFor="firstname4" className="p-col-4 p-md-3">
									Đề nghị NH <span>*</span>
								</label>
								<div className="p-col-8 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>

						<div className="p-col-12 p-md-6 p-lg-6">
							<div className="p-grid">
								<label htmlFor="firstname4" className="p-col-4 p-md-3" >
									Trích TK số <span>*</span>
								</label>
								<div className="p-col-8 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>
					</div>

					<h1 className="item-title">Thông tin cơ quan quản lý thu</h1>
					<div className="item p-grid">
						<div className="p-col-12 p-md-6 p-lg-6" >
							<div className="p-grid">
								<label htmlFor="firstname4" className="p-col-4 p-md-3">
									Tỉnh/TP <span>*</span>
								</label>
								<div className="p-col-8 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>
						<div className="p-col-12 p-md-6 p-lg-6">
							<div className="p-grid">
								<label htmlFor="firstname4" className="p-col-4 p-md-3" >
									Cơ quan quản lý thu <span>*</span>
								</label>
								<div className="p-col-8 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>
					</div>



					<h1 className="item-title">Thông tin nơi phát sinh khoản thu</h1>
					<div className="item">
						<div className="p-grid">
							<div className="p-col-12 p-md-3 p-lg-3">
								<div className="p-field-radiobutton">
									<RadioButton inputId="city1" name="city" value="Chicago" />
									<label htmlFor="city1">Tỉnh/TP</label>
								</div>
							</div>

							<div className="p-col-12 p-md-3 p-lg-3">
								<div className="p-field-radiobutton">
									<RadioButton inputId="city2" name="city" value="Los Angeles" />
									<label htmlFor="city2">Quận/Huyện</label>
								</div>
							</div>

							<div className="p-col-12 p-md-3 p-lg-3">
								<div className="p-field-radiobutton">
									<RadioButton inputId="city3" name="city" value="New York" />
									<label htmlFor="city3">Xã/Phường</label>
								</div>

							</div>
						</div>

						<div className="item p-col-12 p-md-12 p-lg-12">Tỉnh/TP: </div>
						<div className="item p-grid">
							<div className="p-col-12 p-md-6">
								<div className="p-grid">
									<label htmlFor="firstname4" className="p-col-4 p-md-3" >
										Quận/Huyện
								</label>
									<div className="p-col-8 p-md-9">
										<Dropdown
											value={selectedBank}
											options={banks}
											onChange={onChangeBank}
											optionLabel="name"
											editable
										/>
									</div>
								</div>
							</div>

							<div className="p-col-12 p-md-6">
								<div className="p-grid">
									<label htmlFor="firstname4" className="p-col-4 p-md-3" >
										Xã/Phường
								</label>
									<div className="p-col-8 p-md-9">
										<Dropdown
											value={selectedBank}
											options={banks}
											onChange={onChangeBank}
											optionLabel="name"
											editable
										/>
									</div>
								</div>
							</div>
						</div>

					</div>



					<h1 className="item-title">Thông tin kho bạc</h1>
					<div className="item p-grid">

						<div className="p-col-12 p-md-6 p-lg-6" >
							<div className="p-grid">
								<label htmlFor="firstname4" className="p-col-4 p-md-3">
									Chuyển cho KBNN <span>*</span>
								</label>
								<div className="p-col-8 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>

						<div className="p-col-12 p-md-6 p-lg-6">
							<div className="p-grid">
								<label htmlFor="firstname4" className="p-col-4 p-md-3" >
									Ngân hàng ủy nhiệm thu<span>*</span>
								</label>
								<div className="p-col-8 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>

						<div className="p-col-12 p-md-6 p-lg-6">
							<div className="p-grid">

								<div className="p-field-radiobutton ">
									<RadioButton inputId="city1" name="city" value="Chicago" />
									<label htmlFor="city1">Nộp vào NSNN(TK 7111)</label>
								</div>

								<div className="p-field-radiobutton ">
									<RadioButton inputId="city2" name="city" value="Los Angeles" />
									<label htmlFor="city2">Thu hồi hoàn (TK 8993)</label>
								</div>

							</div>
						</div>





					</div>



					<h1 className="item-title">Thông tin loại thuế</h1>
					<div className="item p-grid">
						<div className="p-col-12 p-md-6 p-lg-6" >
							<div className="p-grid">
								<label htmlFor="firstname4" className="p-col-4 p-md-3">
									Loại thuế <span>*</span>
								</label>
								<div className="p-col-8 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>


						<div className="p-col-12 p-md-6 p-lg-6">
							<div className="p-grid">
								<label htmlFor="firstname4" className="p-col-4 p-md-3" >
									Loại tiền<span>*</span>
								</label>
								<div className="p-col-8 p-md-9">
									<Dropdown
										value={selectedBank}
										options={banks}
										onChange={onChangeBank}
										optionLabel="name"
										editable
									/>
								</div>
							</div>
						</div>

					</div>

					<div className="item p-grid">
						<div className="p-col-12 p-md-6 p-lg-6">
							<div>Nộp theo văn bản cơ quan có thẩm quyền</div>
							<div className="p-field-radiobutton">
								<RadioButton inputId="city1" name="city" value="Chicago" />
								<label htmlFor="city1">Kiểm toán nhà nước</label>
							</div>
							<div className="p-field-radiobutton">
								<RadioButton inputId="city2" name="city" value="Los Angeles" />
								<label htmlFor="city2">Thanh tra tài chính</label>
							</div>
							<div className="p-field-radiobutton">
								<RadioButton inputId="city1" name="city" value="Chicago" />
								<label htmlFor="city1">Thanh tra chính phủ</label>
							</div>
							<div className="p-field-radiobutton">
								<RadioButton inputId="city2" name="city" value="Los Angeles" />
								<label htmlFor="city2">Cơ quan có thẩm quyền khác</label>
							</div>
						</div>
					</div>




					<h1 className="item-title">Truy vấn số thuế PN</h1>
					<div className="item-table" >
						<div className="card" style={{ width: "90vw" }}>
							<DataTable value={listData} headerColumnGroup={headerGroup} >
								<Column field="stt" body={renderRowIndex} />
								<Column field="sqdtb" editor={(props) => codeEditor('sqdtb', props)} />
								<Column field="ktnqdtb" editor={(props) => codeEditor('ktnqdtb', props)} />
								<Column field="ndcknnsnn" editor={(props) => codeEditor('ndcknnsnn', props)} />
								<Column field="snt" editor={(props) => codeEditor('snt', props)} />
								<Column field="stVND" editor={(props) => codeEditor('stVND', props)} />
								<Column field="mc" editor={(props) => codeEditor('mc', props)} />
								<Column field="mtm" editor={(props) => codeEditor('mtm', props)} />
								<Column field="tv" body={renderTacVu} />
							</DataTable>
						</div>
						<Button label="Thêm dòng" className="p-button-success" onClick={addRow} />
					</div>


					<div className="item-total">

						<div>Tổng cộng: </div>
						<div>Tổng tiền ghi bằng chữ: </div>
						<div>Tổng số ký hiện tại: </div>
					</div>

					<div className="item-button">
						<Button label="Lập mới" className="p-button-danger" onClick={() => console.log('listData', listData)} />
						<Button label="Hoàn thành" className="p-button-warning" />
					</div>
				</div>
			</div>
		</div>

	);
};

export default LapGiayNopTien;
