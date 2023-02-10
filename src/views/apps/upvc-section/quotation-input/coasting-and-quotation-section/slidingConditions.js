/* eslint-disable multiline-ternary */
/* eslint-disable semi */
const slidingConditions = (InputValues, itemID, estQty) => {

  // Dummy Wheel
  if (itemID === 3415) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const pQ =
        InputValues[index].numberOfFixedPanels * 2 * InputValues[index].qty;
      if (InputValues[index].slidingPanels > 0) {
        estQty += pQ;
        quantity[index] = pQ
      }
    });
    return { estQty, quantity };
  }

  // Stopper
  if (itemID === 3416) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const pQ = InputValues[index].slidingPanels * 2 * InputValues[index].qty;
      if (InputValues[index].slidingPanels > 0) {
          estQty += pQ;
          quantity[index] = pQ
        } else {
          estQty += 0;
        }
    });
    return { estQty, quantity };
  }

  // Block
  if (itemID === 3427) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const pQ = InputValues[index].slidingPanels * 2 * InputValues[index].qty;
      if (InputValues[index].slidingPanels > 0) {
          if (InputValues[index].slidingPanels > 0) {
            estQty += pQ;
            quantity[index] = pQ
          } else {
          estQty += 0;
        }
        estQty += 0;
      }
    });
    return { estQty, quantity };
  }

  // V cut Pully Single Wheel, Jali Wheel
  if (itemID === 3533) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const pQ = InputValues[index].slidingPanels * 2 * InputValues[index].qty;
      if (InputValues[index].slidingPanels > 0) {
        if (InputValues[index].width / 304.8 < 3) {
          estQty += pQ;
          quantity[index] = pQ
        }
        estQty += 0;
      }
    });
    return { estQty, quantity };
  }

  // Track
  if (itemID === 3417) {
    const quantity = []
    InputValues.forEach((data, index) => {
      let CountNumberOfPanelsForFlyMeshWidth = 0;
      if (
        InputValues[index].cFirstPanel?.Type === "Sliding" ||
        InputValues[index].cFirstPanel?.Type === "Fixed"
      ) {
        CountNumberOfPanelsForFlyMeshWidth += Number(
          InputValues[index].cFirstPanel?.customPanelWidth
        );
      }
      if (
        InputValues[index].cSecondPanel?.Type === "Sliding" ||
        InputValues[index].cFirstPanel?.Type === "Fixed"
      ) {
        CountNumberOfPanelsForFlyMeshWidth += Number(
          InputValues[index].cSecondPanel?.customPanelWidth
        );
      }
      if (
        InputValues[index].cThirdPanel?.Type === "Sliding" ||
        InputValues[index].cFirstPanel?.Type === "Fixed"
      ) {
        if (InputValues[index].cThirdPanel?.customPanelWidth === undefined) {
          CountNumberOfPanelsForFlyMeshWidth += 0;
        }
      }
      if (
        InputValues[index].cFourthPanel?.Type === "Sliding" ||
        InputValues[index].cFirstPanel?.Type === "Fixed"
      ) {
        if (InputValues[index].cFourthPanel?.customPanelWidth === undefined) {
          CountNumberOfPanelsForFlyMeshWidth += 0;
        }
      }
      const pQ =
        (InputValues[index].width / 304.8 / 16) * InputValues[index].qty;
      if (InputValues[index].slidingPanels > 0) {
        estQty += pQ;
        quantity[index] = pQ
      }
    });
    return { estQty, quantity };
  }

  // V cut Pully Double Wheel
  if (itemID === 3534) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const pQ = InputValues[index].slidingPanels * 2 * InputValues[index].qty;
      if (InputValues[index].slidingPanels > 0) {
        if (InputValues[index].width / 304.8 > 3) {
          estQty += pQ;
          quantity[index] = pQ
        }
        estQty += 0;
      }
    });
    return { estQty, quantity };
  }

  // Small Moon Lock with Strip
  if (itemID === 3535) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        (InputValues[index].cFirstPanel.Type === "Sliding" &&
          InputValues[index].cFourthPanel.Type === "Sliding") ||
          (InputValues[index].cFirstPanel.Type === "Sliding" &&
            InputValues[index].cThirdPanel.Type === "Sliding")
          ? 2
          : (InputValues[index].cFirstPanel.Type === "Openable" &&
            InputValues[index].cFourthPanel.Type === "Openable") ||
            (InputValues[index].cFirstPanel.Type === "Openable" &&
              InputValues[index].cThirdPanel.Type === "Openable")
            ? 2
            : InputValues[index].cFirstPanel.Type === "Openable" &&
              InputValues[index].cSecondPanel.Type === "Openable"
              ? 2
              : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (InputValues[index].multiLockingSystem === "No") {
        if (InputValues[index].slidingPanels > 0) {
          if (InputValues[index].height / 304.8 < 3) {
            estQty += pQ;
            quantity[index] = pQ
          }
          estQty += 0;
        }
      }
    });
    return { estQty, quantity };
  }

  // Large Moon Lock with Strip
  if (itemID === 3413) {
    const quantity = []
    InputValues.forEach((data, index) => {
      const multiLockNo =
        (InputValues[index].cFirstPanel.Type === "Sliding" &&
          InputValues[index].cFourthPanel.Type === "Sliding") ||
          (InputValues[index].cFirstPanel.Type === "Sliding" &&
            InputValues[index].cThirdPanel.Type === "Sliding")
          ? 2
          : (InputValues[index].cFirstPanel.Type === "Openable" &&
            InputValues[index].cFourthPanel.Type === "Openable") ||
            (InputValues[index].cFirstPanel.Type === "Openable" &&
              InputValues[index].cThirdPanel.Type === "Openable")
            ? 2
            : InputValues[index].cFirstPanel.Type === "Openable" &&
              InputValues[index].cSecondPanel.Type === "Openable"
              ? 2
              : 1;
      const pQ = multiLockNo * InputValues[index].qty;
      if (InputValues[index].multiLockingSystem === "No") {
        if (InputValues[index].slidingPanels > 0) {
          if (InputValues[index].height / 304.8 > 3) {
            estQty += pQ;
            quantity[index] = pQ
          }
          estQty += 0;
        }
      }
    });
    return { estQty, quantity };
  }
};

export default slidingConditions;
