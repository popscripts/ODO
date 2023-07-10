import { app } from '../src/app'
import request from 'supertest'

describe('Sample test', () => {
    it('test', async () => {
        await request(app)
            .post('/api/auth/login')
            .send({
                username: 'test',
                password: 'haslo123'
            })
            .then((response) => {
                // Check the response type and length
                expect(Array.isArray(response.body)).toBeTruthy()
                console.log(response.body)
                // expect(response.body.length).toEqual(1)
                //
                // // Check the response data
                // expect(response.body[0]._id).toBe(post.id)
                // expect(response.body[0].title).toBe(post.title)
                // expect(response.body[0].content).toBe(post.content)
            })

        // console.log(res.text)
    })
})
