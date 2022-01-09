import React, { useRef, useState } from "react";
import auth from "@react-native-firebase/auth";
import styled from "styled-components";
import { ActivityIndicator } from "react-native";

const Container = styled.View`
  background-color: black;
  padding: 10px 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.TextInput`
  height: 50px;
  box-shadow: 5px 10px;
  background-color: rgba(255, 255, 255, 0.5);
  width: 100%;
  border-radius: 25px;
  padding: 0px 20px;
  margin: 10px 20px;
  box-shadow: 10px 5px 5px black;
`;

const Btn = styled.TouchableOpacity`
  background-color: #1a8cd8;
  margin: 10px 20px;
  height: 40px;
  width: 100%;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text``;

const Join = () => {
  const passwordInput = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitEmailEditing = () => passwordInput.current.focus();
  const onSubmitPasswordEditing = async () => {
    if (email === "" || password === "") {
      return Alert.alert("Fill in the Form");
    }
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const credential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(credential);
    } catch (e) {
      console.error(e.code);
    }
  };

  return (
    <Container>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        value={email}
        returnKeyType="next"
        onChangeText={(text) => setEmail(text)}
        onSubmitEditing={onSubmitEmailEditing}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
      />
      <TextInput
        ref={passwordInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        returnKeyType="done"
        onChangeText={(text) => setPassword(text)}
        placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
        onSubmitEditing={onSubmitPasswordEditing}
      />
      <Btn onPress={onSubmitPasswordEditing}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <BtnText>Join</BtnText>
        )}
      </Btn>
    </Container>
  );
};

export default Join;
