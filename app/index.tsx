import { Text, View } from "react-native";
import { StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#D7EC39',
      }}
    >
      <Text style = {styles.titleFont}>Put1Scene</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
  titleFont: {
    color: "black",
    fontWeight: "bold",
    fontSize: 40,
    fontFamily: "Geist-Regular",
  }
});

