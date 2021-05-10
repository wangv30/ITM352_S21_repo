// Vincent Wang - 3/25/21
// Creates array of Products

var all_products = [
    {
    'type': "hydroflask",
    'image': "hydroflask4.jpg"
    },
    {
    'type': "pogo",
    'image': "pogo3.png"
    },
    {
    'type': "fidus",
    'image': "fidus3.jpg"
    },
    {
    'type': "hydromate",
    'image': "hydromate3.jpg"
    }
]

var hydroflask = [
    {
        "name": "20 oz Wide Mouth",
        "price": 38.00,
        "image": "hydroflask1.jpg"
    },
    {
        "name": "32 oz Wide Mouth",
        "price": 45.00,
        "image": "hydroflask2.jpg"
    },
    {
        "name": "40 oz Wide Mouth",
        "price": 50.00,
        "image": "hydroflask3.jpg"
    },
    {
        "name": "64 oz Wide Mouth",
        "price": 65.00,
        "image": "hydroflask4.jpg"
    }                                                            
]

var pogo = [
    {
        "name": "12 oz Kids Stainless Steel",
        "price": 10.00,
        "image": "pogo1.png"
    },
    {
        "name": "18 oz Soft Straw Stainless Steel",
        "price": 15.00,
        "image": "pogo2.png"
    },
    {
        "name": "26 oz Soft Straw Stainless Steel",
        "price": 20.00,
        "image": "pogo3.png"
    }                                                           
]

var fidus = [
    {
        "name": "32 oz Leakproof Tritan",
        "price": 15.00,
        "image": "fidus1.jpg"
    },
    {
        "name": "Large Half Gallon/64 oz Motivational",
        "price": 20.00,
        "image": "fidus2.jpg"
    },
    {
        "name": "1 Gallon Motivational",
        "price": 25.00,
        "image": "fidus3.jpg"
    }                                                      
]

var hydromate = [
    {
        "name": "32 oz with Straw",
        "price": 20.00,
        "image": "hydromate1.jpg"
    },
    {
        "name": "64 oz with Straw",
        "price": 25.00,
        "image": "hydromate2.jpg"
    },
    {
        "name": "128 oz with Straw",
        "price": 30.00,
        "image": "hydromate3.jpg"
    }                                                            
]

var products =
    {
        "hydroflask": hydroflask,
        "pogo": pogo,
        "fidus": fidus, 
        "hydromate": hydromate
    }
    
if(typeof module != 'undefined') {
     module.exports.products = products;
    }
