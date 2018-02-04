import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReactDataGrid from 'react-data-grid'

import * as requestFunction from '../../../actions/api/request-function'
import * as topinfoApi from '../../../actions/api/crawlinfo-api'

import {TopInfo} from '../../../model/topinfo'
import {DTable} from '../../parts/default-table'

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
    super(props);
  }

  componentWillMount() {}

  addClick = () => {
    const  addUrl:any = this.refs.addUrl
    const  addTitle:any  = this.refs.addTitle
    const  addDescription:any  = this.refs.addDescription

    this.props.callApi(topinfoApi.add_top_info(addUrl.value, addTitle.value, addDescription.value))
    addUrl.value = ""
    addTitle.value = ""
    addDescription.value = ""
  }

  HEADER_INFO: Array<any> = [
    {key: "", name: "", type: "delete", style: {width: 40}, colStyle: {width: 40, cursor: "pointer"} }
    ,{key: "id", name: "id", type: "default", style: {width: 60}, colStyle: {width: 60} }
    ,{key: "url", name: "url", type: "default", style: {}, colStyle: {cursor: "pointer"} }
    ,{key: "title", name: "title", type: "default", style: {}, colStyle: {} }
    ,{key: "description", name: "description", type: "default", style: {}, colStyle: {} }
    ,{key: "create_date", name: "date", type: "default", style: {width: 280}, colStyle: {width: 280} }
  ]

  clickCell = (e:any,f:any, g:any) => {
    if(f==0){
      this.props.callApi(topinfoApi.delete_top_info(g.id))
    }else if(f==2){
      window.open(g.url,'_blank')
    }
  }

  render() {
    const { topinfoList }= this.props
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

    console.info(this.HEADER_INFO)
      return (
      <div>
          <div style={{display: "flex", marginBottom: "15px"}}>
              <label style={labelStyle}>url</label><input type="text" name="url" className="form-control" style={textStyle} ref={"addUrl"} />
              <label style={labelStyle}>title</label><input type="text" name="title" className="form-control" style={textStyle} ref={"addTitle"}/>
              <label style={labelStyle}>description</label><input type="text" name="description" className="form-control" style={textStyle} ref={"addDescription"}/>
              <button type="button" className="btn btn-primary" style={buttonStyle} onClick={this.addClick}>追加</button>
          </div>
          <DTable
            topLinks={topinfoList}
            pageVolume={30}
            clickCell={this.clickCell}
            HEADER_INFO={this.HEADER_INFO}
          />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopPage);
