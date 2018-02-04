import * as React from "react";
import * as ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {Tabs, Tab} from 'material-ui/Tabs';

import * as requestFunction from '../../../actions/api/request-function'
import * as crawlInfoApi from '../../../actions/api/crawlinfo-api'

import {CrawlerLayout} from './layout';
import TopPage from './top-page';
import TopLinksPage from './top-links';

interface CrawlIndexProps extends React.Props<any> {callApi: (text: any) => void};
interface CrawlIndexState extends React.StatelessComponent<any> {};

function mapStateToProps(state: any) {return {}}
function mapDispatchToProps(dispatch: any) {
  return bindActionCreators( (Object as any).assign({}, requestFunction), dispatch);
}
class CrawlIndex extends React.Component<CrawlIndexProps, CrawlIndexState > {
  constructor(props: any) {
    super(props);
  }
  componentWillMount() {
    this.props.callApi(crawlInfoApi.get_top_info())
    this.props.callApi(crawlInfoApi.get_links_info())
  }

  handleChange = (value: string) => {
    this.setState({});
  };

  render() {
    return (
    <div>
        <Tabs initialSelectedIndex={0} >
        <Tab label="監視対象">
          <div>
            <CrawlerLayout  contents1={<TopPage />}/>
          </div>
        </Tab>
        <Tab label="リンク">
          <div>
            <CrawlerLayout  contents1={<TopLinksPage />}/>
          </div>
        </Tab>
      </Tabs>

    </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CrawlIndex);
