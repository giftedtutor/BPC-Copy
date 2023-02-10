/* eslint-disable multiline-ternary */
/* eslint-disable semi */
const openableMultilocksConditions = (InputValues, itemID, estQty) => {
  // ML 600
  if (itemID === 3689) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3689 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
  // ML 400
  if (itemID === 3688) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3688 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
  // ML 800
  if (itemID === 3690) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3690 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
  // ML 1000
  if (itemID === 3691) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3691 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
  // ML 1200
  if (itemID === 3692) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3692 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
  // ML 1400
  if (itemID === 3693) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3693 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
  // ML 1600
  if (itemID === 3694) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3694 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
  // ML 1800
  if (itemID === 3695) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3695 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
  // ML 2000
  if (itemID === 3696) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Openable" &&
        InputValues[index].cFourthPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cThirdPanel?.Type === "Openable"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Openable" &&
            InputValues[index].cSecondPanel?.Type === "Openable"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3696 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].numberOfOpenablePanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return {estQty, quantity};
  }
};

export default openableMultilocksConditions;
