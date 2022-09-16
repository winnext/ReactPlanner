import React from "react";
import PropTypes from "prop-types";
import { FormLabel, FormTextInput } from "../../components/style/export";
import PropertyStyle from "./shared-property-style";
import { MdClose } from "react-icons/md";

export default function PropertyChips({
  value,
  onUpdate,
  configs,
  sourceElement,
  internalState,
  state,
}) {
  let update = (val) => {
    if (configs.hook) {
      return configs
        .hook(val, sourceElement, internalState, state)
        .then((_val) => {
          return onUpdate(_val);
        });
    }

    return onUpdate(val);
  };

  return (
    <React.Fragment>
      <table
        className="PropertyChips"
        style={{ ...PropertyStyle.tableStyle,marginBottom:"1em" }}
      >
        <tbody>
          <tr>
            <td style={PropertyStyle.firstTdStyle}>
              <FormLabel>{configs.label}</FormLabel>
            </td>
            <td>
              <FormTextInput
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    update([...value, event.target.value]);
                    event.target.value = "";
                  }
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <table style={{ ...PropertyStyle.tableStyle, marginBottom: "2em" }}>
        <tbody>
          {value.map((item, index) => (
            <tr key={index}>
              <td
                className="chips-item"
                onClick={() => update(value.filter((_, ind) => ind !== index))}
              >
                <span>#{item}</span>
                <span className="chips-delete-btn">
                  <MdClose />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}

PropertyChips.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired,
};
