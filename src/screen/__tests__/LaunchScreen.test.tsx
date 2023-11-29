import { render, screen, fireEvent } from '@testing-library/react-native';
import LaunchScreen from '../LaunchScreen';
import {it, jest, expect} from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootNavigator } from '../../../App';
import { AppContext } from '../../state/context';
import { Task } from 'react-native';
import { dispatchActionType, task } from '../../utils/types';
jest.mock('../../api/', () => ({
    fetchTodoList: () => new Promise((resolve, reject) => {
      resolve([])
    })
  }))

it('renders correctly', async () => {
    const tree = render(
        <NavigationContainer>
            {RootNavigator()}
        </NavigationContainer>
    ).toJSON()

    expect(tree).toMatchSnapshot();
})


it('click start button', async () => {
    const mockTasks: Array<task> = [];
    const mockDispatch = jest.fn()

    render(
        <AppContext.Provider value={{tasks: mockTasks, dispatch: mockDispatch}}>
            <NavigationContainer>
                {RootNavigator()}
            </NavigationContainer>
        </AppContext.Provider>
    )

    fireEvent.press(screen.getByTestId('start-button'))

    expect(screen.getByText('+')).toBeTruthy()
})