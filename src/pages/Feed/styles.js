import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {},
  post: {
    marginTop: 10,
  },
  header: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  loading: {
    margin: 30,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  name: {
    color: "#333",
    fontWeight: "bold",
  },
  description: {
    padding: 15,
    lineHeight: 18,
  },
});
