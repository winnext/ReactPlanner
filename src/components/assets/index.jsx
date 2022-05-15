import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ContentContainer from "../style/content-container";
import ContentTitle from "../style/content-title";
import CatalogItem from "./catalog-item";

const itemsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(14em, 1fr))",
  gridGap: "10px",
  marginTop: "1em",
};

const Assets = (props, context) => {

  
  let assets = context.assets;
  let elementsToDisplay = assets ? assets.elements.filter((element) =>
    element.info.visibility ? element.info.visibility.catalog : true
  ) : [];

  return (
    <ContentContainer width={props.width} height={props.height}>
      <ContentTitle>{context.translator.t("Assets")}</ContentTitle>
      <div style={itemsStyle}>
        {assets ? (
          elementsToDisplay.map((elem) => (
            <CatalogItem key={elem.name} element={elem} />
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </ContentContainer>
  );
};

export default Assets;

Assets.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  style: PropTypes.object,
  catalog: PropTypes.object,
};

Assets.contextTypes = {
  assets: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
