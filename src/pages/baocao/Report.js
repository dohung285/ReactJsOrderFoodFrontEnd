

import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { Tooltip } from 'primereact/tooltip';
import React, { useEffect, useRef, useState } from 'react';
import { EXPRITIME_HIDER_LOADER } from '../../constants/ConstantString';
import useFullPageLoader from '../../hooks/useFullPageLoader';
import OrderService from '../../service/OrderService';
import ReportService from '../../service/ReportService';


const Report = () => {

    const reportService = new ReportService()
    const orderService = new OrderService();

    const toast = useRef(null);


    const [chartData, setChartData] = useState(null)
    const [basicData, setBasicData] = useState(null)

    const [loader, showLoader, hideLoader] = useFullPageLoader();


    const dt = useRef(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [yearOption, setYearOption] = useState(null)



    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success Message', detail: message, life: 3000 });
    }

    const showError = (message) => {
        toast.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 10000 });
    }






    const fetchCountBuyAPI = async () => {
        showLoader();
        let result = await reportService.getAll();
        console.log(`fetchCountBuyAPI`, result)
        if (result?.status === 1000) {
            setChartData(result?.object);
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
        // hideLoader();
    }

    const fetchRevenueOfYearAPI = async () => {
        showLoader();
        let result = await reportService.getRevenueOfYear();
        // console.log(`fetchRevenueOfYearAPI`, result)
        if (result?.status === 1000) {
            setBasicData(result?.object);
            setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
        }


    }

    const fetchTotalAPI = async (month, year) => {

        // let newDate = new Date()
        // let date = newDate.getDate();
        // let month = newDate.getMonth() + 1;
        // let year = newDate.getFullYear();

        // console.log(`date`, date)
        // console.log(`month`, month)
        // console.log(`year`, year)


        showLoader();
        let result = await reportService.getTotal(month, year);
        console.log(`fetchTotalAPI`, result)
        if (result?.status === 1000) {
            setProducts(result?.list);

        }

        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
        // hideLoader();
    }


    const fetchAllYearOrderAPI = async () => {
        showLoader();
        let result = await orderService.getAllYearInOrder();
        // console.log(`fetchAllYearOrderAPI`, result)
        if (result?.status === 1000) {
            setYearOption(result?.list);
        }
        setTimeout(hideLoader, EXPRITIME_HIDER_LOADER);
        // hideLoader();
    }





    useEffect(() => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();


        fetchCountBuyAPI();
        fetchRevenueOfYearAPI();
        fetchTotalAPI(month, year)
        fetchAllYearOrderAPI()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps



    // const chartData = {
    //     labels: ['A', 'B', 'C'],
    //     datasets: [
    //         {
    //             data: [300, 50, 100],
    //             backgroundColor: [
    //                 "#42A5F5",
    //                 "#66BB6A",
    //                 "#FFA726",
    //                 '#FF0000',
    //                 '#00FF00'
    //             ],
    //             // hoverBackgroundColor: [
    //             //     "#64B5F6",
    //             //     "#81C784",
    //             //     "#FFB74D"
    //             // ]
    //         }
    //     ]
    // };

    const lightOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                },
                position: 'left',

            },
        }
    };

    // const basicData = {
    //     labels: ['Th??ng 1', 'Th??ng 2', 'Th??ng 3', 'Th??ng 4','Th??ng 5','Th??ng 6','Th??ng 7','Th??ng 8','Th??ng 9','Th??ng 10','Th??ng 11','Th??ng 12'],
    //     datasets: [
    //         {
    //             label: 'T???ng doanh thu',
    //             backgroundColor: '#42A5F5',
    //             data: [65, 59, 80, 81, 56, 55, 40,0,0,0,0,100]
    //         }
    //     ]
    // };

    const getLightTheme = () => {
        let basicOptions = {
            maintainAspectRatio: false,
            aspectRatio: .8,
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        return {
            basicOptions,
        }
    }

    const { basicOptions } = getLightTheme();

    const cols = [
        { field: 'id', header: 'Id' },
        { field: 'name', header: 'T??n' },
        { field: 'month', header: 'Th??ng' },
        { field: 'total', header: 'T???ng' }
    ];

    const exportCSV = (selectionOnly) => {
        dt.current.exportCSV({ selectionOnly });
    }

    const exportPdf = () => {

        let strBase64fontVnTime = ''
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const pdf = new jsPDF.default(0, 0);
                // define custom font
                pdf.addFileToVFS("font-times-new-roman.ttf",
                    // ttf font file converted to base64 
                    // following is Consolas with only hex digit glyphs defined (0-9, A-F)
                    strBase64fontVnTime
                )

                // add custom font to file
                pdf.addFont("font-times-new-roman.ttf", "font-times-new-roman", "Bold");
                pdf.setFont("font-times-new-roman", "Bold");
                pdf.setFontSize(12);

                //console.log(pdf.getFontList());






                pdf.autoTable(exportColumns, products);
                pdf.save('orderfood.pdf');
            })
        })
    }

    const exportExcel = () => {
        import('xlsx').then(xlsx => {
            const worksheet = xlsx.utils.json_to_sheet(products);
            const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
            saveAsExcelFile(excelBuffer, 'orderfood');
        });
    }

    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));

    const saveAsExcelFile = (buffer, fileName) => {
        import('file-saver').then(FileSaver => {
            let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            let EXCEL_EXTENSION = '.xlsx';
            const data = new Blob([buffer], {
                type: EXCEL_TYPE
            });
            FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        });
    }

    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    const months = [
        { name: 'Th??ng 1', code: '1' },
        { name: 'Th??ng 2', code: '2' },
        { name: 'Th??ng 3', code: '3' },
        { name: 'Th??ng 4', code: '4' },
        { name: 'Th??ng 5', code: '5' },
        { name: 'Th??ng 6', code: '6' },
        { name: 'Th??ng 7', code: '7' },
        { name: 'Th??ng 8', code: '8' },
        { name: 'Th??ng 9', code: '9' },
        { name: 'Th??ng 10', code: '10' },
        { name: 'Th??ng 11', code: '11' },
        { name: 'Th??ng 12', code: '12' },

    ]

    // const onCityChange = (e) => {
    //     setSelectedCity1(e.value);
    // }

    const handleSearch = () => {
        let newDate = new Date()
        let date = newDate.getDate();
        let currentMonth = newDate.getMonth() + 1;
        let currentYear = newDate.getFullYear();

        console.log(`currentMonth`, currentMonth)

        if (selectedMonth === null) {
            showError('Ch??a ch???n th??ng')
        } else if (selectedYear === null) {
            showError('Ch??a ch???n n??m')
        } else {
            fetchTotalAPI(selectedMonth?.code, selectedYear?.name)
        }


    }


    const header = (
        <div className="p-d-flex p-ai-center export-buttons">
            <Button type="button" icon="pi pi-file-o" onClick={() => exportCSV(false)} className="p-mr-2" data-pr-tooltip="CSV" />
            <Button type="button" icon="pi pi-file-excel" onClick={exportExcel} className="p-button-success p-mr-2" data-pr-tooltip="XLS" />
            {/* <Button type="button" icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning p-mr-2" data-pr-tooltip="PDF" /> */}
            {/* <Button type="button" icon="pi pi-filter" onClick={() => exportCSV(true)} className="p-button-info p-ml-auto" data-pr-tooltip="Selection Only" /> */}
            <Dropdown value={selectedMonth} options={months} onChange={(e) => setSelectedMonth(e.value)} optionLabel="name" placeholder="Th??ng" className="p-mr-2" />
            <Dropdown value={selectedYear} options={yearOption} onChange={(e) => setSelectedYear(e.value)} optionLabel="name" placeholder="N??m" className="p-mr-2" />
            <Button type="button" icon="pi pi-search" onClick={() => handleSearch()} />
        </div>
    );

    const onSelectionChange = (e) => {
        setSelectedProducts(e.value);
    }

    const renderStatusBodyTemplate = (rowData) => {
        let status = null;
        if (rowData.isDeleted === 1) {
            status = 'Ng???ng kinh doanh'
            return <Tag severity="danger" value={status} />;
        }
        else {
            status = 'Ho???t ?????ng'
            return <Tag severity="success" value={status} />;
        }
    }





    return (
        <div className={"card"}>
            <div className={"card-body"}>

                <Toast ref={toast} />

                <div className="p-grid p-align-center">

                    <div className=" p-d-flex p-jc-center p-col-12">
                        <Chart type="pie" data={chartData} options={lightOptions} style={{ position: 'relative', width: '30%' }} />
                    </div>

                    <div className=" p-col-12">
                        <Chart type="bar" data={basicData} options={basicOptions} />
                    </div>

                    <div className="p-col-12">
                        <Tooltip target=".export-buttons>button" position="bottom" />

                        <DataTable
                            ref={dt}
                            value={products}
                            header={header}
                            dataKey="id"
                            // selectionMode="multiple"
                            // selection={selectedProducts}
                            // onSelectionChange={onSelectionChange}

                            paginator rows={10}
                            rowsPerPageOptions={[10, 20]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                            currentPageReportTemplate="T???ng {totalRecords} b???n ghi"

                        >
                            {/* {
                                cols.map((col, index) => <Column key={index} field={col.field} header={col.header} style={{ textAlign: 'center' }} />)
                            } */}

                            {/* { field: 'id', header: 'Id' },
        { field: 'name', header: 'T??n' },
        { field: 'month', header: 'Th??ng' },
        { field: 'total', header: 'T???ng' } */}


                            <Column field="id" header="Id" style={{ textAlign: 'center' }} ></Column>
                            <Column field="name" header="T??n" style={{ textAlign: 'center' }}></Column>
                            <Column field="month" header="Th??ng" style={{ textAlign: 'center' }} ></Column>
                            <Column field="total" header="T???ng" style={{ textAlign: 'center' }}></Column>
                            <Column field="isDeleted" header="T??nh tr???ng" style={{ textAlign: 'center' }} body={renderStatusBodyTemplate}></Column>




                        </DataTable>

                    </div>



                </div>
            </div>
            {loader}
        </div>

    )
}

export default Report
