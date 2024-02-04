//prepopulate data into the database (seeding)
import { prismaClient } from '../app/_db/database' //retrieves the prisma client singleton object

async function seed() {
    
    //bulk create + skip duplicates
    //1. prepopulate category
    await prismaClient.category.createMany({
        data: [
            { categoryId: 1, name: "vegetable"},
            { categoryId: 2, name: "fruits"},
            { categoryId: 3, name: "meat"},
            { categoryId: 4, name: "dairy"},
            { categoryId: 5, name: "beverage"},
            { categoryId: 6, name: "household"},
        ],
        skipDuplicates: true //skip duplicates if record already exist
    })    
    //2. prepopulate products
    await prismaClient.product.createMany({
        data: [
            { id: 1, name: "Royal Gaia Apple", price: 1.0, categoryId: 2},
            { id: 2, name: "Fuji Apple", price: 1.2, categoryId: 2 },
            { id: 3, name: "Granny Smith Green Apples", price: 0.8, categoryId: 2},
            { id: 4, name: "Tangerine", price: 0.6, categoryId: 2},
            { id: 5, name: "Chye Sim", price: 1.2, categoryId: 1},
            { id: 6, name: "Lady Finger", price: 2.0, categoryId: 1},
            { id: 7, name: "Eggplant", price: 1.3, categoryId: 1},
            { id: 8, name: "Chicken Drumstick", price: 2.5, categoryId: 3},
            { id: 9, name: "Kampung Chicken (Whole)", price: 10.3, categoryId: 3},
            { id: 10, name: "Chicken Wings (Frozen - 1kg)", price: 9.2, categoryId: 3},
            { id: 11, name: "HL Milk (1 litre)", price: 3.2, categoryId: 4},
            { id: 12, name: "Magnolia Fresh Milk (500ml)", price: 2.8, categoryId: 4},
            { id: 13, name: "Free Range Eggs (12pcs)", price: 6.2, categoryId: 4},
            { id: 14, name: "ABC Farm Eggs (30pcs)", price: 8.5, categoryId: 4},
            { id: 15, name: "Sprite (1.5 litre)", price: 1.2, categoryId: 5},
            { id: 16, name: "Ice mountain drinking (400ml)", price: 0.3, categoryId: 5},
            { id: 17, name: "Soda water", price: 0.6, categoryId: 5},
            { id: 18, name: "Coca Cola (500ml)", price: 0.8, categoryId: 5},
            { id: 19, name: "Beautix Toilet Paper (12 rolls)", price: 6.0, categoryId: 6},
            { id: 20, name: "Tissue Box (5s)", price: 4.0, categoryId: 6},
            { id: 21, name: "Watermelon (3.2kg)", price: 6.2, categoryId: 2},
            { id: 22, name: "Hawaii Papaya (0.8kg)", price: 4.2, categoryId: 2},
            { id: 23, name: "Australian Mango", price: 1.5, categoryId: 2},
            { id: 24, name: "Pasar Cherries (900g)", price: 9.0, categoryId: 2},
            { id: 25, name: "Green seedless grapes (500g)", price: 3.9, categoryId: 2},
            { id: 26, name: "Blueberries (100g)", price: 2.9, categoryId: 2},
        ],
        skipDuplicates: true //skip duplicates if record already exist
    })    
    //3. prepopulate employee
    await prismaClient.employee.createMany({
        data: [
            { employeeId: 100001, name: "Tee Rui Lin"},
            { employeeId: 100002, name: "Ng Yan Ling"},
            { employeeId: 100003, name: "Guo Jun Jie"},
            { employeeId: 100004, name: "Tong Min Hui"},
            { employeeId: 100005, name: "Chee Yong Bin"},
        ],
        skipDuplicates: true //skip duplicates if record already exist
    })    
    
}

seed()
    .then(async () => {
        console.log("succeeded");
    })
    .catch(async (e) => {
        console.log("error : " + e);
    })
