import * as React from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import AccordionItem from './AccordionItem';

const Accordion = (props) => {

  return (
    <View style={styles.container}>
      <AccordionItem data={props.data} />
    </View>
  );
};
export default Accordion;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
  }
});
