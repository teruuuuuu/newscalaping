import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as requestFunction from '../../../actions/api/request-function'
import * as crawlInfoApi from '../../../actions/api/crawlinfo-api'

import {TopInfo} from '../../../model/topInfo'
import {TopLinks} from '../../../model/topLinks'

import {DTable} from '../../parts/default-table'

// requestFunctionのcallApi関数をpropsにセットする
interface TopLinksProps extends React.Props<any> {topinfoList: Array<TopInfo>, topLinks: Array<TopLinks>, callApi: (text: any) => void};
interface TopLinksState extends React.StatelessComponent<any> {selectedIndex: number, pageVolume: number, pageSize: number};
function mapStateToProps(state: any) {
    const { topinfo_list } = state.topinfoListReducer
    const { topLinks } = state.topLinksReducer
    return {
      topinfoList: topinfo_list
      , topLinks: topLinks
    }
  }
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}, requestFunction), dispatch);
}
class TopLinksPage extends React.Component<TopLinksProps, TopLinksState > {
  constructor(props: any){
    super(props);
  }

  componentWillMount() {
    // this.props.callApi(crawlInfoApi.get_links_info())
  }
  HEADER_INFO: Array<any> = [
    {key: "id", name: "ID", style: {width: 60}, colStyle: {width: 60} }
    , {key: "url", name: "URL", style: {}, colStyle: {cursor: "pointer"}  }
    , { key: "text", name: "TITLE", style: {}, colStyle: {}  }
    , { key: "add_date", name: "DATE", style: {width: 280}, colStyle: {width: 280} }
  ]

  clickCell = (e:any,f:any, g:any) => {
    if(f==1){
      window.open(g.url,'_blank')
    }
  }

  render() {
    const topLinks = this.props.topLinks

    return (
      <div >
        <DTable 
          topLinks={topLinks}
          pageVolume={30}
          clickCell={this.clickCell}
          HEADER_INFO={this.HEADER_INFO}
        />
      </div>
    );  
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopLinksPage);
