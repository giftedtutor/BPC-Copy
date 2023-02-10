/* eslint-disable semi */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Axios from "axios";
import baseURL from "../../../../base-url/baseURL";

const addOvertimeSalarySlip = () => {
  const [EmployeeID, setEmployeeID] = useState("");
  const [worked, setworked] = useState("");
  const [TotalSalary, setTotalSalary] = useState();
  const [Total, setTotal] = useState();
  const [Salary, setSalary] = useState();
  const [PerHour, setPerHour] = useState();
  const [PaidStatus, setPaidStatus] = useState("null");
  const [Remarks, setRemarks] = useState("null");
  
  const [EmployeeDetails, setEmployeeDetails] = useState([]);
  const [Employees, setEmployees] = useState([]);

  const [stylee, setStyle] = useState("none");
  const [style2, setStyle2] = useState("none");
  const [style3, setStyle3] = useState("none");
  const [style4, setStyle4] = useState("none");

  const history = useHistory();

  const AddItem = () => {
    if (EmployeeID === "") {
      toast("Select Employee!");
    } else if (worked === "") {
      toast("Enter Worked!");
    } else if (
      EmployeeID !== "" &&
      worked !== ""

    ) {
      fetch(`${baseURL}/overTimeSalaryStore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: EmployeeID,
          worked,
          totalsalary: EmployeeDetails.totalearnings,
          salary: (EmployeeDetails.totalearnings / 30).toFixed(2),
          perhour: (EmployeeDetails.totalearnings / 30 / 8).toFixed(2),
          status: PaidStatus,
          paid: ((EmployeeDetails.totalearnings / 30 / 8) * worked).toFixed(2),
          remarks: Remarks,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.result === "OverTime salary saved successfully") {
            toast("OverTime Salary Saved Successfully!");
            history.push("/BPC/apps/advance-and-reimburst-salary/add");
          } else {
            toast("OverTime Salary did not save, Please try again ");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      toast("Fill out fields correctly!");
    }
  };

  useEffect(() => {
    Axios.get(`${baseURL}/getEmployeesList`)
      .then(response => {
       setEmployees(response.data.employee);
      })
      .catch(err => console.log(err));
  }, []);

  const editClient = iddd => {
    Axios.get(`${baseURL}/getEmpTotalSalary?id=${iddd}`)
      .then(response => {
         if (response.data.total === null) {
         
          setEmployeeDetails(0);
        } else {
      
          setEmployeeDetails(response.data.total);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Employee</label>

            <select
              onMouseEnter={e => {
                setStyle("block");
              }}
              onMouseLeave={e => {
                setStyle("none");
              }}
              className="custom-select"
              onFocus={e => e.target.any}
              required
              onChange={e => {
                setEmployeeID(e.target.value);
                editClient(e.target.value);
               
              }}
            >
              <option>Select Employee</option>
              {Employees.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <p
              style={{
                border: "1px solid gray",
                borderRadius: 20,
                display: stylee,
                width: 210,
                padding: 10,
                margin: 10,
                backgroundColor: "grey",
                color: "white",
              }}
            >
              Please Select Employee!
            </p>
          </div>
          <div className="form-group col-md-3">
            <label>Work (Hours)</label>
            <input
              onMouseEnter={e => {
                setStyle2("block");
              }}
              onMouseLeave={e => {
                setStyle2("none");
              }}
              type="Number"
              className="form-control"
              placeholder="2000"
              value={worked}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              onChange={e => {
                setworked(e.target.value);
                setTotalSalary(EmployeeDetails.totalearnings);
                setSalary((EmployeeDetails.totalearnings / 30).toFixed(2));
                setPerHour((EmployeeDetails.totalearnings / 30 / 8).toFixed(2));
                setTotal(
                  ((EmployeeDetails.totalearnings / 30 / 8) * worked).toFixed(2)
                );
              }}
            />
            <p
              style={{
                border: "1px solid gray",
                borderRadius: 20,
                display: style2,
                width: 120,
                padding: 10,
                margin: 10,
                backgroundColor: "grey",
                color: "white",
              }}
            >
              Enter Work!
            </p>
          </div>
          <div className="form-group col-md-3">
            <label>Total Salary</label>
            <input
              type="Number"
              className="form-control"
              placeholder="567"
              value={EmployeeDetails.totalearnings}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setTotalSalary(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Salary</label>
            <input
              type="Number"
              className="form-control"
              placeholder="5000"
              value={(EmployeeDetails.totalearnings / 30).toFixed(2)}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setSalary(e.target.value)}
            />
          </div>
        </div>
        {/* 2nd row */}
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Per Hour</label>
            <input
              type="Number"
              className="form-control"
              placeholder="5000"
              value={(EmployeeDetails.totalearnings / 30 / 8).toFixed(2)}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setPerHour(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Total</label>
            <input
              type="Number"
              className="form-control"
              placeholder="5000"
              value={(
                (EmployeeDetails.totalearnings / 30 / 8) *
                worked
              ).toFixed(2)}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setTotal(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Paid Status</label>
            <input
              onMouseEnter={e => {
                setStyle3("block");
              }}
              onMouseLeave={e => {
                setStyle3("none");
              }}
              type="text"
              className="form-control"
              placeholder="Status"
              value={PaidStatus}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              onChange={e => setPaidStatus(e.target.value)}
            />
            <p
              style={{
                border: "1px solid gray",
                borderRadius: 20,
                display: style3,
                width: 160,
                padding: 10,
                margin: 10,
                backgroundColor: "grey",
                color: "white",
              }}
            >
              Enter Paid Status!
            </p>
          </div>
          <div className="form-group col-md-3">
            <label>Remarks</label>
            <input
              onMouseEnter={e => {
                setStyle4("block");
              }}
              onMouseLeave={e => {
                setStyle4("none");
              }}
              type="text"
              className="form-control"
              placeholder="Remarks"
              value={Remarks}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              onChange={e => setRemarks(e.target.value)}
            />
            <p
              style={{
                border: "1px solid gray",
                borderRadius: 20,
                display: style4,
                width: 100,
                padding: 10,
                margin: 10,
                backgroundColor: "grey",
                color: "white",
              }}
            >
              Remarks!
            </p>
          </div>
        </div>

        <Button.Ripple color="primary" onClick={AddItem}>
          Store
        </Button.Ripple>
      </form>
    </div>
  );
};

export default addOvertimeSalarySlip;
