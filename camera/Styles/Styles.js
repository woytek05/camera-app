import { StyleSheet } from "react-native";
import colors from "./Colors";
import margin from "./Margin";

module.exports = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    headerContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.darkPrimaryColor,
    },
    alignItemsCenter: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    spaceAround: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    smallHeader: {
        fontSize: 20,
        color: colors.secondaryText,
        fontWeight: "bold",
        textAlign: "center",
    },
    header: {
        fontSize: 52,
        color: colors.darkPrimaryColor,
        textAlign: "center",
    },
    myFont: {
        fontFamily: "myfont",
    },
    input: {
        height: 40,
        width: 200,
        color: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.white,
    },
    marginTop: {
        marginTop: 20,
    },
    smallMarginTop: {
        marginTop: 5,
    },
    marginBottom: {
        marginBottom: 20,
    },
    smallMarginBottom: {
        marginBottom: 5,
    },
    flex1: {
        flex: 1,
    },
    flex2: {
        flex: 2,
    },
    flex4: {
        flex: 4,
    },
    flex8: {
        flex: 8,
    },
    row: {
        flexDirection: "row",
    },
    avatar: {
        width: 75,
        height: 75,
    },
    bigAvatar: {
        width: 200,
        height: 200,
    },
    text: {
        fontSize: 16,
        color: colors.darkPrimaryColor,
        fontWeight: "bold",
    },
    redBackground: {
        backgroundColor: "red",
    },
    image: {
        width: 50,
        height: 50,
    },
    rule: {
        zIndex: 1,
        elevation: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.accentColor,
        position: "absolute",
    },
    verticalRule: {
        width: 1,
        height: 40,
    },
    horizontalRule: {
        width: 40,
        height: 1,
    },
    lowOpacity: {
        opacity: 0.3,
    },
    animatedView: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        opacity: 1,
        height: "100%",
        overflow: "scroll",
    },
});
