import React , { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../scr/styles";

export default class UserInputText extends Component<{
  title: string,
  onChangeText: any,
  errorMessage: string,
  keyboardType: "default" | "email-address" | "numeric" | "phone-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "number-pad" | "name-phone-pad" | "decimal-pad" | "twitter" | "web-search" | undefined
  setRef: any,
  onSubmitEditing: any,
  editable: boolean,
  secureTextEntry: boolean
},{
  text: string,
}>
{
  private textRef: any;

  constructor(props: any){
    super(props);
    this.state ={
      text: "",
    };
  }

  render() {
    return (
      <View style={styles.inputConteiner}>
          <Text style={styles.text}>{this.props.title}:</Text>
          <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={this.props.secureTextEntry}
            style={styles.textInput}
            onChangeText={(text) =>{
              this.setState({ text: text });
              this.props.onChangeText(text);
              }
            } 
            value={this.state.text}
            keyboardType={this.props.keyboardType}
            blurOnSubmit={false}
            ref={(input) => {this.textRef = input; this.props.setRef(input); }}
            onSubmitEditing={() => this.props.onSubmitEditing()}
            editable={this.props.editable}
          />
          <Text style={styles.textError}> {this.props.errorMessage}</Text>
        </View>
    )
  }

  public focus() {
    this.textRef.focus();
  }
}