import styles from './index.less';
import { Tabs,Row,Col,Select,Button } from 'antd';
import React,{useRef} from 'react';
import Tran from './transfer/transfer';
import './index.less'
import Treedata from './tree/tree';
import Ceshi from './ceshi/ceshi';

const { TabPane } = Tabs;
const { Option } = Select;
export default function IndexPage() {

  const onChange = (key: string) => {
    console.log(key);
  };
  const chufa:any=useRef(null)
  const add=()=>{
    console.log(chufa);
    
    chufa.current.updatedata("新增")
  }
  return (
    <div style={{padding:"20px" ,overflow: "hidden"}} className='page'>
       <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Tab 1" key="1">
            <Treedata/>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <Tabs tabPosition="left">
              <TabPane tab="Tab 1" key="1">
                <div className='page_trans'>
                  <div className='page_transdiv1'>
                    <Row>
                      <Col span={8}>未使用</Col>
                      <Col span={8}>
                        <span>城市站：</span>
                        <Select   placeholder="请选择" style={{ width: 120 }} allowClear>
                          <Option  value="lucy">Lucy</Option>
                        </Select>
                      </Col>
                      <Col span={8} className="page_transcol">
                        <Button type="primary" onClick={add}>新增运营位</Button>
                      </Col>
                    </Row>
                  </div>
                  <div className='page_transdiv3'></div>
                  <div className='page_transdiv2'>
                  <Row>
                      <Col span={12}>未使用</Col>
                      <Col span={12}>
                        <span>城市站：</span>
                        <Select   placeholder="请选择" style={{ width: 120 }} allowClear>
                          <Option  value="lucy">Lucy</Option>
                        </Select>
                      </Col>
                      
                    </Row>
                  </div>
                </div>
                <Tran ref={chufa}/>
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab 3
              </TabPane>
            </Tabs>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <Ceshi/>
        </TabPane>
    </Tabs>
    </div>
  );
}
