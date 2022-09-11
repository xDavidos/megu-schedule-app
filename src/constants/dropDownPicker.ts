import { StyleSheet } from 'react-native';
import theme from './style';

export default StyleSheet.create({
  container: {
    width: '100%',
  },
  style: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    minHeight: 50,
    marginLeft: 10,
    paddingVertical: 3
  },
  label: {
    flex: 1,
    ...theme.textVariants.body3
    //textAlign: 'center',
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  arrowIcon: {
    width: 20,
    height: 20
  },
  tickIcon: {
    width: 20,
    height: 20
  },
  closeIcon: {
    width: 30,
    height: 30
  },
  badgeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  badgeDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10 / 2,
    marginRight: 8,
  },
  badgeSeparator: {
    width: 5,
  },
  listBody: {
    height: '100%',
  },
  listBodyContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  dropDownContainer: {
    position: 'absolute',
    backgroundColor: '#faf9f9',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    width: '100%',
    overflow: 'hidden',
    zIndex: 1000
  },
  modalContentContainer: {
    flexGrow: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 40,
  },
  listItemLabel: {
    flex: 1,
    color: '#000',
    ...theme.textVariants.body3
  },
  iconContainer: {
    marginRight: 10
  },
  arrowIconContainer: {
    marginLeft: 10
  },
  tickIconContainer: {
    marginLeft: 10
  },
  closeIconContainer: {
    marginLeft: 10
  },
  listParentLabel: {

  },
  listChildLabel: {

  },
  listParentContainer: {

  },
  listChildContainer: {
    paddingLeft: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchTextInput: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderColor: theme.colors.blueGray,
    borderWidth: 1,
    color: theme.colors.gray
  },
  itemSeparator: {
    height: 1,
    backgroundColor: theme.colors.white,
  },
  flatListContentContainer: {
    flexGrow: 1
  },
  customItemContainer: {

  },
  customItemLabel: {
    fontStyle: 'italic'
  },
  listMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  listMessageText: {

  },
  selectedItemContainer: {

  },
  selectedItemLabel: {

  },
  modalTitle: {
    fontSize: 18,
    //color: Colors.BLACK
  },
  extendableBadgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  extendableBadgeItemContainer: {
    marginVertical: 3,
    marginEnd: 7
  }
});