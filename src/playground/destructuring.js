/*
*
* OBJECT DESTRUCTUTING
*
*/

// const person = {
//     name: "Jose",
//     age: 24,
//     location:{
//         city: "Philadelfia",
//         temp: 92
//     }
// };

// const {name = 'Anonymous', age, location} = person;

// console.log(`${person.name} is ${person.age}.`)

// const {city, temp: temperature} = person.location;

// if(location.temp && location.temp)
//     console.log(`It's ${location.temp} in ${location.city}`)


// const book = {
//     title: 'Ego',
//     author: 'Ryam',
//     publisher: {
//        // name: 'Penguin'
//     }
// };


// const {name: publisherName = "Self-Published"} = book.publisher;

// if(publisherName)
//     console.log(publisherName);


/*
*
* ARRAY DESTRUCTUTING
*
*/



// const address = ['1299 S Juniper Street ', 'Philadelfia', 'Pennsylavia', '19133'];

// const [street, city, state, zip] = address;

// console.log(street);


const shop = ['coffe','1','2','3'];

const [product,s,m,l] = shop;

console.log(product + ' is ' + m);