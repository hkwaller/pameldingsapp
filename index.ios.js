/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

const React = require('react-native');
const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  StatusBarIOS
} = React;

const App = require('./components/App');
const {
  black
} = require('./utils/colors');

const pamelding = React.createClass({
  render: function() {
    StatusBarIOS.setStyle('light-content');
    return (
      <NavigatorIOS
        style={styles.container}
        barTintColor={black}
        tintColor={'rgb(253,81,88)'}
        titleTextColor={'rgb(253,81,88)'}
        translucent={false}
        initialRoute={{
          component: App,
          backButtonTitle: ' ',
          title: 'Hendelser'
        }}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('pamelding', () => pamelding);
