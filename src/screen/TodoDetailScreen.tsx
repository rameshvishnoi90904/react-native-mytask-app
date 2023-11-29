import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Button, SafeAreaView, Alert, Pressable, Platform } from "react-native";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationScreenPropsType } from "../utils/types";
import { AppContext, AppContextType } from "../state/context";

type Props = NativeStackScreenProps<NavigationScreenPropsType, 'TodoScreen'>;

const TodoDetailScreen = ({navigation, route}: Props) => {
    const { item } = route.params;
    const [title, setTitle] = useState(item?.title)
    const [body, setBody] = useState(item?.body)
    const [editMode, setEditMode] = useState(!item?.title)

    const {tasks, dispatch} = useContext(AppContext) as AppContextType;

    const onEdit = () => {
        setEditMode(true)
    }
    const onDelete = () => {
        Alert.alert('Are you sure?','',[{
            text: 'Yes',
            onPress: () => {
                dispatch({type: 'delete', data: item, searchInput: ''})
                navigation.goBack();
            }
        },{
            text: 'No',
            onPress: () => {

            }
        }])
    }

    const onSave = () => {
        if (title && body) {
            dispatch({type: 'update', data: {id: item?.id || 0, userId: item?.userId || 0, title: title, body: body}, searchInput: ''})
            navigation.goBack();
        }
    }
    const onRevert = () => {
        Alert.alert('Are you sure?','',[{
            text: 'Yes',
            onPress: () => {
                setTitle(item?.title);
                setBody(item?.body)
                setEditMode(false);
            }
        },{
            text: 'No',
            onPress: () => {
                setEditMode(false);
            }
        }])
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.paddingStyle}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Title</Text>
                    <View style={styles.inputTextWrapper}>
                        {
                            editMode ?
                                <TextInput 
                                style={styles.titleStyle} 
                                value={title}
                                onChangeText={setTitle}
                                placeholder="Enter your Title here"
                                multiline
                                />
                            :
                            <Text style={styles.titleStyle} >{title}</Text>
                        }
                    </View>
                    
                </View>
                <ScrollView contentContainerStyle={styles.bodyContainer} style={{flex:1}}>
                    <Text style={styles.titleText}>Body</Text>
                    <View style={styles.inputTextWrapper}>
                        {
                            editMode ?
                                <TextInput 
                                    value={body}
                                    onChangeText={setBody}
                                    style={styles.bodyTextStyle}
                                    placeholder="Enter your Body here"
                                    multiline
                                />
                            :
                            <Text style={styles.bodyTextStyle}>{body}</Text>
                        }
                    </View>
                </ScrollView>
                {/* <Text>Created by : {item.userId}</Text> */}
                {
                    editMode ?
                    <View style={styles.actionButtonContainer}>
                        <Pressable onPress={onSave} style={styles.buttonStyle}><Text style={styles.buttonText}>Save</Text></Pressable>
                        <Pressable onPress={onRevert} style={styles.buttonStyle}><Text style={styles.buttonText}>Revert</Text></Pressable>
                    </View>
                    :
                    <View style={styles.actionButtonContainer}>
                        <Pressable onPress={onEdit} style={styles.buttonStyle}><Text style={styles.buttonText}>Edit</Text></Pressable>
                        <Pressable onPress={onDelete} style={styles.buttonStyle}><Text style={styles.buttonText}>Delete</Text></Pressable>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEBE0',
        ...Platform.select({
            android: {
                paddingBottom: 12
            }
        })
    },
    paddingStyle: {
        paddingHorizontal: 8,
        flex: 1
    },
    titleContainer: {
        marginVertical: 16,
    },
    titleStyle: {
        paddingTop: 0,
        fontSize: 20,
        fontWeight: "bold",
        color: "#333333",
        ...Platform.select({
            android: {
                paddingVertical: 0,
                paddingHorizontal: 0
            }
        })
    },
    bodyContainer: {
        marginBottom: 12,
        flex: 1,
    },
    actionButtonContainer: {
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    titleText: {
        fontSize: 15
    },
    bodyTextStyle: {
        paddingTop: 0,
        color: "#333333",
        ...Platform.select({
            android: {
                paddingVertical: 0,
                paddingHorizontal: 0
            }
        })
    },
    inputTextWrapper: {
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 8,
        borderColor: '#DCDCDC',
        ...Platform.select({
            android: {
                padding: 0,
                paddingVertical: 12,
            }
        })
    },
    buttonStyle: {
        backgroundColor: '#FB4570',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginHorizontal: 6,
        borderRadius: 8,
    },
    buttonText: {
        color: '#EFEBE0',
        fontSize: 18
    }

})

export default TodoDetailScreen;