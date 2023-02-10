/* eslint-disable comma-dangle */
/* eslint-disable semi */
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Axios from "axios";
import baseURL from "../../../../base-url/baseURL";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useForm } from 'react-hook-form'

const style = {
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SalarySlip = () => {
  const [EmployeeID, setEmployeeID] = useState("");
  const [basicSalary, setbasicSalary] = useState(0);
  const [Accommodation, setAccommodation] = useState(0);
  const [TrasporationAllowance, setTrasporationAllowance] = useState(0);
  const [MedicalAllowance, setMedicalAllowance] = useState(0);
  const [PF, setPF] = useState(0);
  const [AdvanceSalary, setAdvanceSalary] = useState(0);
  const [AbsentsDays, setAbsentsDays] = useState(0);
  const [Reimbursement, setReimbursement] = useState(0);
  const [totalhours, settotalhours] = useState(0);
  const [TotaLearnings, setTotaLearnings] = useState(0);
  const [Bonus, setBonus] = useState(0);
  const [File, setFile] = useState("");
  const [AccountNumber, setAccountNumber] = useState('');
  const [PayDate, setPayDate] = useState('');
  const [PayPeriod, setPayPeriod] = useState(30);
  const [month, setMonth] = useState();
  const [paymentType, setPaymentType] = useState('')

  const [TotalSalary, setTotalSalary] = useState();
  const [Total, setTotal] = useState();
  const [Salary, setSalary] = useState();
  const [PerHour, setPerHour] = useState();

  const [Employees, setEmployees] = useState([]);
  const [OTData, setOTData] = useState(0);
  const [OTRatePerHour, setOTRatePerHour] = useState(0);
  const [EmployeeDetails, setEmployeeDetails] = useState([]);
  const [EmployeeDetails2, setEmployeeDetails2] = useState([]);
  const [employeeName, setEmployeeName] = useState('')
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [worked, setworked] = useState("");

  const [PaidStatus, setPaidStatus] = useState("null");
  const [Remarks, setRemarks] = useState("null");

  const [stylee, setStyle] = useState("none");
  const [style2, setStyle2] = useState("none");
  const [style3, setStyle3] = useState("none");
  const [style4, setStyle4] = useState("none");
  const [style6, setStyle6] = useState("none");
  const [style7, setStyle7] = useState("none");
  const [style8, setStyle8] = useState("none");
  const [style9, setStyle9] = useState("none");
  const [style10, setStyle10] = useState("none");
  const [style11, setStyle11] = useState("none");
  const [style12, setStyle12] = useState("none");
  const [style13, setStyle13] = useState("none");
  const [style14, setStyle14] = useState("none");
  const [flag, setFlag] = useState(0);
  const [advSalary, setAdvSalary] = useState(0)

  const { register, errors, handleSubmit } = useForm()

  let todayDate = new Date()
  const dd = String(todayDate.getDate()).padStart(2, '0')
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = todayDate.getFullYear()

  todayDate = `${yyyy}-${mm}-${dd}`
  const [currentDate, setCurrentDate] = useState(todayDate)

  const todayMonth = `${yyyy}-${mm}`
  const [currentMonth, setCurrentMonth] = useState(todayMonth)

  const AddItem = () => {
    if (basicSalary === "") {
      toast("Enter Basic Salary");
    } else if (EmployeeID !== "" && basicSalary !== "" && AbsentsDays !== "" && Bonus !== "" && totalhours !== "") {
      const formData = new FormData();
      formData.append("file", File);
      const data = JSON.stringify({
        employeeId: EmployeeID,
        basicsalary: basicSalary,
        accommodation: Accommodation,
        trasporationallowance: TrasporationAllowance,
        medicalallowance: MedicalAllowance,
        pf: PF,
        advancesalary: AdvanceSalary,
        absentsdays: AbsentsDays,
        reimbursement: Reimbursement,
        totalhours,
        OTRatePerHour,
        accountNo: AccountNumber,
        paymentType,
        payDate: currentDate,
        payPeriod: PayPeriod - AbsentsDays,
        bonus: Bonus,
        payMonth: currentMonth,
        totalearnings:
          Number(basicSalary) +
          Number(Accommodation) +
          Number(Bonus) +
          Number(TrasporationAllowance) +
          Number(MedicalAllowance) +
          Number(OTRatePerHour * OTData) -
          (Number(Reimbursement) + Number(AdvanceSalary)),
        flag,
      });
      formData.append("data", data);
      Axios.post(`${baseURL}/addSalarySlip`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(data => {
         
          if (data.data.result === "salarySlip saved successfully") {
            toast("Salary Slip Saved Successfully!");
            history.push("/BPC/apps/salary-slip-list/list");
          } else {
            toast("Salary Slip did not save, Please try again ");
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      toast("Fill out fields correctly!");
    }
  };
  const getOverTimeSalarySlipData = E_ID => {
    Axios.get(`${baseURL}/genrateOverTimeSlip/${E_ID}`)
      .then(response => {
       if (response.data.result.length === 0) {
          setOTData(0);
          setOTRatePerHour(0);
        } else {
          setOTData(response.data.result[0].worked);
          setOTRatePerHour(response.data.result[0].perhour);
        }
      })
      .catch(err => console.log(err));
  };
  const editClient = iddd => {
    Axios.get(`${baseURL}/editEmployee?id=${iddd}`)
      .then(response => {
       setEmployeeDetails(response.data.employee);
        setbasicSalary(response.data.employee.salary);
        setTrasporationAllowance(response.data.employee.trasporationallowance)
        setMedicalAllowance(response.data.employee.medicalallowance)
        setAccommodation(response.data.employee.accommodation)
        setPF(response.data.employee.pf)
        setEmployeeName(response.data.employee.name)
        settotalhours(response.data.totalovertime)
        setOTData(((Number(response.data.employee.salary) / 30) / 8) * response.data.totalovertime)
      })
      .catch(err => console.log(err));
  };
  const SalaryDetails = iddd => {
    Axios.get(`${baseURL}/getEmpTotalSalary?id=${iddd}`)
      .then(response => {
        if (response.data.total === null) {
         setEmployeeDetails2(0);
        } else {
         setEmployeeDetails2(response.data.total);
          setAdvanceSalary(response.data.Advance)
          setReimbursement(response.data.Reimbursement)
        }
      })
      .catch(err => console.log(err));
  };
  const AddAdvSalary = () => {
    if (advSalary === "") {
      toast("Enter advance Salary!");
    } else if (EmployeeID === "") {
      toast("Please Select Employee First!");
    } else if (
      advSalary !== ""

    ) {
      fetch(`${baseURL}/addEmployeeAdvanceSalary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeID: EmployeeID,
          reimbursement: 0,
          advance: advSalary
        }),
      })
        .then(res => res.json())
        .then(data => {
        if (data.result === "Employee Salary saved successfully") {
            toast("Employee Advance Salary added successfully!");
            editClient(EmployeeID);
            SalaryDetails(EmployeeID)
            getOverTimeSalarySlipData(EmployeeID);
            handleClose()
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
  }

  useEffect(() => {
    Axios.get(`${baseURL}/getEmployeesList`)
      .then(response => {
        setEmployees(response.data.employee);
      })
      .catch(err => console.log(err));

  }, []);

  return (
    <div>
      
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <div>
            <Button.Ripple color='primary' onClick={() => {
              history.push('/BPC/apps/advance-and-reimburst-salary/add')
            }}>List</Button.Ripple>
            <hr />
            <form>
              <div className="form-row">
                <div className="form-group col-md-12">
                  <label>Employee</label>
                  <input
                    type="text"
                    disabled
                    className="form-control"
                    value={employeeName} />

                </div>
                <div className="form-group col-md-12">
                  <label>Advance Salary</label>
                  <input
                    type="Number"
                    className="form-control"
                    placeholder="2000"
                    value={advSalary}
                    style={{ textTransform: "capitalize" }}
                    onFocus={e => e.target.select()}
                    onChange={e => {
                      setAdvSalary(e.target.value);
                    }}
                  />
                </div>
              </div>

              <Button.Ripple color="primary" onClick={() => {
                AddAdvSalary()
              }}>
                Store
              </Button.Ripple>
            </form>
          </div>
        </Box>
      </Modal>
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
              class="custom-select"
              onFocus={e => e.target.any}
              required
              onChange={e => {
                setEmployeeID(e.target.value);
                editClient(e.target.value);
                SalaryDetails(e.target.value)
                getOverTimeSalarySlipData(e.target.value);
              }}
            >
              <option>Select Employee</option>
              {Employees.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
           
          </div>
          <div className="form-group col-md-3">
            <label>Basic Salary</label>
            <input
              type="Number"
              className="form-control"
              placeholder="2000"
              value={basicSalary}
              disabled
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              onChange={e => setbasicSalary(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Accommodation</label>
            <input
              onMouseEnter={e => {
                setStyle2("block");
              }}
              onMouseLeave={e => {
                setStyle2("none");
              }} toast
              type="Number"
              className="form-control"
              placeholder="567"
              value={Accommodation}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setAccommodation(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Trasportation Allowance</label>
            <input
              onMouseEnter={e => {
                setStyle3("block");
              }}
              onMouseLeave={e => {
                setStyle3("none");
              }}
              type="Number"
              className="form-control"
              placeholder="5000"
              value={TrasporationAllowance}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setTrasporationAllowance(e.target.value)}
            />
          </div>
        </div>
        {/* 2nd row */}
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Medical Allowance</label>
            <input
              onMouseEnter={e => {
                setStyle4("block");
              }}
              onMouseLeave={e => {
                setStyle4("none");
              }}
              type="Number"
              className="form-control"
              placeholder="5000"
              value={MedicalAllowance}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setMedicalAllowance(e.target.value)}
            />
           
          </div>
          <div className="form-group col-md-3">
            <label>Provident Fund </label>
            <input
              type="Number"
              className="form-control"
              placeholder="5000"
              value={PF}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setPF(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Advance Salary</label>
            <input
              onMouseEnter={e => {
                setStyle6("block");
              }}
              onMouseLeave={e => {
                setStyle6("none");
              }}
              type="Number"
              className="form-control"
              placeholder="5000"
              value={AdvanceSalary}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setAdvanceSalary(e.target.value)}
            />
          </div>
          <div className="form-group col-md-3">
            <label>Absents Days</label>
            <input
              onMouseEnter={e => {
                setStyle7("block");
              }}
              onMouseLeave={e => {
                setStyle7("none");
              }}
              type="Number"
              className="form-control"
              placeholder="5000"
              value={AbsentsDays}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              onChange={e => {
                setAbsentsDays(e.target.value)
              }}
            />
          </div>
        </div>

        {/* 3rd row */}
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Reimbursement</label>
            <input
              type="Number"
              className="form-control"
              placeholder="5000"
              value={Reimbursement}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              disabled
              onChange={e => setReimbursement(e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Over Time Hours</label>
            <input
              onMouseEnter={e => {
                setStyle9("block");
              }}
              onMouseLeave={e => {
                setStyle9("none");
              }}
              type="Number"
              className="form-control"
              placeholder="30 Hrs."
              value={totalhours}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              disabled
              onChange={e => {
                settotalhours(e.target.value === null ? 0 : e.target.value)
             
                setOTData(((Number(basicSalary) / 30) / 8) * e.target.value)
              }}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Bonus</label>
            <input
              onMouseEnter={e => {
                setStyle10("block");
              }}
              onMouseLeave={e => {
                setStyle10("none");
              }}
              type="Number"
              className="form-control"
              placeholder="50"
              value={Bonus}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              onChange={e => setBonus(e.target.value === null ? 0 : e.target.value)}
            />
          </div>

          <div className="form-group col-md-3">
            <label>Total Earning</label>
            <input
              type="Number"
              className="form-control"
              placeholder="5000"
              disabled
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              value={
                (((Number(basicSalary) +
                  Number(Accommodation) +
                  Number(Bonus) +
                  Number(TrasporationAllowance) + Number(Reimbursement) + Number(OTData) +
                  Number(MedicalAllowance))) - (Number(PF) + Number(AdvanceSalary) + (((Number(basicSalary)) / 30) * Number(AbsentsDays)))).toFixed(2)

              }
              onChange={e => setTotaLearnings(e.target.value)}
            />
          </div>
        </div>
        {/* Row 4 */}
        <div className="form-row">
          <div className="form-group col-md-3">
            <label>Upload Picture (Optional)</label>
            <input
              onMouseEnter={e => {
                setStyle11("block");
              }}
              onMouseLeave={e => {
                setStyle11("none");
              }}
              type="file"
              className="form-control"
              onChange={e => {
                setFile(e.target.files[0]);
                setFlag(1);
              }}
            />
          </div>
          <div className="form-group col-md-2">
            <label>Payment Type</label>
            <select
              class="custom-select"
              value={paymentType}
              onChange={e => {
                setPaymentType(e.target.value);
              }}
            >
              <option>Select Type</option>
              <option value='CASH'>CASH</option>
              <option value='BANK'>BANK</option>
            </select>
          </div>
          {paymentType === 'BANK' ? (<div className="form-group col-md-2">
            <label>A/C Number</label>
            <input
              onMouseEnter={e => {
                setStyle12("block");
              }}
              onMouseLeave={e => {
                setStyle12("none");
              }}
              type="text"
              className="form-control"
              placeholder="097834852634"
              value={AccountNumber}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              onChange={e => setAccountNumber(e.target.value)}
            />
          </div>) : ''}

          <div className="form-group col-md-2">
            <label>Pay Date</label>
            <input
              onMouseEnter={e => {
                setStyle13("block");
              }}
              onMouseLeave={e => {
                setStyle13("none");
              }}
              type="date"
              className="form-control"
              placeholder="50"
              value={currentDate}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              onChange={e => setCurrentDate(e.target.value)}
            />
          </div>

          <div className={`form-group col-md-${paymentType === 'CASH' || paymentType === '' ? 2 : 1}`}>
            <label>Working Days</label>
            <input
              onMouseEnter={e => {
                setStyle14("block");
              }}
              onMouseLeave={e => {
                setStyle14("none");
              }}
              type="Number"
              className="form-control"
              placeholder="30"
              value={PayPeriod - AbsentsDays}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
              required
              disabled
            />
          </div>
          <div className={`form-group col-md-${paymentType === 'CASH' || paymentType === '' ? 3 : 2}`}>
            <label>Salary Month</label>
            <input
              type="month"
              className="form-control"
              placeholder="30"
              value={currentMonth}
              onChange={e => setCurrentMonth(e.target.value)}
              style={{ textTransform: "capitalize" }}
              onFocus={e => e.target.select()}
            />
          </div>
        </div>
        {/* row 5th */}

        <div className="form-row">
    
          <div
            className="form-group col-md-11"
            style={{
              marginTop: 20,
            }}
          >
            <Button color="primary" onClick={handleOpen}>Advance Salary</Button>
          </div>
          <div
            className="form-group col-md-1"
            style={{
              marginTop: 20,
            }}
          >
                <Button.Ripple color="primary" onClick={AddItem}>
          Save
        </Button.Ripple>
            </div>
        </div>

    
      </form>
    </div>
  );
};

export default SalarySlip;