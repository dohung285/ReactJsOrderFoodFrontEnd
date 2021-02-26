import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Steps } from 'primereact/steps';
import { Toast } from 'primereact/toast';
import React, { useRef, useState } from 'react';
import './lapgiaynoptien.css';
import './lapgiaynoptien.scss';

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
								<div className="p-field-radiobutton">
									<RadioButton inputId="city1" name="city" value="Chicago" />
									<label htmlFor="city1">Nộp vào NSNN(TK 7111)</label>
								</div>
								<div className="p-field-radiobutton">
									<RadioButton inputId="city2" name="city" value="Los Angeles" />
									<label htmlFor="city2">Thu hồi hoàn (TK 8993)</label>
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
					<div className="item">
						<table className="table-lgnt">
							<thead>
								<tr>
									<th colSpan="6">Phần dành cho NNT ghi</th>
									<th colSpan="3">Phần dành cho NH ủy nhiệm thu/NH phối hợp thu/KBNN ghi</th>
								</tr>
								<tr>
									<th>STT</th>
									<th>Số quyết định/thông báo</th>
									<th>Kỳ thuế/Ngày quyết định/thông báo</th>
									<th>Nội dung các Khoản nộp NSNN</th>
									<th>Số nguyên tệ</th>
									<th>Số tiền VND</th>
									<th>Mã chương</th>
									<th>Mã tiểu mục</th>
									<th>Hành động</th>
								</tr>
							</thead>
							<tbody>

							</tbody>
						</table>
						<button>Thêm dòng</button>
						<div>Tổng cộng: </div>
						<div>Tổng tiền ghi bằng chữ: </div>
						<div>Tổng số ký hiện tại: </div>
					</div>

					<div className="item">
						<button>Lập mới</button>
						<button>Hoàn thành</button>
					</div>









				</div>
			</div>
		</div>

	);
};

export default LapGiayNopTien;
