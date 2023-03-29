function dateFormat(date) {
    let rs = new Date(date);

    return rs.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export { dateFormat };
