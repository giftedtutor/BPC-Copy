import React from 'react'

const SingleDoor = ({
  domEl,
  height,
  width,
  heightTopHung,
  glassHeight,
  putArc,
  doorBase,
  setDoorTop,
  doorTopHung,
  arc,
  setPutArc,
  topOneHungShape,
  doorTop,
  topHung,
  ArrowRightAltIcon,
  selectedTop,
  firstTopWidth,
  setTopOneHungShape,
  secondTopWidth,
  cutTop,
  setTopTwoHungShape,
  topTwoHungShape,
  cutTopRight,
  thirdTopWidth,
  setTopThreeHungShape,
  topThreeHungShape,
  fourthTopWidth,
  setTopFourHungShape,
  topFourHungShape,
  setDoorTopFive,
  doorTopFive,
  fifthTopWidth,
  sixthTopWidth,
  setDoorTopSix,
  doorTopSix,
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
                            borderTop: putArc ? 'none' : '8px solid #90EE90',
                            borderLeft: putArc ? 'none' : '8px solid #90EE90',
                            borderRight: putArc ? 'none' : '8px solid #90EE90',
                            borderBottom: (
                              doorBase === 'With Base' ? '4px solid #90EE90' : 'none'
                            ),
                            height: height > 500 ? '500px' : `${height}px`,
                            width: width > 300 ? '300px' : `${width}px`
                          }}
                          >
                            {
                                customTopHung === 'One' ? (
                                    <div
                                        style={{
                                            // height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                            height: `${(heightTopHung / height) * 100}%`,
                                            width: '100%',
                                            border: putArc ? 'none' : '4px solid #90EE90'
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
                                        <div
                                            style={{
                                                border: putArc ? '8px solid #90EE90' : '2px solid #a52a2a',
                                                borderTopRightRadius: putArc ? 300 : 0,
                                                borderTopLeftRadius: putArc ? 300 : 0,
                                                height: '100%',
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setTopOneHungShape(doorTopHung)}
                                        >
                                            {
                                                topOneHungShape === 'Openable' ? (putArc ? <img src={topHung} style={{ height: '80%', width: '70%', borderTopRightRadius: '60%', borderTopLeftRadius: '60%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                    topOneHungShape === 'Fixed' ? 'Fixed' : (
                                                        topOneHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                            topOneHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                        )
                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    customTopHung === 'Two' ? (
                                        <div
                                            style={{
                                                // height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                                height: `${(heightTopHung / height) * 100}%`,
                                                width: '100%',
                                                display: 'flex',
                                                border: putArc ? '8px solid #90EE90' : '4px solid #90EE90',
                                                borderTopRightRadius: putArc ? 300 : 0,
                                                borderTopLeftRadius: putArc ? 300 : 0
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

                                            <div
                                                style={{
                                                    height: '100%',
                                                    width: selectedTop === '' ? `${(width / 2) * 100}%` : (
                                                        Number(firstTopWidth) <= 15 ? `${(15 / width) * 100}%` : `${(firstTopWidth / width) * 100}%`
                                                    ),
                                                    border: putArc ? 'none' : '2px solid #90EE90',
                                                    cursor: 'pointer',
                                                    borderRight: putArc ? '2px solid #90EE90' : 'none'
                                                }}
                                                onClick={() => setTopOneHungShape(doorTopHung)}
                                            >
                                                <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                    {
                                                        topOneHungShape === 'Openable' ? (putArc ? <img src={cutTop} style={{ height: '80%', width: '90%', borderBottomLeftRadius: '20%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                            topOneHungShape === 'Fixed' ? 'Fixed' : (
                                                                topOneHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                    topOneHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                )
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>
                                            <div style={{
                                                height: '100%',
                                                width: selectedTop === '' ? `${(width / 2) * 100}%` : (
                                                    Number(secondTopWidth) <= 15 ? `${(15 / width) * 100}%` : `${(secondTopWidth / width) * 100}%`
                                                ),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: putArc ? 'none' : '2px solid #90EE90',
                                                cursor: 'pointer'
                                            }}
                                                onClick={() => setTopTwoHungShape(doorTopHung)}
                                            >
                                                <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                    {
                                                        topTwoHungShape === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '20%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                            topTwoHungShape === 'Fixed' ? 'Fixed' : (
                                                                topTwoHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                    topTwoHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                )
                                                            )
                                                        )
                                                    }
                                                </div>
                                            </div>

                                        </div>
                                    ) : (
                                        customTopHung === 'Three' ? (
                                            <div
                                                style={{
                                                    // height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                                    height: `${(heightTopHung / height) * 100}%`,
                                                    width: '100%',
                                                    display: 'flex',
                                                    border: putArc ? '8px solid #90EE90' : '4px solid #90EE90',
                                                    borderTopRightRadius: putArc ? 300 : 0,
                                                    borderTopLeftRadius: putArc ? 300 : 0
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

                                                <div style={{
                                                    height: '100%',
                                                    width: selectedTop === '' ? `${(width / 4) * 100}%` : (
                                                        Number(firstTopWidth) <= 15 ? `${(15 / width) * 100}%` : `${(firstTopWidth / width) * 100}%`
                                                    ),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: putArc ? 'none' : '2px solid #90EE90',
                                                    cursor: 'pointer',
                                                    borderRight: putArc ? '2px solid #90EE90' : 'none'
                                                }}
                                                    onClick={() => setTopOneHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                        {
                                                            topOneHungShape === 'Openable' ? (putArc ? <img src={cutTop} style={{ height: '80%', width: '90%', borderBottomLeftRadius: '20%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                topOneHungShape === 'Fixed' ? 'Fixed' : (
                                                                    topOneHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                        topOneHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{
                                                    height: '100%',
                                                    width: selectedTop === '' ? `${(width / 2) * 100}%` : (
                                                        Number(secondTopWidth) <= 15 ? `${(15 / width) * 100}%` : `${(secondTopWidth / width) * 100}%`
                                                    ),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: putArc ? 'none' : '2px solid #90EE90',
                                                    cursor: 'pointer',
                                                    borderRight: putArc ? '2px solid #90EE90' : 'none'
                                                }}
                                                    onClick={() => setTopTwoHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                        {
                                                            topTwoHungShape === 'Openable' ? <img src={topHung} style={{ height: '80%', width: '100%' }} /> : (
                                                                topTwoHungShape === 'Fixed' ? 'Fixed' : (
                                                                    topTwoHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                        topTwoHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{
                                                    height: '100%',
                                                    width: selectedTop === '' ? `${(width / 4) * 100}%` : (
                                                        Number(thirdTopWidth) <= 15 ? `${(15 / width) * 100}%` : `${(thirdTopWidth / width) * 100}%`
                                                    ),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: putArc ? 'none' : '2px solid #90EE90',
                                                    cursor: 'pointer'
                                                }}
                                                    onClick={() => setTopThreeHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topThreeHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                        {
                                                            topThreeHungShape === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '20%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                topThreeHungShape === 'Fixed' ? 'Fixed' : (
                                                                    topThreeHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                        topThreeHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        ) : customTopHung === 'Four' ? (
                                            <div
                                                style={{
                                                    // height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                                    height: `${(heightTopHung / height) * 100}%`,
                                                    width: '100%',
                                                    display: 'flex',
                                                    border: putArc ? '8px solid #90EE90' : '4px solid #90EE90',
                                                    borderTopRightRadius: putArc ? 300 : 0,
                                                    borderTopLeftRadius: putArc ? 300 : 0
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

                                                <div style={{
                                                    height: '100%',
                                                    width: selectedTop === '' ? `${(width / 4) * 100}%` : (
                                                        Number(firstTopWidth) <= 15 ? `${(15 / width) * 100}%` : `${(firstTopWidth / width) * 100}%`
                                                    ),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: putArc ? 'none' : '2px solid #90EE90',
                                                    cursor: 'pointer',
                                                    borderRight: putArc ? '2px solid #90EE90' : 'none'
                                                }}
                                                    onClick={() => setTopOneHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                        {
                                                            topOneHungShape === 'Openable' ? (putArc ? <img src={cutTop} style={{ height: '80%', width: '90%', borderBottomLeftRadius: '30%', borderTopRightRadius: '20%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                topOneHungShape === 'Fixed' ? 'Fixed' : (
                                                                    topOneHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                        topOneHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{
                                                    height: '100%',
                                                    width: selectedTop === '' ? `${(width / 4) * 100}%` : `${(secondTopWidth / width) * 100}%`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: putArc ? 'none' : '2px solid #90EE90',
                                                    cursor: 'pointer',
                                                    borderRight: putArc ? '2px solid #90EE90' : 'none'
                                                }}
                                                    onClick={() => setTopTwoHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                        {
                                                            topTwoHungShape === 'Openable' ? <img src={topHung} style={{ height: '80%', width: '100%' }} /> : (
                                                                topTwoHungShape === 'Fixed' ? 'Fixed' : (
                                                                    topTwoHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                        topTwoHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{
                                                    height: '100%',
                                                    width: selectedTop === '' ? `${(width / 4) * 100}%` : `${(thirdTopWidth / width) * 100}%`,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: putArc ? 'none' : '2px solid #90EE90',
                                                    cursor: 'pointer',
                                                    borderRight: putArc ? '2px solid #90EE90' : 'none'
                                                }}
                                                    onClick={() => setTopThreeHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topThreeHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                        {
                                                            topThreeHungShape === 'Openable' ? <img src={topHung} style={{ height: '80%', width: '100%' }} /> : (
                                                                topThreeHungShape === 'Fixed' ? 'Fixed' : (
                                                                    topThreeHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                        topThreeHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                                <div style={{
                                                    height: '100%',
                                                    width: selectedTop === '' ? `${(width / 4) * 100}%` : (
                                                        Number(fourthTopWidth) <= 15 ? `${(15 / width) * 100}%` : `${(fourthTopWidth / width) * 100}%`
                                                    ),
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: putArc ? 'none' : '2px solid #90EE90',
                                                    cursor: 'pointer'
                                                }}
                                                    onClick={() => setTopFourHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFourHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                        {
                                                            topFourHungShape === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                topFourHungShape === 'Fixed' ? 'Fixed' : (
                                                                    topFourHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                        topFourHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                    )
                                                                )
                                                            )
                                                        }
                                                    </div>
                                                </div>

                                            </div>
                                        ) : (
                                            customTopHung === 'Five' ? (
                                                <div
                                                    style={{
                                                        height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                                        borderTopRightRadius: putArc ? 300 : 0,
                                                        borderTopLeftRadius: putArc ? 300 : 0,
                                                        display: 'flex',
                                                        alignItems: putArc ? 'flex-end' : 'center',
                                                        justifyContent: 'center',
                                                        cursor: 'pointer'
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

                                                    <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(firstTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer' }}
                                                        onClick={() => setTopOneHungShape(doorTopHung)}
                                                    >
                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                            {
                                                                topOneHungShape === 'Openable' ? (putArc ? <img src={cutTop} style={{ height: '80%', width: '90%', borderBottomLeftRadius: '30%', borderTopRightRadius: '20%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                    topOneHungShape === 'Fixed' ? 'Fixed' : (
                                                                        topOneHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                            topOneHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div style={{ height: putArc && heightTopHung >= 140 ? '97%' : '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(secondTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                        onClick={() => setTopTwoHungShape(doorTopHung)}
                                                    >
                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                            {
                                                                topTwoHungShape === 'Openable' ? <img src={topHung} style={{ height: '80%', width: '100%' }} /> : (
                                                                    topTwoHungShape === 'Fixed' ? 'Fixed' : (
                                                                        topTwoHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                            topTwoHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(thirdTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                        onClick={() => setTopThreeHungShape(doorTopHung)}
                                                    >
                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topThreeHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                            {
                                                                topThreeHungShape === 'Openable' ? <img src={topHung} style={{ height: '80%', width: '100%' }} /> : (
                                                                    topThreeHungShape === 'Fixed' ? 'Fixed' : (
                                                                        topThreeHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                            topThreeHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                    <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(fourthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                        onClick={() => setTopFourHungShape(doorTopHung)}
                                                    >
                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFourHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                            {
                                                                topFourHungShape === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                    topFourHungShape === 'Fixed' ? 'Fixed' : (
                                                                        topFourHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                            topFourHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                    <div style={{ height: putArc && heightTopHung >= 140 ? '97%' : '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(fifthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                        onClick={() => setDoorTopFive(doorTopHung)}
                                                    >
                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFourHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                            {
                                                                doorTopFive === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                    doorTopFive === 'Fixed' ? 'Fixed' : (
                                                                        doorTopFive === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                            doorTopFive === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                        )
                                                                    )
                                                                )
                                                            }
                                                        </div>
                                                    </div>

                                                </div>
                                            ) : (
                                                customTopHung === 'Six' ? (
                                                    <div
                                                        style={{
                                                            height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                                            borderTopRightRadius: putArc ? 300 : 0,
                                                            borderTopLeftRadius: putArc ? 300 : 0,
                                                            display: 'flex',
                                                            alignItems: putArc ? 'flex-end' : 'center',
                                                            justifyContent: 'center',
                                                            cursor: 'pointer'
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

                                                        <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(firstTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer' }}
                                                            onClick={() => setTopOneHungShape(doorTopHung)}
                                                        >
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                                {
                                                                    topOneHungShape === 'Openable' ? (putArc ? <img src={cutTop} style={{ height: '80%', width: '90%', borderBottomLeftRadius: '30%', borderTopRightRadius: '20%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                        topOneHungShape === 'Fixed' ? 'Fixed' : (
                                                                            topOneHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                                topOneHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div style={{ height: putArc && heightTopHung >= 115 ? '92%' : '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(secondTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                            onClick={() => setTopTwoHungShape(doorTopHung)}
                                                        >
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                                {
                                                                    topTwoHungShape === 'Openable' ? <img src={topHung} style={{ height: '80%', width: '100%' }} /> : (
                                                                        topTwoHungShape === 'Fixed' ? 'Fixed' : (
                                                                            topTwoHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                                topTwoHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(thirdTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                            onClick={() => setTopThreeHungShape(doorTopHung)}
                                                        >
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topThreeHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                                {
                                                                    topThreeHungShape === 'Openable' ? <img src={topHung} style={{ height: '80%', width: '100%' }} /> : (
                                                                        topThreeHungShape === 'Fixed' ? 'Fixed' : (
                                                                            topThreeHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                                topThreeHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(fourthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                            onClick={() => setTopFourHungShape(doorTopHung)}
                                                        >
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFourHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                                {
                                                                    topFourHungShape === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                        topFourHungShape === 'Fixed' ? 'Fixed' : (
                                                                            topFourHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                                topFourHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>

                                                        <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(fifthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                            onClick={() => setDoorTopFive(doorTopHung)}
                                                        >
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFourHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                                {
                                                                    doorTopFive === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                        doorTopFive === 'Fixed' ? 'Fixed' : (
                                                                            doorTopFive === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                                doorTopFive === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>

                                                        <div style={{ height: putArc && heightTopHung >= 115 ? '92%' : '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(sixthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                            onClick={() => setDoorTopSix(doorTopHung)}
                                                        >
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFourHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                                {
                                                                    doorTopSix === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                        doorTopSix === 'Fixed' ? 'Fixed' : (
                                                                            doorTopSix === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                                doorTopSix === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>

                                                    </div>
                                                ) : ''
                                            )
                                        )
                                    )
                                )
                            }
                            <div
                              style={{
                                height: customTopHung === 'One' || customTopHung === 'Two' || customTopHung === 'Three' || customTopHung === 'Four' || customTopHung === 'Five' || customTopHung === 'Six' ? `${((Number(height) - (Number(heightTopHung) + Number(glassHeight))) / Number(height)) * 100}%` : `${((Number(height) - (Number(glassHeight))) / Number(height)) * 100}%`,
                                borderTop: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                borderLeft: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                borderRight: putArc ? '4px solid #90EE90' : '2px solid #a52a2a',
                                borderBottom: 'none',
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

export default SingleDoor