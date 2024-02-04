import { createMocks } from 'node-mocks-http'
import apiRouteHandler from '../../../pages/api/login/[employeeId]';

//jest makes an actual call to the database
describe('Valid employee id request params for api route : /login/{employeeId}', () => {
  it('returns employeeDetails', async () => {
    //retrieved from prisma seed (data that is prepopulated into database)
    const expectedData = { employeeId: 100002, name: "Ng Yan Ling"}
    const { req, res } = createMocks({
      method: 'GET',
      query: { employeeId: '100002' },
    });

    await apiRouteHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(expectedData);
  });
});

//jest makes an actual call to the database
describe('Invalid employee id request params for api route : /login/{employeeId}', () => {
  it('returns employeeDetails', async () => {
    //retrieved from prisma seed (data that is prepopulated into database)
    const expectedData = { employeeId: 100002, name: "Ng Yan Ling"}
    const { req, res } = createMocks({
      method: 'GET',
      query: { employeeId: '999' },
    });

    await apiRouteHandler(req, res);
    expect(res._getStatusCode()).toBe(500);
  });
});