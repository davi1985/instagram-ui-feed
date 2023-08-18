import { Animated, ImageBackground } from "react-native";
import { useEffect, useState } from "react";

import { styles } from "./styles";

export const LazyImage = ({ smallSource, source, aspectRatio, shouldLoad }) => {
  const opacity = new Animated.Value(0);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      setTimeout(() => {
        setLoaded(true);
      }, 200);
    }
  }, [shouldLoad]);

  const handleAnimated = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ImageBackground
      style={styles.small(aspectRatio)}
      source={{ uri: smallSource }}
      resizeMode="contain"
      blurRadius={1}
    >
      {loaded && (
        <Animated.Image
          style={styles.small(aspectRatio, opacity)}
          source={{ uri: source }}
          resizeMode="contain"
          onLoadEnd={handleAnimated}
        />
      )}
    </ImageBackground>
  );
};
