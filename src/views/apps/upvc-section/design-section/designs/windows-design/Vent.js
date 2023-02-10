import React from 'react'

const Vent = ({
    customTopHung,
    height,
    width,
    topHung,
    SyncAltSharpIcon,
    setDrawOne,
    shape,
    drawOne,
    left,
    right,
    upward,
    downward,
    setDrawTwo,
    drawTwo
}) => {
    return (
        <div style={{ height: '100%', width: '100%' }}>
            {
                customTopHung === '1P Openable' ? (
                    <div style={{
                        height: height >= 300 ? '300px' : `${height}px`,
                        width: width >= 500 ? '500px' : `${width}px`,
                        border: '4px solid #90EE90'
                    }}>
                        <div
                            style={{
                                border: '4px solid #a52a2a',
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center'
                            }}
                        >
                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                        </div>
                    </div>
                ) : (
                    customTopHung === '1P Fixed' ? (
                        <div style={{
                            height: height >= 300 ? '300px' : `${height}px`,

                            width: width >= 500 ? '500px' : `${width}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '4px solid #90EE90'
                        }}>
                            <div
                                style={{
                                    border: '4px solid #a52a2a',
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                Fixed
                            </div>

                        </div>
                    ) : (
                        customTopHung === '2P Fixed' ? (
                            <div style={{
                                height: height >= 300 ? '300px' : `${height}px`,

                                width: width >= 500 ? '500px' : `${width}px`,
                                display: 'flex',
                                border: '4px solid #90EE90'
                            }}>
                                <div style={{ height: '100%', width: '50%', border: '2px solid #90EE90' }}>
                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        Fixed
                                    </div>
                                </div>
                                <div style={{ height: '100%', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        Fixed
                                    </div>
                                </div>

                            </div>
                        ) : (
                            customTopHung === '3P Fixed' ? (
                                <div style={{
                                    height: height >= 300 ? '300px' : `${height}px`,

                                    width: width >= 500 ? '500px' : `${width}px`,
                                    display: 'flex',
                                    border: '4px solid #90EE90'
                                }}>
                                    <div style={{ height: '100%', width: '33%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            Fixed
                                        </div>
                                    </div>
                                    <div style={{ height: '100%', width: '34%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            Fixed
                                        </div>
                                    </div>
                                    <div style={{ height: '100%', width: '33%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            Fixed
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                customTopHung === '4P Fixed' ? (
                                    <div style={{
                                        height: height >= 300 ? '300px' : `${height}px`,

                                        width: width >= 500 ? '500px' : `${width}px`,
                                        display: 'flex',
                                        border: '4px solid #90EE90'
                                    }}>
                                        <div style={{ height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                Fixed
                                            </div>
                                        </div>
                                        <div style={{ height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                Fixed
                                            </div>
                                        </div>
                                        <div style={{ height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                Fixed
                                            </div>
                                        </div>
                                        <div style={{ height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                Fixed
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    customTopHung === '5P Fixed' ? (
                                        <div style={{
                                            height: height >= 300 ? '300px' : `${height}px`,

                                            width: width >= 500 ? '500px' : `${width}px`,
                                            display: 'flex',
                                            border: '4px solid #90EE90'
                                        }}>
                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    Fixed
                                                </div>
                                            </div>
                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    Fixed
                                                </div>
                                            </div>
                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    Fixed
                                                </div>
                                            </div>
                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    Fixed
                                                </div>
                                            </div>
                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    Fixed
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        customTopHung === '6P Fixed' ? (
                                            <div style={{
                                                height: height >= 300 ? '300px' : `${height}px`,

                                                width: width >= 500 ? '500px' : `${width}px`,
                                                display: 'flex',
                                                border: '4px solid #90EE90'
                                            }}>

                                                <div style={{ height: '100%', width: '16%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        Fixed
                                                    </div>
                                                </div>
                                                <div style={{ height: '100%', width: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        Fixed
                                                    </div>
                                                </div>
                                                <div style={{ height: '100%', width: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        Fixed
                                                    </div>
                                                </div>
                                                <div style={{ height: '100%', width: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        Fixed
                                                    </div>
                                                </div>
                                                <div style={{ height: '100%', width: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        Fixed
                                                    </div>
                                                </div>
                                                <div style={{ height: '100%', width: '16%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #90EE90' }}>
                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        Fixed
                                                    </div>
                                                </div>

                                            </div>
                                        ) : (
                                            customTopHung === '2P Openable' ? (
                                                <div style={{
                                                    height: height >= 300 ? '300px' : `${height}px`,

                                                    width: width >= 500 ? '500px' : `${width}px`,
                                                    border: '4px solid #90EE90',
                                                    display: 'flex'
                                                }}>
                                                    <div style={{ height: '100%', width: '50%', border: '2px solid #90EE90' }}>
                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                        </div>
                                                    </div>
                                                    <div style={{ height: '100%', width: '50%', border: '2px solid #90EE90' }}>
                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                        </div>
                                                    </div>
                                                </div>

                                            ) : (
                                                customTopHung === '3P Openable' ? (
                                                    <div style={{
                                                        height: height >= 300 ? '300px' : `${height}px`,
                                                        width: width >= 500 ? '500px' : `${width}px`,
                                                        border: '4px solid #90EE90',
                                                        display: 'flex'
                                                    }}>
                                                        <div style={{ height: '100%', width: '33%', border: '2px solid #90EE90' }}>
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                            </div>
                                                        </div>
                                                        <div style={{ height: '100%', width: '34%', border: '2px solid #90EE90' }}>
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                            </div>
                                                        </div>
                                                        <div style={{ height: '100%', width: '33%', border: '2px solid #90EE90' }}>
                                                            <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    customTopHung === '4P Openable' ? (
                                                        <div style={{
                                                            height: height >= 300 ? '300px' : `${height}px`,
                                                            width: width >= 500 ? '500px' : `${width}px`,
                                                            border: '4px solid #90EE90',
                                                            display: 'flex'
                                                        }}>
                                                            <div style={{ height: '100%', width: '25%', border: '2px solid #90EE90' }}>
                                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                    <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                </div>
                                                            </div>
                                                            <div style={{ height: '100%', width: '25%', border: '2px solid #90EE90' }}>
                                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                    <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                </div>
                                                            </div>
                                                            <div style={{ height: '100%', width: '25%', border: '2px solid #90EE90' }}>
                                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                    <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                </div>
                                                            </div>
                                                            <div style={{ height: '100%', width: '25%', border: '2px solid #90EE90' }}>
                                                                <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                    <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ) : (
                                                        customTopHung === '5P Openable' ? (
                                                            <div
                                                                style={{
                                                                    height: height >= 300 ? '300px' : `${height}px`,
                                                                    width: width >= 500 ? '500px' : `${width}px`,
                                                                    border: '4px solid #90EE90',
                                                                    display: 'flex'
                                                                }}>
                                                                <div style={{ height: '100%', width: '20%', border: '2px solid #90EE90' }}>
                                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                        <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                    </div>
                                                                </div>
                                                                <div style={{ height: '100%', width: '20%', border: '2px solid #90EE90' }}>
                                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                        <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                    </div>
                                                                </div>
                                                                <div style={{ height: '100%', width: '20%', border: '2px solid #90EE90' }}>
                                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                        <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                    </div>
                                                                </div>
                                                                <div style={{ height: '100%', width: '20%', border: '2px solid #90EE90' }}>
                                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                        <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                    </div>
                                                                </div>
                                                                <div style={{ height: '100%', width: '20%', border: '2px solid #90EE90' }}>
                                                                    <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                        <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        ) : (
                                                            customTopHung === '6P Openable' ? (
                                                                <div
                                                                    style={{
                                                                        height: height >= 300 ? '300px' : `${height}px`,
                                                                        width: width >= 500 ? '500px' : `${width}px`,
                                                                        border: '4px solid #90EE90',
                                                                        display: 'flex'
                                                                    }}>
                                                                    <div style={{ height: '100%', width: '16%', border: '2px solid #90EE90' }}>
                                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ height: '100%', width: '17%', border: '2px solid #90EE90' }}>
                                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ height: '100%', width: '17%', border: '2px solid #90EE90' }}>
                                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ height: '100%', width: '17%', border: '2px solid #90EE90' }}>
                                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ height: '100%', width: '17%', border: '2px solid #90EE90' }}>
                                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ height: '100%', width: '16%', border: '2px solid #90EE90' }}>
                                                                        <div style={{ border: '1px solid #a52a2a', height: '100%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                                                            <img src={topHung} style={{ height: '80%', width: '100%' }} />
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            ) : (
                                                                customTopHung === '1P Sliding' ? (
                                                                    <div
                                                                        style={{
                                                                            height: height >= 300 ? '300px' : `${height}px`,
                                                                            width: width >= 500 ? '500px' : `${width}px`,
                                                                            border: '4px solid #90EE90',
                                                                            display: 'flex'
                                                                        }}>
                                                                        <div style={{ height: '100%', width: '100%', display: 'flex', border: '2px solid #90EE90' }}>
                                                                            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                        </div>

                                                                    </div>
                                                                ) : (
                                                                    customTopHung === '2P Sliding' ? (
                                                                        <div
                                                                            style={{
                                                                                height: height >= 300 ? '300px' : `${height}px`,
                                                                                width: width >= 500 ? '500px' : `${width}px`,
                                                                                border: '4px solid #90EE90',
                                                                                display: 'flex'
                                                                            }}>
                                                                            <div style={{ height: '100%', width: '100%', display: 'flex', border: '2px solid #90EE90' }}>
                                                                                <div style={{ height: '100%', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                <div style={{ height: '100%', width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        customTopHung === '3P Sliding' ? (
                                                                            <div
                                                                                style={{
                                                                                    height: height >= 300 ? '300px' : `${height}px`,
                                                                                    width: width >= 500 ? '500px' : `${width}px`,
                                                                                    border: '4px solid #90EE90',
                                                                                    display: 'flex'
                                                                                }}>
                                                                                <div style={{ height: '100%', width: '100%', display: 'flex', border: '2px solid #90EE90' }}>
                                                                                    <div style={{ height: '100%', width: '33%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                    <div style={{ height: '100%', width: '34%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                    <div style={{ height: '100%', width: '33%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            customTopHung === '4P Sliding' ? (
                                                                                <div
                                                                                    style={{
                                                                                        height: height >= 300 ? '300px' : `${height}px`,
                                                                                        width: width >= 500 ? '500px' : `${width}px`,
                                                                                        border: '4px solid #90EE90',
                                                                                        display: 'flex'
                                                                                    }}>
                                                                                    <div style={{ height: '100%', width: '100%', display: 'flex', border: '2px solid #90EE90' }}>
                                                                                        <div style={{ height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                        <div style={{ height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                        <div style={{ height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                        <div style={{ height: '100%', width: '25%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                    </div>

                                                                                </div>
                                                                            ) : (
                                                                                customTopHung === '5P Sliding' ? (
                                                                                    <div
                                                                                        style={{
                                                                                            height: height >= 300 ? '300px' : `${height}px`,
                                                                                            width: width >= 500 ? '500px' : `${width}px`,
                                                                                            border: '4px solid #90EE90',
                                                                                            display: 'flex'
                                                                                        }}>
                                                                                        <div style={{ height: '100%', width: '100%', display: 'flex', border: '2px solid #90EE90' }}>
                                                                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                            <div style={{ height: '100%', width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    customTopHung === '6P Sliding' ? (
                                                                                        <div
                                                                                            style={{
                                                                                                height: height >= 300 ? '300px' : `${height}px`,
                                                                                                width: width >= 500 ? '500px' : `${width}px`,
                                                                                                border: '4px solid #90EE90',
                                                                                                display: 'flex'
                                                                                            }}>
                                                                                            <div style={{ height: '100%', width: '100%', display: 'flex', border: '2px solid #90EE90' }}>
                                                                                                <div style={{ height: '100%', width: '16%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                                <div style={{ height: '100%', width: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                                <div style={{ height: '100%', width: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                                <div style={{ height: '100%', width: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                                <div style={{ height: '100%', width: '17%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                                <div style={{ height: '100%', width: '16%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #a52a2a' }}><div><SyncAltSharpIcon /></div></div>
                                                                                            </div>
                                                                                        </div>
                                                                                    ) : (
                                                                                        customTopHung === 'Horizental Vent' ? (
                                                                                            <div
                                                                                                style={{
                                                                                                    height: height >= 300 ? '300px' : `${height}px`,
                                                                                                    width: width >= 500 ? '500px' : `${width}px`,
                                                                                                    border: '4px solid #90EE90',
                                                                                                    display: 'flex'
                                                                                                }}>
                                                                                                <div style={{ height: '100%', width: '100%', display: 'flex', border: '4px solid #a52a2a', flexDirection: 'column' }}>
                                                                                                    <div style={{ height: '50%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid ##90EE90' }}>
                                                                                                        <div
                                                                                                            onClick={() => setDrawOne(shape)}
                                                                                                            style={{
                                                                                                                height: '100%',
                                                                                                                border: '2px solid #a52a2a',
                                                                                                                width: '100%',
                                                                                                                display: 'flex',
                                                                                                                justifyContent: drawOne === 'Left' ? 'flex-start' : drawOne === 'Right' ? 'flex-end' : 'center',
                                                                                                                alignItems: drawOne === 'Down' ? 'flex-start' : drawOne === 'Top' ? 'flex-end' : 'center'
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                drawOne === 'Left' ? <img src={left} style={{ height: '100%', width: '90%' }} /> : drawOne === 'Right' ? <img src={right} style={{ height: '100%', width: '90%' }} /> : drawOne === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%' }} /> : drawOne === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : <div>Fixed</div>
                                                                                                            }
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <div style={{ height: '50%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', border: '3px solid ##90EE90' }}>
                                                                                                        <div
                                                                                                            onClick={() => setDrawTwo(shape)}
                                                                                                            style={{
                                                                                                                height: '100%',
                                                                                                                border: '2px solid #a52a2a',
                                                                                                                width: '100%',
                                                                                                                display: 'flex',
                                                                                                                justifyContent: drawTwo === 'Left' ? 'flex-start' : drawTwo === 'Right' ? 'flex-end' : 'center',
                                                                                                                alignItems: drawTwo === 'Down' ? 'flex-start' : drawTwo === 'Top' ? 'flex-end' : 'center'
                                                                                                            }}
                                                                                                        >
                                                                                                            {
                                                                                                                drawTwo === 'Left' ? <img src={left} style={{ height: '100%', width: '90%' }} /> : drawTwo === 'Right' ? <img src={right} style={{ height: '100%', width: '90%' }} /> : drawTwo === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%' }} /> : drawTwo === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : <div>Fixed</div>
                                                                                                            }
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        ) : (
                                                                                            customTopHung === 'Horizental Glass Vent' ? (
                                                                                                <div
                                                                                                    style={{
                                                                                                        height: height >= 300 ? '300px' : `${height}px`,
                                                                                                        width: width >= 500 ? '500px' : `${width}px`,
                                                                                                        border: '4px solid #90EE90',
                                                                                                        display: 'flex'
                                                                                                    }}>
                                                                                                    <div style={{ height: '100%', width: '100%', display: 'flex', border: '4px solid #a52a2a', flexDirection: 'column' }}>
                                                                                                        <div style={{ height: '50%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #a52a2a' }}><div style={{ height: '40%', width: '40%', borderRadius: '50%', border: '2px solid #a52a2a' }}></div></div>
                                                                                                        <div style={{ height: '50%', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', border: '2px solid #a52a2a' }}>
                                                                                                            <div
                                                                                                                onClick={() => setDrawOne(shape)}
                                                                                                                style={{
                                                                                                                    height: '100%',
                                                                                                                    width: '100%',
                                                                                                                    display: 'flex',
                                                                                                                    justifyContent: drawOne === 'Left' ? 'flex-start' : drawOne === 'Right' ? 'flex-end' : 'center',
                                                                                                                    alignItems: drawOne === 'Down' ? 'flex-start' : drawOne === 'Top' ? 'flex-end' : 'center'
                                                                                                                }}
                                                                                                            >
                                                                                                                {
                                                                                                                    drawOne === 'Left' ? <img src={left} style={{ height: '100%', width: '90%' }} /> : drawOne === 'Right' ? <img src={right} style={{ height: '100%', width: '90%' }} /> : drawOne === 'Up' ? <img src={upward} style={{ height: '90%', width: '100%' }} /> : drawOne === 'Down' ? <img src={downward} style={{ height: '90%', width: '100%' }} /> : <div>Fixed</div>
                                                                                                                }
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    </div>
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
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            }
        </div>
    )
}

export default Vent