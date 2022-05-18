import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ContentContainer from "../style/content-container";
import ContentTitle from "../style/content-title";
import CatalogItem from "./catalog-item";
import newItem from "./newItem";

const itemsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(14em, 1fr))",
  gridGap: "10px",
  marginTop: "1em",
};

const dumpAssets = [
  {
    image: "https://via.placeholder.com/100x100",
    height: 100,
    width: 100,
    name: "test",
  },
  {
    image: "https://via.placeholder.com/100x100",
    height: 100,
    width: 100,
    name: "test2",
  },
  {
    image: "https://via.placeholder.com/100x100",
    height: 100,
    width: 100,
    name: "test3",
  },
];

const Assets = (props, context) => {
  const [assetsList, setAssetsList] = React.useState([]);

  useEffect(() => {
    console.log(context);

    setTimeout(() => {
      test(0);
    }, 2000);
    setTimeout(() => {
      test(1);
    }, 4000);
    setTimeout(() => {
      test(2);
    }, 6000);
  }, []);

  const testList = () => {
    dumpAssets.forEach((item) => {
      const temp = newItem(item);
      context.catalog.registerElement(temp);
      context.catalog.addToCategory("assets", temp);
    });
    let assets = context.assets;
    let elementsToDisplay = assets
      ? assets.elements.filter((element) =>
          element.info.visibility ? element.info.visibility.catalog : true
        )
      : [];
    setAssetsList(elementsToDisplay);
  };

  const test = (index) => {
    const temp = newItem(dumpAssets[index]);
    context.catalog.registerElement(temp);
    context.catalog.addToCategory("assets", temp);
    let assets = context.assets;
    let elementsToDisplay = assets
      ? assets.elements.filter((element) =>
          element.info.visibility ? element.info.visibility.catalog : true
        )
      : [];
    setAssetsList(elementsToDisplay);
  };

  return (
    <ContentContainer width={props.width} height={props.height}>
      <ContentTitle>{context.translator.t("Assets")}</ContentTitle>
      <div style={itemsStyle}>
        {assetsList.length !== 0 ? (
          assetsList.map((elem) => (
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
};

Assets.contextTypes = {
  assets: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
