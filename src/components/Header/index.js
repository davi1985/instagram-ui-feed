import { Image, View } from "react-native";

import logo from "../../assets/instagram.png";

import { styles } from "./styles";

export const Header = () => (
  <View style={styles.container}>
    <Image source={logo} />
  </View>
);
