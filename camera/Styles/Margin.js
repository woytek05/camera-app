export default function margin(a, b, c, d) {
    return {
        marginTop: a,
        marginRight: b ? b : a,
        marginBottom: c ? c : a,
        marginLeft: d ? d : b ? b : a,
    };
}
