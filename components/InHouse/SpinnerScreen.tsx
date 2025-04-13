/* eslint-disable react-native/no-inline-styles */
import {View} from 'react-native';
import {Spinner} from '../ui/spinner';

function SpinnerScreen() {
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#3B3C36',
          padding: 20,
          justifyContent: 'center',
        }}>
        <Spinner size={84} color={'#D6E500'} />
      </View>
    </>
  );
}

export default SpinnerScreen;
