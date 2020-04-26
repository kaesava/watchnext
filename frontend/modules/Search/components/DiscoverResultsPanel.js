import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, FlatList, Image } from 'react-native';

const Constants = require("../../../helpers/constants");

export default DiscoverResultsPanel = (props) => {
    const { results, touchAction } = props;

    return (
        <View style={styles.container} >
        { results && results.length > 0 &&
            <FlatList
                data={results}
                renderItem={ ({item}) => 
                    <DiscoverResult result={item} touchAction={touchAction}  /> 
                }
            />
        }
        </View>
    )
}

const DiscoverResult = (props) => {
    const { result, touchAction } = props;
    
    return (
        <TouchableHighlight style={styles.resultContainer} onPress={() => touchAction(result.tId)}>
            <>
            <View style={styles.imageContainer}>
            {// result.title, result.popularity, result.voteCount, result.posterPath, result.tId
                (result.posterPath) ? <Image source={{uri: Constants.TMMDB_IMAGE_PREFIX + result.posterPath}}
                style={styles.image} /> : <></>
            }
            </View>
            <Text clearButtonMode="always" style={styles.textContainer}> {result.title} </Text>
            </>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        alignContent: 'center',
        marginTop: 30,
        flex: 1,
        flexDirection: 'row',
        margin: 5

    },
    resultContainer: {
        flexDirection: 'row',
        marginTop: 5,
    },
    resultContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    imageContainer: {
        width: '20%'
    },
    textContainer: {
        alignSelf: 'center'
    },
    image: {
        width: 40,
        height: 40 
    },

  });

