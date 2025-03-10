import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Layout from '../components/Layout';

const HomeScreen: React.FC = () => {
  const scrollRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Smooth scrolling function
  const handleExplorePress = () => {
    scrollRef.current?.scrollTo({y: 300, animated: true});
  };

  // Fade-in animation for feature cards
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <Layout>
      <ScrollView ref={scrollRef} style={styles.scrollView}>
        {/* Header Section */}
        <LinearGradient
          colors={['#ff8c00', '#ff6a00']}
          style={styles.headerContainer}>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.appName}>Expense Tracker</Text>
          <Text style={styles.subtitle}>
            Track your income, expenses, dues, and payments efficiently. Gain
            insights and manage your financial health with ease.
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={handleExplorePress}>
            <Text style={styles.exploreText}>Explore ↓</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* Feature Section */}
        <View style={styles.featureSection}>
          {FEATURES.map((feature, index) => (
            <Animated.View
              key={index}
              style={[styles.card, {opacity: fadeAnim}]}>
              <LinearGradient
                colors={feature.colors}
                style={styles.cardContent}>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.cardDesc}>{feature.description}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const FEATURES = [
  {
    title: 'Track Income & Expenses',
    description: 'Easily log and manage your daily income and expenses.',
    colors: ['#4facfe', '#00f2fe'],
  },
  {
    title: 'Dues Management',
    description: 'Keep track of money you owe or money owed to you.',
    colors: ['#ff9966', '#ff5e62'],
  },
  {
    title: 'Visual Statistics',
    description: 'Get insights with detailed charts and analytics.',
    colors: ['#ff512f', '#dd2476'],
  },
  {
    title: 'Payment Integration',
    description: 'Manage payments and transactions securely.',
    colors: ['#11998e', '#38ef7d'],
  },
];

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffeb3b',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  exploreButton: {
    backgroundColor: '#ff4500',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginTop: 20,
  },
  exploreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  featureSection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 15,
    elevation: 5, // For shadow effect
  },
  cardContent: {
    padding: 20,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 14,
    color: '#fff',
  },
});

export default HomeScreen;
