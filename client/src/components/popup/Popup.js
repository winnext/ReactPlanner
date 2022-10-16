import * as React from "react";
import axios from "axios";
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

export default function Popup() {
  const context = React.useContext(AreaContext);
  const [space, setSpace] = React.useState("");
  const [spaces, setSpaces] = React.useState([]);

  const handleChange = (event) => {
    setSpace(event.target.value);
  };

  React.useEffect(() => {
    setSpace("")
    setSpaces([])
    console.log(context.spaces);
    context.spaces.spaces.forEach((item) => {
      const temp = context.links.links.find((link) => link.spaceKey === item.key);
      if(!temp){
        setSpaces((prev) => [...prev, item]);
      }
    });

    let areaLink = context.links.links.find(i=>i.areaKey === context.select.select.id)
    let areaSpace = areaLink && context.spaces.spaces.find(i=>i.key === areaLink.spaceKey)
    if(areaLink && areaSpace){
      setSpaces(prev=>[...prev,areaSpace])
      setSpace(areaLink.spaceKey)
    }
  }, [context.popup.open]);

  const Save = () => {
    var url = new URL(window.location.href);
    var key = url.searchParams.get("key");
    if (context.select.select) {
      axios.post("http://localhost:9001/link", {
        planKey:key,
        spaceKey: space,
        areaKey: context.select.select.id,
      }).then(res=>{
        console.log(res.data);
        setSpace("")
        context.getLinksAndSpaces()
        context.popup.setOpen(false);
      })
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
        <Box sx={{ p:2 }}>
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
                <MenuItem key={item.key} value={item.key}>{item.name}</MenuItem>
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
