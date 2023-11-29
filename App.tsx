/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
} from 'react-native';
import LaunchScreen from './src/screen/LaunchScreen';
import HomeScreen from './src/screen/HomeScreen';
import { NavigationScreenPropsType, task, dispatchActionType } from './src/utils/types';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TodoDetailScreen from './src/screen/TodoDetailScreen';
import { AppContext } from './src/state/context';
import { fetchTodoList, deleteTodoItem, updateTodoItem, addNewTodoItem } from './src/api';

const Stack = createNativeStackNavigator<NavigationScreenPropsType>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LandingScreen" component={LaunchScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TodoScreen" component={TodoDetailScreen} />
    </Stack.Navigator>
  )
}

function App(): JSX.Element {
  const initialTasks: Array<task> = [];
  const [tasks, setTasks] = useState(initialTasks);
  const [fullTaskList, setFullTaskList] = useState(initialTasks);
  useEffect(() => {
    fetchTodoList().then((value) => {
      setTasks(value);
      setFullTaskList(value);
    })
  },[])

  
  const dispatch = async (action: dispatchActionType) => {
    switch(action.type) {
      case 'delete': {
        const updatedTasks = tasks.filter((item) => {
          return item.id !== action?.data?.id;
        })
        if (action?.data?.id) {
          await deleteTodoItem(action.data.id)
        }
        setTasks(updatedTasks);
        setFullTaskList(updatedTasks)
      }
      break;

      case 'update': {
        const updatedTasks = [...tasks];
        if (action.data) {
          const toUpdateIndex = updatedTasks.findIndex((item) => {
            return item.id == action?.data?.id;
          });
  
          if (toUpdateIndex == -1) {
            const newTodo = await addNewTodoItem({...action.data, userId: 999});
            updatedTasks.splice(0, 0 , newTodo);
          } else {
            await updateTodoItem(action.data)
            updatedTasks[toUpdateIndex] = {...action.data}
          }
          setTasks(updatedTasks);
          setFullTaskList(updatedTasks)
        }
      }
      break;

      case 'search': {
        if (action.searchInput.length > 0) {
          const updatedTasks = fullTaskList.filter((item) => {
            const index = item.title.includes(action.searchInput);
            return index;
          })
          setTasks(updatedTasks);
        } else {
          setTasks(fullTaskList);
        }
      }
      break;

    }
  }
  
  return (
    <AppContext.Provider value={{tasks, dispatch}}>
        <NavigationContainer>
          {RootNavigator()}
      </NavigationContainer>
    </AppContext.Provider>

  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
