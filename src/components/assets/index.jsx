import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ContentContainer from "../style/content-container";
import ContentTitle from "../style/content-title";
import CatalogItem from "./catalog-item";
import newItem from "./newItem";
import sandalye from "./sandalye";
import masa from "./masa";

const itemsStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(14em, 1fr))",
  gridGap: "10px",
  marginTop: "1em",
};

const dumpAssets = [
  {
    image: "https://www.burotime.com/Uploads/teknikcizim/assist/AST-CHR-2-MF-3D-SL-PP_dim.png",
    height: 80,
    width: 60,
    name: "Sandalye",
  },
  {
    image: "https://www.freepnglogos.com/uploads/table-png/table-icon-download-icons-20.png",
    height: 50,
    width: 150,
    name: "Masa",
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
    if (context.assets.elements.length === 0) {
      setTimeout(() => {
        test(0);
        console.log(context);
      }, 2000);
      setTimeout(() => {
        test(1);
        console.log(context);
      }, 4000);
      setTimeout(() => {
        test(2);
        console.log(context);
      }, 6000);
    } else {
      let assets = context.assets;
      let elementsToDisplay = assets
        ? assets.elements.filter((element) =>
            element.info.visibility ? element.info.visibility.catalog : true
          )
        : [];
      setAssetsList(elementsToDisplay);
    }
  }, []);

  const test = (index) => {
    let temp = newItem(dumpAssets[index]);
    if(index===0){
      temp = sandalye(dumpAssets[index]);
    }
    if(index===1){
      temp = masa(dumpAssets[index]);
    }
    context.catalog.registerElement(temp);
    context.catalog.addToCategory("assets", temp);
    let assets = context.assets;
    let elementsToDisplay = assets
      ? assets.elements.filter((element) =>
          element.info.visibility ? element.info.visibility.catalog : true
        )
      : [];
    context.projectActions.initCatalog(context.catalog);
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
  catalog: PropTypes.object.isRequired,
};

Assets.contextTypes = {
  assets: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
};
