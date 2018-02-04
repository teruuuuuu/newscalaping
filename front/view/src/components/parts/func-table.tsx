import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReactDataGrid from 'react-data-grid'

import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableFooter, TableHeader,
  TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

import DataTables from 'material-ui-datatables';
import FlatButton from 'material-ui/FlatButton';


interface FTableProps extends React.Props<any> {
    topLinks: Array<any>,
    pageVolume: number,
    contentView: (content: any, index: number, headerInfo: any) => any,
    clickCell: (col:number, row:number, elment: any) => void,
    HEADER_INFO: Array<any>};
interface FTableState extends React.StatelessComponent<any> {selectedIndex: number};

function mapStateToProps(state: any) {return {

}}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}), dispatch);
}
export class FTable extends React.Component<FTableProps, FTableState > {
  constructor(props: any) {
    super(props);
    this.state = { selectedIndex: 0}
  }
  componentWillMount() {}
  render() {
      const {selectedIndex} = this.state;
      const {topLinks, pageVolume, clickCell, HEADER_INFO, contentView} = this.props
      const gotoPage = (index:number) => { return () => {
        this.setState({selectedIndex: index})
      }};
      return (
      <div>
          <FuncTable
            topLinks={topLinks}
            selectedIndex={selectedIndex}
            pageVolume={pageVolume}
            clickCell={clickCell}
            contentView={contentView}
            clickPage={gotoPage}
            HEADER_INFO={HEADER_INFO}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FTable);
interface Props {
    topLinks: Array<any>,
    selectedIndex: number,
    pageVolume: number,
    contentView: (content: any, index: number, headerInfo: any) => any,
    clickCell: (col:number, row:number, elment: any) => void,
    clickPage: (index:number) => void,
    HEADER_INFO: Array<any>
}

export const FuncTable: React.StatelessComponent<Props> = (props) => {
    const tableState = {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: true,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: true,
        showCheckboxes: true,
        height: '600px',
    };
    const headerStyle = {
        backgroundColor: "#f1f1f1",
    };

    const bodyStyle = {
        backgroundColor: "#f9f9f9",
    };

    const buttonStyle = {
        minWidth: "40px",
        Width: "40px"
    };

    function showPageLink(linksArray: Array<any>, index:number, pageVol: number, clickPage: (i:number) => any) {
        const pageNum = Math.floor(linksArray.length / pageVol) + 1
        const headLinks = []
        const middleLinks = []
        const tailLinks = []
        const linkElement = (i:number) => {
          return (<FlatButton key={"k"+i} label={String(i+1)}
          disabled={i==index} onClick={clickPage(i)}
          style={i==index ? (Object as any).assign({}, buttonStyle, { color: "#F00"}) : buttonStyle} />)
        }

        const innerStartIndex = index > 2 ? index - 2: 0;
        const innerEndIndex = innerStartIndex + 4 <= pageNum ? innerStartIndex + 4 : pageNum;
        for(var i=0; i < innerStartIndex && i < 2; i++){
            headLinks.push(linkElement(i))
        }
        if(innerStartIndex > 3){headLinks.push("...")}
        else if(innerStartIndex == 3){headLinks.push(linkElement(2))}
        for(var i = innerStartIndex; i <= innerEndIndex && i < pageNum; i++) {
            middleLinks.push(linkElement(i))
        }
        if(innerEndIndex + 4 < pageNum){tailLinks.push("...")}
        else if(innerEndIndex + 4 == pageNum){tailLinks.push(linkElement(innerEndIndex+1))}
        for(var i = pageNum - 2 > innerEndIndex + 1 ? pageNum - 2 :innerEndIndex + 1; i < pageNum; i++) {
            tailLinks.push(linkElement(i))
        }
        const links = headLinks.concat(middleLinks).concat(tailLinks)
        return (
        <div style={{textAlign: "right"}}>
          <FlatButton label="◀︎" style={buttonStyle} disabled={index == 0} onClick={clickPage(index - 1)}/>
            {links}
          <FlatButton label="▶︎" style={buttonStyle} disabled={index >= pageNum - 1} onClick={clickPage(index + 1)}/><br />
        </div>)
    }

    function headerElement(HEADER_INFO:Array<any>) {
        const headerContent= HEADER_INFO.map((header: any, i: number) =>
            <TableRowColumn  key={header.key} style={header.style}>{header.name}</TableRowColumn>)
        return (
        <TableRow style={{fontWeight: 700, color: "inherit"}} >
            {headerContent}
        </TableRow>)
    }

    function contentElement(content: any, index: number, headerInfo: Array<any>) {
        const elem = headerInfo.map((header: any, i: number) => {
          return contentView(content, i, header)})
        console.info(elem)
        return (
            <TableRow key={"contents"+index} style={{color: "inherit"}}>{elem}</TableRow>)
    }

    const {selectedIndex, pageVolume, topLinks, contentView, clickCell, clickPage, HEADER_INFO} = props;
    const startIndex = selectedIndex * pageVolume
    const viewLinks = topLinks.slice(startIndex, startIndex + pageVolume)

    const header = headerElement(HEADER_INFO)
    const linkContents = viewLinks.map((link: any, i: number) => contentElement(link, i, HEADER_INFO))

    return (
    <div >
      <div style={{border: "0.5px solid #ccc"}}>
        <Table
            height={tableState.height}
            fixedHeader={tableState.fixedHeader}
            fixedFooter={tableState.fixedFooter}
            selectable={false}
            onCellClick={(e, f) => {clickCell(e, f, viewLinks[e])}}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
              style={headerStyle}
            >
              {header}
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={tableState.deselectOnClickaway}
              showRowHover={tableState.showRowHover}
              stripedRows={tableState.stripedRows}
              style={bodyStyle}
            >
              {linkContents}
            </TableBody>
        </Table>
      </div>
      <div>
        {showPageLink(topLinks, selectedIndex, pageVolume, clickPage)}
      </div>
    </div>
    );
};
