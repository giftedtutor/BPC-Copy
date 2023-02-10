/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import baseURL from "../../../../base-url/baseURL";
import CurrencyFormat from "react-currency-format";

const edit = () => {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");

  const [email, setEmail] = useState();
  const [dob, setDob] = useState();
  const [cnic, setCnic] = useState("");
  const [mobile, setContactNo] = useState();
  const [salary, setSalary] = useState();
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [EmployeeType, setEmployeeType] = useState("");
  const [Accommodation, setAccommodation] = useState(0);
  const [TrasporationAllowance, setTrasporationAllowance] = useState(0);
  const [MedicalAllowance, setMedicalAllowance] = useState(0);
  const [employeeID, setEmployeeID] = useState();
  const [PF, setPF] = useState(0);

  const history = useHistory();
  const location = useLocation();
  
  const [relativeName, setRelativeName] = useState('')
  const [relativeRelation, setRelativeRelation] = useState('')
  const [relativeNumber, setRelativeNumber] = useState('')

  const [suppliersF, setSuppliersF] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const id = location.state.params;

  const editClient = () => {
    Axios.get(`${baseURL}/editEmployee?id=${id}`)
      .then(response => {
        setSuppliersF(response.data.employee);
        setName(response.data.employee.name);
        setFatherName(response.data.employee.fatherName);
        setEmail(response.data.employee.email);
        setAddress(response.data.employee.address);
        setDob(response.data.employee.dob);
        setCnic(response.data.employee.cnic);
        setContactNo(response.data.employee.mobile);
        setSalary(response.data.employee.salary);
        setDepartment(response.data.employee.department);
        setGender(response.data.employee.gender);
        setEmployeeType(response.data.employee.employeeType);
        setEmployeeID(response.data.employee.employeeID)

        setAccommodation(response.data.employee.accommodation);
        setPF(response.data.employee.pf);
        setTrasporationAllowance(response.data.employee.trasporationallowance);
        setMedicalAllowance(response.data.employee.medicalallowance);
        setRelativeName(response.data.employee.relative_name);
        setRelativeRelation(response.data.employee.realtive_relation);
        setRelativeNumber(response.data.employee.relative_number);
        setLoading(false);

      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    editClient();
  }, []);

  const updateClients = () => {
    if (name === "") {
      toast("Enter Name");
    } else if (name !== "") {
      fetch(`${baseURL}/updateEmployee?id=${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          fatherName,
          email,
          dob,
          cnic,
          mobile,
          salary,
          department: EmployeeType,
          gender,
          address,
          employeeID,
          employeeType: EmployeeType,
          accommodation: Accommodation,
          trasporationallowance: TrasporationAllowance,
          medicalallowance: MedicalAllowance,
          pf: PF,
          relative_name: relativeName,
          relative_number: relativeNumber,
          realtive_relation: relativeRelation
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.result === "Employee updated successfully") {
            toast("Employee updated successfully!");
            history.push("/BPC/apps/employee/list");
          } else {
            toast("Employee did not update, Please try again ");
           }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      toast("Fill out fields correctly!");
    }
  };

  return (
    <div>
      {/* Loader */}
      {isLoading ? (
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <form>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name "
                value={name}
                style={{ textTransform: "capitalize" }}
                onFocus={e => e.target.select()}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Employee ID</label>
              <input
                type="text"
                className="form-control"
                placeholder="EMP-034"
                value={employeeID}
                style={{ textTransform: "capitalize" }}
                onFocus={e => e.target.select()}
                onChange={e => setEmployeeID(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Type</label>
              <select
                class="custom-select"
                onChange={e => setEmployeeType(e.target.value)}
                value={EmployeeType}
                onFocus={e => e.target.any}
                required
              >
                <option value="FACTORY_EMPLOYEE">Select Type</option>
                <option value="FACTORY_EMPLOYEE">FACTORY EMPLOYEE</option>
                <option value="SITE_EMPLOYEE">SITE EMPLOYEE</option>
                <option value="FABRICATOR">FABRICATOR</option>
                <option value="ACCOUNTANT">ACCOUNTANT</option>
                <option value="SALES_AND_MARKETING">SALES & MARKETING</option>
                <option value="ADMIN">ADMIN</option>
                <option value="LABOUR">LABOUR</option>
                <option value="TRANSPORT">TRANSPORT</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>Father Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Father Name "
                value={fatherName}
                style={{ textTransform: "capitalize" }}
                onFocus={e => e.target.select()}
                onChange={e => setFatherName(e.target.value)}
              />
            </div>

          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
              <label>Joining Date</label>
              <input
                type="date"
                className="form-control"
                placeholder=""
                value={dob}
                onChange={e => setDob(e.target.value)}
              />
            </div>

            <div className="form-group col-md-3">
              <label>CNIC</label>

              <CurrencyFormat
                className="form-control"
                placeholder="16101-0099000-0"
                value={cnic}
                onFocus={e => e.target.select()}
                onChange={e => setCnic(e.target.value)}
                format="#####-#######-#"
              />
            </div>

            <div className="form-group col-md-3">
              <label>Mobile No</label>

              <CurrencyFormat
                className="form-control"
                placeholder="923440110312"
                value={mobile}
                onFocus={e => e.target.select()}
                onChange={e => setContactNo(e.target.value)}
                format="############"
              />
            </div>
            <div className="form-group col-md-3">
              <label>Accommodation (PKR)</label>
              <input
                type="Number"
                className="form-control"
                placeholder="567"
                value={Accommodation}
                style={{ textTransform: "capitalize" }}
                onFocus={e => e.target.select()}
                required
                onChange={e => setAccommodation(e.target.value)}
              />
            </div>
          </div>
          {/*  */}
          <div className="form-row">

            <div className="form-group col-md-3">
              <label>Trasportation Allowance (PKR)</label>
              <input
                type="Number"
                className="form-control"
                placeholder="5000"
                value={TrasporationAllowance}
                style={{ textTransform: "capitalize" }}
                onFocus={e => e.target.select()}
                required
                onChange={e => setTrasporationAllowance(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Medical Allowance (PKR)</label>
              <input
                type="Number"
                className="form-control"
                placeholder="5000"
                value={MedicalAllowance}
                style={{ textTransform: "capitalize" }}
                onFocus={e => e.target.select()}
                required
                onChange={e => setMedicalAllowance(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Provident Fund (PKR) </label>
              <input
                type="Number"
                className="form-control"
                placeholder="5000"
                value={PF}
                style={{ textTransform: "capitalize" }}
                onFocus={e => e.target.select()}
                required
                onChange={e => setPF(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Salary (PKR)</label>
              <input
                type="Integer"
                className="form-control"
                placeholder="20000"
                value={salary}
                onFocus={e => e.target.select()}
                onChange={e => setSalary(e.target.value)}
              />
            </div>
          </div>
          {/*  */}

          <div className="form-row">

            <div className="form-group col-md-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onFocus={e => e.target.select()}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-md-3">
              <label>Gender</label>
              <select
                class="custom-select"
                onChange={e => setGender(e.target.value)}
                value={gender}
                onFocus={e => e.target.any}
                required
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 Main St"
                value={address}
                style={{ textTransform: "capitalize" }}
                onFocus={e => e.target.select()}
                onChange={e => setAddress(e.target.value)}
              />
            </div>
          </div>
          <hr />
        <h3> Incase of emergency, Please fill out the following!</h3>
        <hr />
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={relativeName}
              onFocus={e => e.target.select()}
              onChange={e => setRelativeName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Phone No</label>
            <CurrencyFormat
              className="form-control"
              placeholder="923440110312"
              value={relativeNumber}
              onFocus={e => e.target.select()}
              onChange={e => setRelativeNumber(e.target.value)}
              format="############"
            />

          </div>
          <div className="form-group col-md-3">
            <label>Relation</label>
            <input
              type="text"
              className="form-control"
              placeholder="Father / Son / Brother"
              value={relativeRelation}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              onChange={e => setRelativeRelation(e.target.value)}
            />
          </div>
        </div>
          <Button.Ripple color="primary" onClick={updateClients}>
            Update
          </Button.Ripple>
        </form>
      )}
    </div>
  );
};

export default edit;