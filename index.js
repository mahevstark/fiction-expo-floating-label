
import React, { Component } from "react";
import {
  View,
  Animated,
  TextInput,
  Dimensions
} from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);
const defaultStyles = {
  labelStyle: {
    position: 'absolute',
    left: 0,
    top:0,
  },
  textInput: {
      fontSize: 14, 
      color: '#000', 
      marginTop:0,
      paddingVertical:10, 
      marginTop:3
    },
    focusedTextInput: {
    },
    selectionColor: '#7165E3',
    defaultContainerStyle: {  
        marginTop: viewportHeight * (2 / 100), 
        alignSelf: "center", 
        width: viewportWidth * (90 / 100), 
        backgroundColor: "#FFFFFF",  
        borderRadius: 10,
        paddingHorizontal:12, 
      },

    defaultFocusedContainerStyle:{
        shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
     },

     defaultUnFocusedContainerStyle:{
        borderWidth:1,
        borderColor:"#7165E3"
      },
      defaultSubContainerStyle:{
        // flexDirection:"row",
        // alignItems:"center",
        // width:"100%"
      }
}


class FictionFloatingLabelInput extends Component {
    state = {
      isFocused: false,
    };
  
    componentWillMount() {
      this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }
  
    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });
  
    componentDidUpdate() {
      console.log("s");
      Animated.timing(this._animatedIsFocused, {
        toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
        duration: 200,
        useNativeDriver:false
      }).start();
    }
  
    render() {
      const { 
        label, 
        containerStyle, 
        focusedContainerStyle,  
        unFocusedContainerStyle, 
        subContainerStyle,
        focusedSubContainerStyle,
        unfocusedSubContainerStyle,
        selectionColor,
        labelStyle,
        focusedLabelStyle,
        unfocusedLabelStyle,
        textInputStyle,
        focusedTextInputStyle,
        unFocusedTextInputStyle,
        labelFocusedTop,
        labelUnFocusedTop,
        labelFontSizeUnFocused,
        labelFontSizeFocused,
        labelColorUnFocused,
        labelColorFocused,
        underlineColorAndroid,
        preOnFocus,
        preOnBlur,
        postOnFocus,
        postOnBlur,
        ...props } = this.props;
      const { isFocused } = this.state;
      const style = defaultStyles;
      const animatedLabelStyle = {
        top: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [labelUnFocusedTop?labelUnFocusedTop:15, labelFocusedTop?labelFocusedTop:2],
        }),
        fontSize: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [labelFontSizeUnFocused?labelFontSizeUnFocused:14, labelFontSizeFocused?labelFontSizeFocused:10],
        }),
        color: this._animatedIsFocused.interpolate({
          inputRange: [0, 1],
          outputRange: [labelColorUnFocused?labelColorUnFocused:'#8B8B8B', labelColorFocused?labelColorFocused:'#8B80F4'],
        }),
      };
      return (
        <View style={[
            style.defaultContainerStyle,
            containerStyle,
          !isFocused ? style.defaultFocusedContainerStyle:style.defaultUnFocusedContainerStyle,
          !isFocused ? focusedContainerStyle:unFocusedContainerStyle,
          ]}>
            <View style={[style.defaultSubContainerStyle,subContainerStyle,isFocused?focusedSubContainerStyle:unfocusedSubContainerStyle]}>
              <Animated.Text style={[style.labelStyle,animatedLabelStyle,labelStyle, isFocused?focusedLabelStyle:unfocusedLabelStyle]}>
                {label}
              </Animated.Text>
              <TextInput
                {...props}
                style={[style.textInput,isFocused&&style.focusedTextInput, isFocused?focusedTextInputStyle:unFocusedTextInputStyle, textInputStyle]}
                onFocus={()=>{
                  preOnFocus && preOnFocus()
                  this.handleFocus()
                  postOnFocus && postOnFocus()
                }}
                onBlur={()=>{
                  preOnBlur && preOnBlur()
                  this.handleBlur()
                  postOnBlur && postOnBlur()
                }}
                onBlur={this.handleBlur}
                blurOnSubmit
                selectionColor={selectionColor?selectionColor:style.selectionColor}
                underlineColorAndroid={underlineColorAndroid?underlineColorAndroid:"transparent"}
                
              />
            </View>
        </View>
      );
    }
  }
  
export { FictionFloatingLabelInput }
  