import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export function GenerateQR() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Put1Scene!</Text>
        <Text style={styles.subtitle}>Put1Scene!</Text>
      </View>
      <View>
        <Text style={styles.description}>
          Connect with <Text style={styles.bold}>humans</Text> only. No
          advertising or other bs in your inbox.{'\n'}
          Tap below to create your unique QR Code.
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Generate</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Made in Bengaluru</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D6E500', // Match the yellowish-green background
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'space-between',
    padding: 20,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 1,
  },
  title: {
    fontSize: 62,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Geist-Regular',
    lineHeight: 48,
    marginBottom: -5,
  },
  subtitle: {
    fontSize: 62,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Geist-Regular',
    opacity: 0.3,
    marginTop: -14,
    verticalAlign: 'top',
  },
  description: {
    fontSize: 22,
    color: '#000',
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'Geist-Regular',
    fontWeight: '500',
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    color: '#000',
  },
});
