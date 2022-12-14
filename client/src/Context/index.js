import React from "react";
import PropTypes from "prop-types";
import AreaContextProvider, { AreaContext } from "./AreaContext";
import axios from "axios";
import newItem from "../components/assets/newItem";
export default function ContextProvider(props, context) {
  React.useLayoutEffect(() => {
    axios.defaults.headers.common["Authorization"] =
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyWHlXNldXZEk5UUt1Q25hcWJzcnVWeG8zZ0xJa2R6TWd0ZlNIeVpybWIwIn0.eyJleHAiOjE2NzE4Njc3NjQsImlhdCI6MTY3MTAwMzc2NCwiYXV0aF90aW1lIjoxNjcxMDAzNzY0LCJqdGkiOiJjYTU3ZGU3YS0xMmNmLTQzMDktYWUzMS0yZjE5ODZlN2ZlZWUiLCJpc3MiOiJodHRwOi8vMTcyLjMwLjk5LjEyMTo4MDgwL2F1dGgvcmVhbG1zL0lGTSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiaWZtX2ZhY2lsaXR5X2NsaWVudCIsImFjY291bnQiXSwic3ViIjoiNGFkY2NhODYtMzk4MS00MDE2LTk0MjEtMmJhYWVhY2M1MThmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnJvbnQiLCJub25jZSI6IjVkODJkMTdhLWY0NWYtNGZiMi1hYzFjLWE1OTNjZDFiNTUwNyIsInNlc3Npb25fc3RhdGUiOiI5MTM0MmY1NS0wNGEyLTQyYzEtOTNiNC0yMjc3MzE5ZDdlYmYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xNzIuMzAuOTkuMTIxOjMwMDAvKiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHA6Ly8xNzIuMzAuOTkuNTA6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtaWZtIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJpZm1fZmFjaWxpdHlfY2xpZW50Ijp7InJvbGVzIjpbImZhY2lsaXR5X2NsaWVudF9yb2xlX2FkbWluIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiOTEzNDJmNTUtMDRhMi00MmMxLTkzYjQtMjI3NzMxOWQ3ZWJmIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoixLBzbWV0IEF0YW1lciBBdGFsYXkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyMSIsImdpdmVuX25hbWUiOiLEsHNtZXQgQXRhbWVyIiwibG9jYWxlIjoidHIiLCJmYW1pbHlfbmFtZSI6IkF0YWxheSIsImVtYWlsIjoiYXRhbWVyLmF0YWxheUBzaWdudW10dGUuY29tIn0.NEWBC-pH6fZDSJqh3ZKC46COR60lBdG1cD5KEzjQmBfQUMiakxPcsOFD5bJUnvTJdDjccpTatArl66sI5jxjQDF2WgThDnu0Wq16PX-U0ei4VlFFV_ahFVcDGSAwgUavZBDbqv9Yg2gwx86XwB0AroaCsZWMshCHWs3LtZylPkMhwZ9exwRJZiykSGBw2qlL66kGROM1zzVGYwcK2dhjH3N0t7wUtKgb4JMMUzByxuCXuMBkSJYZQpyMzj6j-HnJIKdrkVu-P-jU4im-SsACztrihNcQ0UVmc1lLoUMesDnaz3QeQwUArk5sejNll64zGdRqP0Z8_Fl2X9O_R77iwg"
  }, []);
  React.useEffect(() => {
    axios
      .get("http://localhost:3014/types", {
        headers: {
          realm: "IFM",
        },
      })
      .then((res) => {
        console.log(res.data);
        for (let item of res.data.children) {
          let img = "";
          if (item.images !== "") {
            let images = JSON.parse(item.images);
            img = images.find((se) => se.main).image_url;
            if (!img) {
              img = images[0].image_url;
            }
          }
          let temp = newItem({
            image: img === "" ? undefined : img,
            height: typeof(item.nominalHeight) === "number" ? item.nominalHeight === 0 ? 100 : item.nominalHeight : 100,
            width: typeof(item.nominalHeight) === "number" ? item.nominalWidth === 0 ? 100 : item.nominalWidth : 100,
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
  return (
    <AreaContextProvider state={props.state}>
      {props.children}
    </AreaContextProvider>
  );
}

export { AreaContext };

ContextProvider.contextTypes = {
  assets: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
