import * as React from "react";
import * as ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ReactDataGrid from 'react-data-grid'

interface DatagridExampleProps extends React.Props<any> {};
interface DatagridExampleState extends React.StatelessComponent<any> {};


function mapStateToProps(state: any) {return {}}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}), dispatch);
}
class DatagridExample extends React.Component<DatagridExampleProps, DatagridExampleState > {
  constructor(props: any) {
    super(props);
  }
  componentWillMount() {}
  
  
  render() {
    var _rows: Array<any> = [
        {id: "aa", title: "bb", count: "cc"}
        , {id: "aa", title: "bb", count: "cc"}
        , {id: "aa", title: "bb", count: "cc"}
        , {id: "aa", title: "bb", count: "cc"}
        , {id: "aa", title: "bb", count: "cc"}
    ]
    var _columns: Array<any> = [
        { key: 'id', name: 'ID' },
        { key: 'title', name: 'Title' },
        { key: 'count', name: 'Count' } ];
    const rowGetter = (i: number)  => _rows[i];
    const getCellAction = (col: any, row: any)  => {
      console.info(col);
      console.info(row);
    }
    
    return (
        <div>
            <ReactDataGrid
          columns={_columns}
          rowGetter={rowGetter}
          rowsCount={_rows.length}
          minHeight={340}
          getCellActions={getCellAction}
          />
        </div>
        
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DatagridExample);
