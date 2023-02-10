import React from 'react'
import ReactToPrint from 'react-to-print'
 
class MyComponentToPrint extends React.Component {
    render() {
        return (
            <div style={{
            }}>
                This is the content that will be printed
                <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
            </div>
        )
    }
}
 
class Testing extends React.Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => <button>Generate PDF</button>}
                    content={() => this.componentRef}
                    onAfterPrint={() => alert('PDF Generated!')}
                    options={{ landscape: true }}
                />
                <MyComponentToPrint ref={el => (this.componentRef = el)} />
            </div>
        )
    }
}

export default Testing