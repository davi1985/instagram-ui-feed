import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  small: (ratio, opacity) => ({
    width: "100%",
    aspectRatio: ratio,
    opacity,
  }),
});
