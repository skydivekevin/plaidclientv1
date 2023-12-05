import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "../../utils/httpUtils";
import UserContext from "../../context/UserContext";
import {
  isValidEmail,
  validateEmptyFields,
  validatePassword,
} from "../../utils/validationUtils";

const CreateAccount = () => {
  const { setToken, setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSelected, setIsSelected] = useState();
  const [error, setError] = useState();

  const register = async () => {
    const data = {
      firstName,
      lastName,
      password,
      email,
      phoneNumber,
    };

    const emptyFields = validateEmptyFields(data);
    if (emptyFields.length > 0) {
      setIsSelected(emptyFields);
      setError(["Please fill in all fields."]);
      return;
    }

    if (!isValidEmail(email)) {
      setIsSelected(["email"]);
      setError(["Invalid email"]);
      return;
    }

    if (!validatePassword(password)) {
      setIsSelected(["password"]);
      setError(["Password must be at least 8 characters long."]);
      return;
    }

    Auth()
      .postJson("register", data)
      .then((response) => {
        if (response.response.data.errors) {
          handleError(response.response.data.errors)
          return;
        }
        const token = response.data.token;
        const user = response.data.user;

        setToken(token);
        setUser(user);
        navigation.navigate("Dashboard");
      })
      .catch(function (error) {
        if (error) {
          console.log("error: ", error);
        }
      });
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters from the input value
    const phoneNumberDigits = value.replace(/\D/g, "");

    // Format the phone number as (xxx) xxx-xxxx
    const formattedPhoneNumber = phoneNumberDigits.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "($1) $2-$3"
    );

    return formattedPhoneNumber;
  };

  const handleError = (errors) => {
    const errorMessages = errors.map((error) => error.msg);
    const errorFields = errors.map((error) => error.field);
    setError(errorMessages);
    setIsSelected(errorFields);
  };

  return (
    <View style={styles.appContainer}>
      <Text style={styles.screenTitle}>Create Account</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            isSelected?.includes("firstName") && styles.selectedInputContainer,
          ]}
          placeholder="First Name"
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            isSelected?.includes("lastName") && styles.selectedInputContainer,
          ]}
          placeholder="Last Name"
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            isSelected?.includes("phoneNumber") &&
              styles.selectedInputContainer,
          ]}
          placeholder="Phone Number"
          onChangeText={(value) => setPhoneNumber(formatPhoneNumber(value))}
          value={phoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            isSelected?.includes("email") && styles.selectedInputContainer,
          ]}
          placeholder="Email"
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.textInput,
            isSelected?.includes("password") && styles.selectedInputContainer,
          ]}
          placeholder="Password"
          onChangeText={setPassword}
        />
      </View>
      <View>
        <Button title="Create Account" onPress={() => register()} />
        <View style={styles.errorMessageContainer}>
          {error?.length > 0 &&
            error?.map((err) => {
              console.log("err", err);
              return <Text style={styles.errorMessage}>{err}</Text>;
            })}
        </View>
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 30,
    paddingHorizontal: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    width: "100%",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8,
    borderRadius: 10,
  },
  screenTitle: {
    flexDirection: "column",
    alignItems: "center",
    fontSize: 50,
  },
  selectedInputContainer: {
    borderColor:'rgba(255, 82, 82, 0.5)', // Red border color when selected
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 235, 238, 0.3)', // Light red background when selected
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Android elevation for shadow
  },
  errorMessage: {
    color: "rgba(255, 0, 0, 0.8)",
    fontSize: 18,
  },
  errorMessageContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
});
