"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilterData = getFilterData;
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var React = _interopRequireWildcard(require("react"));

var _util = require("../../util");

var _FilterDropdown = _interopRequireDefault(require("./FilterDropdown"));

function collectFilterStates(columns, init, pos) {
  var filterStates = [];
  (columns || []).forEach(function (column, index) {
    var columnPos = (0, _util.getColumnPos)(index, pos);

    if ('children' in column) {
      filterStates = [].concat((0, _toConsumableArray2["default"])(filterStates), (0, _toConsumableArray2["default"])(collectFilterStates(column.children, init, columnPos)));
    } else if (column.filters || 'filterDropdown' in column || 'onFilter' in column) {
      if ('filteredValue' in column) {
        // Controlled
        filterStates.push({
          column: column,
          key: (0, _util.getColumnKey)(column, columnPos),
          filteredKeys: column.filteredValue,
          forceFiltered: column.filtered
        });
      } else {
        // Uncontrolled
        filterStates.push({
          column: column,
          key: (0, _util.getColumnKey)(column, columnPos),
          filteredKeys: init && column.defaultFilteredValue ? column.defaultFilteredValue : undefined,
          forceFiltered: column.filtered
        });
      }
    }
  });
  return filterStates;
}

function injectFilter(prefixCls, dropdownPrefixCls, columns, filterStates, triggerFilter, getPopupContainer, locale, pos) {
  return columns.map(function (column, index) {
    var columnPos = (0, _util.getColumnPos)(index, pos);
    var _column$filterMultipl = column.filterMultiple,
        filterMultiple = _column$filterMultipl === void 0 ? true : _column$filterMultipl;

    if (column.filters || column.filterDropdown) {
      var columnKey = (0, _util.getColumnKey)(column, columnPos);
      var filterState = filterStates.find(function (_ref) {
        var key = _ref.key;
        return columnKey === key;
      });
      return (0, _extends2["default"])((0, _extends2["default"])({}, column), {
        title: function title(renderProps) {
          return /*#__PURE__*/React.createElement(_FilterDropdown["default"], {
            prefixCls: "".concat(prefixCls, "-filter"),
            dropdownPrefixCls: dropdownPrefixCls,
            column: column,
            columnKey: columnKey,
            filterState: filterState,
            filterMultiple: filterMultiple,
            triggerFilter: triggerFilter,
            locale: locale,
            getPopupContainer: getPopupContainer
          }, (0, _util.renderColumnTitle)(column.title, renderProps));
        }
      });
    }

    if ('children' in column) {
      return (0, _extends2["default"])((0, _extends2["default"])({}, column), {
        children: injectFilter(prefixCls, dropdownPrefixCls, column.children, filterStates, triggerFilter, getPopupContainer, locale, columnPos)
      });
    }

    return column;
  });
}

function generateFilterInfo(filterStates) {
  var currentFilters = {};
  filterStates.forEach(function (_ref2) {
    var key = _ref2.key,
        filteredKeys = _ref2.filteredKeys;
    currentFilters[key] = filteredKeys || null;
  });
  return currentFilters;
}

function flattenKeys(filters) {
  var keys = [];
  (filters || []).forEach(function (_ref3) {
    var value = _ref3.value,
        children = _ref3.children;
    keys.push(value);

    if (children) {
      keys = [].concat((0, _toConsumableArray2["default"])(keys), (0, _toConsumableArray2["default"])(flattenKeys(children)));
    }
  });
  return keys;
}

function getFilterData(data, filterStates) {
  return filterStates.reduce(function (currentData, filterState) {
    var _filterState$column = filterState.column,
        onFilter = _filterState$column.onFilter,
        filters = _filterState$column.filters,
        filteredKeys = filterState.filteredKeys;

    if (onFilter && filteredKeys && filteredKeys.length) {
      return currentData.filter(function (record) {
        return filteredKeys.some(function (key) {
          var keys = flattenKeys(filters);
          var keyIndex = keys.findIndex(function (k) {
            return String(k) === String(key);
          });
          var realKey = keyIndex !== -1 ? keys[keyIndex] : key;
          return onFilter(realKey, record);
        });
      });
    }

    return currentData;
  }, data);
}

function useFilter(_ref4) {
  var prefixCls = _ref4.prefixCls,
      dropdownPrefixCls = _ref4.dropdownPrefixCls,
      mergedColumns = _ref4.mergedColumns,
      onFilterChange = _ref4.onFilterChange,
      getPopupContainer = _ref4.getPopupContainer,
      tableLocale = _ref4.locale;

  var _React$useState = React.useState(collectFilterStates(mergedColumns, true)),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      filterStates = _React$useState2[0],
      setFilterStates = _React$useState2[1];

  var mergedFilterStates = React.useMemo(function () {
    var collectedStates = collectFilterStates(mergedColumns, false); // Return if not controlled

    if (collectedStates.every(function (_ref5) {
      var filteredKeys = _ref5.filteredKeys;
      return filteredKeys === undefined;
    })) {
      return filterStates;
    }

    return collectedStates;
  }, [mergedColumns, filterStates]);
  var getFilters = React.useCallback(function () {
    return generateFilterInfo(mergedFilterStates);
  }, [mergedFilterStates]);

  var triggerFilter = function triggerFilter(filterState) {
    var newFilterStates = mergedFilterStates.filter(function (_ref6) {
      var key = _ref6.key;
      return key !== filterState.key;
    });
    newFilterStates.push(filterState);
    setFilterStates(newFilterStates);
    onFilterChange(generateFilterInfo(newFilterStates), newFilterStates);
  };

  var transformColumns = function transformColumns(innerColumns) {
    return injectFilter(prefixCls, dropdownPrefixCls, innerColumns, mergedFilterStates, triggerFilter, getPopupContainer, tableLocale);
  };

  return [transformColumns, mergedFilterStates, getFilters];
}

var _default = useFilter;
exports["default"] = _default;