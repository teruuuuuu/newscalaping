import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ReactDataGrid from 'react-data-grid'

// requestFunctionのcallApi関数をpropsにセットする
// interface CrawlerLayoutProps extends React.Props<any> {};
// interface CrawlerLayoutState extends React.StatelessComponent<any> {contents: any};

// function mapStateToProps(state: any) {
//     return {
//     }
//   }
// function mapDispatchToProps(dispatch: any) {
//   return bindActionCreators( (Object as any).assign({}), dispatch);
// }

// class CrawlerLayout extends React.Component<CrawlerLayoutProps, CrawlerLayoutState > {
//   constructor(props: any){
//     super(props);
//     const {contents} = props.contents
//     this.state = {
//         contents: contents
//     }
//   }

//   componentWillMount() {}

//   layoutStyle = {
//     marginTop: "30px"
//   };

//   render() {
//       const contents = this.props
//       return (
//       <div style={this.layoutStyle}>
        
//       </div>
//     );  
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(CrawlerLayout);

interface Props {
  contents1: any;
}

export const CrawlerLayout: React.StatelessComponent<Props> = (props) => {
    console.info(props.contents1)
  return (
    <div style={{paddingTop: "30px"}}>
        {props.contents1}
    </div>
  );
};