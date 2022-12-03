require('iconv-lite').encodingExists('foo')
const app = require("./definitions");
const request = require("supertest");

describe('Client test', () => {
  test('Our First Test!', async () => {
    const res = await request(app).get("/clients/1")
    let responseContent = JSON.parse(res.res.text)
    expect(responseContent.id).toBe(1)
    expect(responseContent.name).toBe('Test2')
    expect(responseContent.lastname).toBe('1')
    expect(responseContent.state).toBe(1)
  });
});