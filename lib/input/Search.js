"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ref2 = require("rc-util/lib/ref");

var _SearchOutlined = _interopRequireDefault(require("@ant-design/icons/SearchOutlined"));

var _Input = _interopRequireDefault(require("./Input"));

var _button = _interopRequireDefault(require("../button"));

var _SizeContext = _interopRequireDefault(require("../config-provider/SizeContext"));

var _configProvider = require("../config-provider");

var _reactNode = require("../_util/reactNode");

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var Search = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var inputRef = React.useRef(null);

  var onChange = function onChange(e) {
    var customOnChange = props.onChange,
        customOnSearch = props.onSearch;

    if (e && e.target && e.type === 'click' && customOnSearch) {
      customOnSearch(e.target.value, e);
    }

    if (customOnChange) {
      customOnChange(e);
    }
  };

  var onMouseDown = function onMouseDown(e) {
    var _a;

    if (document.activeElement === ((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input)) {
      e.preventDefault();
    }
  };

  var onSearch = function onSearch(e) {
    var _a;

    var customOnSearch = props.onSearch;

    if (customOnSearch) {
      customOnSearch((_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.input.value, e);
    }
  };

  var renderAddonAfter = function renderAddonAfter(prefixCls, size) {
    var enterButton = props.enterButton,
        disabled = props.disabled,
        addonAfter = props.addonAfter,
        loading = props.loading;
    var searchIcon = typeof enterButton === 'boolean' || typeof enterButton === 'undefined' ? /*#__PURE__*/React.createElement(_SearchOutlined["default"], null) : null;
    var btnClassName = "".concat(prefixCls, "-button");
    var button;
    var enterButtonAsElement = enterButton;
    var isAntdButton = enterButtonAsElement.type && enterButtonAsElement.type.__ANT_BUTTON === true;

    if (isAntdButton || enterButtonAsElement.type === 'button') {
      button = (0, _reactNode.cloneElement)(enterButtonAsElement, (0, _extends2["default"])({
        onMouseDown: onMouseDown,
        onClick: onSearch,
        key: 'enterButton'
      }, isAntdButton ? {
        className: btnClassName,
        size: size
      } : {}));
    } else {
      button = /*#__PURE__*/React.createElement(_button["default"], {
        className: btnClassName,
        type: enterButton ? 'primary' : undefined,
        size: size,
        disabled: disabled,
        key: "enterButton",
        onMouseDown: onMouseDown,
        onClick: onSearch,
        loading: loading,
        icon: searchIcon
      }, enterButton);
    }

    if (addonAfter) {
      return [button, (0, _reactNode.cloneElement)(addonAfter, {
        key: 'addonAfter'
      })];
    }

    return button;
  };

  var renderSearch = function renderSearch(_ref) {
    var getPrefixCls = _ref.getPrefixCls,
        direction = _ref.direction;

    var customizePrefixCls = props.prefixCls,
        customizeInputPrefixCls = props.inputPrefixCls,
        className = props.className,
        customizeSize = props.size,
        suffix = props.suffix,
        enterButton = props.enterButton,
        restProps = __rest(props, ["prefixCls", "inputPrefixCls", "className", "size", "suffix", "enterButton"]);

    delete restProps.onSearch;
    delete restProps.loading;
    var prefixCls = getPrefixCls('input-search', customizePrefixCls);
    var inputPrefixCls = getPrefixCls('input', customizeInputPrefixCls);

    var getClassName = function getClassName(size) {
      var _classNames;

      return (0, _classnames["default"])(prefixCls, (_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-rtl"), direction === 'rtl'), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-").concat(size), !!size), (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-with-button"), !!enterButton), _classNames), className);
    };

    return /*#__PURE__*/React.createElement(_SizeContext["default"].Consumer, null, function (size) {
      return /*#__PURE__*/React.createElement(_Input["default"], (0, _extends2["default"])({
        ref: (0, _ref2.composeRef)(inputRef, ref),
        onPressEnter: onSearch
      }, restProps, {
        size: customizeSize || size,
        prefixCls: inputPrefixCls,
        addonAfter: renderAddonAfter(prefixCls, customizeSize || size),
        suffix: suffix,
        onChange: onChange,
        className: getClassName(customizeSize || size)
      }));
    });
  };

  return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, renderSearch);
});
Search.defaultProps = {
  enterButton: false
};
Search.displayName = 'Search';
var _default = Search;
exports["default"] = _default;