import { createMocks } from 'node-mocks-http'
import apiRouteHandler from '../../../pages/api/category';

//jest makes an actual call to the database
describe('Successfully fetch a list of categories from api route : /category', () => {
  it('returns list of product categories', async () => {
    //retrieved from prisma seed (data that is prepopulated into database)
    const expectedData = [
                            { categoryId: 1, name: "vegetable"},
                            { categoryId: 2, name: "fruits"},
                            { categoryId: 3, name: "meat"},
                            { categoryId: 4, name: "dairy"},
                            { categoryId: 5, name: "beverage"},
                            { categoryId: 6, name: "household"},
                        ]
    const { req, res } = createMocks({
      method: 'GET',
    });

    await apiRouteHandler(req, res);
    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual(expectedData);
  });
});