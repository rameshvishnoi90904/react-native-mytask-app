import {it, jest, expect} from '@jest/globals';
import {create, act} from 'react-test-renderer';
import React from 'react';
import TodoItem from '../TodoItem';
import { task } from '../../utils/types';
import { render, screen, fireEvent } from '@testing-library/react-native';

it('renders correctly', async () => {
    await act(() => {
        const mockTask: task = {
            id: 999,
            userId: 999,
            title: "Sample Title for testing",
            body: "Sample Body for testing"
        }
        const mockClickHandler = jest.fn()
        const tree = create(<TodoItem item={mockTask} navigateToDetailScreen={mockClickHandler}/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

it('navigate to detail screen correctly', async () => {
    const mockTask: task = {
        id: 999,
        userId: 999,
        title: "Sample Title for testing",
        body: "Sample Body for testing"
    }
    const mockClickHandler = jest.fn()
    render(<TodoItem item={mockTask} navigateToDetailScreen={mockClickHandler}/>)
    fireEvent.press(screen.getByTestId(`todoItem-${mockTask.id}`))

    expect(mockClickHandler).toBeCalledWith(mockTask)
})