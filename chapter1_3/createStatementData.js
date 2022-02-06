class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;
        this.play = aPlay;
    }
    get amount() { //값이 바뀌지 않는 변수는 배개변수로 전달
        throw new Error("서브클래스에서 처리하도록 설계되었습니다.")
    } //amountFor 끝
    get volumeCredits() {
        return Math.max(this.performance.audience - 30, 0);
    }
}
class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;
        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }
        return result;
    }
}
class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 0;
        switch (this.play.type) {
            case "tragedy":
                throw '오류 발생';
            case "comedy":
                result = 30000;
                if (this.performance.audience > 20) {
                    result += 10000 + 500 * (this.performance.audience - 20);
                }
                result += 300 * this.performance.audience;
                break;
            default:
                throw new Error(`알 수 없는 장르: ${this.play.type}`)
        }
        return result;
    }
    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}

export default function createStatementData(invoice, plays) { //중간 데이터 생성 전담 함수
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance) {
        const caculator = createPerformanceCalculator(aPerformance, playFor(aPerformance)); //공연료 계산기 생성
        const result = Object.assign({}, aPerformance); //얕은 복사 수행
        result.play = caculator.play;
        result.amount = caculator.amount;
        result.volumeCredits = caculator.volumeCredits;
        return result;
    }
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }
    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }
    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }
}
function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
        case "comedy": return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`알 수 없는 장르: ${aPlay.type}`)
    }
}