
/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BooleanNumber, LocaleType, SheetTypes } from '@univerjs/core';

/**
 * Default workbook data
 * @type {IWorkbookData} document see https://univer.work/api/core/interfaces/IWorkbookData.html
 */

const jsonData = {
  UserInfo: {
    name: "prakash",
    address1: "tc palya",
    address2: "kr puram",
    contact: "0000000"
  },
  DeviceInfo: {
    deviceName: "tes",
    modal: "hbsah"
  },
  PlansInfo: {
    currentPlan: "120"
  }
};

const generateCellData = (data) => {
  const cellData = {};
  const merges = [];
  let rowIndex = 0;

  // Header Row
  cellData[rowIndex] = {
    0: { v: 'Category' },
    1: { v: 'Key' },
    2: { v: 'Value' }
  };
  rowIndex++;

  // Populate cellData with category in the first row and merge for following rows
  for (const category in data) {
    const startRow = rowIndex; // Start row for merging
    const numEntries = Object.keys(data[category]).length;
    
    // First row for category
    cellData[rowIndex] = {
      0: { v: category }, // Display category name
      1: { v: Object.keys(data[category])[0] }, // First key
      2: { v: data[category][Object.keys(data[category])[0]] } // First value
    };
    rowIndex++;

    // Subsequent rows for the same category (empty category, filled keys and values)
    Object.keys(data[category]).slice(1).forEach(key => {
      cellData[rowIndex] = {
        0: { v: '' }, // Empty for merged category
        1: { v: key }, // Key
        2: { v: data[category][key] } // Value
      };
      rowIndex++;
    });

    // Add merge for the category column from startRow to endRow
    const endRow = rowIndex - 1;
    if (numEntries > 1) {
      merges.push({ startRow: startRow, startCol: 0, endRow: endRow, endCol: 0 }); // Merge vertically
    }
  }

  return { cellData, merges };
};

const { cellData, merges } = generateCellData(jsonData);

export const DEFAULT_WORKBOOK_DATA = {
  id: 'workbook-01',
  locale: LocaleType.ZH_CN,
  name: 'universheet',
  sheetOrder: ['sheet-01', 'sheet-02', 'sheet-03'],
  appVersion: '3.0.0-alpha',
  sheets: {
    'sheet-01': {
      type: SheetTypes.GRID,
      id: 'sheet-01',
      cellData: {
        ...cellData, // Use generated cell data
      },
      name: 'sheet1',
      tabColor: 'red',
      hidden: BooleanNumber.FALSE,
      rowCount: 1000,
      columnCount: 3, // Adjusted for three columns
      zoomRatio: 1,
      scrollTop: 200,
      scrollLeft: 100,
      defaultColumnWidth: 150,
      defaultRowHeight: 27,
      status: 1,
      showGridlines: 1,
      hideRow: [],
      hideColumn: [],
      rowHeader: {
        width: 46,
        hidden: BooleanNumber.FALSE,
      },
      columnHeader: {
        height: 20,
        hidden: BooleanNumber.FALSE,
      },
      selections: ['A2'],
      rightToLeft: BooleanNumber.FALSE,
      pluginMeta: {
        merges, // Use generated merges with proper vertical merging for categories
      },
    },
    'sheet-02': {
      type: SheetTypes.GRID,
      id: 'sheet-02',
      name: 'sheet2',
      cellData: {},
    },
    'sheet-03': {
      type: SheetTypes.GRID,
      id: 'sheet-03',
      name: 'sheet3',
      cellData: {},
    },
  },
};