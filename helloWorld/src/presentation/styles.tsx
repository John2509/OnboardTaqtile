import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 10,
    textAlign: 'left',
    color: '#000000'
  },
  textSmall: {
    fontSize: 16, 
    marginHorizontal: 25, 
    color: '#303030', 
    margin: 5
  },
  textWelcome: {
    fontSize: 28,
    color: '#803080'
  },
  textInput: {
    textAlign: 'left', 
    borderBottomColor: '#800080',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  textButton: {
    fontSize: 20,
    margin: 10,
    color: '#FFFFFF', 
    textAlign: 'center'
  },
  textButtonCircular: {
    color: '#FFFFFF',
    fontSize:40,
    fontWeight:"bold",
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf:"center",
  },
  textError: {
    fontSize: 10,
    margin: 5,
    textAlign: 'left',
    color: '#EE0040',
  },
  conteiner: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFDFF',
  },
  inputConteiner: {
    width: '100%', 
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonConteiner: {
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    alignSelf: 'center'
  },
  switchConteiner: {
    paddingTop: 10, 
    paddingLeft: 20, 
    alignItems: 'center',
    flexDirection: 'row', 
  },
  bottomConteiner: { 
    flexDirection: 'row',  
    width: Dimensions.get('window').width, 
    justifyContent: 'space-between'
  },
  button: {
    padding: 10,
    backgroundColor: '#660066',
    borderRadius:25,
  },
  buttonCircular: {
    height: 80,
    margin: 15,
    alignSelf: "center",
    aspectRatio: 1,
    padding: 10,
    backgroundColor: '#660066',
    borderRadius:80,
    justifyContent:"center"
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#2F001F40'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  onePicker: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    borderBottomColor: '#800080',
    borderBottomWidth: 1,
    borderTopWidth: 0
  },
  onePickerItem: {
    height: 100,
    color: 'black'
  }
});