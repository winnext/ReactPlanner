import React, { Component } from "react";
import PropTypes from "prop-types";
import FormNumberInput from "../../../style/form-number-input";
import FormTextInput from "../../../style/form-text-input";

const tableStyle = { width: "100%" };
const firstTdStyle = { width: "6em" };
const inputStyle = { textAlign: "left" };

export default function ItemAttributesEditor(
  { element, onUpdate, attributeFormData, state, ...rest },
  { translator }
) {
  let name = attributeFormData.has("name")
    ? attributeFormData.get("name")
    : element.name;
  let renderedX = attributeFormData.has("x")
    ? attributeFormData.get("x")
    : element.x;
  let renderedY = attributeFormData.has("y")
    ? attributeFormData.get("y")
    : element.y;
  let renderedR = attributeFormData.has("rotation")
    ? attributeFormData.get("rotation")
    : element.rotation;
  let itemData = attributeFormData.has("itemData")
    ? attributeFormData.get("itemData")
    : element.itemData;

  return (
    <React.Fragment>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <td style={firstTdStyle}>{translator.t("Name")}</td>
            <td>
              <FormTextInput
                value={name}
                onChange={(event) => onUpdate("name", event.target.value)}
                style={inputStyle}
              />
            </td>
          </tr>
          <tr>
            <td style={firstTdStyle}>X</td>
            <td>
              <FormNumberInput
                value={renderedX}
                onChange={(event) => onUpdate("x", event.target.value)}
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr>
          <tr>
            <td style={firstTdStyle}>Y</td>
            <td>
              <FormNumberInput
                value={renderedY}
                onChange={(event) => onUpdate("y", event.target.value)}
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr>
          <tr>
            <td style={firstTdStyle}>{translator.t("Rotation")}</td>
            <td>
              <FormNumberInput
                value={renderedR}
                onChange={(event) => onUpdate("rotation", event.target.value)}
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr>
          {element.info && Object.keys(element.info).map((key,index) => {
            return (
              <tr key={index}>
                <td style={firstTdStyle}>{key}</td>
                <td>
                  {element.info[key]}
                </td>
              </tr>
            );
          })
          }
        </tbody>
      </table>
      {itemData
        ? itemData.map((item, index) => (
            <React.Fragment key={index}>
              <hr></hr>
              <table style={tableStyle}>
                <tbody>
                  <tr>
                    <td style={firstTdStyle}>Name</td>
                    <td>
                      <FormTextInput
                        value={item.name}
                        onChange={(event) => {
                          return onUpdate(
                            "itemData",
                            itemData.map((a, b) => {
                              if (b === index) a.name = event.target.value;
                              return a;
                            })
                          );
                        }}
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td style={firstTdStyle}>Value</td>
                    <td>
                      <FormTextInput
                        value={item.value}
                        onChange={(event) => {
                          return onUpdate(
                            "itemData",
                            itemData.map((a, b) => {
                              if (b === index) a.value = event.target.value;
                              return a;
                            })
                          );
                        }}
                        style={inputStyle}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type="button"
                onClick={() =>
                  onUpdate(
                    "itemData",
                    itemData.filter((_, i) => i !== index)
                  )
                }
              >
                delete
              </button>
              <hr></hr>
            </React.Fragment>
          ))
        : null}
      <button
        onClick={() =>
          onUpdate("itemData", [...itemData, { name: "", value: "" }])
        }
      >
        +
      </button>
    </React.Fragment>
  );
}

ItemAttributesEditor.propTypes = {
  element: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  attributeFormData: PropTypes.object.isRequired,
  state: PropTypes.object.isRequired,
};

ItemAttributesEditor.contextTypes = {
  translator: PropTypes.object.isRequired,
};
