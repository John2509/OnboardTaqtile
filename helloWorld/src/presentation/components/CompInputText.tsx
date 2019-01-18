import React , { Component } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../styles";
import { IValidator } from "../../domain/Validator/IValidator";

export default class CompInputText extends Component<{
  title: string,
  value: string,
  onChangeText: {(text: string): void},
  onSubmitEditing?: any,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" | "visible-password" | "ascii-capable" | "numbers-and-punctuation" | "url" | "number-pad" | "name-phone-pad" | "decimal-pad" | "twitter" | "web-search" | undefined
  secureTextEntry?: boolean
  editable?: boolean,
  validator?: IValidator,
},{
  errorMessage: string,
}>
{
  private textRef: TextInput | null = null;

  constructor(props: any){
    super(props);
    this.state ={
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
              this.props.onChangeText(text);
              }
            } 
            value={this.props.value}
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
      var validate = this.props.validator.validate(this.props.value, size);
      this.setState({errorMessage: validate.message});
      return validate.valid;
    }
    return true;
  }
}