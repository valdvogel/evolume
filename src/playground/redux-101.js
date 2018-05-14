import { createStore } from 'redux';

// Action generators - function that return action objects


// const add = ({ a,b }) =>{
//     return a + b;
// };

// console.log(add({a:4,b:3}));

const incrementCount = ( {value = 1} = {})=>{
    return{
        type: 'INCREMENT',
        value
    }
}
const decrementCount = ( {value = 1} = {})=>{
    return{
        type: 'DECREMENT',
        value
    }
}
const setCount = ( {value = 0} = {})=>{
    return{
        type: 'SET',
        value
    }
}
const resetCount = ()=>{
    return{
        type: 'RESET',
        
    }
}

const store = createStore((state = { count: 0 }, action) => {

    

    switch (action.type) {
        case 'INCREMENT':
            return { 
                count: state.count + action.value
            };
        case 'DECREMENT':
            return { 
                count: state.count - action.value
            };
        case 'SET':
            return { 
                count: action.value
            };
        case 'RESET':
            return { count: 0 };
        default:
            return state;

    }

});

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({value:5}));

store.dispatch(setCount({value:105}));

store.dispatch(decrementCount({value:2}));

store.dispatch(resetCount());


