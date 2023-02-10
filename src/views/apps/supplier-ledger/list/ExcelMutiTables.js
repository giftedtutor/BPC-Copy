
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid'
import { ExcelExport } from '@progress/kendo-react-excel-export'
import { Button } from 'reactstrap'
class ExcelGenerator extends React.Component {
  _export
  export = () => {

    // eslint-disable-next-line no-invalid-this
    const optionsGridOne = this._exportGridOne.workbookOptions()
    // eslint-disable-next-line no-invalid-this
    const optionsGridTwo = this._exportGridTwo.workbookOptions()
    optionsGridOne.sheets[1] = optionsGridTwo.sheets[0]
    optionsGridOne.sheets[0].title = "Supplier Data with Transications"
    optionsGridOne.sheets[1].title = "Supplier Data without Transications"
    // eslint-disable-next-line no-invalid-this
    this._exportGridOne.save(optionsGridOne)
  }

  render() {
    const Suppler = JSON.parse(localStorage.getItem('suppliersF'))
    const SupplerOB = JSON.parse(localStorage.getItem('SuppliersOB'))
    
    return (
      <div>
        <ExcelExport
          data={Suppler}
          ref={(exporter) => { this._exportGridOne = exporter }}
        >
          <Grid data={Suppler} style={{ height: '490px' }}>
            <GridToolbar>
              <Button
                title="Export PDF"
                className="k-button k-primary"
                onClick={this.export}
                color="success"
              >
                Export to Excel
              </Button>
            </GridToolbar>
            <GridColumn field="id" title="ID" />
            <GridColumn field="ledg_no" title="PV No" />
            <GridColumn field="paymentDate" title="Payment Date" />
            <GridColumn field="description" title="Description" />
            <GridColumn field="paymentType" title="Payment Type" />
            <GridColumn field="name" title="Name" />
            <GridColumn field="previousBalance" title="Previous Balance" />
            <GridColumn field="totalBill" title="Total Bill" />
            <GridColumn field="paid" title="Paid" />
            <GridColumn field="remaining" title="Remaining" />
          </Grid>
        </ExcelExport>

      </div>
    )
  }
}

export default ExcelGenerator