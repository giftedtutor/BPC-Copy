import React from 'react'

const DoubleDoor = ({
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
    simpleDivider

}) => {
    return (
        <div
            style={{
                width: '530px',
                height: '520px'
            }}
            id="domEl"
            ref={domEl}
        >
            <div
                style={{
                    display: 'flex',
                    height: height > 500 ? '500px' : `${height}px`,
                    width: width > 500 ? '500px' : `${width}px`
                }}
            >

                {
                    wType === 'Vent' ? '' : (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: 2,
                            width: '30px',
                            fontWeight: '700'
                        }}>
                            {
                                customTopHung === 'One' || customTopHung === 'Two' || customTopHung === 'Three' || customTopHung === 'Four' || customTopHung === 'Five' || customTopHung === 'Six' ? (
                                    <div
                                        style={{
                                            height: height >= 500 ? '500px' : `${height}px`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            fontWeight: '700  '
                                        }}
                                    >

                                        <div style={{ transform: 'rotate(90deg)' }}>
                                            {
                                                height === '' || height === '0' || width === '' || width === '0' ? '' : `${heightTopHung} mm`
                                            }
                                        </div>

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
                                                {
                                                    height === '' || height === '0' || width === '' || width === '0' ? '' : `${glassHeight} mm`
                                                }
                                            </div>

                                            <div style={{ transform: 'rotate(90deg)' }}>
                                                {height === '' || height === '0' || width === '' || width === '0' ? '' : `${((height - (Number(heightTopHung) + Number(glassHeight)))).toFixed(0)} mm`}
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

                        </div>
                    )
                }

                {
                    height === '' || height === '0' || width === '' || width === '0' ? '' : (
                        <div
                            style={{
                                borderTop: putArc ? 'none' : '8px solid #90EE90',
                                borderLeft: putArc ? 'none' : '8px solid #90EE90',
                                borderRight: putArc ? 'none' : '8px solid #90EE90',
                                borderBottom: putArc ? 'none' : (
                                    doorBase === 'With Base' ? '4px solid #90EE90' : 'none'
                                ),
                                height: height > 500 ? '500px' : `${height}px`,
                                width: width > 500 ? '500px' : `${width}px`
                            }}
                        >

                            {
                                customTopHung === 'One' ? (
                                    <div
                                        style={{
                                            height: `${(heightTopHung / height) * 100}%`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            border: putArc ? '8px solid #90EE90' : '2px solid #a52a2a',
                                            borderTopLeftRadius: putArc ? 300 : 0,
                                            borderTopRightRadius: putArc ? 300 : 0
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
                                                border: putArc ? 'none' : '2px solid #a52a2a',
                                                height: '100%',
                                                width: '100%',
                                                display: 'flex',
                                                alignItems: putArc || topOneHungShape === 'Openable' ? 'flex-start' : 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => setTopOneHungShape(doorTopHung)}
                                        >
                                            {
                                                topOneHungShape === 'Openable' ? (putArc ? <img src={topHung} style={{ height: '80%', width: '70%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
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
                                                border: putArc ? '8px solid #90EE90' : 'none',
                                                borderTopRightRadius: putArc ? 300 : 0,
                                                borderTopLeftRadius: putArc ? 300 : 0,
                                                display: 'flex',
                                                alignItems: 'center',
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

                                            <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 2) / width) * 100}%` : `${(firstTopWidth / width) * 100}%`, border: putArc ? 'none' : '2px solid #a52a2a', cursor: 'pointer', borderRight: '2px solid #90EE90' }}
                                                onClick={() => setTopOneHungShape(doorTopHung)}
                                            >
                                                <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: putArc || topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
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
                                            <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 2) / width) * 100}%` : `${(secondTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #a52a2a', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                onClick={() => setTopTwoHungShape(doorTopHung)}
                                            >
                                                <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: putArc || topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
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
                                                    border: putArc ? '8px solid #90EE90' : 'none',
                                                    borderTopRightRadius: putArc ? 300 : 0,
                                                    borderTopLeftRadius: putArc ? 300 : 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
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

                                                <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 3) / width) * 100}%` : `${(firstTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer' }}
                                                    onClick={() => setTopOneHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '2px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topOneHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
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
                                                <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 3) / width) * 100}%` : `${(secondTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                    onClick={() => setTopTwoHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '2px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topTwoHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
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
                                                <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 3) / width) * 100}%` : `${(thirdTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                    onClick={() => setTopThreeHungShape(doorTopHung)}
                                                >
                                                    <div style={{ border: putArc ? 'none' : '2px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topThreeHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
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
                                                    border: putArc ? '8px solid #90EE90' : 'none',
                                                    borderTopRightRadius: putArc ? 300 : 0,
                                                    borderTopLeftRadius: putArc ? 300 : 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
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

                                                <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 4) / width) * 100}%` : `${(firstTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer' }}
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
                                                <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 4) / width) * 100}%` : `${(secondTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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
                                                <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 4) / width) * 100}%` : `${(thirdTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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
                                                <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 4) / width) * 100}%` : `${(fourthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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
                                                        // height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                                        height: `${(heightTopHung / height) * 100}%`,
                                                        border: putArc ? '8px solid #90EE90' : 'none',
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

                                                    <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(firstTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer' }}
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
                                                    <div style={{ height: putArc && heightTopHung >= 140 ? '97%' : '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(secondTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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
                                                    <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(thirdTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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
                                                    <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(fourthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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

                                                    <div style={{ height: putArc && heightTopHung >= 140 ? '97%' : '100%', width: selectedTop === '' ? `${((width / 5) / width) * 100}%` : `${(fifthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                        onClick={() => setTopFiveHungShape(doorTopHung)}
                                                    >
                                                        <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFiveHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                            {
                                                                topFiveHungShape === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                    topFiveHungShape === 'Fixed' ? 'Fixed' : (
                                                                        topFiveHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                            topFiveHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
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
                                                            // height: height >= 500 && heightTopHung >= 150 ? `${(150 / 500) * 100}%` : height <= 500 && heightTopHung <= 150 ? `${(heightTopHung / height) * 100}%` : height >= 500 && heightTopHung <= 150 ? `${(heightTopHung / 500) * 100}%` : height <= 500 && heightTopHung >= 150 ? `${(150 / height) * 100}%` : '',
                                                            height: `${(heightTopHung / height) * 100}%`,
                                                            border: putArc ? '8px solid #90EE90' : 'none',
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

                                                        <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(firstTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer' }}
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
                                                        <div style={{ height: putArc && heightTopHung >= 115 ? '92%' : '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(secondTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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
                                                        <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(thirdTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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
                                                        <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(fourthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
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

                                                        <div style={{ height: '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(fifthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                            onClick={() => setTopFiveHungShape(doorTopHung)}
                                                        >
                                                            <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topFiveHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                                {
                                                                    topFiveHungShape === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                        topFiveHungShape === 'Fixed' ? 'Fixed' : (
                                                                            topFiveHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                                topFiveHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
                                                                            )
                                                                        )
                                                                    )
                                                                }
                                                            </div>
                                                        </div>

                                                        <div style={{ height: putArc && heightTopHung >= 115 ? '92%' : '100%', width: selectedTop === '' ? `${((width / 6) / width) * 100}%` : `${(sixthTopWidth / width) * 100}%`, display: 'flex', alignItems: 'center', justifyContent: 'center', border: putArc ? 'none' : '2px solid #90EE90', cursor: 'pointer', borderLeft: '2px solid #90EE90' }}
                                                            onClick={() => setTopSixHungShape(doorTopHung)}
                                                        >
                                                            <div style={{ border: putArc ? 'none' : '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: topSixHungShape === 'Openable' ? 'flex-start' : 'center', justifyContent: 'center' }}>
                                                                {
                                                                    topSixHungShape === 'Openable' ? (putArc ? <img src={cutTopRight} style={{ height: '80%', width: '90%', borderBottomRightRadius: '30%', borderTopLeftRadius: '30%' }} /> : <img src={topHung} style={{ height: '80%', width: '100%' }} />) : (
                                                                        topSixHungShape === 'Fixed' ? 'Fixed' : (
                                                                            topSixHungShape === 'Slide Left' ? <ArrowRightAltIcon style={{ fontSize: 40, transform: 'rotate(180deg)' }} /> : (
                                                                                topSixHungShape === 'Slide Right' ? <ArrowRightAltIcon style={{ fontSize: 40 }} /> : ''
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
                                    height: customTopHung === 'One' || customTopHung === 'Two' || customTopHung === 'Three' || customTopHung === 'Four' || customTopHung === 'Five' || customTopHung === 'Six' ? `${((Number(height) - Number(heightTopHung)) / Number(height)) * 100}%` : '100%',
                                    width: '100%',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <div style={{
                                    borderTop: '4px solid #90EE90',
                                    borderLeft: '4px solid #90EE90',
                                    borderRight: drawOne === 'Fixed' ? '4px solid #90EE90' : 'none',
                                    borderBottom: doorBase === 'With Base' ? '4px solid #90EE90' : 0,
                                    height: '100%',
                                    width: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                                    onClick={() => setDrawOne(shape)}
                                >
                                    <div
                                        style={{
                                            // height: `${ (Number(glassHeight) / Number(height)) * 100 }%`,
                                            border: '2px solid #a52a2a',
                                            borderBottom: 'none',
                                            borderLeft: '2px solid #a52a2a',
                                            height: `${((Number(height) - (Number(glassHeight) + Number(heightTopHung))) / (Number(height) - Number(heightTopHung))) * 100}%`,
                                            borderRight: 'none',
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: drawOne === 'Right' ? 'flex-start' : 'flex-end'
                                        }}
                                    >
                                        {drawOne === 'Left' ? <img src={doorUpRight} style={{ height: '100%', width: '90%' }} /> : (
                                            drawOne === 'Right' ? <img src={doorUpLeft} style={{ height: '100%', width: '90%' }} /> : (
                                                drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawOne === 'Fixed' ? (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                                            <div>Fixed</div>
                                                        </div>
                                                    ) : ''
                                                )
                                            ))}
                                    </div>
                                    <div style={{
                                        borderTop: 'none',
                                        borderRight: 'none',
                                        borderLeft: '2px solid #a52a2a',
                                        borderBottom: doorBase === 'With Base' ? '4px solid #a52a2a' : 0,
                                        // height: `${ ((Number(height) - Number(glassHeight)) / Number(height)) * 100 }%`,
                                        height: `${(Number(glassHeight) / (Number(height) - Number(heightTopHung))) * 100}%`,
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: drawOne === 'Right' ? 'flex-start' : 'flex-end'
                                    }}
                                        onClick={() => setDrawOne(shape)}
                                    >
                                        {
                                            glassHeight === 0 || glassHeight === '' || glassHeight === '0' ? (
                                                <>
                                                    {drawOne === 'Left' ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                                        drawOne === 'Right' ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                                            drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '90%' }} /> : ''
                                                        ))}
                                                </>
                                            ) : (
                                                <>
                                                    {drawOne === 'Left' ? <img src={doorDownRight} style={{ height: '100%', width: '90%' }} /> : (
                                                        drawOne === 'Right' ? <img src={doorDownLeft} style={{ height: '100%', width: '90%' }} /> : (
                                                            drawOne === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '90%' }} /> : ''
                                                        ))}
                                                </>
                                            )

                                        }
                                    </div>
                                </div>
                                <div style={{
                                    borderTop: '4px solid #90EE90',
                                    borderLeft: drawTwo === 'Fixed' ? '4px solid #90EE90' : 'none',
                                    borderRight: '4px solid #90EE90',
                                    borderBottom: doorBase === 'With Base' ? '4px solid #90EE90' : 0,
                                    height: '100%',
                                    width: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column'
                                }}
                                    onClick={() => setDrawTwo(shape)}
                                >
                                    <div
                                        style={{
                                            // height: `${ (Number(glassHeight) / Number(height)) * 100 }%`,
                                            height: `${((Number(height) - (Number(glassHeight) + Number(heightTopHung))) / (Number(height) - Number(heightTopHung))) * 100}%`,
                                            border: '2px solid #a52a2a',
                                            borderLeft: 'none',
                                            borderBottom: 'none',
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: drawTwo === 'Right' ? 'flex-start' : 'flex-end'
                                        }}
                                    >
                                        {drawTwo === 'Left' ? <img src={doorUpRight} style={{ height: '100%', width: '90%' }} /> : (
                                            drawTwo === 'Right' ? <img src={doorUpLeft} style={{ height: '100%', width: '90%' }} /> : (
                                                drawTwo === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '100%' }} /> : (
                                                    drawTwo === 'Fixed' ? (
                                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                                                            <div>Fixed</div>
                                                        </div>
                                                    ) : ''
                                                )
                                            ))}
                                    </div>

                                    <div style={{
                                        borderTop: 'none',
                                        borderLeft: 'none',
                                        borderRight: '2px solid #a52a2a',
                                        borderBottom: doorBase === 'With Base' ? '4px solid #a52a2a' : 0,
                                        // height: `${ ((Number(height) - Number(glassHeight)) / Number(height)) * 100 }%`,
                                        height: `${(Number(glassHeight) / (Number(height) - Number(heightTopHung))) * 100}%`,
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: drawTwo === 'Right' ? 'flex-start' : 'flex-end'
                                    }}
                                        onClick={() => setDrawTwo(shape)}
                                    >
                                        {
                                            glassHeight === 0 || glassHeight === '' || glassHeight === '0' ? (
                                                <>
                                                    {drawTwo === 'Left' ? <img src={right} style={{ height: '100%', width: '90%' }} /> : (
                                                        drawTwo === 'Right' ? <img src={left} style={{ height: '100%', width: '90%' }} /> : (
                                                            drawTwo === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '90%' }} /> : ''
                                                        ))}
                                                </>
                                            ) : (
                                                <>
                                                    {drawTwo === 'Left' ? <img src={doorDownRight} style={{ height: '100%', width: '90%' }} /> : (
                                                        drawTwo === 'Right' ? <img src={doorDownLeft} style={{ height: '100%', width: '90%' }} /> : (
                                                            drawTwo === 'Sash' ? <img src={sashImg} style={{ height: '100%', width: '90%' }} /> : ''
                                                        ))}
                                                </>
                                            )

                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            {
                height === '' || height === '0' || width === '' || width === '0' ? '' : (
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div style={{ fontWeight: '700' }}>{width / 2} mm</div>
                        <div style={{ fontWeight: '700' }}>{width / 2} mm</div>
                    </div>
                )
            }

            {
                height === '' || height === '0' || width === '' || width === '0' ? '' : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                        {width} mm
                    </div>
                )
            }

        </div>
    )
}

export default DoubleDoor