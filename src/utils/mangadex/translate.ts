export const translateStatus = (status: string) => {
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

export const translateContentRating = (rating: string) => {
    switch (rating) {
        case 'suggestive':
            return 'Hơi hơi'
        case 'erotica':
            return 'Yesss'
        case 'pornographic':
            return 'Bùng lổ'
        default:
            return 'Không'
    }
}