export const SumPriceObject = (object) => {
    
    var sumPrice = 0;
    Object.keys(object).forEach(item => {
        const { amount: amountProduct, selectPrice } = object[item];
        const { amount: amountForUnit, oderOption } = amountProduct

        if (oderOption) {
            sumPrice += selectPrice * amountForUnit * oderOption.factor
        } else {
            sumPrice += selectPrice * amountProduct.amount
        }
    })
    return sumPrice
}