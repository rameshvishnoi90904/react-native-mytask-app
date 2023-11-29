import { render, screen, fireEvent } from '@testing-library/react-native';
import {it, jest, expect} from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../../state/context';
import { NavigationScreenPropsType, dispatchActionType, task } from '../../utils/types';
import HomeScreen from '../HomeScreen';
import TodoDetailScreen from '../TodoDetailScreen';

const Stack = createNativeStackNavigator<NavigationScreenPropsType>();


it('it renders correctly', () => {
    const mockTasks: Array<task> = [];
    const mockDispatch = jest.fn()

    const tree = render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    ).toJSON()

    expect(tree).toMatchSnapshot();
})


it('it renders correctly with n task', () => {
    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()

    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )

    expect(screen.getByTestId('list-view').props.data).toStrictEqual(mockTasks)
})

it('adds new task', () => {
    const mockTasks: Array<task> = [];
    const mockDispatch = jest.fn()

    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )

    fireEvent.press(screen.getByTestId('add-new-task'))
    expect(screen.getByText('Body')).toBeTruthy()
})



it('open 1st task', () => {
    const mockTasks: Array<task> = [
        {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
        {id: 98, userId: 99, title: "another sample", body: "another sample body"}
    ];
    const mockDispatch = jest.fn()

    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen}/>
                    <Stack.Screen name="TodoScreen" component={TodoDetailScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AppContext.Provider>
    )


    fireEvent.press(screen.getByTestId(`todoItem-${mockTasks[0].id}`))
    expect(screen.getByText(mockTasks[0].title)).toBeTruthy();
})