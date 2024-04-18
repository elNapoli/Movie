export default function (number: any) {
    if (number < 10) {
        return `0${number}`
    }

    return `${number}`
}
