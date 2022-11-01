import React from "react";
import PropTypes from "prop-types";
import AreaContextProvider, { AreaContext } from "./AreaContext";
import axios from "axios";
import newItem from "../components/assets/newItem";
export default function ContextProvider(props, context) {
  React.useLayoutEffect(()=>{
    axios.defaults.headers.common["Authorization"] ="Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyWHlXNldXZEk5UUt1Q25hcWJzcnVWeG8zZ0xJa2R6TWd0ZlNIeVpybWIwIn0.eyJleHAiOjE2NjgxODgzNTMsImlhdCI6MTY2NzMyNDQxNSwiYXV0aF90aW1lIjoxNjY3MzI0MzUzLCJqdGkiOiJkNDRjOTdlOS1mZWY0LTQ3YmUtYjg2OS04MWE5ZjMxYWQ2OTUiLCJpc3MiOiJodHRwOi8vMTcyLjMwLjk5LjEyMTo4MDgwL2F1dGgvcmVhbG1zL0lGTSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiaWZtX2ZhY2lsaXR5X2NsaWVudCIsImFjY291bnQiXSwic3ViIjoiNGFkY2NhODYtMzk4MS00MDE2LTk0MjEtMmJhYWVhY2M1MThmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnJvbnQiLCJub25jZSI6ImYxMTlhYTg0LWM1NjEtNDE2Yi05ZTVmLWIyYTU0Y2QyMzQ1NSIsInNlc3Npb25fc3RhdGUiOiJmYzhhYTBjYy1mOTFhLTRiMGEtOGE0Yy1jZDk5NzMzYmE1ZGQiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xNzIuMzAuOTkuMTIxOjMwMDAvKiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHA6Ly8xNzIuMzAuOTkuNTA6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtaWZtIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJpZm1fZmFjaWxpdHlfY2xpZW50Ijp7InJvbGVzIjpbImZhY2lsaXR5X2NsaWVudF9yb2xlX2FkbWluIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiZmM4YWEwY2MtZjkxYS00YjBhLThhNGMtY2Q5OTczM2JhNWRkIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoixLBzbWV0IEF0YW1lciBBdGFsYXkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyMSIsImdpdmVuX25hbWUiOiLEsHNtZXQgQXRhbWVyIiwibG9jYWxlIjoiZW4iLCJmYW1pbHlfbmFtZSI6IkF0YWxheSIsImVtYWlsIjoiYXRhbWVyLmF0YWxheUBzaWdudW10dGUuY29tIn0.fE44Y9aA_3kUHmEqKXkb6-ubxfLJLn5buwE4hHCqLxbJDPHRnQOGFPM_ehVukAgWTXKx6P853noc9p3iZstpJrc14BfeZLbzhUPHyt95a9kf6hMZvRISFK8L_EliJPrZ4ydc6SKpucAqhEr1yo5AulP4C50d7yCCHOsGHMhMe8Wwa_IZkGXlst5I0Vk3wR4OQsJfPDxwgj3TaTKdf_DTMQL7hzO8vheip5rDweu44pI5OjfMgxXaToR6FzZeSPh--7kFXwP9wKMS2pGCzOkapbWyGm1XcVNJq3GDT3V-YfAKYwkWRF72lYh5gXNdeazNN7g2s5616ZxbDUBSTdZrHw"
  },[])
  React.useEffect(() => {
    axios
      .get("http://localhost:3014/types", {
        headers: {
          realm: "IFM",
        },
      })
      .then((res) => {
        console.log(res.data);
        for(let item of res.data.children){
          let temp = newItem({
            images: item.images === "" ? "https://i.ibb.co/0nQqZ1F/empty.png" : "",
            height: item.nominalHeight === 0 ? 100 : item.nominalHeight,
            width: item.nominalWidth === 0 ? 100 : item.nominalWidth,
            name: item.name,
          });
          context.catalog.registerElement(temp);
          context.catalog.addToCategory("assets", temp);
          let assets = context.assets;
          let elementsToDisplay = assets
            ? assets.elements.filter((element) =>
                element.info.visibility ? element.info.visibility.catalog : true
              )
            : [];
          context.projectActions.initCatalog(context.catalog);
        }
        
        
      });
  }, []);
  return <AreaContextProvider state={props.state}>{props.children}</AreaContextProvider>;
}

export { AreaContext };

ContextProvider.contextTypes = {
  assets: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
