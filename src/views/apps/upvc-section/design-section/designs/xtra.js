{
    wType === '2PSL' ? <TwoPsl
   
    /> : wType === '3PSL' ? <ThreePsl
   
    /> : wType === '4PSL' ? <FourPsl
   
    > : (
          wType === '5PSL' ? <div
            className='main'
          >
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px double #90EE90',
              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : `${(firstSize * 100) / width}%`
            }}
              onClick={() => setSlideOne(sliding)}
            >
              {
                slideOne === 'SlidingLeft' ? (
                  <div>
                    <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                  </div>
                ) : (
                  slideOne === 'SlidingRight' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40 }} />
                    </div>
                  ) : (
                    slideOne === 'Fixed' ? (
                      <div>
                      </div>
                    ) : (
                      slideOne === 'Sash' ? (
                        <img src={sashImg} alt='SASH' style={{ height: '100%', width: '100%' }} />
                      ) : ''
                    )
                  )
                )
              }
            </div>
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px double #90EE90',
              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : `${(secondSize * 100) / width}%`
            }}
              onClick={() => setSlideTwo(sliding)}
            >
              {
                slideTwo === 'SlidingLeft' ? (
                  <div>
                    <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                  </div>
                ) : (
                  slideTwo === 'SlidingRight' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40 }} />
                    </div>
                  ) : (
                    slideTwo === 'Fixed' ? (
                      <div>
                      </div>
                    ) : (
                      slideTwo === 'Sash' ? (
                        <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                      ) : ''
                    )
                  )
                )
              }
            </div>
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px double #90EE90',
              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : `${(thirdSize * 100) / width}%`
            }}
              onClick={() => setSlideThree(sliding)}
            >
              {
                slideThree === 'SlidingLeft' ? (
                  <div>
                    <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                  </div>
                ) : (
                  slideThree === 'SlidingRight' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40 }} />
                    </div>
                  ) : (
                    slideThree === 'Fixed' ? (
                      <div>
                      </div>
                    ) : (
                      slideThree === 'Sash' ? (
                        <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                      ) : ''
                    )
                  )
                )
              }
            </div>
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px double #90EE90',
              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : `${(fourthSize * 100) / width}%`
            }}
              onClick={() => setSlideFour(sliding)}
            >
              {
                slideFour === 'SlidingLeft' ? (
                  <div>
                    <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                  </div>
                ) : (
                  slideFour === 'SlidingRight' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40 }} />
                    </div>
                  ) : (
                    slideFour === 'Fixed' ? (
                      <div>
                      </div>
                    ) : (
                      slideFour === 'Sash' ? (
                        <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                      ) : ''
                    )
                  )
                )
              }
            </div>
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '3px double #90EE90',
              width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' ? `${(width * 100) / 5}%` : (
                `${(Number(width) - (Number(firstSize) + Number(secondSize) + Number(thirdSize) + Number(fourthSize))) * 100 / width}%`
              )
            }}
              onClick={() => setSlideFive(sliding)}
            >
              {
                slideFive === 'SlidingLeft' ? (
                  <div>
                    <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                  </div>
                ) : (
                  slideFive === 'SlidingRight' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40 }} />
                    </div>
                  ) : (
                    slideFive === 'None' ? (
                      <div>
                      </div>
                    ) : (
                      slideFive === 'Sash' ? (
                        <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                      ) : ''
                    )
                  )
                )
              }
            </div>
          </div> : (
            wType === '6PSL' ? <div
              className='main'
            >
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px double #90EE90',
                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(firstSize * 100) / width}%`
              }}
                onClick={() => setSlideOne(sliding)}
              >
                {
                  slideOne === 'SlidingLeft' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                    </div>
                  ) : (
                    slideOne === 'SlidingRight' ? (
                      <div>
                        <ArrowRightAltIcon style={{ fontSize: 40 }} />
                      </div>
                    ) : (
                      slideOne === 'Fixed' ? (
                        <div>
                        </div>
                      ) : (
                        slideOne === 'Sash' ? (
                          <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                        ) : ''
                      )
                    )
                  )
                }
              </div>
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px double #90EE90',
                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(secondSize * 100) / width}%`
              }}
                onClick={() => setSlideTwo(sliding)}
              >
                {
                  slideTwo === 'SlidingLeft' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                    </div>
                  ) : (
                    slideTwo === 'SlidingRight' ? (
                      <div>
                        <ArrowRightAltIcon style={{ fontSize: 40 }} />
                      </div>
                    ) : (
                      slideTwo === 'Fixed' ? (
                        <div>
                        </div>
                      ) : (
                        slideTwo === 'Sash' ? (
                          <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                        ) : ''
                      )
                    )
                  )
                }
              </div>
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px double #90EE90',
                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(thirdSize * 100) / width}%`
              }}
                onClick={() => setSlideThree(sliding)}
              >
                {
                  slideThree === 'SlidingLeft' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                    </div>
                  ) : (
                    slideThree === 'SlidingRight' ? (
                      <div>
                        <ArrowRightAltIcon style={{ fontSize: 40 }} />
                      </div>
                    ) : (
                      slideThree === 'Fixed' ? (
                        <div>
                        </div>
                      ) : (
                        slideThree === 'Sash' ? (
                          <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                        ) : ''
                      )
                    )
                  )
                }
              </div>
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px double #90EE90',
                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(fourthSize * 100) / width}%`
              }}
                onClick={() => setSlideFour(sliding)}
              >
                {
                  slideFour === 'SlidingLeft' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                    </div>
                  ) : (
                    slideFour === 'SlidingRight' ? (
                      <div>
                        <ArrowRightAltIcon style={{ fontSize: 40 }} />
                      </div>
                    ) : (
                      slideFour === 'Fixed' ? (
                        <div>
                        </div>
                      ) : (
                        slideFour === 'Sash' ? (
                          <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                        ) : ''
                      )
                    )
                  )
                }
              </div>
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px double #90EE90',
                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : `${(fifthSize * 100) / width}%`
              }}
                onClick={() => setSlideFive(sliding)}
              >
                {
                  slideFive === 'SlidingLeft' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                    </div>
                  ) : (
                    slideFive === 'SlidingRight' ? (
                      <div>
                        <ArrowRightAltIcon style={{ fontSize: 40 }} />
                      </div>
                    ) : (
                      slideFive === 'None' ? (
                        <div>
                        </div>
                      ) : (
                        slideFive === 'Sash' ? (
                          <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                        ) : ''
                      )
                    )
                  )
                }
              </div>
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px double #90EE90',
                width: firstSize === '0' && secondSize === '0' && thirdSize === '0' && fourthSize === '0' && fifthSize === '0' ? `${(width * 100) / 6}%` : (
                  `${(Number(width) - (Number(firstSize) + Number(secondSize) + Number(thirdSize) + Number(fourthSize) + Number(fifthSize))) * 100 / width}%`
                )
              }}
                onClick={() => setSlideSix(sliding)}
              >
                {
                  slideSix === 'SlidingLeft' ? (
                    <div>
                      <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                    </div>
                  ) : (
                    slideSix === 'SlidingRight' ? (
                      <div>
                        <ArrowRightAltIcon style={{ fontSize: 40 }} />
                      </div>
                    ) : (
                      slideSix === 'None' ? (
                        <div>
                        </div>
                      ) : (
                        slideSix === 'Sash' ? (
                          <img src={sash} alt='SASH' style={{ height: '100%', width: '100%' }} />
                        ) : ''
                      )
                    )
                  )
                }
              </div>
            </div> : (
              wType === 'Fixed' ? (<div style={{ height: '100%', width: '100%' }}>
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
              </div>) : (
                wType === 'drawWindow' ? <DrawWindow
                  
                /> : (
                  wType === 'Vent' ? (
                    
                  ) : ''
                )
              )
            )
          )
        )
  }