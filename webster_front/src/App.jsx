import React from "react";
import "./styles/App.css";
import MainPage from "./pages/MainPage";
import PostsPage from "./pages/PostsPage";
import Header from "./components/Header";

export default function App() {

  return(
    <>
      <Header />
      <MainPage />
      {/* <PostsPage /> */}
    </>
  )
}
