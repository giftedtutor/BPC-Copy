/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { Button } from "reactstrap";
import { useHistory } from "react-router";
import * as React from "react";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

const Data = () => {
  const history = useHistory();

  return (
    <div>
      <div className="">
        <div className="form-group row">
          <div
            className="form-group col-md-3"
            style={{
              cursor: "pointer",
              marginTop: 15,
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                history.push("/BPC/apps/supplier-payable/list");
              }}
            >
              Supplier Payable Report
            </Button>
          </div>
        </div>

        {/* row daily */}

        <div className="form-group row">
          <h3>Daily</h3>
        </div>

        <div className="form-group row">
          <div
            className="form-group col-md-3"
            style={{
              cursor: "pointer",
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                history.push("/BPC/apps/daily-income-report/add");
              }}
            >
              Daily Income Report
            </Button>
          </div>
          <div
            className="form-group col-md-3"
            style={{
              cursor: "pointer",
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                history.push("/BPC/apps/daily-expense-report/list");
              }}
            >
              Daily Expense Report
            </Button>
          </div>
          <div
            className="form-group col-md-3"
            style={{
              cursor: "pointer",
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                history.push("/BPC/apps/daily-cash-report/list");
              }}
            >
              Daily Cash Report
            </Button>
          </div>
          {/* <div
            className="form-group col-md-3"
            style={{
              cursor: "pointer"
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                history.push("/BPC/apps/daily-project-production-report/list")
              }}
            >
              Daily Project Progress
            </Button>
          </div> */}
        </div>

        {/* monthly */}
        <div className="form-group row">
          <h3>Monthly</h3>
        </div>
        <div className="form-group row">
          <div
            className="form-group col-md-3"
            style={{
              cursor: "pointer",
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                history.push("/BPC/apps/monthly-income-report/list");
              }}
            >
              Monthly Income Report
            </Button>
          </div>
          <div
            className="form-group col-md-3"
            style={{
              cursor: "pointer",
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                history.push("/BPC/apps/monthly-expenses-report/list");
              }}
            >
              Monthly Expenses Report
            </Button>
          </div>
          <div
            className="form-group col-md-3"
            style={{
              cursor: "pointer",
            }}
          >
            <Button
              color="primary"
              onClick={() => {
                history.push("/BPC/apps/project-deadline-report/list");
              }}
            >
              Project Deadline Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reports = () => {
  return (
    <div>
      <Data />
    </div>
  );
};

export default Reports;
