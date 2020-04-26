import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';

const Constants = require("../../../helpers/constants");

export default FilterSearchResult = (props) => {
    const {result, touchAction} = props;

    const fixKnownFor = ( knownFor ) => {
        if(!knownFor) {
            return ""
        }
        switch(knownFor) {
            case "Acting": return " (Actor)"
            case "Directing": return " (Director)"
            default: return ""
        }
    }

    return (
        <TouchableHighlight style={styles.container} onPress={() => touchAction(result)}>
            <>
            <View style={styles.imageContainer}>
            {
                (result.profilePath) ? <Image source={{uri: Constants.TMMDB_IMAGE_PREFIX + result.profilePath}}
                style={styles.image} /> : <></>
            }
            </View>
            <Text clearButtonMode="always" style={styles.textContainer}> {result.name + fixKnownFor(result.knownFor)} </Text>
            </>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container: {
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

