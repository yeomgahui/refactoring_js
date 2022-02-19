reading = { customer: "ivan", quantity: 10, month: 5, year: 2017 };

//client1
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity; // 기본 요금 계산 코드

//Clinet2
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.math(0, base - taxThreshold(aReading.year)); //세금 부과할 소비량 계산 코드

//Client3
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
    return baseRate(aReading.month, aReaing.year) * aReading.quantity;
}

//1. 입력 각체를 복사해 반환하는 변환 함수
function enrichReading(original) {
    const result = _.cloneDeep(original); //lodash 함수
    result.baseCharge = calculateBaseCharge(result); //미가공 측정값에 기본 소비량을 부가 정보로 덧붙임
    result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
    return result;
}

// 2. 계산 로직 중 하나를 고른다. 
const rawReading = acquireReading(); // 미가공 측정값
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.baseCharge;

//client1
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;

//Clinet2
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const taxableCharge = aReading.taxableCharge;