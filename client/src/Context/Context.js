import React, { useEffect } from "react"

export const Context = React.createContext();

export default function ContextProvider(props) {

    const [data, setData] = React.useState({})
    const [select,setSelect] = React.useState(null)
    const [popup,setPopup] = React.useState(false)
    const [showLayersColors,setShowLayersColors] = React.useState(false)

    useEffect(()=>{
      document.addEventListener('contextmenu', e => {
        e.preventDefault();
      });

      document.addEventListener("keydown",e=>{
        if(e.keyCode === 27)
          setPopup(false)
      })

      const temp = localStorage.getItem("data")
      if(temp){
        setData(JSON.parse(temp))
      }

      const layerColorStorage = localStorage.getItem("layerColors")
      if(layerColorStorage){
        setShowLayersColors(JSON.parse(layerColorStorage))
      }


    },[])
  
    return (
      <Context.Provider value={{data:{data,setData},popup:{open:popup,setOpen:setPopup},select:{select,setSelect},showLayersColors:{showLayersColors,setShowLayersColors}}}>
          {props.children}
      </Context.Provider>
    );
}