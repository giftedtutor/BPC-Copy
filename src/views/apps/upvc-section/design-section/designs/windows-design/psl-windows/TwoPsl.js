import React from 'react'

const TwoPsl = ({
  height,
  width,
  selectedPanel,
  firstSize,
  secondSize,
  setSlideOne,
  sliding,
  slideOne,
  ArrowRightAltIcon,
  slideOneSash,
  setSlideOneSash,
  sash,
  sashAsset,
  sashAssetRot,
  setSlideTwo,
  slideTwo,
  slideTwoSash,
  setSlideTwoSash,
  ddecBar,
  hl,
  vl
}) => {
  return (
    <div
      style={{
        height: height > 500 ? '500px' : `${height}px`,
        width: width > 500 ? '500px' : `${width}px`,
        position: 'relative'
      }}
    >
      <div
        // className='main'
        style={{
          display: 'flex',
          border: '8px solid #90EE90',
          height: '100%',
          width: '100%'
        }}
      >
        <div style={{
          border: '3px double #90EE90',
          height: '100%',
          width: selectedPanel === 'First' ? `${(firstSize * 100) / width}%` : (
            selectedPanel === 'Second' ? `${(width - secondSize) * 100 / width}%` : (
              selectedPanel === '' ? `${(width * 100) / 2}%` : ''
            )
          )
        }}
        >
          <div
            style={{
              border: '4px solid #a52a2a',
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column'
            }}
          >
            <div style={{ height: '50%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
              onClick={() => setSlideOne(sliding)}
            >
              {
                slideOne === 'SlidingLeft' ? (
                  <div>
                    <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} />
                  </div>
                ) : (
                  slideOne === 'SlidingRight' ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ArrowRightAltIcon style={{ fontSize: 40 }} />
                    </div>
                  ) : (
                    slideOne === 'Fixed' ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        Fixed
                      </div>
                    ) : ''
                  )
                )
              }
            </div>

            <div style={{
              display: 'flex',
              justifyContent: slideOneSash === 'SashNew' ? 'flex-start' : 'flex-end',
              alignItems: 'flex-end',
              height: '50%'
            }}
              onClick={() => setSlideOneSash(sash)}
            >
              {
                slideOneSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                  slideOneSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                )
              }
            </div>
          </div>
        </div>
        <div style={{
          border: '3px double #90EE90',
          height: '100%',
          width: selectedPanel === 'First' ? `${(width - firstSize) * 100 / width}%` : (
            selectedPanel === 'Second' ? `${secondSize * 100 / width}%` : (
              selectedPanel === '' ? `${(width * 100) / 2}%` : ''
            )
          )
        }}
        >
          <div
            style={{
              border: '4px solid #a52a2a',
              height: '100%',
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', height: '50%' }}
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
                        Fixed
                      </div>
                    ) : ''
                  )
                )
              }
            </div>
            <div style={{
              display: 'flex',
              justifyContent: slideTwoSash === 'SashNew' ? 'flex-start' : 'flex-end',
              alignItems: 'flex-end',
              height: '50%'
            }}
              onClick={() => setSlideTwoSash(sash)}
            >
              {
                slideTwoSash === 'SashNew' ? <img src={sashAsset} alt='SASH' style={{ height: '70%', width: '30%' }} /> : (
                  slideTwoSash === 'SashNewRot' ? <img src={sashAssetRot} alt='SASH' style={{ height: '70%', width: '30%' }} /> : ''
                )
              }
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex' }}>
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: selectedPanel === 'First' ? `${(firstSize * 100) / width}%` : (
                selectedPanel === 'Second' ? `${(width - secondSize) * 100 / width}%` : (
                  selectedPanel === '' ? '50%' : ''
                )
              )
            }}
          >
            <div style={{
              // @ts-ignore
              fontWeight: '700'
            }}>
              {
                selectedPanel === 'First' ? firstSize : (
                  selectedPanel === '' ? `${((width / 2)).toFixed(0)}` : (
                    selectedPanel === 'Second' ? `${((Number(width) - secondSize)).toFixed(0)} mm` : ''
                  )
                )
              } mm
            </div>
          </div>
          <div
            style={{
              marginTop: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: selectedPanel === 'Second' ? `${(secondSize * 100) / width}%` : (
                selectedPanel === 'First' ? `${(width - firstSize) * 100 / width}%` : (
                  selectedPanel === '' ? '50%' : ''
                )
              )
            }}
          >
            <div style={{
              // @ts-ignore
              fontWeight: '700'
            }}>
              {
                selectedPanel === 'Second' ? `${(Number(secondSize)).toFixed(0)} mm` : (
                  selectedPanel === '' ? `${((width / 2)).toFixed(0)} mm` : (
                    selectedPanel === 'First' ? `${((Number(width) - firstSize)).toFixed(0)} mm` : ''
                  )
                )
              }
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
          {width} mm
        </div>
      </div>

      {
        ddecBar ? <div
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
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
            height: '100%',
            width: '100%',
            top: 0,
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

export default TwoPsl