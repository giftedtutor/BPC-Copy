import React from 'react'

const FixedWindow = ({
  height,
  width
}) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div
        style=
        {{
          border: '8px solid #90EE90',
          height: height > 500 ? '500px' : `${height}px`,
          width: width > 500 ? '500px' : `${width}px`
        }}
      >
        <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #a52a2a' }}>
          FIXED WINDOW
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: width <= 100 ? `${width}%` : '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', marginTop: 20 }}>{width} mm</div>
      </div>
    </div>
  )
}

export default FixedWindow