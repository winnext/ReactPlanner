import React from "react";
import PropTypes from "prop-types";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import {
  ContentTitle,
  ContentContainer,
  FormSubmitButton,
  CancelButton,
  DeleteButton,
} from "../style/export";
import ModelService from "../../services/model";
import AssetService from "../../services/asset";

export default function ModelUpload(props, context) {
  let { width, height } = props;
  let { projectActions, translator } = context;
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [model, setModel] = React.useState({
    assetKey: "",
    obj: null,
    mtl: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setModel({ ...model, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (model.assetKey === "") {
      enqueueSnackbar("Please select an asset", { variant: "error" });
      return;
    }
    if (model.obj === null) {
      enqueueSnackbar("Please select an obj file", { variant: "error" });
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("file", model.obj);

    var url = new URL(window.location.href);
    var planKey = url.searchParams.get("key");

    console.log("formDataObj",formDataObj);
    console.log(formDataObj.get("file"));

    ModelService.upload(formDataObj)
      .then((resObj) => {
        console.log("resObj", resObj);
        if (model.mtl === null) {
          AssetService.create({
            planKey: planKey,
            assetKey: model.assetKey,
            modelObj: resObj.data.file.filename,
            modelMtl: "",
          })
            .then((res) => {
              setLoading(false);
              enqueueSnackbar("Model uploaded successfully", {
                variant: "success",
              });
              window.location.href = new URL(window.location.href);
            })
            .catch((err) => {
              console.log(err);
              enqueueSnackbar("Model upload failed", { variant: "error" });
            });
        } else {
          const formDataMtl = new FormData();
          formDataMtl.append("file", model.mtl);
          ModelService.upload(formDataMtl)
            .then((resMtl) => {
              console.log("resMtl", resMtl);
              AssetService.create({
                planKey: planKey,
                assetKey: model.assetKey,
                modelObj: resObj.data.file.filename,
                modelMtl: resMtl.data.file.filename,
              })
                .then((res) => {
                  setLoading(false);
                  enqueueSnackbar("Model uploaded successfully", {
                    variant: "success",
                  });
                  window.location.href = new URL(window.location.href);
                })
                .catch((err) => {
                  console.log(err);
                  enqueueSnackbar("Model upload failed", { variant: "error" });
                });
            })
            .catch((err) => {
              console.log(err);
              enqueueSnackbar("Model upload failed", { variant: "error" });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Model upload failed", { variant: "error" });
      });
  };
  return (
    <ContentContainer width={width} height={height}>
      <ContentTitle>{translator.t("Model Upload")}</ContentTitle>
      <form onSubmit={onSubmit}>
        <div>
          <h3>Asset</h3>
          <FormControl style={{ width: "200px" }}>
            <InputLabel id="asset-select-label">Asset</InputLabel>
            <Select
              labelId="asset-select-label"
              id="demo-simple-select"
              value={model.assetKey}
              label="Asset"
              name="assetKey"
              onChange={handleChange}
            >
              {context.assets.elements.map((asset) => {
                return (
                  <MenuItem key={asset.info.key} value={asset.info.key}>
                    {asset.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>

        <div>
          <h3>Object File (.obj)</h3>
          <input
            type="file"
            accept=".obj"
            onChange={(e) =>
              handleChange({
                target: { name: "obj", value: e.target.files[0] },
              })
            }
          />
        </div>

        <div>
          <h3>Material File (.mtl)</h3>
          <input
            type="file"
            accept=".mtl"
            onChange={(e) =>
              handleChange({
                target: { name: "mtl", value: e.target.files[0] },
              })
            }
          />
        </div>

        <table style={{ float: "right" }}>
          <tbody>
            <tr>
              <td>
                <CancelButton
                  size="large"
                  onClick={(e) => projectActions.rollback()}
                >
                  {translator.t("Cancel")}
                </CancelButton>
              </td>
              <td>
                <FormSubmitButton size="large" disabled={loading}>
                  {loading ? (
                    <CircularProgress size={20} />
                  ) : (
                    translator.t("Save")
                  )}
                </FormSubmitButton>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </ContentContainer>
  );
}

ModelUpload.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  state: PropTypes.object.isRequired,
};

ModelUpload.contextTypes = {
  assets: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
};
