/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it, jest, expect} from '@jest/globals';

const mockTasks: Array<task> = [
  {id: 99, userId: 99, title: "sample title for testing", body: "sample body for testing"},
  {id: 98, userId: 99, title: "another sample user", body: "another sample body"}
];
jest.mock('../src/api/', () => ({
  fetchTodoList: () => new Promise((resolve, reject) => {
    resolve(mockTasks)
  }),
  deleteTodoItem: () => new Promise((resolve, reject) => {
    resolve(null)
  }),
  updateTodoItem: () => new Promise((resolve, reject) => {
    resolve(null)
  }),
  addNewTodoItem: (item: task) => new Promise((resolve, reject) => {
    resolve({...item, id: 999})
  })
}))

jest.spyOn(Alert, 'alert');


// Note: test renderer must be required after react-native.
import {create, act} from 'react-test-renderer';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import { task } from '../src/utils/types';
import { Alert } from 'react-native';

it('renders correctly', () => {
    const tree = render(<App />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('should render start button correctly', async () => {
  render(<App />);
  expect(screen.getByText('START')).toBeTruthy()
})


it('should navigate to home screen', async () => {
  render(<App />);
  fireEvent.press(screen.getByText('START'))

  expect(screen.getByText('+')).toBeTruthy()
})


it('dispatch delete event', async () => {
  render(<App />);
  act(() => {
    /* fire events that update state */
    fireEvent.press(screen.getByText('START'))
  });

  await waitFor(() => expect(screen.getByText("+")).toBeTruthy()) 

  fireEvent.press(screen.getByTestId(`todoItem-${mockTasks[0].id}`))

  act(() => {
    fireEvent.press(screen.getByText("Delete"))  
  })

  act(() => {
    Alert.alert.mock.calls[0][2][0].onPress()
  })
  await waitFor(() => expect(screen.getByText("+")).toBeTruthy()) 
  expect(screen.getByTestId('list-view').props.data).toStrictEqual([mockTasks[1]])
})


it('dispatch update event', async () => {
  render(<App />);
  act(() => {
    /* fire events that update state */
    fireEvent.press(screen.getByText('START'))
  });

  await waitFor(() => expect(screen.getByText("+")).toBeTruthy()) 

  fireEvent.press(screen.getByTestId(`todoItem-${mockTasks[0].id}`))

  act(() => {
    fireEvent.press(screen.getByText("Edit"))  
  })


  const updatedTitle = "Update task title triggered by testcase"
  fireEvent.changeText(screen.getByPlaceholderText("Enter your Title here"), updatedTitle)
  
  fireEvent.press(screen.getByText("Save"))

  await waitFor(() => expect(screen.getByText("+")).toBeTruthy()) 

  const updateTasks = [{...mockTasks[0], title: "Update task title triggered by testcase"}, mockTasks[1]]
  
  expect(screen.getByTestId('list-view').props.data).toStrictEqual(updateTasks)
})



it('dispatch update event for adding new task', async () => {
  render(<App />);
  act(() => {
    /* fire events that update state */
    fireEvent.press(screen.getByText('START'))
  });

  await waitFor(() => expect(screen.getByText("+")).toBeTruthy()) 

  fireEvent.press(screen.getByText("+"))

  // act(() => {
  //   fireEvent.press(screen.getByText("Edit"))  
  // })


  const newTaskTitle = "New task title triggered by testcase"
  fireEvent.changeText(screen.getByPlaceholderText("Enter your Title here"), newTaskTitle)
  

  const newTaskBody = "New Body title triggered by testcase"
  fireEvent.changeText(screen.getByPlaceholderText("Enter your Body here"), newTaskBody)
  

  fireEvent.press(screen.getByText("Save"))

  await waitFor(() => expect(screen.getByText("+")).toBeTruthy()) 

  const newlyAddedTask: task = {userId: 999, id: 999, title: newTaskTitle, body: newTaskBody};
  const updateTasks = [newlyAddedTask, ...mockTasks]
  
  expect(screen.getByTestId('list-view').props.data).toStrictEqual(updateTasks)
})




it('dispatch search event', async () => {
  render(<App />);
  act(() => {
    /* fire events that update state */
    fireEvent.press(screen.getByText('START'))
  });

  await waitFor(() => expect(screen.getByText("+")).toBeTruthy()) 

  const searchText = "user";
  act(() => {
    fireEvent.changeText(screen.getByPlaceholderText("Search here"), searchText)  
  })

  const matchingTasks = [mockTasks[1]]
  expect(screen.getByTestId('list-view').props.data).toStrictEqual(matchingTasks)
})
