// styles/GlobalStyles.js
import { StyleSheet } from "react-native";

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  titleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#148C94', // Changed color to teal
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  // inputFocused: {
  //   borderColor: "#008080",
  //   borderBottomWidth: 2,
  // },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: 'center', // Center-align error text
  },
  button: {
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#148C94",
    marginBottom: 10,
  },
  disabledButton: {
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    backgroundColor: "#9f9f9f",
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonWrapper: {
    borderRadius: 4,
    overflow: "hidden",
  },
  buttonGradient: {
    borderRadius: 4,
  },
  draggableContainer: {
    marginBottom: 16,
  },
  
});

export default GlobalStyles;
