"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _createSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/createSuper"));

var React = _interopRequireWildcard(require("react"));

var _rcTextarea = _interopRequireDefault(require("rc-textarea"));

var _omit = _interopRequireDefault(require("omit.js"));

var _classnames = _interopRequireDefault(require("classnames"));

var _ClearableLabeledInput = _interopRequireDefault(require("./ClearableLabeledInput"));

var _configProvider = require("../config-provider");

var _Input = require("./Input");

var TextArea = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(TextArea, _React$Component);

  var _super = (0, _createSuper2["default"])(TextArea);

  function TextArea(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TextArea);
    _this = _super.call(this, props);

    _this.focus = function () {
      _this.resizableTextArea.textArea.focus();
    };

    _this.saveTextArea = function (textarea) {
      _this.resizableTextArea = textarea === null || textarea === void 0 ? void 0 : textarea.resizableTextArea;
    };

    _this.saveClearableInput = function (clearableInput) {
      _this.clearableInput = clearableInput;
    };

    _this.handleChange = function (e) {
      _this.setValue(e.target.value);

      (0, _Input.resolveOnChange)(_this.resizableTextArea.textArea, e, _this.props.onChange);
    };

    _this.handleReset = function (e) {
      _this.setValue('', function () {
        _this.focus();
      });

      (0, _Input.resolveOnChange)(_this.resizableTextArea.textArea, e, _this.props.onChange);
    };

    _this.renderTextArea = function (prefixCls, bordered) {
      var _classNames;

      var _this$props = _this.props,
          showCount = _this$props.showCount,
          className = _this$props.className,
          style = _this$props.style;
      return /*#__PURE__*/React.createElement(_rcTextarea["default"], (0, _extends2["default"])({}, (0, _omit["default"])(_this.props, ['allowClear', 'bordered', 'showCount']), {
        className: (0, _classnames["default"])((_classNames = {}, (0, _defineProperty2["default"])(_classNames, "".concat(prefixCls, "-borderless"), !bordered), (0, _defineProperty2["default"])(_classNames, className, className && !showCount), _classNames)),
        style: showCount ? null : style,
        prefixCls: prefixCls,
        onChange: _this.handleChange,
        ref: _this.saveTextArea
      }));
    };

    _this.renderComponent = function (_ref) {
      var getPrefixCls = _ref.getPrefixCls,
          direction = _ref.direction;

      var _a;

      var value = (0, _Input.fixControlledValue)((_a = _this.state) === null || _a === void 0 ? void 0 : _a.value);
      var _this$props2 = _this.props,
          customizePrefixCls = _this$props2.prefixCls,
          _this$props2$bordered = _this$props2.bordered,
          bordered = _this$props2$bordered === void 0 ? true : _this$props2$bordered,
          _this$props2$showCoun = _this$props2.showCount,
          showCount = _this$props2$showCoun === void 0 ? false : _this$props2$showCoun,
          maxLength = _this$props2.maxLength,
          className = _this$props2.className,
          style = _this$props2.style;
      var prefixCls = getPrefixCls('input', customizePrefixCls); // Max length value

      var hasMaxLength = Number(maxLength) > 0;
      value = hasMaxLength ? value.slice(0, maxLength) : value; // TextArea

      var textareaNode = /*#__PURE__*/React.createElement(_ClearableLabeledInput["default"], (0, _extends2["default"])({}, _this.props, {
        prefixCls: prefixCls,
        direction: direction,
        inputType: "text",
        value: value,
        element: _this.renderTextArea(prefixCls, bordered),
        handleReset: _this.handleReset,
        ref: _this.saveClearableInput,
        triggerFocus: _this.focus,
        bordered: bordered
      })); // Only show text area wrapper when needed

      if (showCount) {
        var valueLength = (0, _toConsumableArray2["default"])(value).length;
        var dataCount = "".concat(valueLength).concat(hasMaxLength ? " / ".concat(maxLength) : '');
        textareaNode = /*#__PURE__*/React.createElement("div", {
          className: (0, _classnames["default"])("".concat(prefixCls, "-textarea"), (0, _defineProperty2["default"])({}, "".concat(prefixCls, "-textarea-rtl"), direction === 'rtl'), "".concat(prefixCls, "-textarea-show-count"), className),
          style: style,
          "data-count": dataCount
        }, textareaNode);
      }

      return textareaNode;
    };

    var value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    _this.state = {
      value: value,
      // eslint-disable-next-line react/no-unused-state
      prevValue: props.value
    };
    return _this;
  }

  (0, _createClass2["default"])(TextArea, [{
    key: "setValue",
    value: function setValue(value, callback) {
      if (this.props.value === undefined) {
        this.setState({
          value: value
        }, callback);
      }
    }
  }, {
    key: "blur",
    value: function blur() {
      this.resizableTextArea.textArea.blur();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(_configProvider.ConfigConsumer, null, this.renderComponent);
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, _ref2) {
      var prevValue = _ref2.prevValue;
      var newState = {
        prevValue: nextProps.value
      };

      if (nextProps.value !== undefined || prevValue !== nextProps.value) {
        newState.value = nextProps.value;
      }

      return newState;
    }
  }]);
  return TextArea;
}(React.Component);

var _default = TextArea;
exports["default"] = _default;