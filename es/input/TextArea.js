import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _inherits from "@babel/runtime/helpers/inherits";
import _createSuper from "@babel/runtime/helpers/createSuper";
import * as React from 'react';
import RcTextArea from 'rc-textarea';
import omit from 'omit.js';
import classNames from 'classnames';
import ClearableLabeledInput from './ClearableLabeledInput';
import { ConfigConsumer } from '../config-provider';
import { fixControlledValue, resolveOnChange } from './Input';

var TextArea = /*#__PURE__*/function (_React$Component) {
  _inherits(TextArea, _React$Component);

  var _super = _createSuper(TextArea);

  function TextArea(props) {
    var _this;

    _classCallCheck(this, TextArea);

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

      resolveOnChange(_this.resizableTextArea.textArea, e, _this.props.onChange);
    };

    _this.handleReset = function (e) {
      _this.setValue('', function () {
        _this.focus();
      });

      resolveOnChange(_this.resizableTextArea.textArea, e, _this.props.onChange);
    };

    _this.renderTextArea = function (prefixCls, bordered) {
      var _classNames;

      var _this$props = _this.props,
          showCount = _this$props.showCount,
          className = _this$props.className,
          style = _this$props.style;
      return /*#__PURE__*/React.createElement(RcTextArea, _extends({}, omit(_this.props, ['allowClear', 'bordered', 'showCount']), {
        className: classNames((_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-borderless"), !bordered), _defineProperty(_classNames, className, className && !showCount), _classNames)),
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

      var value = fixControlledValue((_a = _this.state) === null || _a === void 0 ? void 0 : _a.value);
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

      var textareaNode = /*#__PURE__*/React.createElement(ClearableLabeledInput, _extends({}, _this.props, {
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
        var valueLength = _toConsumableArray(value).length;

        var dataCount = "".concat(valueLength).concat(hasMaxLength ? " / ".concat(maxLength) : '');
        textareaNode = /*#__PURE__*/React.createElement("div", {
          className: classNames("".concat(prefixCls, "-textarea"), _defineProperty({}, "".concat(prefixCls, "-textarea-rtl"), direction === 'rtl'), "".concat(prefixCls, "-textarea-show-count"), className),
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

  _createClass(TextArea, [{
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
      return /*#__PURE__*/React.createElement(ConfigConsumer, null, this.renderComponent);
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

export default TextArea;