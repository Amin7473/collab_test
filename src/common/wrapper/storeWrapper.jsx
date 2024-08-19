"use client";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store/store";

export default function StoreWrapper({ children }) {
  // You can populate your store, whatever it may be, with data
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
