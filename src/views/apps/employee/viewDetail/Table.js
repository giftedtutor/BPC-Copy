/* eslint-disable multiline-ternary */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment, useState, useEffect } from "react"
import { Link, useLocation } from 'react-router-dom'
import Pagination from "react-js-pagination"

import baseURL from "../../../../base-url/baseURL";

// ** Third Party Components
import Axios from "axios";
import {

  Row,
  Col,

} from "reactstrap";
import { useHistory } from "react-router";
import Cookies from "js-cookie";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// for export as excel
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  ExcelExport,
  ExcelExportColumn,
} from "@progress/kendo-react-excel-export";
import { process } from "@progress/kendo-data-query";
import products from "./products.json";
import moment from "moment";

// fitlter search
const FilterName = () => {
  const role = Cookies.get("role");
  const [suppliersF, setSuppliersF] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortType, setSortType] = useState("desc");
  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState();
  const [record, setRecord] = useState(10);
  const [isLoading, setLoading] = useState(true);
  const [column, setColumn] = useState("id");
  const history = useHistory();
  const [deleteRefresher, setDeleteRefresher] = useState(0);
  const [ExcelData, setExcelData] = useState([]);

  const location = useLocation()
  const id = location.state.params

  const handlePageChange = pageNumber => {
    setPageNo(pageNumber);
  };
  const aggregates = [
    {
      field: "salary",
      aggregate: "sum",
    },
  ];
  const group = [
    {
      field: "Discontinued",
      aggregates,
    },
  ];
  const data = process(ExcelData, {
    group,
  }).data;

  const CustomGroupFooter = props => {
    return `Sum: ${props.aggregates.salary.sum.toFixed(2)}`;
  };
  // for excel
  const _exporter = React.createRef();

  const excelExport = () => {
    if (_exporter.current) {
      _exporter.current.save();
    }
  };
  const generateExcel = data => {
    setExcelData(data);
    excelExport();
  };

  useEffect(() => {
    Axios.get(
      `${baseURL}/editEmployee?id=${id}`
    )
      .then(response => {
        setSuppliersF(response.data.employee);
        setLoading(false); //stop loading when data is fetched
        setTotal(response.data.employee.total);
      })
      .catch(err => console.log(err))
  }, [pageNo, record, sortType, column, deleteRefresher, ExcelData])


  return (
    <div>
      <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
        <Row>
          <h3>Detail of {suppliersF.name}</h3>
        </Row>

        <div style={{ height: 5, width: 100 }}>{/* Just for Space */}</div>

        <div style={{ height: 10, width: 100 }}>{/* Just for Space */}</div>

        {/* Loader */}
        {isLoading ? (
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  {/* <th scope="col">Sr. No</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Father Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Joining Date</th>
                  <th scope="col">CNIC</th>

                  <th scope="col">CNIC Pic</th>
                  <th scope="col">Mobile</th>
                  <th scope="col" style={{ textAlign: 'center' }}>Salary (PKR)</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Address</th>

                  <th scope="col">accommodation</th>
                  <th scope="col">trasporationallowance</th>
                  <th scope="col">medicalallowance</th>
                  <th scope="col">Provident Fund</th>
                  <th scope="col">Beneficiary Name</th>
                  <th scope="col">Beneficiary Phone No</th>
                  <th scope="col">Beneficiary Relation</th>
                  {/* <th scope="col">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <th scope="col">{}</th> */}
                  <th scope="col">{suppliersF.name}</th>
                  <th scope="col">{suppliersF.employeeType}</th>
                  <th scope="col">{suppliersF.fatherName}</th>
                  <th scope="col">{suppliersF.email}</th>
                  {/* <th scope="col">{suppliersF.designation}</th> */}
                  <th scope="col">{moment(suppliersF.dob).format('DD/MM/YYYY')}</th>
                  <th scope="col">{suppliersF.cnic}</th>

                  <th scope="col"><a href={suppliersF.image}>View</a></th>

                  <th scope="col">{suppliersF.mobile}</th>
                  <th scope="col" style={{ textAlign: 'right' }}>{suppliersF.salary}</th>
                  {/* <th scope="col">{suppliersF.department}</th> */}
                  <th scope="col">{suppliersF.gender}</th>
                  <th scope="col">{suppliersF.address}</th>

                  <th scope="col" style={{ textAlign: 'right' }}>{suppliersF.accommodation}</th>
                  <th scope="col" style={{ textAlign: 'right' }}>{suppliersF.trasporationallowance}</th>
                  <th scope="col" style={{ textAlign: 'right' }}>{suppliersF.medicalallowance}</th>
                  <th scope="col" style={{ textAlign: 'right' }}>{suppliersF.pf}</th>
                  <th scope="col">{suppliersF.relative_name}</th>
                  <th scope="col">{suppliersF.relative_number}</th>
                  <th scope="col">{suppliersF.realtive_relation}</th>

                </tr>
              </tbody>
            </table>
            <Row>
              <Col
                xl="12"
                className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
              >
                <Pagination
                  activePage={pageNo}
                  itemsCountPerPage={record}
                  totalItemsCount={total}
                  onChange={e => handlePageChange(e)}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="First"
                  lastPageText="Last"
                  nextPageText="Next"
                  prevPageText="Prev"
                />
              </Col>
            </Row>
          </div>
        )}

        {/* EXCEL EXPORT CONTENT CODE */}

        <div>
          <ExcelExport
            data={data}
            group={group}
            collapsible={true}
            fileName="Employee.xlsx"
            ref={_exporter}
          >
            <ExcelExportColumn field="id" title="Sr. No" width={50} />
            <ExcelExportColumn field="name" title="Name" />
            <ExcelExportColumn field="cnic" title="CNIC" />
            <ExcelExportColumn
              field="salary"
              title="Salary"
              groupFooter={CustomGroupFooter}
              cellOptions={{
                format: "$#,##0.00",
              }}
              groupFooterCellOptions={{
                textAlign: "right",
              }}
              footerCellOptions={{
                wrap: true,
                textAlign: "center",
              }}
            />
          </ExcelExport>
        </div>
      </div>
    </div>
  )
}

const ClientsList = () => {
  return (
    <div>
      <FilterName />
    </div>
  )
}

export default ClientsList