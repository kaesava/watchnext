import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
const Constants = require("../../../helpers/constants");
const Functions = require("../../../helpers/functions");

export default MovieDetailPanel = (props) => {
    const {selectedMovie} = props;
    return (
        <View style={styles.container}>
            <Text style={styles.titleFormat}>{selectedMovie.title}</Text>
            { selectedMovie.tagline && selectedMovie.tagline !== "" && 
            <Text style={styles.fieldFormat}>{selectedMovie.tagline}</Text>
            }
            <View style={styles.imageContainer}>
            { selectedMovie.posterPath && <Image style={styles.image} source={{uri: Constants.TMMDB_IMAGE_LARGE_PREFIX + selectedMovie.posterPath}}/>
            }
            </View>
            { selectedMovie.revenue && selectedMovie.revenue > 0 && 
            <Text style={styles.fieldFormat}>Revenue Raised: US {Functions.currencyFormat(selectedMovie.revenue)}</Text>
            }
            { selectedMovie.runTime && selectedMovie.runTime > 0 && 
            <Text style={styles.fieldFormat}>{"Runtime: " + selectedMovie.runTime + " mins"} </Text>
            }
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flexDirection: 'column',
        alignItems: 'center'
    },
    imageContainer: {
        paddingTop: 50,
    },
    image: {
        width: 342,
        height: 342
    },
    titleFormat: {
        fontSize: 32,
        alignSelf: 'center'
    },
    fieldFormat: {
        fontSize: 16,
        paddingTop: 15,
    }
  });

