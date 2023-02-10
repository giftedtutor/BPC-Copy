import React from 'react'

const DrawWindow = ({
  putArc,
  customTopHung,
  height,
  width,
  heightTopHung,
  topOneHungShape,
  setTopOneHungShape,
  topTwoHungShape,
  setTopTwoHungShape,
  topThreeHungShape,
  setTopThreeHungShape,
  topFourHungShape,
  setTopFourHungShape,
  selectedTop,
  setSelectedTop,
  firstTopWidth,
  secondTopWidth,
  thirdTopWidth,
  fourthTopWidth,
  ArrowRightAltIcon,
  customTopHungValue,
  topHung,
  SyncAltSharpIcon,
  numberOfPanels,
  isSash,
  setIsSash,
  drawOne,
  setDrawOne,
  drawTwo,
  setDrawTwo,
  drawThree,
  setDrawThree,
  drawFour,
  setDrawFour,
  drawFive,
  setDrawFive,
  drawSix,
  setDrawSix,
  numberOfMullians,
  right,
  left,
  leftM,
  rightM,
  leftTwo,
  leftThree,
  leftFour,
  rightTwo,
  rightThree,
  rightFour,
  upward,
  downward,
  rightAndLeft,
  upwardAndLeft,
  upwardAndRight,
  downwardAndRight,
  downwardAndLeft,
  allSides,
  sashImg,
  windowDivider,
  drawOneBottom,
  setDrawOneBottom,
  drawTwoBottom,
  setDrawTwoBottom,
  firstSize,
  secondSize,
  thirdSize,
  fourthSize,
  fifthSize,
  sixthSize,
  isSashOne,
  setIsSashOne,
  isSashTwo,
  setIsSashTwo,
  isSashThree,
  setIsSashThree,
  isSashFour,
  setIsSashFour,
  ddecBar,
  hl,
  setHr,
  vl,
  setVl,
  wType,
  arc,
  setPutArc,
  selectedPanel,
  shape,
  panelOneSash,
  setPanelOneSash,
  panelTwoSash,
  setPanelTwoSash,
  panelThreeSash,
  setPanelThreeSash,
  panelFourSash,
  setPanelFourSash,
  panelFiveSash,
  setPanelFiveSash,
  panelSixSash,
  setPanelSixSash,
  sashAsset,
  sashAssetRot,
  sash
}) => {
  return (
    <div
      style={{
        border: putArc ? 'none' : '4px solid #90EE90',
        height: height > 500 ? '500px' : `${height}px`,
        width: width > 500 ? '500px' : `${width}px`,
        position: 'relative'
      }}
    >
      {
        customTopHung !== 'Divide Window Equally' ? (

          <div style={{ height: '100%' }}>
            {
              customTopHung === 'One' ? (
                <div style={{ height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '', width: '100%', border: putArc ? 'none' : '4px solid #90EE90' }}>
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
                    onClick={() => {
                      setTopOneHungShape(customTopHungValue)
                      if (arc) {
                        setPutArc(true)
                      } else {
                        setPutArc(false)
                      }
                    }}
                  >
                    {
                      topOneHungShape === 'Openable' ? <img src={topHung} style={{ height: '80%', width: putArc ? '60%' : '100%' }} /> : (
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
                  <div style={{
                    height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                    width: '100%',
                    display: 'flex',
                    border: putArc ? '8px solid #90EE90' : '4px solid #90EE90',
                    borderTopRightRadius: putArc ? 300 : 0,
                    borderTopLeftRadius: putArc ? 300 : 0
                  }}
                    onClick={() => {
                      if (arc) {
                        setPutArc(true)
                      } else {
                        setPutArc(false)
                      }
                    }}
                  >
                    <div style={{
                      height: '100%',
                      width: selectedTop === '' ? `${(width / 2) * 100}%` : (
                        Number(firstTopWidth) <= 15 ? `${(15 / width) * 100}%` : `${(firstTopWidth / width) * 100}%`
                      ),
                      border: putArc ? 'none' : '2px solid #90EE90',
                      cursor: 'pointer',
                      borderRight: putArc ? '2px solid #90EE90' : 'none'
                    }}
                      onClick={() => setTopOneHungShape(customTopHungValue)}
                    >
                      <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                        {
                          topOneHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%', borderTopLeftRadius: putArc ? 300 : 0 }} /> : (
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
                      onClick={() => setTopTwoHungShape(customTopHungValue)}
                    >
                      <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                        {
                          topTwoHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%', borderTopRightRadius: putArc ? 300 : 0 }} /> : (
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
                    <div style={{
                      height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                      width: '100%',
                      display: 'flex',
                      border: putArc ? '8px solid #90EE90' : '4px solid #90EE90',
                      borderTopRightRadius: putArc ? 300 : 0,
                      borderTopLeftRadius: putArc ? 300 : 0
                    }}
                      onClick={() => {
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
                        onClick={() => setTopOneHungShape(customTopHungValue)}
                      >
                        <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                          {
                            topOneHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%', borderTopLeftRadius: putArc ? 300 : 0 }} /> : (
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
                        onClick={() => setTopTwoHungShape(customTopHungValue)}
                      >
                        <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                          {
                            topTwoHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%' }} /> : (
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
                        onClick={() => setTopThreeHungShape(customTopHungValue)}
                      >
                        <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topThreeHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                          {
                            topThreeHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%', borderTopRightRadius: putArc ? 300 : 0 }} /> : (
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
                  ) : (
                    customTopHung === 'Four' ? (
                      <div style={{
                        height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                        width: '100%',
                        display: 'flex',
                        border: putArc ? '8px solid #90EE90' : '4px solid #90EE90',
                        borderTopRightRadius: putArc ? 300 : 0,
                        borderTopLeftRadius: putArc ? 300 : 0
                      }}
                        onClick={() => {
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
                          onClick={() => setTopOneHungShape(customTopHungValue)}
                        >
                          <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                            {
                              topOneHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%', borderTopLeftRadius: putArc ? 300 : 0 }} /> : (
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
                          onClick={() => setTopTwoHungShape(customTopHungValue)}
                        >
                          <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                            {
                              topTwoHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%' }} /> : (
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
                          onClick={() => setTopThreeHungShape(customTopHungValue)}
                        >
                          <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topThreeHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                            {
                              topThreeHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%' }} /> : (
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
                          onClick={() => setTopFourHungShape(customTopHungValue)}
                        >
                          <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFourHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                            {
                              topFourHungShape === 'Openable' ? <img src={topHung} style={{ height: '90%', width: '100%', borderTopRightRadius: putArc ? 300 : 0 }} /> : (
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
                    ) : ''
                  )
                )
              )
            }

            <div style={{
              // height: customTopHung === '' || customTopHung === 'true' || customTopHung === 'No Top Hung' || customTopHung === 'Divide Window Equally' ? '100%' : `${100 - heightTopHung}%`,
              height: customTopHung === '' || customTopHung === 'true' || customTopHung === 'No Top Hung' || customTopHung === 'Divide Window Equally' ? '100%' : height >= 500 && heightTopHung >= 150 ? `${((500 - 150) / 500) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${((500 - heightTopHung) / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${((height - 150) / height) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${((height - heightTopHung) / height) * 100}%` : '',
              width: '100%',
              cursor: 'pointer',
              border: '8px solid #90EE90'
            }}
            >
              {
                numberOfPanels === 'One' ? (
                  <div style={{ height: '100%', width: '100%' }}>
                    <div style={{ width: '100%', height: '100%', border: '4px double #90EE90' }}
                      onClick={() => {
                        if (!isSash) {
                          setDrawOne(shape)
                        }
                      }}
                    >
                      <div
                        style={{
                          border: '4px solid #a52a2a',
                          height: '100%',
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: isSash ? 'space-between' : 'center',
                          flexDirection: isSash || windowDivider ? 'column' : 'row'
                        }}
                      >

                        <div
                          style={{
                            height: isSash ? '50%' : '100%',
                            borderBottom: windowDivider ? '4px solid #A52A2A' : '',
                            display: 'flex',
                            alignItems: isSash && drawOne !== 'Up' ? 'flex-end' : 'center',
                            justifyContent: drawOne === 'Left' ? 'flex-start' : drawOne === 'Right' ? 'flex-end' : 'center',
                            width: '100%'
                          }}
                          onClick={() => {
                            setDrawOne(shape)
                            if (isSash) {
                              setIsSash(false)
                              setDrawOneBottom('')
                            } else {
                              setIsSash(true)
                            }
                          }}
                        >
                          {
                            drawOne === 'Left' ? (
                              numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                  numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                    numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                      numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                    )
                                  )
                                )
                              )
                            ) : (
                              drawOne === 'Right' ? (
                                numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                  numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                    numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                      numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                        numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                      )
                                    )
                                  )
                                )
                              ) : (
                                drawOne === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '-10%' }} /> : (
                                  drawOne === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                    drawOne === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                      drawOne === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                        drawOne === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                          drawOne === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                            drawOne === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                              drawOne === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawOne === 'SlideLeft' ? (
                                                    <div>
                                                      <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                    </div>
                                                  ) : (
                                                    drawOne === 'SlideRight' ? (
                                                      <div>
                                                        <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                      </div>
                                                    ) : (
                                                      drawOne === 'Fixed' ? (
                                                        <div>
                                                          Fixed
                                                        </div>
                                                      ) : ''
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              ))
                          }
                        </div>
                        {
                          isSash || windowDivider ? (
                            <div style={{
                              display: 'flex',
                              justifyContent: panelOneSash === 'SashNew' || drawOne === 'Left' ? 'flex-start' : panelOneSash === 'SashNew' || drawOne === 'Right' ? 'flex-end' : 'center',
                              height: '50%',
                              alignItems: isSash ? 'flex-end' : 'center',
                              width: '100%'
                            }}
                              onClick={() => {
                                if (isSash) {
                                  setDrawOneBottom(shape)
                                }
                                if (panelOneSash === '') {
                                  setPanelOneSash(sash)
                                } else {
                                  setPanelOneSash('')
                                }
                              }}
                            >
                              {
                                drawOneBottom === 'Left' ? (
                                  numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                    numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                      numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                        numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                          numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                        )
                                      )
                                    )
                                  )
                                ) : (
                                  drawOneBottom === 'Right' ? (
                                    numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                      numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                        numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                          numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                            numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                          )
                                        )
                                      )
                                    )
                                  ) : (
                                    drawOneBottom === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '-10%' }} /> : (
                                      drawOneBottom === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                        drawOneBottom === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                          drawOneBottom === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                            drawOneBottom === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                              drawOneBottom === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawOneBottom === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawOneBottom === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawOneBottom === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawOneBottom === 'SlideLeft' ? (
                                                        <div>
                                                          <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                        </div>
                                                      ) : (
                                                        drawOneBottom === 'SlideRight' ? (
                                                          <div>
                                                            <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                          </div>
                                                        ) : (
                                                          drawOneBottom === 'Fixed' ? (
                                                            <div>
                                                              Fixed
                                                            </div>
                                                          ) : (
                                                            panelOneSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                                              panelOneSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  ))
                              }

                            </div>
                          ) : ''
                        }
                      </div>
                    </div>

                    {/* PANELS WIDTH  */}
                    <div style={{ marginTop: 20 }}>
                      <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>{width} mm</div>
                    </div>
                  </div>
                ) : (
                  numberOfPanels === 'Two' ? (
                    <div
                      style={{ height: '100%', width: '100%' }}
                    >
                      <div
                        style={{ height: '100%', width: '100%', display: 'flex' }}
                      >
                        <div style={{
                          height: '100%',
                          border: '4px double #90EE90',
                          width: (wType === 'drawWindow' && numberOfPanels === 'Two') ? (selectedPanel === 'First' ? `${(firstSize * 100) / width}%` : (
                            selectedPanel === 'Second' ? `${(width - secondSize) * 100 / width}%` : (
                              selectedPanel === '' ? `${(width * 100) / 2}%` : ''
                            )
                          )) : ''
                        }}
                        >
                          <div
                            style={{
                              border: '4px solid #a52a2a',
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: isSashOne ? 'space-between' : 'center',
                              flexDirection: isSashOne ? 'column' : 'row'
                            }}
                          >
                            <div
                              style={{
                                height: isSashOne ? '50%' : '100%',
                                borderBottom: windowDivider ? '4px solid #A52A2A' : '',
                                display: 'flex',
                                alignItems: isSashOne ? 'flex-end' : 'center',
                                justifyContent: drawOne === 'Left' ? 'flex-start' : drawOne === 'Right' ? 'flex-end' : 'center',
                                width: '100%'
                              }}
                              onClick={() => {
                                if (!isSash) {
                                  setDrawOne(shape)
                                }
                                if (isSashOne) {
                                  setIsSashOne(false)
                                  setDrawOneBottom('')
                                } else {
                                  setIsSashOne(true)
                                }
                              }}
                            >
                              {
                                drawOne === 'Left' ? (
                                  numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                    numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%' }} /> : (
                                      numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%' }} /> : ''
                                        )
                                      )
                                    )
                                  )
                                ) : (
                                  drawOne === 'Right' ? (
                                    numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                      numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                        numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                          numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                            numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                          )
                                        )
                                      )
                                    )
                                  ) : (
                                    drawOne === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '10%' }} /> : (
                                      drawOne === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                        drawOne === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                          drawOne === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                            drawOne === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                              drawOne === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawOne === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawOne === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawOne === 'SlideLeft' ? (
                                                        <div>
                                                          <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                        </div>
                                                      ) : (
                                                        drawOne === 'SlideRight' ? (
                                                          <div>
                                                            <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                          </div>
                                                        ) : (
                                                          drawOne === 'Fixed' ? (
                                                            <div>
                                                              Fixed
                                                            </div>
                                                          ) : ''
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  ))
                              }
                            </div>

                            {
                              isSashOne || windowDivider ? (
                                <div style={{
                                  display: 'flex',
                                  justifyContent: panelOneSash === 'SashNew' ? 'flex-start' : 'flex-end',
                                  alignItems: 'flex-end',
                                  height: '50%',
                                  width: '100%'
                                }}
                                  onClick={() => {
                                    if (isSash) {
                                      setDrawOneBottom(shape)
                                    }
                                    if (panelOneSash === '') {
                                      setPanelOneSash(sash)
                                    } else {
                                      setPanelOneSash('')
                                    }
                                  }}
                                >
                                  {
                                    drawOneBottom === 'Left' ? (
                                      numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                        numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                          numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                            numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                              numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawOneBottom === 'Right' ? (
                                        numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                          numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                            numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                              numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                                numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                              )
                                            )
                                          )
                                        )
                                      ) : (
                                        drawOneBottom === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '-10%' }} /> : (
                                          drawOneBottom === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawOneBottom === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawOneBottom === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawOneBottom === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawOneBottom === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawOneBottom === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawOneBottom === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawOneBottom === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawOneBottom === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawOneBottom === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawOneBottom === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : (
                                                                panelOneSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                                                  panelOneSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                                                )
                                                              )
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                              ) : ''
                            }
                          </div>
                        </div>

                        <div style={{
                          height: '100%',
                          border: '4px double #90EE90',
                          width: (wType === 'drawWindow' && numberOfPanels === 'Two') ? (selectedPanel === 'First' ? `${(width - (firstSize * 100)) / width}%` : (
                            selectedPanel === 'Second' ? `${secondSize * 100 / width}%` : (
                              selectedPanel === '' ? `${(width * 100) / 2}%` : ''
                            )
                          )) : ''
                        }}
                        >
                          <div
                            style={{
                              border: '4px solid #a52a2a',
                              height: '100%',
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: isSashTwo ? 'space-between' : 'center',
                              flexDirection: isSashTwo ? 'column' : 'row'
                            }}
                          >
                            <div
                              style={{
                                height: isSashTwo ? '50%' : '100%',
                                borderBottom: windowDivider ? '4px solid #A52A2A' : '',
                                display: 'flex',
                                alignItems: isSashTwo ? 'flex-end' : 'center',
                                justifyContent: drawTwo === 'Left' ? 'flex-start' : drawTwo === 'Right' ? 'flex-end' : 'center',
                                width: '100%'
                              }}
                              onClick={() => {
                                if (!isSash) {
                                  setDrawTwo(shape)
                                }
                                if (isSashTwo) {
                                  setIsSashTwo(false)
                                  setDrawTwoBottom('')
                                } else {
                                  setIsSashTwo(true)
                                }
                              }}
                            >
                              {
                                drawTwo === 'Left' ? (
                                  numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                    numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                      numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                        numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                          numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                        )
                                      )
                                    )
                                  )
                                ) : (
                                  drawTwo === 'Right' ? (
                                    numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                      numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%' }} /> : ''
                                          )
                                        )
                                      )
                                    )
                                  ) : (
                                    drawTwo === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '10%' }} /> : (
                                      drawTwo === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                        drawTwo === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                          drawTwo === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                            drawTwo === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                              drawTwo === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawTwo === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawTwo === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawTwo === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawTwo === 'SlideLeft' ? (
                                                        <div>
                                                          <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                        </div>
                                                      ) : (
                                                        drawTwo === 'SlideRight' ? (
                                                          <div>
                                                            <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                          </div>
                                                        ) : (
                                                          drawTwo === 'Fixed' ? (
                                                            <div>
                                                              Fixed
                                                            </div>
                                                          ) : ''
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  ))
                              }
                            </div>
                            {
                              isSashTwo || windowDivider ? (
                                <div style={{
                                  display: 'flex',
                                  justifyContent: panelTwoSash === 'SashNew' ? 'flex-start' : 'flex-end',
                                  alignItems: 'flex-end',
                                  height: '50%',
                                  width: '100%'
                                }}
                                  onClick={() => {
                                    if (isSash) {
                                      setDrawTwoBottom(shape)
                                    }
                                    if (panelTwoSash === '') {
                                      setPanelTwoSash(sash)
                                    } else {
                                      setPanelTwoSash('')
                                    }
                                  }}
                                >
                                  {
                                    drawTwoBottom === 'Left' ? (
                                      numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                        numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                          numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                            numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                              numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawTwoBottom === 'Right' ? (
                                        numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                          numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                            numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                              numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : (
                                                numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%', marginLeft: -9 }} /> : ''
                                              )
                                            )
                                          )
                                        )
                                      ) : (
                                        drawTwoBottom === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '-10%' }} /> : (
                                          drawTwoBottom === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawTwoBottom === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawTwoBottom === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawTwoBottom === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawTwoBottom === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawTwoBottom === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawTwoBottom === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawTwoBottom === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawTwoBottom === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawTwoBottom === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawTwoBottom === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : (
                                                                panelTwoSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                                                  panelTwoSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                                                )
                                                              )
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                              ) : ''
                            }
                          </div>
                        </div>
                      </div>

                      <div style={{ marginTop: 20 }}>
                        <div
                          style={{ display: 'flex', marginLeft: '22px', width: '100%' }}
                        >
                          <div style={{
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: selectedPanel === 'First' ? `${(firstSize * 100) / width}%` : (
                              selectedPanel === 'Second' ? `${(width - secondSize) * 100 / width}%` : (
                                selectedPanel === '' ? `${(width * 100) / 2}%` : ''
                              )
                            )
                          }}>
                            {
                              selectedPanel === 'First' ? `${firstSize}` : (
                                selectedPanel === '' ? `${((width / 2)).toFixed(0)}` : (
                                  selectedPanel === 'Second' ? `${(Number(width) - secondSize).toFixed(0)}` : ''
                                )
                              )
                            } mm
                          </div>

                          <div style={{
                            fontWeight: '700',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: selectedPanel === 'Second' ? `${(secondSize * 100) / width}%` : (
                              selectedPanel === 'First' ? `${(width - firstSize) * 100 / width}%` : (
                                selectedPanel === '' ? `${(width * 100) / 2}%` : ''
                              )
                            )
                          }}>
                            {
                              selectedPanel === 'Second' ? `${(secondSize)} mm` : (
                                selectedPanel === '' ? `${((width / 2)).toFixed(0)} mm` : (
                                  selectedPanel === 'First' ? `${((Number(width) - firstSize)).toFixed(0)} mm` : ''
                                )
                              )
                            }
                          </div>
                        </div>
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>{width} mm</div>
                      </div>

                    </div>
                  ) : (
                    numberOfPanels === 'Three' ? (
                      <div
                        style={{ height: '100%', width: '100%' }}
                      >
                        <div
                          className='main'
                        >
                          <div style={{
                            height: '100%',
                            border: '4px double #90EE90',
                            width: firstSize === '0' && secondSize === '0' ? `${(width * 100) / 4}%` : `${(firstSize * 100) / width}%`
                          }}
                          >
                            <div
                              style={{
                                border: '4px solid #a52a2a',
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isSashOne ? 'space-between' : 'center',
                                flexDirection: isSashOne ? 'column' : 'row'
                              }}
                            >
                              <div
                                style={{
                                  height: isSashOne ? '50%' : '100%',
                                  display: 'flex',
                                  alignItems: isSash ? 'flex-end' : 'center',
                                  justifyContent: drawOne === 'Left' ? 'flex-start' : drawOne === 'Right' ? 'flex-end' : 'center',
                                  width: '100%'
                                }}
                                onClick={() => {
                                  setDrawOne(shape)
                                  if (isSashOne) {
                                    setIsSashOne(false)
                                  } else {
                                    setIsSashOne(true)
                                  }
                                }}
                              >
                                {
                                  drawOne === 'Left' ? (
                                    numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                      numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%' }} /> : ''
                                          )
                                        )
                                      )
                                    )
                                  ) : (
                                    drawOne === 'Right' ? (
                                      numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%' }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawOne === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '10%' }} /> : (
                                        drawOne === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                          drawOne === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                            drawOne === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawOne === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                drawOne === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawOne === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawOne === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawOne === 'SlideLeft' ? (
                                                          <div>
                                                            <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                          </div>
                                                        ) : (
                                                          drawOne === 'SlideRight' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                            </div>
                                                          ) : (
                                                            drawOne === 'Fixed' ? (
                                                              <div>
                                                                Fixed
                                                              </div>
                                                            ) : ''
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    ))
                                }
                              </div>

                              {
                                isSashOne ? (
                                  <div style={{
                                    display: 'flex',
                                    justifyContent: panelOneSash === 'SashNew' ? 'flex-start' : 'flex-end',
                                    alignItems: 'flex-end',
                                    height: '50%',
                                    width: '100%'
                                  }}
                                    onClick={() => {
                                      if (panelOneSash === '') {
                                        setPanelOneSash(sash)
                                      } else {
                                        setPanelOneSash('')
                                      }
                                    }}
                                  >
                                    {
                                      panelOneSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                        panelOneSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                      )
                                    }
                                  </div>
                                ) : ''
                              }
                            </div>
                          </div>

                          <div style={{
                            height: '100%',
                            border: '4px double #90EE90',
                            width: firstSize === '0' && secondSize === '0' ? `${(width * 100) / 2}%` : `${(secondSize * 100) / width}%`
                          }}
                          >
                            <div
                              style={{
                                border: '4px solid #a52a2a',
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isSashTwo ? 'space-between' : 'center',
                                flexDirection: isSashTwo || windowDivider ? 'column' : 'row'
                              }}
                            >

                              <div
                                style={{
                                  height: isSashTwo ? '50%' : '100%',
                                  borderBottom: windowDivider ? '4px solid #A52A2A' : '',
                                  display: 'flex',
                                  alignItems: isSashTwo ? 'flex-end' : 'center',
                                  justifyContent: drawTwo === 'Left' ? 'flex-start' : drawTwo === 'Right' ? 'flex-end' : 'center',
                                  width: '100%'
                                }}
                                onClick={() => {
                                  setDrawTwo(shape)
                                  if (isSashTwo) {
                                    setIsSashTwo(false)
                                  } else {
                                    setIsSashTwo(true)
                                  }
                                }}
                              >

                                {
                                  drawTwo === 'Left' ? (
                                    numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                      numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%' }} /> : ''
                                          )
                                        )
                                      )
                                    )
                                  ) : (
                                    drawTwo === 'Right' ? (
                                      numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%' }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawTwo === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '10%' }} /> : (
                                        drawTwo === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                          drawTwo === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                            drawTwo === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawTwo === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                drawTwo === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawTwo === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawTwo === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawTwo === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawTwo === 'SlideLeft' ? (
                                                          <div>
                                                            <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                          </div>
                                                        ) : (
                                                          drawTwo === 'SlideRight' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                            </div>
                                                          ) : (
                                                            drawTwo === 'Fixed' ? (
                                                              <div>
                                                                Fixed
                                                              </div>
                                                            ) : ''
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    ))
                                }
                              </div>
                              {
                                isSashTwo || windowDivider ? (
                                  <div style={{
                                    display: 'flex',
                                    justifyContent: panelTwoSash === 'SashNew' ? 'flex-start' : panelTwoSash === 'SashNewRot' ? 'flex-end' : 'center',
                                    alignItems: panelTwoSash === '' ? 'center' : 'flex-end',
                                    height: '50%',
                                    width: '100%'
                                  }}
                                    onClick={() => {
                                      if (panelTwoSash === '') {
                                        setPanelTwoSash(sash)
                                      } else {
                                        setPanelTwoSash('')
                                      }
                                    }}
                                  >
                                    {
                                      panelTwoSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                        panelTwoSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> Fixed </div>
                                      )
                                    }

                                  </div>
                                ) : ''
                              }
                            </div>
                          </div>

                          <div style={{
                            height: '100%',
                            border: '4px double #90EE90',
                            width: firstSize === '0' && secondSize === '0' ? `${(width * 100) / 4}%` : `${(Number(width) - (Number(firstSize) + Number(secondSize))) * 100 / width}%`
                          }}
                          >
                            <div
                              style={{
                                border: '4px solid #a52a2a',
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: isSashThree ? 'space-between' : 'center',
                                flexDirection: isSashThree ? 'column' : 'row'
                              }}
                            >
                              <div
                                style={{
                                  height: isSashThree ? '50%' : '100%',
                                  display: 'flex',
                                  alignItems: isSashThree ? 'flex-end' : 'center',
                                  justifyContent: drawThree === 'Left' ? 'flex-start' : drawThree === 'Right' ? 'flex-end' : 'center',
                                  width: '100%'
                                }}
                                onClick={() => {
                                  setDrawThree(shape)
                                  if (isSashThree) {
                                    setIsSashThree(false)
                                  } else {
                                    setIsSashThree(true)
                                  }
                                }}
                              >
                                {
                                  drawThree === 'Left' ? (
                                    numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                      numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%' }} /> : ''
                                          )
                                        )
                                      )
                                    )
                                  ) : (
                                    drawThree === 'Right' ? (
                                      numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%' }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawThree === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '10%' }} /> : (
                                        drawThree === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                          drawThree === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                            drawThree === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawThree === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                drawThree === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawThree === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawThree === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawThree === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawThree === 'SlideLeft' ? (
                                                          <div>
                                                            <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                          </div>
                                                        ) : (
                                                          drawThree === 'SlideRight' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                            </div>
                                                          ) : (
                                                            drawThree === 'Fixed' ? (
                                                              <div>
                                                                Fixed
                                                              </div>
                                                            ) : ''
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    ))
                                }
                              </div>
                              {
                                isSashThree ? (
                                  <div style={{
                                    display: 'flex',
                                    justifyContent: panelThreeSash === 'SashNew' ? 'flex-start' : 'flex-end',
                                    alignItems: 'flex-end',
                                    height: '50%',
                                    width: '100%'
                                  }}
                                    onClick={() => {
                                      if (panelThreeSash === '') {
                                        setPanelThreeSash(sash)
                                      } else {
                                        setPanelThreeSash('')
                                      }
                                    }}
                                  >
                                    {
                                      panelThreeSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                        panelThreeSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                      )
                                    }
                                  </div>
                                ) : ''
                              }
                            </div>
                          </div>
                        </div>
                        <div style={{ marginTop: 20 }}>
                          <div
                            style={{ display: 'flex', width: '100%' }}
                          >
                            <div style={{
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: firstSize === '0' && secondSize ? `${(width * 100) / 4}%` : `${firstSize * 100 / width}%`
                            }}>
                              {firstSize === '0' && secondSize === '0' ? ((width / 4)).toFixed(0) : firstSize} mm
                            </div>

                            <div style={{
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: firstSize === '0' && secondSize === '0' ? `${(width * 100) / 2}%` : `${secondSize * 100 / width}%`
                            }}>
                              {firstSize === '0' && secondSize === '0' ? ((width / 2)).toFixed(0) : secondSize} mm
                            </div>

                            <div style={{
                              fontWeight: '700',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: firstSize === '0' && secondSize === '0' ? `${(width * 100) / 4}%` : `${(Number(width) - (Number(firstSize) + Number(secondSize))) * 100 / width}%`
                            }}>
                              {firstSize === '0' && secondSize === '0' ? ((width / 4)).toFixed(0) : (Number(width) - (Number(firstSize) + Number(secondSize))).toFixed(0)} mm
                            </div>
                          </div>
                          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>{width} mm</div>
                        </div>
                      </div>
                    ) : (
                      numberOfPanels === 'Four' ? (
                        <div style={{ height: '100%', width: '100%' }}>
                          <div
                            className='main'
                          >
                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' ? `${(width * 100) / 4}%` : `${(firstSize * 100) / width}%`
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSashOne ? 'space-between' : 'center',
                                  flexDirection: isSashOne ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSashOne ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: isSashOne ? 'flex-end' : 'center',
                                    justifyContent: drawOne === 'Left' ? 'flex-start' : drawOne === 'Right' ? 'flex-end' : 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawOne(shape)
                                    if (isSashOne) {
                                      setIsSashOne(false)
                                    } else {
                                      setIsSashOne(true)
                                    }
                                  }}
                                >
                                  {
                                    drawOne === 'Left' ? (
                                      numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%' }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawOne === 'Right' ? (
                                        numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%' }} /> : (
                                                numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%' }} /> : ''
                                              )
                                            )
                                          )
                                        )
                                      ) : (
                                        drawOne === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '12%' }} /> : (
                                          drawOne === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawOne === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawOne === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawOne === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawOne === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawOne === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawOne === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawOne === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawOne === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawOne === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSashOne ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: panelOneSash === 'SashNew' ? 'flex-start' : 'flex-end',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => {
                                        if (panelOneSash === '') {
                                          setPanelOneSash(sash)
                                        } else {
                                          setPanelOneSash('')
                                        }
                                      }}
                                    >
                                      {
                                        panelOneSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                          panelOneSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                        )
                                      }
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>

                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' ? `${(width * 100) / 4}%` : `${(secondSize * 100) / width}%`
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSashTwo ? 'space-between' : 'center',
                                  flexDirection: isSashTwo ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSashTwo ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: isSashTwo ? 'flex-end' : 'center',
                                    justifyContent: drawTwo === 'Left' ? 'flex-start' : drawTwo === 'Right' ? 'flex-end' : 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawTwo(shape)
                                    if (isSashTwo) {
                                      setIsSashTwo(false)
                                    } else {
                                      setIsSashTwo(true)
                                    }
                                  }}
                                >
                                  {
                                    drawTwo === 'Left' ? (
                                      numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%' }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawTwo === 'Right' ? (
                                        numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%' }} /> : (
                                                numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%' }} /> : ''
                                              )
                                            )
                                          )
                                        )
                                      ) : (
                                        drawTwo === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '12%' }} /> : (
                                          drawTwo === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawTwo === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawTwo === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawTwo === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawTwo === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawTwo === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawTwo === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawTwo === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawTwo === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawTwo === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawTwo === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSashTwo ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: panelTwoSash === 'SashNew' ? 'flex-start' : 'flex-end',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => {
                                        if (panelTwoSash === '') {
                                          setPanelTwoSash(sash)
                                        } else {
                                          setPanelTwoSash('')
                                        }
                                      }}
                                    >
                                      {
                                        panelTwoSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                          panelTwoSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                        )
                                      }
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>

                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' ? `${(width * 100) / 4}%` : `${(thirdSize * 100) / width}%`
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSashThree ? 'space-between' : 'center',
                                  flexDirection: isSashThree ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSashThree ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: isSashThree ? 'flex-end' : 'center',
                                    justifyContent: drawThree === 'Left' ? 'flex-start' : drawThree === 'Right' ? 'flex-end' : 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawThree(shape)
                                    if (isSashThree) {
                                      setIsSashThree(false)
                                    } else {
                                      setIsSashThree(true)
                                    }
                                  }}
                                >
                                  {
                                    drawThree === 'Left' ? (
                                      numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%' }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawThree === 'Right' ? (
                                        numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%' }} /> : (
                                                numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%' }} /> : ''
                                              )
                                            )
                                          )
                                        )
                                      ) : (
                                        drawThree === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '12%' }} /> : (
                                          drawThree === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawThree === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawThree === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawThree === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawThree === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawThree === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawThree === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawThree === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawThree === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawThree === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawThree === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSashThree ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: panelThreeSash === 'SashNew' ? 'flex-start' : 'flex-end',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => {
                                        if (panelThreeSash === '') {
                                          setPanelThreeSash(sash)
                                        } else {
                                          setPanelThreeSash('')
                                        }
                                      }}
                                    >
                                      {
                                        panelThreeSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                          panelThreeSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                        )
                                      }
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>

                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' ? `${(width * 100) / 4}%` : (
                                `${(Number(width) - (Number(firstSize) + Number(secondSize) + Number(thirdSize))) * 100 / width}%`
                              )
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSashFour ? 'space-between' : 'center',
                                  flexDirection: isSashFour ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSashFour ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: isSashFour ? 'flex-end' : 'center',
                                    justifyContent: drawFour === 'Left' ? 'flex-start' : drawFour === 'Right' ? 'flex-end' : 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawFour(shape)
                                    if (isSashFour) {
                                      setIsSashFour(false)
                                    } else {
                                      setIsSashFour(true)
                                    }
                                  }}
                                >
                                  {
                                    drawFour === 'Left' ? (
                                      numberOfMullians === 0 ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                        numberOfMullians === 1 ? <img src={leftM} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 2 ? <img src={rightTwo} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 3 ? <img src={rightThree} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 4 ? <img src={rightFour} style={{ height: '100%', width: '90%' }} /> : ''
                                            )
                                          )
                                        )
                                      )
                                    ) : (
                                      drawFour === 'Right' ? (
                                        numberOfMullians === 0 ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                          numberOfMullians === 1 ? <img src={rightM} style={{ height: '100%', width: '90%' }} /> : (
                                            numberOfMullians === 2 ? <img src={leftTwo} style={{ height: '100%', width: '90%' }} /> : (
                                              numberOfMullians === 3 ? <img src={leftThree} style={{ height: '100%', width: '90%' }} /> : (
                                                numberOfMullians === 4 ? <img src={leftFour} style={{ height: '100%', width: '90%' }} /> : ''
                                              )
                                            )
                                          )
                                        )
                                      ) : (
                                        drawFour === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '12%' }} /> : (
                                          drawFour === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawFour === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawFour === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawFour === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawFour === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawFour === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawFour === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawFour === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawFour === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawFour === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawFour === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSashFour ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: panelFourSash === 'SashNew' ? 'flex-start' : 'flex-end',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => {
                                        if (panelFourSash === '') {
                                          setPanelFourSash(sash)
                                        } else {
                                          setPanelFourSash('')
                                        }
                                      }}
                                    >
                                      {
                                        panelFourSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                                          panelFourSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                                        )
                                      }
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>
                          </div>

                          <div>

                            <div
                              style={{ display: 'flex', width: '100%', marginTop: 20 }}
                            >
                              <div style={{
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' ? `${(width * 100) / 4}%` : `${(firstSize * 100) / width}%`
                              }}>
                                {firstSize === '0' && secondSize === '0' && thirdSize === '0' ? ((width / 4)).toFixed(0) : firstSize} mm
                              </div>

                              <div style={{
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' ? `${(width * 100) / 4}%` : `${(secondSize * 100) / width}%`
                              }}>
                                {firstSize === '0' && secondSize === '0' && thirdSize === '0' ? ((width / 4)).toFixed(0) : secondSize} mm
                              </div>

                              <div style={{
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' ? `${(width * 100) / 4}%` : `${(thirdSize * 100) / width}%`
                              }}>
                                {firstSize === '0' && secondSize === '0' && thirdSize === '0' ? ((width / 4)).toFixed(0) : thirdSize} mm
                              </div>

                              <div style={{
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' ? `${(width * 100) / 4}%` : `${(Number(width) - (Number(firstSize) + Number(secondSize) + Number(thirdSize))) * 100 / width}%`
                              }}>
                                {firstSize === '0' && secondSize === '0' && thirdSize === '0' ? ((width / 4)).toFixed(0) : (Number(width) - (Number(firstSize) + Number(secondSize) + Number(thirdSize))).toFixed(0)} mm
                              </div>
                            </div>

                            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>{width} mm</div>

                          </div>
                        </div>
                      ) : (
                        numberOfPanels === 'Five' ? (
                          <div
                            className='main'
                          >
                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : `${(firstSize * 100) / width}%`
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSash ? 'space-between' : 'center',
                                  flexDirection: isSash ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSash ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawOne(shape)
                                  }}
                                >
                                  {
                                    drawOne === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                      drawOne === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                        drawOne === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '15%' }} /> : (
                                          drawOne === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawOne === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawOne === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawOne === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawOne === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawOne === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawOne === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawOne === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawOne === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawOne === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSash ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => setPanelOneSash(sash)}
                                    >
                                      <div>
                                        {
                                          panelOneSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                        }
                                      </div>
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>

                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : `${(secondSize * 100) / width}%`
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSash ? 'space-between' : 'center',
                                  flexDirection: isSash ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSash ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawTwo(shape)
                                  }}
                                >
                                  {
                                    drawTwo === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                      drawTwo === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                        drawTwo === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '15%' }} /> : (
                                          drawTwo === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawTwo === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawTwo === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawTwo === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawTwo === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawTwo === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawTwo === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawTwo === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawTwo === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawTwo === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawTwo === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSash ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => setPanelTwoSash(sash)}
                                    >
                                      <div>
                                        {
                                          panelTwoSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                        }
                                      </div>
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>

                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : `${(thirdSize * 100) / width}%`
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSash ? 'space-between' : 'center',
                                  flexDirection: isSash ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSash ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawThree(shape)
                                  }}
                                >
                                  {
                                    drawThree === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                      drawThree === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                        drawThree === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '15%' }} /> : (
                                          drawThree === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawThree === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawThree === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawThree === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawThree === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawThree === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawThree === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawThree === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawThree === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawThree === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawThree === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSash ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => setPanelThreeSash(sash)}
                                    >
                                      <div>
                                        {
                                          panelThreeSash === 'SashNew' ? <img src={sashAsset} alt='SASH' /> : ''
                                        }
                                      </div>
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>

                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : `${(fourthSize * 100) / width}%`
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSash ? 'space-between' : 'center',
                                  flexDirection: isSash ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSash ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawFour(shape)
                                  }}
                                >
                                  {
                                    drawFour === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                      drawFour === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                        drawFour === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '15%' }} /> : (
                                          drawFour === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawFour === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawFour === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawFour === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawFour === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawFour === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawFour === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawFour === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawFour === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawFour === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawFour === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSash ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => setPanelFourSash(sash)}
                                    >
                                      <div>
                                        {
                                          panelFourSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                        }
                                      </div>
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>

                            <div style={{
                              height: '100%',
                              border: '4px double #90EE90',
                              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : (
                                `${(Number(width) - (Number(firstSize) + Number(secondSize) + Number(thirdSize) + Number(fourthSize))) * 100 / width}%`
                              )
                            }}
                            >
                              <div
                                style={{
                                  border: '4px solid #a52a2a',
                                  height: '100%',
                                  width: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: isSash ? 'space-between' : 'center',
                                  flexDirection: isSash ? 'column' : 'row'
                                }}
                              >
                                <div
                                  style={{
                                    height: isSash ? '50%' : '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%'
                                  }}
                                  onClick={() => {
                                    setDrawFive(shape)
                                  }}
                                >
                                  {
                                    drawFive === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                      drawFive === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                        drawFive === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '15%' }} /> : (
                                          drawFive === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                            drawFive === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                              drawFive === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawFive === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawFive === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawFive === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawFive === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawFive === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawFive === 'SlideLeft' ? (
                                                            <div>
                                                              <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                            </div>
                                                          ) : (
                                                            drawFive === 'SlideRight' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                              </div>
                                                            ) : (
                                                              drawFive === 'Fixed' ? (
                                                                <div>
                                                                  Fixed
                                                                </div>
                                                              ) : ''
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      ))
                                  }
                                </div>
                                {
                                  isSash ? (
                                    <div style={{
                                      display: 'flex',
                                      justifyContent: 'flex-start',
                                      alignItems: 'flex-end',
                                      height: '50%',
                                      width: '100%'
                                    }}
                                      onClick={() => setPanelFiveSash(sash)}
                                    >
                                      <div>
                                        {
                                          panelFiveSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                        }
                                      </div>
                                    </div>
                                  ) : ''
                                }
                              </div>
                            </div>
                          </div>
                        ) : (
                          numberOfPanels === 'Six' ? (
                            <div
                              className='main'
                            >
                              <div style={{
                                height: '100%',
                                border: '4px double #90EE90',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(firstSize * 100) / width}%`
                              }}
                              >
                                <div
                                  style={{
                                    border: '4px solid #a52a2a',
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isSash ? 'space-between' : 'center',
                                    flexDirection: isSash ? 'column' : 'row'
                                  }}
                                >
                                  <div
                                    style={{
                                      height: isSash ? '50%' : '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '100%'
                                    }}
                                    onClick={() => {
                                      setDrawOne(shape)
                                    }}
                                  >
                                    {
                                      drawOne === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                        drawOne === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                          drawOne === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '20%' }} /> : (
                                            drawOne === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                              drawOne === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawOne === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawOne === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawOne === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawOne === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawOne === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                            drawOne === 'SlideLeft' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                              </div>
                                                            ) : (
                                                              drawOne === 'SlideRight' ? (
                                                                <div>
                                                                  <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                                </div>
                                                              ) : (
                                                                drawOne === 'Fixed' ? (
                                                                  <div>
                                                                    Fixed
                                                                  </div>
                                                                ) : ''
                                                              )
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        ))
                                    }
                                  </div>
                                  {
                                    isSash ? (
                                      <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: '50%',
                                        width: '100%'
                                      }}
                                        onClick={() => setPanelOneSash(sash)}
                                      >
                                        <div>
                                          {
                                            panelOneSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                          }
                                        </div>
                                      </div>
                                    ) : ''
                                  }
                                </div>
                              </div>

                              <div style={{
                                height: '100%',
                                border: '4px double #90EE90',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(secondSize * 100) / width}%`
                              }}
                              >
                                <div
                                  style={{
                                    border: '4px solid #a52a2a',
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isSash ? 'space-between' : 'center',
                                    flexDirection: isSash ? 'column' : 'row'
                                  }}
                                >
                                  <div
                                    style={{
                                      height: isSash ? '50%' : '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '100%'
                                    }}
                                    onClick={() => {
                                      setDrawTwo(shape)
                                    }}
                                  >
                                    {
                                      drawTwo === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                        drawTwo === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                          drawTwo === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '20%' }} /> : (
                                            drawTwo === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                              drawTwo === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawTwo === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawTwo === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawTwo === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawTwo === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawTwo === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawTwo === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                            drawTwo === 'SlideLeft' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                              </div>
                                                            ) : (
                                                              drawTwo === 'SlideRight' ? (
                                                                <div>
                                                                  <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                                </div>
                                                              ) : (
                                                                drawTwo === 'Fixed' ? (
                                                                  <div>
                                                                    Fixed
                                                                  </div>
                                                                ) : ''
                                                              )
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        ))
                                    }
                                  </div>
                                  {
                                    isSash ? (
                                      <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: '50%',
                                        width: '100%'
                                      }}
                                        onClick={() => setPanelTwoSash(sash)}
                                      >
                                        <div>
                                          {
                                            panelTwoSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                          }
                                        </div>
                                      </div>
                                    ) : ''
                                  }
                                </div>
                              </div>

                              <div style={{
                                height: '100%',
                                border: '4px double #90EE90',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(thirdSize * 100) / width}%`
                              }}
                              >
                                <div
                                  style={{
                                    border: '4px solid #a52a2a',
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isSash ? 'space-between' : 'center',
                                    flexDirection: isSash ? 'column' : 'row'
                                  }}
                                >
                                  <div
                                    style={{
                                      height: isSash ? '50%' : '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '100%'
                                    }}
                                    onClick={() => {
                                      setDrawThree(shape)
                                    }}
                                  >

                                    {
                                      drawThree === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                        drawThree === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                          drawThree === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '20%' }} /> : (
                                            drawThree === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                              drawThree === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawThree === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawThree === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawThree === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawThree === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawThree === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawThree === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                            drawThree === 'SlideLeft' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                              </div>
                                                            ) : (
                                                              drawThree === 'SlideRight' ? (
                                                                <div>
                                                                  <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                                </div>
                                                              ) : (
                                                                drawThree === 'Fixed' ? (
                                                                  <div>
                                                                    Fixed
                                                                  </div>
                                                                ) : ''
                                                              )
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        ))
                                    }
                                  </div>
                                  {
                                    isSash ? (
                                      <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: '50%',
                                        width: '100%'
                                      }}
                                        onClick={() => setPanelThreeSash(sash)}
                                      >
                                        <div>
                                          {
                                            panelThreeSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                          }
                                        </div>
                                      </div>
                                    ) : ''
                                  }
                                </div>
                              </div>

                              <div style={{
                                height: '100%',
                                border: '4px double #90EE90',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(fourthSize * 100) / width}%`
                              }}
                              >
                                <div
                                  style={{
                                    border: '4px solid #a52a2a',
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isSash ? 'space-between' : 'center',
                                    flexDirection: isSash ? 'column' : 'row'
                                  }}
                                >
                                  <div
                                    style={{
                                      height: isSash ? '50%' : '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '100%'
                                    }}
                                    onClick={() => {
                                      setDrawFour(shape)
                                    }}
                                  >
                                    {
                                      drawFour === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                        drawFour === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                          drawFour === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '20%' }} /> : (
                                            drawFour === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                              drawFour === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawFour === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawFour === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawFour === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawFour === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawFour === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawFour === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                            drawFour === 'SlideLeft' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                              </div>
                                                            ) : (
                                                              drawFour === 'SlideRight' ? (
                                                                <div>
                                                                  <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                                </div>
                                                              ) : (
                                                                drawFour === 'Fixed' ? (
                                                                  <div>
                                                                    Fixed
                                                                  </div>
                                                                ) : ''
                                                              )
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        ))
                                    }
                                  </div>
                                  {
                                    isSash ? (
                                      <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: '50%',
                                        width: '100%'
                                      }}
                                        onClick={() => setPanelFourSash(sash)}
                                      >
                                        <div>
                                          {
                                            panelFourSash === 'SashNew' ? <img src={sashAsset} alt='SASH' /> : ''
                                          }
                                        </div>
                                      </div>
                                    ) : ''
                                  }
                                </div>

                              </div>

                              <div style={{
                                height: '100%',
                                border: '4px double #90EE90',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(fifthSize * 100) / width}%`
                              }}
                              >
                                <div
                                  style={{
                                    border: '4px solid #a52a2a',
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isSash ? 'space-between' : 'center',
                                    flexDirection: isSash ? 'column' : 'row'
                                  }}
                                >
                                  <div
                                    style={{
                                      height: isSash ? '50%' : '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '100%'
                                    }}
                                    onClick={() => {
                                      setDrawFive(shape)
                                    }}
                                  >
                                    {
                                      drawFive === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                        drawFive === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                          drawFive === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '20%' }} /> : (
                                            drawFive === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                              drawFive === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawFive === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawFive === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawFive === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawFive === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawFive === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawFive === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                            drawFive === 'SlideLeft' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                              </div>
                                                            ) : (
                                                              drawFive === 'SlideRight' ? (
                                                                <div>
                                                                  <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                                </div>
                                                              ) : (
                                                                drawFive === 'Fixed' ? (
                                                                  <div>
                                                                    Fixed
                                                                  </div>
                                                                ) : ''
                                                              )
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        ))
                                    }
                                  </div>
                                  {
                                    isSash ? (
                                      <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: '50%',
                                        width: '100%'
                                      }}
                                        onClick={() => setPanelFiveSash(sash)}
                                      >
                                        <div>
                                          {
                                            panelFiveSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                          }
                                        </div>
                                      </div>
                                    ) : ''
                                  }
                                </div>
                              </div>

                              <div style={{
                                height: '100%',
                                border: '4px double #90EE90',
                                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : (
                                  `${(Number(width) - (Number(firstSize) + Number(secondSize) + Number(thirdSize) + Number(fourthSize) + Number(fifthSize))) * 100 / width}%`
                                )
                              }}
                              >
                                <div
                                  style={{
                                    border: '4px solid #a52a2a',
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: isSash ? 'space-between' : 'center',
                                    flexDirection: isSash ? 'column' : 'row'
                                  }}
                                >
                                  <div
                                    style={{
                                      height: isSash ? '50%' : '100%',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      width: '100%'
                                    }}
                                    onClick={() => {
                                      setDrawSix(shape)
                                    }}
                                  >
                                    {
                                      drawSix === 'Left' ? <img src={left} style={{ height: '100%', width: '100%' }} /> : (
                                        drawSix === 'Right' ? <img src={right} style={{ height: '100%', width: '100%' }} /> : (
                                          drawSix === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%', marginTop: '20%' }} /> : (
                                            drawSix === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : (
                                              drawSix === 'leftAndRight' ? <img src={rightAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                drawSix === 'UpwardAndLeft' ? <img src={upwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                  drawSix === 'UpwardAndRight' ? <img src={upwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawSix === 'DownwardAndLeft' ? <img src={downwardAndLeft} style={{ height: '100%', width: '100%' }} /> : (
                                                      drawSix === 'DownwardAndRight' ? <img src={downwardAndRight} style={{ height: '100%', width: '100%' }} /> : (
                                                        drawSix === 'All' ? <img src={allSides} style={{ height: '100%', width: '100%' }} /> : (
                                                          drawSix === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                            drawSix === 'SlideLeft' ? (
                                                              <div>
                                                                <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                                                              </div>
                                                            ) : (
                                                              drawSix === 'SlideRight' ? (
                                                                <div>
                                                                  <ArrowRightAltIcon style={{ fontSize: 40 }} />
                                                                </div>
                                                              ) : (
                                                                drawSix === 'Fixed' ? (
                                                                  <div>
                                                                    Fixed
                                                                  </div>
                                                                ) : ''
                                                              )
                                                            )
                                                          )
                                                        )
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        ))
                                    }
                                  </div>
                                  {
                                    isSash ? (
                                      <div style={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-end',
                                        height: '50%',
                                        width: '100%'
                                      }}
                                        onClick={() => setPanelSixSash(sash)}
                                      >
                                        <div>
                                          {
                                            panelSixSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '60%' }} /> : ''
                                          }
                                        </div>
                                      </div>
                                    ) : ''
                                  }
                                </div>
                              </div>
                            </div>
                          ) : ''
                        )
                      )
                    )
                  )
                )
              }
            </div>
          </div>
        ) : (
          <div style={{ height: '100%', width: '100%' }}>
            <div style={{
              height: mySelection === 'TopHungSelected' ? `${(topHungHeight * 100) / height}%` : (
                mySelection === 'DownSectionSelected' ? `${(height - windowHeight) * 100 / height}%` : (
                  mySelection === '' ? '50%' : ''
                )),
              width: '100%',
              border: '4px solid #90EE90'
            }}>
              <div style={{ height: '100%', width: '100%', border: '2px solid #a52a2a' }}>
                <img src={topHung} style={{ height: '100%', width: '100%' }} />
              </div>
            </div>
            <div style={{
              height: mySelection === 'DownSectionSelected' ? `${(windowHeight * 100) / height}%` : (
                mySelection === 'TopHungSelected' ? `${(height - topHungHeight) * 100 / height}%` : (
                  mySelection === '' ? '50%' : ''
                )),
              width: '100%',
              border: '4px solid #90EE90'
            }}
            >
              <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #a52a2a' }}>Fixed</div>
            </div>
          </div>
        )
      }
      {
        ddecBar ? <div
          style={{
            position: 'absolute',
            // height: '100%',
            height: customTopHung === '' || customTopHung === 'true' || customTopHung === 'No Top Hung' || customTopHung === 'Divide Window Equally' ? '100%' : height >= 500 && heightTopHung >= 150 ? `${((500 - 150) / 500) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${((500 - heightTopHung) / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${((height - 150) / height) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${((height - heightTopHung) / height) * 100}%` : '',
            width: '100%',
            bottom: 0,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {
            hl === 1 ? (
              <>
                <div style={{ height: '95%', width: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
                <div style={{ height: '95%', width: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
              </>
            ) : hl === 2 ? (
              <>
                <div style={{ height: '95%', width: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
                <div style={{ height: '95%', width: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
                <div style={{ height: '95%', width: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
                <div style={{ height: '95%', width: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
              </>
            ) : ''
          }
        </div> : ''
      }

      {
        ddecBar ? <div
          style={{
            position: 'absolute',
            // height: '100%',
            height: customTopHung === '' || customTopHung === 'true' || customTopHung === 'No Top Hung' || customTopHung === 'Divide Window Equally' ? '100%' : height >= 500 && heightTopHung >= 150 ? `${((500 - 150) / 500) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${((500 - heightTopHung) / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${((height - 150) / height) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${((height - heightTopHung) / height) * 100}%` : '',
            width: '100%',
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {
            vl === 1 ? (
              <>
                <div style={{ width: '95%', height: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
                <div style={{ width: '95%', height: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
              </>
            ) : vl === 2 ? (
              <>
                <div style={{ width: '95%', height: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
                <div style={{ width: '95%', height: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
                <div style={{ width: '95%', height: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
                <div style={{ width: '95%', height: '4px', backgroundColor: '#2f4f4f' }}>
                </div>
              </>
            ) : ''
          }
        </div> : ''
      }
    </div>
  )
}

export default DrawWindow