import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import userEvent from '@testing-library/user-event'

describe('test initial blog component', () => {
    test('blog component initially displays title and author',() => {
        const blog = {
            title: 'testing',
            author: 'mr test',
            url: 'www.testing.com',
            upvotes: 1,
        }
        const user = {
            name: 'tester'
        }
        const { container } = render(<Blog blog={blog} user={user}/>)
        const element = screen.getByText('testing mr test')
        expect(element).toBeDefined()
        const div = container.querySelector('.blogDetails')
        expect(div).toHaveStyle('display: none')
    })
})

describe('test when show details is clicked more blog details displayed', () => {
    test('click show more details',async() => {
        const blog = {
            title: 'testing',
            author: 'mr test',
            url: 'www.testing.com',
            upvotes: 1,
        }
        const userblog = {
            name: 'tester'
        }
        const mockHandler = jest.fn()
        const user = userEvent.setup()
        const { container } = render(<Blog blog={blog} user={userblog} handleShowMore={mockHandler}/>)
        const div = container.querySelector('.blogDetails')
        expect(div).toHaveStyle('display: none')
        const button = screen.getByText('show more')
        expect(button).toBeDefined()
        await user.click(button)
        expect(mockHandler.mock.calls).toHaveLength(1)
        const like = screen.getByText('LIKE: 1')
        expect(like).toBeDefined()
        const blogUser = screen.getByText('USER: tester')
        expect(blogUser).toBeDefined()
    })
})




