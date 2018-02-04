import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

import {TableRowColumn } from 'material-ui/Table';

import * as requestFunction from '../../../actions/api/request-function'
import * as crawlInfoApi from '../../../actions/api/crawlinfo-api'

import {TopInfo} from '../../../model/topInfo'
import {TopLinks} from '../../../model/topLinks'

import {FTable} from '../../parts/func-table'

// requestFunctionのcallApi関数をpropsにセットする
interface TopLinksProps extends React.Props<any> {topinfoList: Array<TopInfo>, topLinks: Array<TopLinks>, callApi: (text: any) => void};
interface TopLinksState extends React.StatelessComponent<any> {dialogOpen: boolean, dialogTitle: string, dialogText: string};
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
    this.state = {
      dialogOpen: false,
      dialogTitle: "",
      dialogText: "",
    };
  }

  componentWillMount() {
    // this.props.callApi(crawlInfoApi.get_links_info())
  }
  HEADER_INFO: Array<any> = [
    {key: "id", name: "ID", style: {width: 60}, colStyle: {width: 60} }
    , {key: "url", name: "URL", style: {}, colStyle: {cursor: "pointer"}  }
    , { key: "text", name: "TITLE", style: {}, colStyle: {}  }
    , {key: "info", name: "I", style: {width: 60}, colStyle: {width: 60}  }
    , { key: "add_date", name: "DATE", style: {width: 280}, colStyle: {width: 280} }
  ]

  clickCell = (e:any,f:any, g:any) => {
    if(f==1){
      window.open(g.url,'_blank')
    }
  }

  handleOpen = (title: string, text: string) => {
    this.setState({
      dialogOpen: true
      , dialogTitle: title
      , dialogText: text
    });
  };

  handleClose = () => {
    this.setState({
      dialogOpen: false
      , dialogTitle: ""
      , dialogText: ""
    });
  };

  contentView = (content: any, i: number, header: any) => {
      switch( header.type) {
          case "delete": return <TableRowColumn key={"key" + i}  style={header.colStyle}>{"×"}</TableRowColumn>
          default: return <TableRowColumn  key={"key" + i} style={header.colStyle}>{content[header.key]}</TableRowColumn>
      }
  }


 dialog = () => {
   const actions = [
     <FlatButton
       label="Cancel"
       primary={true}
       onClick={this.handleClose}
     />,
     <FlatButton
       label="Submit"
       primary={true}
       onClick={this.handleClose}
     />,
   ];
   const {dialogOpen, dialogTitle, dialogText} = this.state
   return (
     <Dialog
       title={dialogTitle}
       actions={actions}
       modal={true}
       open={dialogOpen}
     >
       {dialogText}
     </Dialog>
   )
 }

  render() {
    const topLinks = this.props.topLinks


    return (
      <div >
        <FTable
          topLinks={topLinks}
          pageVolume={30}
          clickCell={this.clickCell}
          contentView={this.contentView}
          HEADER_INFO={this.HEADER_INFO}
        />
        { this.dialog() }
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopLinksPage);
