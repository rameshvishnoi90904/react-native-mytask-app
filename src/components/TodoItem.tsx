import React from "react";
import { task } from "../utils/types";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TodoItem = ({item, navigateToDetailScreen}: {item: task, navigateToDetailScreen: (item: task) => void}) => {
    const navigateToTask = () => {
        navigateToDetailScreen(item)
    }
    return (
        <TouchableOpacity testID={`todoItem-${item.id}`} style={styles.item} onPress={navigateToTask}>
            <View style={styles.taskHeader}>
                <Text>Id : {item.id}</Text>
                <Text>UserId : {item.userId}</Text>
            </View>
            <Text>Title : {item.title}</Text>
            <Text>Body : {item.body}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#EFEBE0',
        padding: 20,
        marginBottom: 8,
        borderRadius: 8
      },
    taskHeader: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
})

export default TodoItem;