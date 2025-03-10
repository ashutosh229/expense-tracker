import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import Layout from '../components/Layout';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({message}) => {
  return (
    <Layout>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#4F46E5" />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </Layout>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#374151',
  },
});
