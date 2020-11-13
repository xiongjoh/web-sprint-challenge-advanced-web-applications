import React, { useState, useEffect } from "react";

import {fetchColors} from '../api/fetchColors'

import { ColorContext } from '../context/ColorContext'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts

  useEffect(() => {

    fetchColors().then(res => {
      setColorList(res.data)
    })
    .catch(err => {
      console.log(err.response)
    })
  },[])


  return (
    <ColorContext.Provider value={{colorList, setColorList}}>
      <ColorList />
      <Bubbles />
    </ColorContext.Provider>
  );
};

export default BubblePage;
