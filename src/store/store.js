import { configureStore } from "@reduxjs/toolkit";
import reducer from "../reducers/root";

export default preloadedState => (
    configureStore({
        preloadedState,
        reducer
    })
);