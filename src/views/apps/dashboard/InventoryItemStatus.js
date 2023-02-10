import React, { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { MDBContainer } from "mdbreact"
import baseURL from '../../../base-url/baseURL'
// import zoomPlugin from 'chartjs-plugin-zoom'
// import { Chart as ChartJS} from 'chart.js'
// // ChartJS.register(zoomPlugin)

const InventoryItemStatus = () => {

  const [quantity, setQuantity] = React.useState([])
  const [name, setName] = React.useState([])

  const [isLoading, setLoading] = useState(true)

  const dataMine = {
    labels: name,
    datasets: [
      {
        label: "Qty",
        data: quantity,
        backgroundColor: [
          "rgba(255, 134,159,0.4)",
          "rgba(98,  182, 239,0.4)",
          "rgba(255, 218, 128,0.4)",
          "rgba(113, 205, 205,0.4)",
          "rgba(170, 128, 252,0.4)",
          "rgba(255, 177, 101,0.4)"
        ],
        borderWidth: 2,
        borderColor: [
          "rgba(255, 134, 159, 1)",
          "rgba(98,  182, 239, 1)",
          "rgba(255, 218, 128, 1)",
          "rgba(113, 205, 205, 1)",
          "rgba(170, 128, 252, 1)",
          "rgba(255, 177, 101, 1)"
        ]
      }
    ]
  }
  const barChartOptions = {
    responsive: true, // databar expanding vertically infinitely
    // responsive: false,   Does not expands vertically but its size remains small
    plugins: {
      title: {
        display: true
      }
    //   zoom: {
    //     pan: {
    //         enabled: true,
    //         mode: 'x'
    //     },
    //     zoom: {
    //         pinch: {
    //             enabled: true       // Enable pinch zooming
    //         },
    //         wheel: {
    //             enabled: true       // Enable wheel zooming
    //         },
    //         mode: 'x'
    //     }
    // }
    },
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          barPercentage: 1,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)"
          },
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }

  useEffect(() => {
    fetch(`${baseURL}/invItemsStatus`)
      .then((response) => response.json())
      .then((records) => {
        const rec = records.status.map((data, index) => {
          return data.quantity
        })
        const rec2 = records.status.map((data, index) => {
          return data.name
        })
        setQuantity(rec)
        setName(rec2)


        setLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])
 
  return isLoading ? (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <MDBContainer >
      <h3 className="mt-5"> Inventory Items Status</h3>
      <Bar data={dataMine} options={barChartOptions} />
    </MDBContainer>
  )
}

export default InventoryItemStatus 
