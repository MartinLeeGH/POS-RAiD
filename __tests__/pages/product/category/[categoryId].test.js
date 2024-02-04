import { createMocks } from 'node-mocks-http'
import apiRouteHandler from '../../../../pages/api/product/category/[categoryId]';

//jest makes an actual call to the database
describe('Successfully fetches product catalogue of a specific category from api route : /product/category/[categoryId]', () => {
  it('returns product catalogue of a specific category', async () => {
    //retrieved from prisma seed (data that is prepopulated into database)
    const expectedData = [
                            { id: 5, name: "Chye Sim", price: 1.2, categoryId: 1},
                            { id: 6, name: "Lady Finger", price: 2.0, categoryId: 1},
                            { id: 7, name: "Eggplant", price: 1.3, categoryId: 1},
                        ]
    const { req, res } = createMocks({
      method: 'GET',
      query: { categoryId: '1' },
    });

    await apiRouteHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(expectedData);
  });
});