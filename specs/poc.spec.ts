/**
 * @file poc.spec.ts
 * @description POC test suite for verifying the JSONPlaceholder /posts endpoint.
 */

import * as supertest from 'supertest';

/**
 * SuperTest request agent configured to target the JSONPlaceholder API base URL.
 */
const request = supertest('https://jsonplaceholder.typicode.com');

/**
 * Test suite: POC Test
 * Contains tests for basic API validation of JSONPlaceholder endpoints.
 */
describe('POC Test', () => {
    /**
     * Test case: GET /posts
     * Sends a GET request to '/posts' and verifies:
     *  - Response status code is 200.
     *  - The first post in the response body has an ID of 1.
     */

    describe('GET Request', () => {

        it('GET /post', async () => {
            // Send GET request to /posts endpoint
            const res = await request.get('/posts');
            // Assert that HTTP status code is 200
            expect(res.statusCode).toBe(200);
            // Assert that the first post's ID is 1
            expect(res.body[0].id).toBe(1);
        })

        it('GET / comments whit query params', async () => {
            //const res = await request.get('/comments?postId=1')
            const res = await request
                .get('/comments')
                .query({ postId: 1, limit: 10 })
            console.log(res)
            expect(res.body[0].postId).toBe(1)
        })

    });

    describe('POST request', () => {
        it('POST / posts', async () => {
            const data = {
                "title": "My fav animes",
                "body": "Naruto, one pice, hunter x hunter",
                "userId": 1
            }
            const res = await request
                .post('/posts')
                .send(data)

            console.log(res.body)
            expect(res.body.title).toBe(data.title)
        });
    });

    describe('PUT Request', () => {
        it('PUT / post/{id}', async () => {
            const data = {
                "title": "Updated tittle",
                "body": "Update body..",
                "userId": 5
            }

            const getRes = await request.get('/post/1');
            const beforeTitle = getRes.body.title;
            //console.log(beforeTitle); // random text...

            const res = await request
                .put('/posts/1')
                .send(data)

            expect(res.body.title).not.toBe(beforeTitle); // null
            expect(res.body.title).toBe(data.title);


            // get call and verify the tittle is expected


        });
    });

    describe('PATCH Request', () => {
        it('PATCH / post/{id}', async () => {
            const data = {
                "title": "Updated tittle",

            }

            const getRes = await request.get('/post/1');
            const beforeTitle = getRes.body.title;


            const res = await request
                .patch('/posts/1')
                .send(data)
            expect(res.body.title).not.toBe(beforeTitle); // null
            expect(res.body.title).toBe(data.title);

        });
    });

    describe('DELETE Request', () => {
        it('DELETE /post/{id}', async () => {
            const res = await request.delete('/posts/1')
            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual({})

        })
    });

});