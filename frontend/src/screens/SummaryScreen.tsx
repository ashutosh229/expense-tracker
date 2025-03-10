import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import Layout from '../components/Layout';
import {AnimatePresence, MotiView} from 'moti';
import {useCallback} from 'react';
import {Button} from 'react-native';

const API_BASE_URL = `${process.env.BACKEND_DOMAIN}/api/summary`;

type SummaryType = {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  excludedIncome: number;
  excludedExpenses: number;
  totalBorrowed: number;
  totalLent: number;
};

const SummaryScreen = () => {
  const [summary, setSummary] = useState<SummaryType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.data.success) {
        setSummary(response.data.data);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSummary().finally(() => setRefreshing(false));
  }, []);

  //   const formatCurrency = (amount: number) => numeral(amount).format('₹0,0.00');

  if (loading) {
    return (
      <Layout>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button title="Retry" onPress={fetchSummary} color="#ff4d4d" />
        </View>
      </Layout>
    );
  }

  return (
    <Layout>
      <LinearGradient colors={['#141e30', '#243b55']} style={styles.container}>
        <Text style={styles.title}>Financial Summary</Text>
        <AnimatePresence>
          <MotiView
            from={{opacity: 0, translateY: -20}}
            animate={{opacity: 1, translateY: 0}}
            transition={{type: 'spring', duration: 800}}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>
                Total Income: ₹{summary?.totalIncome || 0}
              </Text>
              <Text style={styles.summaryText}>
                Total Expenses: ₹{summary?.totalExpenses || 0}
              </Text>
              <Text
                style={[
                  styles.summaryText,
                  {
                    color:
                      (summary?.totalSavings ?? 0) >= 0 ? '#00ff00' : '#ff4d4d',
                  },
                ]}>
                Total Savings: ₹{summary?.totalSavings || 0}
              </Text>
            </View>
          </MotiView>
        </AnimatePresence>

        <AnimatePresence>
          <MotiView
            from={{opacity: 0, scale: 0.8}}
            animate={{opacity: 1, scale: 1}}
            transition={{type: 'spring', duration: 800}}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryText}>
                Excluded Income: ₹{summary?.excludedIncome || 0}
              </Text>
              <Text style={styles.summaryText}>
                Excluded Expenses: ₹{summary?.excludedExpenses || 0}
              </Text>
              <Text style={styles.summaryText}>
                Total Borrowed: ₹{summary?.totalBorrowed || 0}
              </Text>
              <Text style={styles.summaryText}>
                Total Lent: ₹{summary?.totalLent || 0}
              </Text>
            </View>
          </MotiView>
        </AnimatePresence>
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#ff4d4d',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#fff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  summaryText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default SummaryScreen;
