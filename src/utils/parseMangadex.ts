export const parseStatus = (status: 'completed' | 'ongoing' | 'cancelled' | 'hiatus') => {
    switch (status) {
        case 'cancelled':
            return "Bị huỷ"
        case 'completed':
            return "Đã kết thúc"
        case 'hiatus':
            return "Tạm ngưng"
        default:
            return "Đang tiến hành"
    }
}