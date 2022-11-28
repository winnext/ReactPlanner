import React from "react";
import PropTypes from "prop-types";
import AreaContextProvider, { AreaContext } from "./AreaContext";
import axios from "axios";
import newItem from "../components/assets/newItem";
export default function ContextProvider(props, context) {
  React.useLayoutEffect(()=>{
    axios.defaults.headers.common["Authorization"] ="Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyWHlXNldXZEk5UUt1Q25hcWJzcnVWeG8zZ0xJa2R6TWd0ZlNIeVpybWIwIn0.eyJleHAiOjE2NzA1MTcyMjEsImlhdCI6MTY2OTY1MzIyMiwiYXV0aF90aW1lIjoxNjY5NjUzMjIxLCJqdGkiOiJlOTYxY2M5NC03N2E2LTQxMDQtOTlkNy05YWI0MmJjNWQ2NWEiLCJpc3MiOiJodHRwOi8vMTcyLjMwLjk5LjEyMTo4MDgwL2F1dGgvcmVhbG1zL0lGTSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiaWZtX2ZhY2lsaXR5X2NsaWVudCIsImFjY291bnQiXSwic3ViIjoiNGFkY2NhODYtMzk4MS00MDE2LTk0MjEtMmJhYWVhY2M1MThmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnJvbnQiLCJub25jZSI6IjBlNWVmYjdkLTg0Y2QtNGIxYi1hZDIxLWE4NTMwMjg5MTZlZSIsInNlc3Npb25fc3RhdGUiOiI2NmI0ZDk1MS0yNDJiLTQwMDgtYWVjOC0wYTA2NDU2ODRkNTkiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xNzIuMzAuOTkuMTIxOjMwMDAvKiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHA6Ly8xNzIuMzAuOTkuNTA6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtaWZtIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJpZm1fZmFjaWxpdHlfY2xpZW50Ijp7InJvbGVzIjpbImZhY2lsaXR5X2NsaWVudF9yb2xlX2FkbWluIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiNjZiNGQ5NTEtMjQyYi00MDA4LWFlYzgtMGEwNjQ1Njg0ZDU5IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoixLBzbWV0IEF0YW1lciBBdGFsYXkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyMSIsImdpdmVuX25hbWUiOiLEsHNtZXQgQXRhbWVyIiwibG9jYWxlIjoiZW4iLCJmYW1pbHlfbmFtZSI6IkF0YWxheSIsImVtYWlsIjoiYXRhbWVyLmF0YWxheUBzaWdudW10dGUuY29tIn0.FDkn-mHLwM0io-3wp5oBFjlKHCe4IRnB2fUN0sjomHB2A9fyolleG2SjXjd-m2QfMDgv0v1mL1cbd4Akbxa7Lz9_7B-U_stb2y3C9W38-HjokF9v_o6mdrEPCS1KNBckWE6aD3eQTvjNuPPD5z6papSp4rf-md8xwzXL-7AThjDTfOA8Ko6fWrE6ol7iXEtfWb8COpo32ip3hfwZM9WCw9b_47AVaKRubp4km2WPO_1XVGZZI8wRpYMs4X-0TEQVNPPTpOwK3G26GpfXzYAkn7CloKRsSM_3ckUA-VxBntvOlTlGAeNkvzF0polpYIivcV7Yb5OGp_D0B9ny_9GkFQ"
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
          let img = ""
          if(item.images !== ""){
            let images = JSON.parse(item.images)
            img = images.find(seda=>seda.main).image_url
            if(!img){
              img = images[0].image_url
            }
          }
          console.log(img);
          let temp = newItem({
            image: img === "" ? "https://i.ibb.co/0nQqZ1F/empty.png" : img,
            height: item.nominalHeight === 0 ? 100 : item.nominalHeight,
            width: item.nominalWidth === 0 ? 100 : item.nominalWidth,
            name: item.name,
            key: item.key,
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
