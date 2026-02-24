export const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export const formatDateISO = (dateString: string) => {
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
}