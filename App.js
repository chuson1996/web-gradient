import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import allGradients from './gradients.json';
import sampleSize from 'lodash/sampleSize';
import { LinearGradient } from 'expo'
import color from 'tinycolor2';

export default class App extends React.Component {
  state = {
    gradients: sampleSize(allGradients, 10)
  }

  changeGradients = () => {
    this.setState({
      gradients: sampleSize(allGradients, 10)
    });
  }

  render() {
    const { gradients } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.text, styles.h1, styles.white]}>
            Web Gradients
          </Text>
          <Text style={[styles.text, styles.white]}>
            Linear Gradients from webgradients.com
          </Text>
        </View>
        <FlatList
          data={gradients}
          onRefresh={this.changeGradients}
          refreshing={false}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() =>
            <View style={[styles.seperator]}/>
          }
          renderItem={({ item }) => 
            <LinearGradient
              colors={item.colors}
              style={[styles.gradientWrapper]}
              start={[0, 0.5]}
              end={[1, 0.5]}
            >
              <Text style={[styles.text, styles.gradientName, color(item.colors[0]).isDark() ? styles.white : {}]}>
                {item.name}
              </Text>
              <View style={[styles.colorsStringContainer]}>
                <Text style={[styles.text, color(item.colors[0]).isDark() ? styles.white : {}]}>{item.colors[0]}</Text>
                <Text style={[styles.text, { marginLeft: 10 }, color(item.colors[0]).isDark() ? styles.white : {}]}>{item.colors[1]}</Text>
              </View>
            </LinearGradient>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#241937',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  header: {
    paddingVertical: 30,
    alignItems: 'center'
  },
  white: {
    color: '#fff'
  },
  h1: {
    fontSize: 30,
  },
  text: {
    backgroundColor: 'transparent',
  },
  gradientWrapper: {
    height: 70,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: 'row'
  },
  seperator: {
    height: 10,
  },
  gradientName: {
    fontWeight: 'bold',
  },
  colorsStringContainer: {
    flexDirection: 'row'
  }
});
