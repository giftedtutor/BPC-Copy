/* eslint-disable multiline-ternary */
/* eslint-disable semi */
const slidingMultilocksConditions = (InputValues, itemID, estQty) => {
  // ML 600
  const quantity = []
  if (itemID === 3446) {
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3446 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
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
  if (itemID === 3445) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3445 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
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
  if (itemID === 3447) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3447 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
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
  // ML 100
  if (itemID === 3448) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3448 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
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
  if (itemID === 3452) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3452 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
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
  if (itemID === 3449) {
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      console.log('RESSSSSSSSSS', pQ)
      if (3449 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
            estQty += pQ;
          }
        }
      } else {
        estQty = estQty + 0;
      }
    });
    return estQty;
  }
  // ML 1600
  if (itemID === 3450) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3450 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
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
  if (itemID === 3451) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3451 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
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
  if (itemID === 3453) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        InputValues[index].cFirstPanel?.Type === "Sliding" &&
        InputValues[index].cFourthPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cThirdPanel?.Type === "Sliding"
          ? 2
          : InputValues[index].cFirstPanel?.Type === "Sliding" &&
            InputValues[index].cSecondPanel?.Type === "Sliding"
          ? 2
          : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (3453 === InputValues[index].coasting) {
        if (InputValues[index].multiLockingSystem === "No") {
          estQty = estQty + 0;
        } else {
          if (InputValues[index].slidingPanels > 0) {
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

export default slidingMultilocksConditions;
