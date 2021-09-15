import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'
interface Styles {
  badge: ViewStyle
  badgeContainer: ViewStyle
  label: TextStyle
}

export default StyleSheet.create<Styles>({
  badge: {
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 4.8,
    textAlign: 'center',
    borderRadius: 10,
  },
  badgeContainer: {
    padding: 2,
    marginBottom: -12,
    marginRight: -25,
    zIndex: 1,
    alignItems: 'center',
    borderRadius: 10,
  },
  label: {
    fontWeight: '500',
  },
})
