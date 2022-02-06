export default function createStatementData(invoice, plays) { //중간 데이터 생성 전담 함수
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }
    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }

    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance); //얕은 복사 수행
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === aPerformance.play.type) result += Math.floor(aPerformance.audience / 5);
        return result;
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
    function amountFor(aPerformance) { //값이 바뀌지 않는 변수는 배개변수로 전달
        let result = 0; //변수를 초기화하는 코드
        switch (aPerformance.play.type) {
            case "tragedy": //비극
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy": //희극
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`알수 없는 장르 : ${aPerformance.play.type}`)
        }
        return result;
    } //amountFor 끝
}