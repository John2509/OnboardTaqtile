import React , { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../scr/styles";
import { validator } from "../scr/validator";

export default class UserInputText extends Component<{
  title: string,
  onChangeText?: any,
  onSubmitEditing?: any,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "number-pad" | "name-phone-pad" | "decimal-pad" | "twitter" | "web-search" | undefined
  secureTextEntry?: boolean
  editable?: boolean,
  value?: string,
  validator?: validator,
},{
  text: string,
  errorMessage: string,
}>
{
  private textRef: TextInput | null = null;

  constructor(props: any){
    super(props);
    this.state ={
      text: this.props.value || "",
      errorMessage: '',
    };
  }

  static defaultProps = {
    onChangeText: () => {return},
    onSubmitEditing: () => {return},
    keyboardType: "default",
    secureTextEntry: false,
    editable: true,
    value: "",
  };

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
            value={this.props.value || this.state.text}
            keyboardType={this.props.keyboardType}
            blurOnSubmit={false}
            ref={(input) => {this.textRef = input}}
            onSubmitEditing={() => this.props.onSubmitEditing()}
            editable={this.props.editable}
          />
          <Text style={styles.textError}> {this.state.errorMessage}</Text>
        </View>
    )
  }

  public focus() {
    if (this.textRef)
      this.textRef.focus();
  }

  public isValid(size?: number) : boolean {
    if (this.props.validator){
      var validate = this.props.validator(this.state.text, size);
      this.setState({errorMessage: validate.message});
      return validate.valid;
    }
    return true;
  }
}