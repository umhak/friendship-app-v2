import { StyleSheet } from 'react-native';
import { colors, paddings, fonts } from '../../styles';

export default StyleSheet.create({
  eventsList: {
    flex: 1,
    backgroundColor: colors.MEDIUM_GREY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.BOLD,
    padding: paddings.MD,
  },
});
