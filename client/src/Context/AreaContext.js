import React, { useEffect, useState } from "react";
import Popup from "../components/popup/Popup";
import axios from "axios"

export const AreaContext = React.createContext();

export default function AreaContextProvider(props) {
  const [data, setData] = React.useState({});
  const [select, setSelect] = React.useState(null);
  const [popup, setPopup] = React.useState(false);
  const [showLayersColors, setShowLayersColors] = React.useState(false);
  const [spaces,setSpaces] = useState([])
  const [links,setLinks] = useState([])

  useEffect(()=>{
    getLinksAndSpaces()
  },[])

  const getLinksAndSpaces = () => {
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    axios.get("http://localhost:9001/link/"+key).then(res=>{
      console.log(res.data);
      setLinks(res.data)
    })
    axios.post("http://localhost:3010/structures/lazyLoadingByKey",{
      "key": key,
      "leafType": "Floor",
      "rootLabels": [
        "Floor"
      ],
      "childrenLabels": [
        "Space"
      ]
    }).then(res=>{
      console.log(res.data);
      setSpaces(res.data.children ? res.data.children : [])
    })
  }
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });

    document.addEventListener("keydown", (e) => {
      if (e.keyCode === 27) setPopup(false);
    });

    const temp = localStorage.getItem("data");
    if (temp) {
      setData(JSON.parse(temp));
    }

    const layerColorStorage = localStorage.getItem("layerColors");
    if (layerColorStorage) {
      setShowLayersColors(JSON.parse(layerColorStorage));
    }
  }, []);

  return (
    <AreaContext.Provider
      value={{
        data: { data, setData },
        spaces: {spaces,setSpaces},
        links: {links,setLinks},
        popup: { open: popup, setOpen: setPopup },
        select: { select, setSelect },
        getLinksAndSpaces,
        showLayersColors: { showLayersColors, setShowLayersColors },
      }}
    >
      <Popup state={props.state} />
      {props.children}
    </AreaContext.Provider>
  );
}
