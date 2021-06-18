function getFormattedDate(timeInMilliseconds) {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    return new Date(timeInMilliseconds).toLocaleDateString("da", options);
}

export default { getFormattedDate };
