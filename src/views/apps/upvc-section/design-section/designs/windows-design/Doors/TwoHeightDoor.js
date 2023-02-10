import React from 'react'

const TwoHeightDoor = ({
    domEl,
    height,
    width,
    triangle,
    heightTopHung,
    glassHeight,
    putArc,
    doorBase,
    setDoorTop,
    doorTopHung,
    arc,
    setPutArc,
    leftTraingle,
    rightTriangle,
    shape,
    doorUpRight,
    doorUpLeft,
    sashImg,
    left,
    right,
    doorDownLeft,
    doorDownRight,
    wType,
    setDrawOne,
    drawOne,
    drawTwo,
    setDrawTwo,
    customTopHung,
    bottomShape,
    simpleDivider,
    setBottomShape
}) => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    width: '530px',
                    height: '520px'
                }}
                id="domEl"
                ref={domEl}
            >

                {
                    customTopHung === 'One' || customTopHung === 'Two' || customTopHung === 'Three' || customTopHung === 'Four' || customTopHung === 'Five' || customTopHung === 'Six' ? (
                        <div
                            style={{
                                height: height >= 500 ? '500px' : `${height}px`,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                fontWeight: '700'
                            }}
                        >

                            <div style={{ transform: 'rotate(90deg)' }}>
                                {
                                    height === '' || height === '0' || width === '' || width === '0' ? '' : `${heightTopHung} mm`
                                }
                            </div>

                            <div style={{ transform: 'rotate(90deg)' }}>
                                {
                                    height === '' || height === '0' || width === '' || width === '0' ? '' : `${glassHeight} mm`
                                }
                            </div>

                            <div style={{ transform: 'rotate(90deg)' }}>
                                {height === '' || height === '0' || width === '' || width === '0' ? '' : `${((height - (Number(heightTopHung) + Number(glassHeight)))).toFixed(0)} mm`}
                            </div>
                        </div>
                    ) : (
                        glassHeight !== '' || glassHeight !== '0' ? (
                            <div
                                style={{
                                    height: height >= 500 ? '500px' : `${height}px`,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    fontWeight: '700'
                                }}
                            >

                                <div style={{ transform: 'rotate(90deg)' }}>
                                    {height === '' || height === '0' || width === '' || width === '0' ? '' : `${((height - (Number(heightTopHung) + Number(glassHeight)))).toFixed(0)} mm`}
                                </div>

                                <div style={{ transform: 'rotate(90deg)' }}>
                                    {
                                        height === '' || height === '0' || width === '' || width === '0' ? '' : `${glassHeight} mm`
                                    }
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    height: height > 500 ? '500px' : `${height}px`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '700'
                                }}
                            >
                                <div style={{ transform: 'rotate(90deg)' }}>
                                    {height === '' || height === '0' || width === '' || width === '0' ? '' : `${height} mm`}
                                </div>
                            </div>
                        )
                    )}
                {
                    height === '' || height === '0' || width === '' || width === '0' ? '' : (
                        <div style={{
                            height: height > 500 ? '500px' : `${height}px`,
                            width: width > 300 ? '300px' : `${width}px`
                        }}
                        >
                            {
                                customTopHung === 'One' ? (
                                    <>
                                        <div
                                            style={{
                                                // height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                                height: `${(heightTopHung / height) * 100}%`,
                                                width: '100%',
                                                marginBottom: '-2px'
                                            }}
                                            onClick={() => {
                                                setDoorTop(doorTopHung)
                                                if (arc) {
                                                    setPutArc(true)
                                                } else {
                                                    setPutArc(false)
                                                }
                                            }}
                                        >
                                            <div style={{ height: '100%', width: '100%' }}>
                                                {
                                                    triangle === 'Left' ? (
                                                        <img src={leftTraingle} style={{ height: '100%', width: '100%' }} />
                                                    ) : (
                                                        triangle === 'Right' ? (
                                                            <img src={rightTriangle} style={{ height: '100%', width: '100%' }} />
                                                        ) : ''
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </>
                                ) : ''
                            }
                            <div
                                style={{
                                    height: customTopHung === 'One' || customTopHung === 'Two' || customTopHung === 'Three' || customTopHung === 'Four' || customTopHung === 'Five' || customTopHung === 'Six' ? `${((Number(height) - (Number(heightTopHung) + Number(glassHeight))) / Number(height)) * 100}%` : `${((Number(height) - (Number(glassHeight))) / Number(height)) * 100}%`,
                                    border: '8px solid #90EE90',
                                    borderBottom: doorBase === 'With Base' ? '8px solid #90EE90' : 'none',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: bottomShape === 'Right' ? 'flex-start' : 'flex-end'
                                }}
                                onClick={() => setBottomShape(shape)}
                            >
                                {bottomShape === 'Left' ? <img src={doorUpRight} style={{ height: '100%', width: '90%' }} /> : (
                                    bottomShape === 'Right' ? <img src={doorUpLeft} style={{ height: '100%', width: '90%' }} /> : (
                                        bottomShape === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : ''
                                    ))}
                            </div>
                            <div
                                style={{
                                    height: `${(Number(glassHeight) / Number(height)) * 100}%`,
                                    width: '100%',
                                    display: 'flex'
                                }}
                            >
                                {
                                    simpleDivider ? (
                                        <div style={{ height: '100%', width: '100%' }}>
                                            <div style={{
                                                height: '70%',
                                                width: '100%',
                                                borderTop: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                                borderLeft: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                                borderRight: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                                borderBottom: doorBase === 'With Base' ? '2px solid #a52a2a' : 0,
                                                display: 'flex',
                                                justifyContent: doorTopSection === 'Left' ? 'flex-start' : doorTopSection === 'Right' ? 'flex-end' : 'center'
                                            }}
                                                onClick={() => setDoorTopSection(shape)}
                                            >
                                                {
                                                    doorTopSection === 'Left' ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                                        doorTopSection === 'Right' ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                                            doorTopSection === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '90%' }} /> : ''
                                                        ))
                                                }
                                            </div>

                                            <div style={{
                                                height: '30%',
                                                width: '100%',
                                                display: 'flex',
                                                borderTop: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                                borderLeft: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                                borderRight: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                                borderBottom: doorBase === 'With Base' ? '2px solid #a52a2a' : 0,
                                                justifyContent: bottomShape === 'Left' ? 'flex-start' : bottomShape === 'Right' ? 'flex-end' : 'center'
                                            }}
                                                onClick={() => setBottomShape(shape)}
                                            >
                                                {
                                                    bottomShape === 'Left' ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                                        bottomShape === 'Right' ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                                            bottomShape === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '90%' }} /> : ''
                                                        ))
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{
                                            height: '100%',
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: bottomShape === 'Right' ? 'flex-start' : bottomShape === 'Left' ? 'flex-end' : 'center',
                                            borderTop: 0,
                                            borderLeft: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                            borderRight: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                            borderBottom: doorBase === 'With Base' ? (
                                                putArc ? '4px solid #90EE90' : '2px solid #a52a2a'
                                            ) : 0
                                        }}
                                        >
                                            {
                                                glassHeight === 0 || glassHeight === '' || glassHeight === '0' ? (
                                                    <>
                                                        {bottomShape === 'Left' ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                                            bottomShape === 'Right' ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                                                bottomShape === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '90%' }} /> : ''
                                                            ))}
                                                    </>
                                                ) : (
                                                    <>
                                                        {bottomShape === 'Left' ? <img src={doorDownRight} style={{ height: '100%', width: '90%' }} /> : (
                                                            bottomShape === 'Right' ? <img src={doorDownLeft} style={{ height: '100%', width: '90%' }} /> : (
                                                                bottomShape === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '90%' }} /> : ''
                                                            ))}
                                                    </>
                                                )

                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: width > 500 ? '500px' : `${width}px`, marginTop: 2 }}>
                <div style={{ fontWeight: '700' }}>
                    {width} mm
                </div>
            </div>
        </div>
    )
}

export default TwoHeightDoor