import * as React from "react";
import * as ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface TabsExampleProps extends React.Props<any> {};
interface TabsExampleState extends React.StatelessComponent<any> {selectTab: number};

function mapStateToProps(state: any) {return {selectTab: 2}}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}), dispatch);
}
class TabsExample extends React.Component<TabsExampleProps, TabsExampleState > {
  constructor(props: any) {
    super(props);
    this.state = { selectTab: 3}
  }
  componentWillMount() {}
  
  selectedClassName = (i:number) => {
      if(i == this.state.selectTab){
        return "active"
      }
      return ""
  }

  getView = (i: number) => {
      if(i == 1){
          return this.view1();
      } else if(i == 2){
          return this.view2();
      } else {
          return this.view3();
      }
  }
  changeView = (i: number) => {
    return () => this.setState({ selectTab: i});
  }

  view1 = () => {return ( <div> view1</div>)}
  view2 = () => {return ( <div> view2</div>)}
  view3 = () => {return ( <div> view3</div>)}

  render() {
    return (
    <div>
        <ul className="nav nav-tabs">
            <li className={this.selectedClassName(1)} onClick={this.changeView(1)}><a href="#">Menu 1</a></li>
            <li className={this.selectedClassName(2)} onClick={this.changeView(2)}><a href="#">Menu 2</a></li>
            <li className={this.selectedClassName(3)} onClick={this.changeView(3)}><a href="#">Menu 2</a></li>
        </ul>
        <div>
            {this.getView(this.state.selectTab)}
        </div>
    </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabsExample);
