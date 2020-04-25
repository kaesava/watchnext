import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
  
export default FiltersPanel = (props) => {
    const { filters, filterRemoved} = props;
    return (
        <View style={styles.container} >
        {
            filters.map(filter => {
                const onClickHandler = (selectedFilterKey) => {
                    filterRemoved(selectedFilterKey);
                }
                return(
                <TouchableHighlight style={styles.filterContainer} onPress={() => onClickHandler(filter.key)}>
                    <View style={styles.textContainer}><Text>{filter.name + "  x"}</Text></View>
                </TouchableHighlight>)
            })
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 15,
    },
    filterContainer: {
        flexDirection: 'row',
        margin: 5,
    },
    textContainer: {
        margin: 5,
        marginTop: 10,
        justifyContent: 'center',
        marginVertical: 10
    }
  });

