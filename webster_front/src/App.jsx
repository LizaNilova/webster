import React, { useEffect, useState } from "react";
import "./App.css";
import MainPage from "./MainPage";
import PostsPage from "./PostsPage";
import Header from "./Header";

export default function App() {

  return(
    <>
      <Header />
      <MainPage />
      {/* <PostsPage /> */}
    </>
  )
}
