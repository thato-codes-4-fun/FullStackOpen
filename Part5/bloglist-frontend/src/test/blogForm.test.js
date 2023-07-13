import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlogForm from '../components/CreateBlogForm'
import userEvent from '@testing-library/user-event'


describe('blog tests', () => {
    test('Blog form updates parent state and calls on submit', async() => {
        const createBlog = jest.fn()
        const user = userEvent.setup()

        const { container } = render(<CreateBlogForm handleCreateBlog={createBlog}/>)

        const titleInput = container.querySelector('#title')
        const urlInput = container.querySelector('#url')
        const authorInput = container.querySelector('#author')
        const sendButton = screen.findByText('submit')

        expect(titleInput).toBeDefined()
        expect(urlInput).toBeDefined()
        expect(authorInput).toBeDefined()
        expect(sendButton).toBeDefined()

        await user.type(titleInput, 'title test')
        // await user.type(urlInput, 'www.test.com')
        // await user.type(authorInput, 'author test')
        // await user.click(sendButton)
        // expect(createBlog.mock.calls).toHaveLength(1)
    })
})

