"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TodoContext = exports.AreaContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = ContextProvider;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AreaContext = require("./AreaContext");

var _AreaContext2 = _interopRequireDefault(_AreaContext);

var _TodoContext = require("./TodoContext");

var _TodoContext2 = _interopRequireDefault(_TodoContext);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _newItem = require("../components/assets/newItem");

var _newItem2 = _interopRequireDefault(_newItem);

var _keycloak = require("./keycloak");

var _keycloak2 = _interopRequireDefault(_keycloak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ContextProvider(props, context) {
  var _useState = (0, _react.useState)({ auth: false, token: null }),
      _useState2 = _slicedToArray(_useState, 2),
      user = _useState2[0],
      setUser = _useState2[1];

  _react2.default.useEffect(function () {
    _keycloak2.default.init({ onLoad: "login-required" }).success(function (auth) {
      if (!auth) {
        window.location.reload();
      } else {
        _axios2.default.defaults.headers.common["Authorization"] = "Bearer " + _keycloak2.default.token;
        console.log(_keycloak2.default);

        // Excel exportlarda dosya ismine kullanıcı adını vermek için header'e kullanıcı ismini ekledik.
        _keycloak2.default.loadUserInfo().then(function (res) {
          return _axios2.default.defaults.headers.common["username"] = res.preferred_username;
        });

        if (_keycloak2.default.token !== undefined) {
          setUser(_extends({
            auth: _keycloak2.default.authenticated,
            token: _keycloak2.default.token
          }, _keycloak2.default.userInfo));
        }
      }

      // setTimeout(() => {
      //   keycloak
      //     .updateToken(70)
      //     .success((refreshed) => {
      //       if (refreshed) {
      //         console.debug("Token refreshed" + refreshed);
      //       } else {
      //         console.warn(
      //           "Token not refreshed, valid for " +
      //             Math.round(
      //               keycloak.tokenParsed.exp +
      //                 keycloak.timeSkew -
      //                 new Date().getTime() / 1000
      //             ) +
      //             " seconds"
      //         );
      //       }
      //     })
      //     .error(() => {
      //       console.error("Failed to refresh token");
      //     });
      // }, 60000);
    }).error(function () {
      console.error("Authenticated Failed");
    });
  }, []);

  // React.useLayoutEffect(() => {
  //   axios.defaults.headers.common["Authorization"] =
  //   "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJyWHlXNldXZEk5UUt1Q25hcWJzcnVWeG8zZ0xJa2R6TWd0ZlNIeVpybWIwIn0.eyJleHAiOjE2NzE5Njc3NjYsImlhdCI6MTY3MTEwMzc2NywiYXV0aF90aW1lIjoxNjcxMTAzNzY2LCJqdGkiOiI0MWNmYTU3Yy0xODExLTRjOTktYjcwYi02ZTEyNTU4ODU1NWYiLCJpc3MiOiJodHRwOi8vMTcyLjMwLjk5LjEyMTo4MDgwL2F1dGgvcmVhbG1zL0lGTSIsImF1ZCI6WyJyZWFsbS1tYW5hZ2VtZW50IiwiaWZtX2ZhY2lsaXR5X2NsaWVudCIsImFjY291bnQiXSwic3ViIjoiNGFkY2NhODYtMzk4MS00MDE2LTk0MjEtMmJhYWVhY2M1MThmIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZnJvbnQiLCJub25jZSI6IjQ0YmIwYTJlLTFhNzktNGM5Yy05MGIzLTVmMTNmM2EzODQ4NSIsInNlc3Npb25fc3RhdGUiOiJjZTdjMmU2OC1lNmMxLTQxNTUtODkyZS1jN2ZlNmYxMjU5MzQiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly8xNzIuMzAuOTkuMTIxOjMwMDAvKiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCIsImh0dHA6Ly8xNzIuMzAuOTkuNTA6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtaWZtIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsInJlYWxtLWFkbWluIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJpZm1fZmFjaWxpdHlfY2xpZW50Ijp7InJvbGVzIjpbImZhY2lsaXR5X2NsaWVudF9yb2xlX2FkbWluIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiY2U3YzJlNjgtZTZjMS00MTU1LTg5MmUtYzdmZTZmMTI1OTM0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoixLBzbWV0IEF0YW1lciBBdGFsYXkiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ1c2VyMSIsImdpdmVuX25hbWUiOiLEsHNtZXQgQXRhbWVyIiwibG9jYWxlIjoidHIiLCJmYW1pbHlfbmFtZSI6IkF0YWxheSIsImVtYWlsIjoiYXRhbWVyLmF0YWxheUBzaWdudW10dGUuY29tIn0.gcdYHQGd64x59nrOWdyM0pVO8qVtdpIDazmwu6cdONAniTrCDIGDKsUnY_bvrdwI5birBGOqRlhJJsLLIMpJqJmnYjY-TylfnmZIXql61E2S3XHq7GHMAkLO1p9EqBraZ1ZhXOF-avDg78Hn7mZMZJ0o4Fusw69zsugkoIEKM4nj9JqjNY2uWsbJ7cBsnCvwVqJwKdT6Ww7QWJp_z8qWjUtw4OBEQbV7Y0wX5cQpV87xlRFpUaqQy3A7-W9YrTleBCv7dnpZBO9ZK-WT2xyt_OzAwWy-1ESxUKz0uX3awZ3uAKJVipULTKnos6yX3VGJJseNJ0r_IPkVTjICBb2oGA"
  // }, []);
  _react2.default.useEffect(function () {
    if (user.auth) {
      _axios2.default.get("http://localhost:3014/types", {
        headers: {
          realm: "IFM"
        }
      }).then(function (res) {
        console.log(res.data);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = res.data.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var item = _step.value;

            var img = "";
            if (item.images !== "") {
              var images = JSON.parse(item.images);
              img = images.find(function (se) {
                return se.main;
              }).image_url;
              if (!img) {
                img = images[0].image_url;
              }
            }
            var temp = (0, _newItem2.default)({
              image: img === "" ? undefined : img,
              height: typeof item.nominalHeight === "number" ? item.nominalHeight === 0 ? 100 : item.nominalHeight : 100,
              width: typeof item.nominalHeight === "number" ? item.nominalWidth === 0 ? 100 : item.nominalWidth : 100,
              name: item.name,
              key: item.key
            });
            context.catalog.registerElement(temp);
            context.catalog.addToCategory("assets", temp);
            var assets = context.assets;
            var elementsToDisplay = assets ? assets.elements.filter(function (element) {
              return element.info.visibility ? element.info.visibility.catalog : true;
            }) : [];
            context.projectActions.initCatalog(context.catalog);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  }, [user]);

  if (!user.auth) return null;

  return _react2.default.createElement(
    _TodoContext2.default,
    { state: props.state, user: user },
    _react2.default.createElement(
      _AreaContext2.default,
      { state: props.state, user: user },
      props.children
    )
  );
}

exports.AreaContext = _AreaContext.AreaContext;
exports.TodoContext = _TodoContext.TodoContext;


ContextProvider.contextTypes = {
  assets: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired,
  projectActions: _propTypes2.default.object.isRequired
};