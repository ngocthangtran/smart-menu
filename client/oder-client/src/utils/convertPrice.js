export const shortenMoney = (money) => {
    return `đ${Intl.NumberFormat().format(money)}`
}

export const fixNumberFloat = (numberFloat) => {
    return Math.round(numberFloat * 1000) / 1000
}