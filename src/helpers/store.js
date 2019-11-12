import { createStore, 
    applyMiddleware, 
    // compose 
} from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from '../store/reducers';


// const loggerMiddleware = createLogger();


export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    )
);


// const middlewares = [thunkMiddleware];

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);

//   middlewares.push(logger);
// }

// export const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);
