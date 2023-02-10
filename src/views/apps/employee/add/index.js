/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import CurrencyFormat from "react-currency-format";
import baseURL from "../../../../base-url/baseURL";
import Axios from "axios";

const addEmployee = () => {

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [File, setFile] = useState("");
  const [Accommodation, setAccommodation] = useState(0);
  const [TrasporationAllowance, setTrasporationAllowance] = useState(0);
  const [MedicalAllowance, setMedicalAllowance] = useState(0);
  const [employeeID, setEmployeeID] = useState("");
  const [PF, setPF] = useState(0);

  const [relativeName, setRelativeName] = useState('')
  const [relativeRelation, setRelativeRelation] = useState('')
  const [relativeNumber, setRelativeNumber] = useState('')
  const [rows, setRows] = useState([])

  const [stylee, setStyle] = useState("none");
  const [style2, setStyle2] = useState("none");
  const [style3, setStyle3] = useState("none");
  const [style4, setStyle4] = useState("none");
  const [style5, setStyle5] = useState("none");
  const [style6, setStyle6] = useState("none");
  const [style7, setStyle7] = useState("none");
  const [style8, setStyle8] = useState("none");
  const [style9, setStyle9] = useState("none");
  const [style10, setStyle10] = useState("none");
  const [style11, setStyle11] = useState("none");
  const [style12, setStyle12] = useState("none");
  const history = useHistory();

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`

  const [currentDate, setCurrentDate] = useState(todayDate)

  const addClient = () => {

    setIsButtonDisabled(true);
    if (name === "") {
      toast("Enter Name!");
    } else if (employeeID === "") {
      toast("Enter Employee ID!");
    } else if (fatherName === "") {
      toast("Enter Father Name!");
    } else if (File === "") {
      toast("Choose your cnic Picture");
    } else if (address === "") {
      toast("Fill out address field!");
    } else if (salary === "") {
      toast("Fill out salary field!");
    } else if (EmployeeType === "") {
      toast("Please Select Type!");
    } else if (mobile === "") {
      toast("Provide Contact Number of more than 9 digits!");
    } else if (
      name !== "" &&
      employeeID !== "" &&
      fatherName !== "" &&
      dob !== "" &&
      cnic !== "" &&
      mobile !== "" &&
      salary !== "" &&
      gender !== "" &&
      address !== ""
    ) {
      const formData = new FormData();
      formData.append("file", File);

      const data = JSON.stringify({
        name,
        fatherName,
        email,
        dob: currentDate,
        cnic,
        mobile,
        salary,
        department,
        gender,
        address,
        employeeID,
        designation: EmployeeType,
        employeeType: EmployeeType,
        accommodation: Accommodation,
        trasporationallowance: TrasporationAllowance,
        medicalallowance: MedicalAllowance,
        pf: PF,
        relative_name: relativeName,
        relative_number: relativeNumber,
        realtive_relation: relativeRelation
      });

      formData.append("data", data);
      Axios.post(`${baseURL}/addEmployee`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(data => {
          if (data.data.result === "Employee saved successfully") {
            toast("Employee saved successfully!");
            history.push("/BPC/apps/employee/list");
          } else {
            toast("Employee did not add, Please try again ");
            history.push("/BPC/apps/employee/add");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      toast("Fill out fields correctly!");
    }
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };
  const handleChange = idx => e => {
    const { name, value } = e.target
    ConcernPerson[idx] = value

    const rowss = [...rows]
    rowss[idx] = {
      personName: value,
      designation: Designation[idx],
      phone_no: PhoneNo[idx]

    }
    setRows(rowss)
  }

  const handleChange1 = idx => e => {
    const { name, value } = e.target
    Designation[idx] = value

    const rowss = [...rows]
    rowss[idx] = {
      personName: ConcernPerson[idx],
      designation: value,
      phone_no: PhoneNo[idx]

    }
    setRows(rowss)
  }

  const handleChange2 = idx => e => {
    const { name, value } = e.target
    PhoneNo[idx] = value

    const rowss = [...rows]
    rowss[idx] = {
      personName: ConcernPerson[idx],
      designation: Designation[idx],
      phone_no: value

    }
    setRows(rowss)
  }
  const handleAddRow = () => {

    const item = {
      personName: "",
      designation: "",
      phone_no: ""

    }
    setRows([...rows, item])
  }

  const handleRemoveSpecificRow = (idx) => {
    const rowss = [...rows]
    const RemoveRow1 = rowss.splice(idx, 1)
    setRows(rowss)
  }
  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Name</label>
            <input
              onMouseEnter={e => {
                setStyle("block");
              }}
              onMouseLeave={e => {
                setStyle("none");
              }}
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
          <div
            onMouseEnter={e => {
              setStyle4("block");
            }}
            onMouseLeave={e => {
              setStyle4("none");
            }}
            className="form-group col-md-3"
          >
            <label>Type</label>
            <select
              class="custom-select"
              onChange={e => setEmployeeType(e.target.value)}
              value={EmployeeType}
              onFocus={e => e.target.any}
              required
            >
              <option value="">Select Type</option>
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
              onMouseEnter={e => {
                setStyle6("block");
              }}
              onMouseLeave={e => {
                setStyle6("none");
              }}
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
              onMouseEnter={e => {
                setStyle7("block");
              }}
              onMouseLeave={e => {
                setStyle7("none");
              }}
              type="date"
              className="form-control"
              placeholder=""
              value={currentDate}
              onChange={e => setCurrentDate(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>CNIC</label>

            <CurrencyFormat
              onMouseEnter={e => {
                setStyle8("block");
              }}
              onMouseLeave={e => {
                setStyle8("none");
              }}
              className="form-control"
              placeholder="16101-0099000-0"
              value={cnic}
              onFocus={e => e.target.select()}
              onChange={e => setCnic(e.target.value)}
              format="#####-#######-#"
            />
          </div>
          <div className="form-group col-md-3">
            <label>CNIC Picture</label>
            <input
              type="file"
              className="form-control"
              onChange={e => setFile(e.target.files[0])}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Mobile No</label>

            <CurrencyFormat
              onMouseEnter={e => {
                setStyle2("block");
              }}
              onMouseLeave={e => {
                setStyle2("none");
              }}
              className="form-control"
              placeholder="923440110312"
              value={mobile}
              onFocus={e => e.target.select()}
              onChange={e => setContactNo(e.target.value)}
              format="############"
            />
          </div>
        </div>

        {/*  */}
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Accommodation (PKR)</label>
            <input
              type="Number"
              className="form-control"
              placeholder="5000"
              value={Accommodation.toLocaleString("en-US")}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              onChange={e => setAccommodation(e.target.value)}
            />
          </div>
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
            <label>Provident Fund (PKR)</label>
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
        </div>
        {/*  */}
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Salary (PKR)</label>
            <input
              type="Number"
              className="form-control"
              placeholder="20000"
              value={salary}
              onFocus={e => e.target.select()}
              onChange={e => setSalary(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Email (Optional)</label>
            <input
              onMouseEnter={e => {
                setStyle5("block");
              }}
              onMouseLeave={e => {
                setStyle5("none");
              }}
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
              onMouseEnter={e => {
                setStyle3("block");
              }}
              onMouseLeave={e => {
                setStyle3("none");
              }}
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
        {/*  */}
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
        <div className="form-row">

          <div className="form-group col-md-10" />
          <div className="form-group col-md-2">
            <Button.Ripple
              color="primary"
              disabled={isButtonDisabled}
              onClick={addClient}
            >
              Store
            </Button.Ripple>
          </div>
        </div>

      </form>
    </div>
  );
};

export default addEmployee;