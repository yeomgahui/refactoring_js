function circum(radius) {
    return 2 * Math.PI * radius;
}
function circumference(radius) {
    return 2 * Math.PI * radius;
}

function inNewEngland(aCustomer) {
    return ["MA", "CA", "ME", "VT", "NH", "RI"].includes(aCustomer.addresss.state);
}
const inNewEngland = someCustomers.filter(c => inNewEngland(c));


function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return ["MA", "CA", "ME", "VT", "NH", "RI"].includes(stateCode);
}

function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return xxNEWinNewEngland(stateCode);
}
function xxNEWinNewEngland(stateCode) {
    return ["MA", "CA", "ME", "VT", "NH", "RI"].includes(stateCode);
}

