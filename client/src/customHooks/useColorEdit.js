import React, {useContext, useState} from 'react'
import axiosWithAuth from '../utils/axiosWithAuth'
import { ColorContext } from '../context/ColorContext'

export const useColorEdit = (initialColor) => {

    const { colorList, setColorList } = useContext(ColorContext)
    const [editing, setEditing] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);
  
    const editColor = color => {
      setEditing(true);
      setColorToEdit(color);
    };
  
    const saveEdit = e => {
      console.log(colorToEdit.id)
      e.preventDefault();
      // Make a put request to save your updated color
      // think about where will you get the id from...
      // where is is saved right now?
      axiosWithAuth().put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log(res.data)
        setColorList(colorList.map(color => color.id !== colorToEdit.id ? color : res.data))
      })
      .catch(err => {
        console.log(err)
      })
  
    };
  
    const deleteColor = color => {
      // make a delete request to delete this color
      axiosWithAuth().delete(`/colors/${color.id}`)
      .then(res => {
        console.log(res)
        setColorList(colorList.filter(col => col.id !== res.data))
      })
      .catch(err => {
        console.log(err)
      })
    };

    return {editing, setEditing, colorToEdit, setColorToEdit, editColor, saveEdit, deleteColor}
}