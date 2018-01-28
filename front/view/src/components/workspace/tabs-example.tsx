import * as React from "react";
import * as ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Tabs, Tab} from 'material-ui/Tabs';

interface TabsExampleProps extends React.Props<any> {};
interface TabsExampleState extends React.StatelessComponent<any> {selectTab: number, value: string};

function mapStateToProps(state: any) {return {selectTab: 2}}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}), dispatch);
}
class TabsExample extends React.Component<TabsExampleProps, TabsExampleState > {
  constructor(props: any) {
    super(props);
    this.state = { selectTab: 3, value: "a"}
  }
  handleChange = (value: string) => {
    this.setState({
      value: value,
    });
  };
  styles: any = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
  };
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


        <Tabs
        value={this.state.value}
        onChange={this.handleChange} >
        <Tab label="Tab A" value="a">
          <div>
            <h2 style={this.styles.headline}>Controllable Tab A</h2>
            <p>
              Tabs are also controllable if you want to programmatically pass them their values.
              This allows for more functionality in Tabs such as not
              having any Tab selected or assigning them different values.
            </p>
          </div>
        </Tab>
        <Tab label="Tab B" value="b">
          <div>
            <h2 style={this.styles.headline}>Controllable Tab B</h2>
            <p>
              This is another example of a controllable tab. Remember, if you
              use controllable Tabs, you need to give all of your tabs values or else
              you wont be able to select them.
            </p>
          </div>
        </Tab>
      </Tabs>

    </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TabsExample);
