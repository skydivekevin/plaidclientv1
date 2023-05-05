import { LayoutAnimation } from "react-native";

export const toggleAnimation = {
  duration: 200,
  update: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  },

  delete: {
    duration: 200,
    property: LayoutAnimation.Properties.opacity,
    type: LayoutAnimation.Types.easeInEaseOut,
  }
}