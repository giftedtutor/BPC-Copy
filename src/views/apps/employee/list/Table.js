/* eslint-disable multiline-ternary */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import ReactDOMServer from "react-dom/server";
import generatePDF from "./tablePDF";
import Pagination from "react-js-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilePdf,
  faFileExcel,
} from "@fortawesome/free-solid-svg-icons";

import baseURL from "../../../../base-url/baseURL";

// ** Third Party Components
import Axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Form,
  Input,
  Row,
  Col,
  Label,
  CustomInput,
  Button,
} from "reactstrap";
import { useHistory } from "react-router";
import Cookies from "js-cookie";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { toast } from "react-toastify";

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
import AddNewModal from "./OvertimeModal";
import generateCSPDF from "./characterCertifictePdf";

// fitlter search
const FilterData = () => {
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
  const [modal, setModal] = useState(false)
  const [employeeID, setSentData] = useState([])
  const handleModal = () => setModal(!modal)


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

  let valB;
  if (
    role === "SALES" ||
    role === "ACCOUNTANT" ||
    role === "PRODUCTION" ||
    role === "FINANCE"
  ) {
    valB = true;
  } else {
    valB = false;
  }

  useEffect(() => {
    Axios.get(
      `${baseURL}/getEmployees?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`
    )
      .then(response => {
        setSuppliersF(response.data.employee.data);
        setLoading(false); //stop loading when data is fetched
        setTotal(response.data.employee.total);
      })
      .catch(err => console.log(err));
  }, [pageNo, record, sortType, column, deleteRefresher, ExcelData]);

  const deleteEmp = ParentID => {
    let txt;
    if (confirm("Are you Really want to DELETE?")) {
      txt = "OK";
    } else {
      txt = "Cancel";
    }
    if (txt === "OK") {
      Axios.get(`${baseURL}/deleteEmployee?id=${ParentID}`)
        .then(data => {

          if (data.data.result === "Employee Deleted successfully") {
            toast("Employee Deleted successfully");
            setDeleteRefresher(deleteRefresher + 1);
          } else if (
            data.data.result ===
            "Employee cannot be deleted he has entries in some other tables"
          ) {
            toast(
              "Employee cannot be deleted because he has entries in some other tables"
            );
          } else {
            toast("Something went Wrong!");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleEdit = id => {
    history.push("/BPC/apps/employee/edit", { params: id });
  };
  const Overtime = (employeeID) => {
    setModal(!modal)
    setSentData(employeeID)
  }
  const Actionn = (val, id) => {

    if (val === "edit" && id !== "") {
      handleEdit(id);
    } else if (val === "view" && id !== "") {
      viewDetail(id);
    } else if (val === "overtimeDaily" && id !== "") {
      Overtime(id)
    } else if (val === "viewDetail" && id !== "") {
      // viewDetail(id);
      history.push("/BPC/apps/employee/viewDetail", { params: id })
    } else if (val === "dispatch" && id !== "") {
      deleteEmp(id);
    } else if (val === "received" && id !== "") {
      statusChange(id);
    }
  };

  const sorted = suppliersF;
  const filterName = sorted.filter(item => {
    return filter !== ""
      ? item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.fatherName.toLowerCase().includes(filter.toLowerCase()) ||
      item.cnic.toString().includes(filter.toString()) ||
      item.mobile.toString().includes(filter.toString()) ||
      item.id.toString().includes(filter.toString()) ||
      item.address.toLowerCase().includes(filter.toLowerCase()) ||
      item.gender.toLowerCase().includes(filter.toLowerCase())
      : item;
  });

  const EmployeeData = filterName.map((data, index) => {
    return (
      <tr key={data.index}>
        <td>{index + 1}</td>
        <td>{data.employeeID}</td>
        <td>{data.mobile}</td>
        <td>{data.name}</td>
        <td>
          <Button onClick={() => {
            generateCSPDF(data)
          }} color="danger"><FontAwesomeIcon icon={faFilePdf} />&nbsp; Certificate</Button>
        </td>

        <td>
          <select
            style={{ width: 170 }}
            class="custom-select"
            onChange={e => Actionn(e.target.value, data.id)}
            required
          >
            <option value="">Select Action</option>

            {valB === true ? "" : <option value="edit">Edit</option>}
            <option value="viewDetail">View Detail</option>
            <option value="overtimeDaily">Add Daily OT</option>
            {valB === true ? "" : <option value="dispatch">Delete</option>}
          </select>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <AddNewModal open={modal} handleModal={handleModal} employeeID={employeeID} />

      <div className="invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75">
        <Row>
          <Col xl="3" className="d-flex align-items-center p-0">
            &nbsp; &nbsp;
            <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
              <Label className="mb-0" for="search-invoice">
                Sort
              </Label>
              &nbsp; &nbsp;
              <select
                class="custom-select"
                value={column}
                onChange={e => setColumn(e.target.value)}
                required
              >
                <option value="employeeID">ID</option>
                <option value="name">Name</option>
              </select>
              &nbsp; &nbsp;
              <select
                class="custom-select"
                value={sortType}
                onChange={e => setSortType(e.target.value)}
                required
              >
                <option selected value="asc">
                  Asc
                </option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </Col>

          <Col
            xl="9"
            className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
          >
            <div className="d-flex align-items-center mb-sm-0 mb-1 mr-1">
              <Label className="mb-0" for="search-invoice">
                Search:
              </Label>
              <Input
                id="search-invoice"
                className="ml-50 w-100"
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <div style={{ height: 5, width: 100 }}>{/* Just for Space */}</div>

        <Row>
          <Col xl="3" className="d-flex align-items-center p-0">
            &nbsp; &nbsp;
            <div className="d-flex align-items-center w-100">
              <Label for="rows-per-page">Show</Label>
              <CustomInput
                className="form-control mx-50"
                type="select"
                id="rows-per-page"
                value={record}
                onChange={e => setRecord(e.target.value)}
                style={{
                  width: "5rem",
                  padding: "0 0.8rem",
                  backgroundPosition:
                    "calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0",
                }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </CustomInput>
              <Label for="rows-per-page">Entries</Label>
            </div>
          </Col>
          <Col
            xl="9"
            className="d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1"
          >
            <Link to="/BPC/apps/employee/add">
              <Button.Ripple color="primary" onClick="">
                {" "}
                <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add{" "}
              </Button.Ripple>
            </Link>{" "}
            &nbsp; &nbsp;
            <Link to="/BPC/apps/salary-slip-list/list">
              <Button.Ripple color="primary" onClick="">Salary Slip
              </Button.Ripple>
            </Link>{" "}   &nbsp; &nbsp;

            <Button.Ripple
              className="btn btn-danger"
              onClick={() => generatePDF(sorted)}
            >
              <FontAwesomeIcon icon={faFilePdf} color="white" /> PDF
            </Button.Ripple>{" "}
            &nbsp; &nbsp; &nbsp;

          </Col>
        </Row>

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
                  <th scope="col">Sr. No</th>
                  <th scope="col">ID</th>
                  <th scope="col">Contact No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Character Certificate</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>
              <tbody>{EmployeeData}</tbody>
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
  );
};

const ClientsList = () => {
  return (
    <div>
      <FilterData />
    </div>
  );
};

export default ClientsList;