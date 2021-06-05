export const shortenMoney = (money)=>{
    if(typeof(money)!=="string"){
        money = money.toString()
    }
    return money.slice(0,-3)+"k"
}