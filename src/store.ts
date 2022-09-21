import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./service";

export function setUpStore() {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer
    },
    middleware: (gDM) => gDM().concat(api.middleware)
  });

  setupListeners(store.dispatch);

  return store;
}

const store = setUpStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

// backup tsconfig
// "strict": true,
// "esModuleInterop": true,
// "lib": [
//     "dom",
//     "es2015"
// ],
// "jsx": "react-jsx",
