export default function formatarFecha(d: Date) {
    const addZero = (num: number) => (num < 10 ? '0' + num : num)
    const dformat =
        [addZero(d.getMonth() + 1), addZero(d.getDate()), d.getFullYear()].join(
            '/'
        ) +
        ' ' +
        [addZero(d.getHours()), addZero(d.getMinutes())].join(':')

    return dformat
}

export function getSupabaseClient() {
    return useSupabaseClient()
}
