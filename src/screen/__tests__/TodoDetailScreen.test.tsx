import { render, screen, fireEvent } from '@testing-library/react-native';
import {it, jest, expect} from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../../state/context';
import { NavigationScreenPropsType, dispatchActionType, task } from '../../utils/types';
import TodoDetailScreen from '../TodoDetailScreen';
import { Alert } from 'react-native';
const Stack = createNativeStackNavigator<NavigationScreenPropsType>();


it("renders correctly", () => {

    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()

    const tree = render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen} initialParams={{item: mockTasks[0]}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    ).toJSON()

    expect(tree).toMatchSnapshot();
})

it('renders correct task', () => {
    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()

    const openedTask = mockTasks[0]

    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen} initialParams={{item: openedTask}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
    
    expect(screen.getByText(openedTask.title)).toBeTruthy();
    expect(screen.getByText(openedTask.body)).toBeTruthy();
})

it('trigger delete', () => {
    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()

    const openedTask = mockTasks[0]

    jest.spyOn(Alert, 'alert');


    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen} initialParams={{item: openedTask}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )

    fireEvent.press(screen.getByText("Delete"))
    expect(Alert.alert).toHaveBeenCalledTimes(1)
})

it('triggers edit mode ', () => {
    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()

    const openedTask = mockTasks[0]

    jest.spyOn(Alert, 'alert');


    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen} initialParams={{item: openedTask}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
    fireEvent.press(screen.getByText("Edit"))
    expect(screen.getByText('Save')).toBeTruthy()
})

it('triggers save button ', () => {
    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()

    const openedTask = mockTasks[0]

    jest.spyOn(Alert, 'alert');


    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen} initialParams={{item: openedTask}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
    fireEvent.press(screen.getByText("Edit"))
    fireEvent.press(screen.getByText("Save"))
    expect(Alert.alert).toBeCalledTimes(1)
})


it('triggers update action ', () => {
    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()

    const openedTask = mockTasks[0]

    jest.spyOn(Alert, 'alert');


    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen} initialParams={{item: openedTask}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
    fireEvent.press(screen.getByText("Edit"))
    const updatedTitle = "Update task title triggered by testcase"
    fireEvent.changeText(screen.getByPlaceholderText("Enter your Title here"), updatedTitle)
    
    fireEvent.press(screen.getByText("Save"))

    expect(mockDispatch).toBeCalledWith({type: "update", searchInput: "", data:{...openedTask, title: updatedTitle}})
})




it('triggers revert action ', async () => {
    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()
    const openedTask = mockTasks[0]
    jest.spyOn(Alert, 'alert');

    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen} initialParams={{item: openedTask}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )
    fireEvent.press(screen.getByText("Edit"))
    const updatedTitle = "Update task title triggered by testcase"
    fireEvent.changeText(screen.getByPlaceholderText("Enter your Title here"), updatedTitle)
    
    await fireEvent.press(screen.getByText("Revert"))
    // fireEvent.press(screen.getByText("Yes"))
    // expect(Alert.alert).toBeCalledTimes(1)
    // expect(screen.getByPlaceholderText("Enter your Title here")).toEqual(openedTask.title)
})