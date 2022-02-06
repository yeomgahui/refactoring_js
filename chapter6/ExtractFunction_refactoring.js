function printOwing() {
    printBanner();

    //미해결 채무(outstanding)를 계산한다.


    const outstanding = calculateOutstanding(invoice);
    recordDueDate(invoice);
    printDetails(invoice, outstanding);

}
function calculateOutstanding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
        result += o.amount;
    }
    return result;
}
function recordDueDate(invoice) {
    //마감일(dueDate)를 기록한다.
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}
function printDetails(invoice, outstanding) {
    //세부사항을 출력한다.
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocalDateString()}`);
}

function printBanner() {
    console.log('"****************');
    console.log("**** 고객 채무 ****");
    console.log('"****************');
}