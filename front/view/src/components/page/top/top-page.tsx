import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReactDataGrid from 'react-data-grid'

import * as requestFunction from '../../../actions/api/request-function'
import * as topinfoApi from '../../../actions/api/topinfo-api'

import {TopInfo} from '../../../model/topinfo'

// requestFunctionのcallApi関数をpropsにセットする
interface TopPageProps extends React.Props<any> {topinfoList: Array<TopInfo>, callApi: (text: any) => void, addUrl: any, addTitle: any, addDescription: any};
interface TopPageState extends React.StatelessComponent<any> {};

function mapStateToProps(state: any) {
    const { topinfo_list } = state.topinfoListReducer
    return {
      topinfoList: topinfo_list,
      addUrl: ""
    }
  }
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}, requestFunction), dispatch);
}

class TopPage extends React.Component<TopPageProps, TopPageState > {
  constructor(props: any){
    // export default connectの結果(bindActionCreatorsに渡したstoreと任意のobjectのうちpropsインターフェースで指定したpropsが入っている
    super(props);
  }

  componentWillMount() {
    this.props.callApi(topinfoApi.get_top_info())
  }

  

  deleteClick = (col:any) => {
    // console.info(col)
    this.props.callApi(topinfoApi.delete_top_info(col.id))
    
  }
  addClick = () => {
    const  addUrl:any = this.refs.addUrl
    const  addTitle:any  = this.refs.addTitle
    const  addDescription:any  = this.refs.addDescription

    this.props.callApi(topinfoApi.add_top_info(addUrl.value, addTitle.value, addDescription.value))
    addUrl.value = ""
    addTitle.value = ""
    addDescription.value = ""
  }


  render() {
    const HEADER_INFO: Array<any> = [
      { key: "delete_btn", name: " ", width: 40}
      , {key: "id", name: "id", width: 60}
      , { key: "url", name: "url"}
      , { key: "title", name: "title"}
      , { key: "description", name:"description"}
      , { key: "create_date", name: "create_date", width: 150}
  ]

  const { topinfoList }= this.props 
  const rowGetter = (i: number)  => topinfoList[i];
  const rowClick = (col: any, row: any)  => {}
  const getCellAction = (header: any, col: any)  => {
    if (header.key === 'delete_btn') {
      return [{
          icon: 'glyphicon glyphicon-remove',
          callback: () => this.deleteClick(col)
        }];
    }
  }

  const style = {
    marginTop: "30px"
  };
  const divStyle = {
    display: "flex",
    marginBottom: "15px"
  }
  const labelStyle = {
    marginTop: "5px",
    paddingRight: "15px",
    paddingLeft: "15px"
  }
  const textStyle = {
    width: "20%"
  }
  const buttonStyle = {
    marginLeft: "20px"
  }

  console.info(HEADER_INFO)
      return (
      <div style={style}>
          <div style={divStyle}>
              <label style={labelStyle}>url</label><input type="text" name="url" className="form-control" style={textStyle} ref={"addUrl"} />
              <label style={labelStyle}>title</label><input type="text" name="title" className="form-control" style={textStyle} ref={"addTitle"}/>
              <label style={labelStyle}>description</label><input type="text" name="description" className="form-control" style={textStyle} ref={"addDescription"}/>
              <button type="button" className="btn btn-primary" style={buttonStyle} onClick={this.addClick}>追加</button>
          </div>
          <ReactDataGrid 
              columns={HEADER_INFO} 
              rowGetter={rowGetter} 
              rowsCount={topinfoList.length} 
              minHeight={340} 
              onRowClick={rowClick} 
              getCellActions={getCellAction}
              />
      </div>
    );  
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopPage);
