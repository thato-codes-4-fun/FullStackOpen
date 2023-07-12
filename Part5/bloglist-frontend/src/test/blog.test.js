import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'

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
} )





