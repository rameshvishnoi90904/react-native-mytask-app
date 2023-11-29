import { Button, FlatList, Platform, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native"
import React, { useContext, useEffect, useState } from "react";

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppContext, AppContextType } from "../state/context";
import { NavigationScreenPropsType, task } from "../utils/types";
import TodoItem from "../components/TodoItem";
type Props = NativeStackScreenProps<NavigationScreenPropsType, 'Home'>;

const HomeScreen = ({navigation, route}: Props) => {
    const navigateToDetailScreen = (item: task) => {
        navigation.navigate('TodoScreen', {item: item});
    }
    const {tasks, dispatch} = useContext(AppContext) as AppContextType;
    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        dispatch({type: 'search', data: null, searchInput: searchInput.toLowerCase()})
    },[searchInput])

    const addNewTask = () => {
        navigation.navigate('TodoScreen', {item: {title: '', body: '', id: 0, userId: 0}});
    }

    const emptySearchResult = () => {
        if (searchInput.length > 1) {
            return (
                <View style={{flex: 1}}>
                    <Text>No Tasks matching your search</Text>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1}}>
                    <Text>No Tasks pending</Text>
                </View>
            )
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchInput} placeholder="Search here" value={searchInput} onChangeText={setSearchInput}/>
            </View>
            <FlatList 
                data={tasks}
                testID="list-view"
                ListEmptyComponent={emptySearchResult()}
                renderItem={({item}) => <TodoItem item={item} navigateToDetailScreen={navigateToDetailScreen}/>}
                keyExtractor={item => String(item.id)}
            />
            <TouchableOpacity testID="add-new-task" style={styles.floatingButton} onPress={addNewTask}>
                <Text style={styles.addButton}>{'+'}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 12,
        paddingHorizontal: 16,
        flex: 1
    },
    
    searchContainer: {
        marginBottom: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#DCDCDC',
        ...Platform.select({
            ios: {
                paddingHorizontal: 8,
                paddingVertical: 10,
            },
            android: {
            },
        })
    },
    searchInput: {
        borderRadius: 12
    },
    floatingButton: {
        elevation: 4,
        position: "absolute",
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#FB8DA0',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        bottom: 50,
        right: 30
    },
    addButton: {
        color: 'white',
        fontSize: 40,
    }
})
  

export default HomeScreen;