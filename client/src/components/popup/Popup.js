import * as React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { AreaContext } from "../../Context";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Slide,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Popup(props, context2) {
  const context = React.useContext(AreaContext);
  const [space, setSpace] = React.useState("");
  const [spaces, setSpaces] = React.useState([]);

  const handleChange = (event) => {
    setSpace(event.target.value);
  };

  React.useEffect(() => {
    setSpace("");
    setSpaces([]);
    console.log(context.spaces);
    context.spaces.spaces.forEach((item) => {
      const temp = context.links.links.find(
        (link) => link.spaceKey === item.key
      );
      if (!temp) {
        setSpaces((prev) => [...prev, item]);
      }
    });

    let areaLink = context.links.links.find(
      (i) => i.areaKey === context.select.select.id
    );
    let areaSpace =
      areaLink &&
      context.spaces.spaces.find((i) => i.key === areaLink.spaceKey);
    if (areaLink && areaSpace) {
      setSpaces((prev) => [...prev, areaSpace]);
      setSpace(areaLink.spaceKey);
    }
  }, [context.popup.open]);

  const Save = () => {
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    if (context.select.select) {
      axios
        .post("http://localhost:9001/space", {
          planKey: key,
          spaceKey: space,
          areaKey: context.select.select.id,
        })
        .then((res) => {
          console.log(res.data);
          setSpace("");
          context.getLinksAndSpaces();
          context.popup.setOpen(false);
        });
    }
  };

  const GetComponents = () => {
    let areaLink = context.links.links.find(
      (i) => i.areaKey === context.select.select.id
    );
    let areaSpace =
      areaLink &&
      context.spaces.spaces.find((i) => i.key === areaLink.spaceKey);
    if (areaLink && areaSpace) {
      axios
        .post(
          "http://localhost:3014/component" +
            "/advancedSearch/" +
            `?page=${1}&limit=${10}&orderBy=${"DESC"}&orderByColumn=${""}`,
          [
            {
              relationName: "LOCATED_IN",
              labels: ["Virtual", "FacilityStructure"],
              filters: { isDeleted: false, id: areaSpace.id.toString() },
            },
          ]
        )
        .then((res) => {
          console.log(res.data);
          console.log(context2);
          let layerID = "layer-1";
          let areaID = areaLink.areaKey;
          let area = props.state.getIn([
            "scene",
            "layers",
            layerID,
            "areas",
            areaID,
          ]);
          let x = Infinity;
          let y = -Infinity;
          area.vertices.forEach((vertexID) => {
            let vertice = props.state.getIn([
              "scene",
              "layers",
              layerID,
              "vertices",
              vertexID,
            ]);
            if (vertice.x <= x) {
              x = vertice.x;
            }
          });
          area.vertices.forEach((vertexID) => {
            let vertice = props.state.getIn([
              "scene",
              "layers",
              layerID,
              "vertices",
              vertexID,
            ]);
            if (vertice.x === x) {
              if (vertice.y >= y) {
                y = vertice.y;
              }
            }
          });
          x += 10;
          y -= 10;
          for (let item of res.data.children) {
            axios.get("http://localhost:3014/component" + "/identifier/" + item.id).then(itemInfo=>{
              axios.get("http://localhost:3014/types/identifier/"+itemInfo.data.properties.type.toString()).then(typeInfo=>{
                const asset = context2.assets.elements.find(
                  (i) => i.info.key === typeInfo.data.properties.key
                );
                console.log("asset",asset);
                context2.itemsActions.createItem(
                  "layer-1",
                  asset.name,
                  x,
                  y,
                  200,
                  100,
                  0,
                  item
                );
              })
            })
            
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Dialog
      open={context.popup.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => context.popup.setOpen(false)}
    >
      <DialogTitle>
        {context.select.select && "Area Id: " + context.select.select.id}
      </DialogTitle>
      <DialogContent>
        <Button onClick={GetComponents}>Get Components</Button>
        <Box sx={{ p: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Space</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={space}
              label="Select Space"
              onChange={handleChange}
            >
              <MenuItem value="">Empty</MenuItem>
              {spaces.map((item) => (
                <MenuItem key={item.key} value={item.key}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => context.popup.setOpen(false)}>Cancel</Button>
        <Button onClick={Save}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

Popup.contextTypes = {
  assets: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
};
