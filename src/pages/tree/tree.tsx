import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import { Tree,Input,Tabs } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import React, { useState } from 'react';
import './tree.less'

const { Search } = Input;
const { TabPane } = Tabs;

const Treedata = () => {
    const [treeData,setTreeData]:any =useState( [
        {
          title: '集团',
          key: '0',
          children: [
              {
                  title: '物流组',
                  key: '0-0',
                  children: [{ title: 'leaf', key: '0-0-0' }],
              },
              {
                  title: '总经办',
                  key: '0-1',
                  children: [{ title: 'leaf', key: '0-1-0' }],
              },
              {
                  title: '门店',
                  key: '0-2',
                  children: [
                      { title:"服务组", key: '0-2-0',depart:"服务组上级部门",type:"公司",contact:"这是联系方式",site:"服务组地址",remark:"服务组备注"},
                      { title: "厨房", key: '0-2-1'},
                      { title: '客厅', key: '0-2-2' },
                  ],
              },
          ],
        },
        {
          title: 'DT组',
          key: '1',
          children: [
            {
              title: 'parent1',
              key: '1-0',
          
              children: [
                { title: 'leaf', key: '1-0-0',  },
                { title: 'leaf', key: '1-0-1',  },
              ],
            },
          ],
        },
      ]);
    const [rightdata,setRightdata]:any=useState({})
    const [posit,setPosit]=useState({
        x:0,
        y:0
    })
    const [visib,setVisib]=useState(false)
    const onSelect = (selectedKeys: React.Key[], info: any) => {
        console.log('selected', selectedKeys, info);
        if(selectedKeys.length>0){
            console.log();
            
            setRightdata(info.node)
            setPosit({
                x:info.nativeEvent.x+info.nativeEvent.offsetX,
                y:info.nativeEvent.y-info.nativeEvent.offsetY
            })
            setVisib(true)
        }else{
            setRightdata({})
            setVisib(false)
        }
        
    };

    const onSearch = (value: string) => console.log(value);

  return (
    <div className='tree'>
        <div className='tree_header'>组织架构管理</div>
        <div className='tree_count'>
            <div className='tree_left'>
                <div className='tree_leftdiv'>
                    <span className='tree_leftspan1'>组织架构管理</span>
                    <span className='tree_leftspan2'>添加一级</span>
                </div>
                <Search placeholder="input search text" onSearch={onSearch} enterButton style={{marginBottom:"10px"}}/>
                <Tree
                    showLine={true}
                    defaultExpandedKeys={['0-2']}
                    onSelect={onSelect}
                    treeData={treeData}
                />
                <div style={{position:"absolute",left:`${posit.x}px`,top:`${posit.y}px`,display:`${visib?"block":"none"}`}}>出现的位置</div>
            </div>
            <div className='tree_right'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="基本信息" key="1">
                        <div>
                            <span>架构名称：</span>
                            <span>{rightdata.title}</span>
                        </div>
                        <div>
                            <span>上级部门：</span>
                            <span>{rightdata.depart}</span>
                        </div>
                        <div>
                            <span>架构类型：</span>
                            <span>{rightdata.type}</span>
                        </div>
                        <div>
                            <span>联系方式：</span>
                            <span>{rightdata.contact}</span>
                        </div>
                        <div>
                            <span>地址：</span>
                            <span>{rightdata.site}</span>
                        </div>
                        <div>
                            <span>备注：</span>
                            <span>{rightdata.remark}</span>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    </div>
  );
};

export default Treedata;