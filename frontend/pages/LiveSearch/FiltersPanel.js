import React from 'react';
import { StyleSheet, Text, Button, View, FlatList, TouchableHighlight } from 'react-native';

export default FiltersPanel = (props) => {
    const { filters, removeFilter } = props;

    return (
        <View style={styles.container} >

{
    /*

        <FlatList
            isVisible={filters && filters !== []}
            keyExtractor={(result) => result.type+"."+String(result.tId)}
            data={ filters }
            horizontal={false}
            ItemSeparatorComponent={() => <View style={{margin: 4}}/>}
            renderItem={ ({item}) => 
                <View style={styles.filterContainer}>
                    <View style={styles.textContainer}><Text>{item.name}</Text></View>
                    <View style={styles.buttonContainer}><Button title="x" onPress={(item) => removeFilter(item)} /></View>
                </View>
            }
            initialNumToRender={6}
        />
    */
}
        {
          filters.map(filter => {
            const onClickHandler = (filter) => {
                removeFilter(filter);
            }
              return(
            <TouchableHighlight key={filter.type+"."+filter.tId} style={styles.filterContainer} onPress={() => onClickHandler(filter)}>
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
        justifyContent: 'center',
        marginVertical: 10
    }
  });

