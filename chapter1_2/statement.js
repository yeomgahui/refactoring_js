import INVOICE from '../invoices.json';
import PLAYS from '../plays.json';
import createStatementData from './createStatementData.js';

function statement(invoice, plays) {

    return renderPlainText(createStatementData(invoice, plays));
} //statement end

function renderPlainText(data, plays) {
    let result = `청구 내역 (고객: ${data.customer})\n`;
    for (let perf of data.performances) {
        //청구 내역을 출력한다.
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }
    result += `총액: ${usd(data.totalAmount)}\n`;
    result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
    console.log(result);
    return result;

}
function htmlStatement(invoice, plays) {
    return renderHTML(createStatementData(invoice, plays));
}
function renderHTML(data) {
    let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th>";
    for (let perf of data.performances) {
        result += ` <tr><td>${perf.play.name}</td><td>${perf.audience}석</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`
    }
    result += "</table>\n";
    result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
    result += `<p>적립 포인트: <em>${data.totalVolumeCredits}</em>점</p>\n`

}
function usd(aNumber) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(aNumber / 100);
}
htmlStatement(INVOICE[0], PLAYS);
statement(INVOICE[0], PLAYS);