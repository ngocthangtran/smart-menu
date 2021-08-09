const date = new Date();
export const ProcessDate = {
    timeNow: () => {
        const time = `${date.getHours()}:${date.getMinutes()}`
        return time
    },
    dayNow: () => {
        const day = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        return day;
    }
}