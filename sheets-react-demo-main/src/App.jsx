import { useRef, useState } from 'react';
import UniverSheet from './components/UniverSheet';
import { DEFAULT_WORKBOOK_DATA } from './assets/default-workbook-data';

function App () {
  const [data] = useState(DEFAULT_WORKBOOK_DATA);
  const univerRef = useRef();

  return (
    <div id="root">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div className="bar">
          <button
            onClick={() => {
              console.log(univerRef.current?.getData());
            }}
          >
            Get Data
          </button>

          <div style={{ padding: '20px' }}>
          <h2>Comparative View</h2>
          <div>
            <label>
              Item 1:
              <input
                type="text"
                name="item1"
            
                placeholder="Enter first item"
              />
            </label>
          </div>
          <div>
            <label>
              Item 2:
              <input
                type="text"
                name="item2"
                placeholder="Enter second item"
              />
            </label>
          </div>
          {/* <div>
            <h3>Comparison Results:</h3>
            <p>Comparing: {comparisonData.item1} vs {comparisonData.item2}</p>
          </div> */}
        </div>
        </div>
        <UniverSheet style={{ flex: 1 }} ref={univerRef} data={data} />
            {/* Comparative Input Fields */}
        
      </div>
      
    </div>
  );
}

export default App;
