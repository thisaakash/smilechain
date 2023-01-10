/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';


export default class App extends React.Component {
  
  state = {
    data: [],
    // liked: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const response = await fetch('https://theaakashprojects.cf/temp');
    const json = await response.json();
    this.setState({data: json.data});
  };

  // toggleLike = () => {
  //   this.setState(prevState => ({
  //     liked: !prevState.liked,
  //   }));
  // }

  renderItem = ({item}) => (
    <View style={styles.row}>
      <View>
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        <Text style={styles.name}>
          {item.first_name} {item.last_name}
        </Text>
      </View>
      <View>
        <Image source={{uri: item.img}} style={{height: 320, width: 320}} />
      </View>
      <View>
        {/* <TouchableOpacity onPress={this.toggleLike}>
          <Image
            source={
              liked
                ? 'https://i.ibb.co/9t80YrQ/fill.png'
                : 'https://i.ibb.co/f4b6NZT/h.png'
            }
            style={styles.heartButton}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );

  render() {
    return (
      <FlatList
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
      />
    );
  }
}

const styles = StyleSheet.create({
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
    height: 700,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    fontSize: 28,
    color: 'white',
  },
  heartButton: {
    width: 40,
    height: 40,
    marginTop: 10,
  },
  description: {
    fontSize: 54,
    color: 'white',
  },
  name: {
    fontSize: 20,
  },
});
