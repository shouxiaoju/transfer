import { EditOutlined, MinusCircleOutlined,PlusCircleOutlined,UpCircleOutlined,DownCircleOutlined } from '@ant-design/icons';
import { Tree,Input,Tabs,Space,Popconfirm } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import React, { useState,useMemo } from 'react';
import Modallist from '@/commount/modal/modal';
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
                  children: [{ title: 'leaf', key: '0-0-0',parent:"0-0",depart:"物流组" }],
                  parent:"0",
                  depart:"集团",
              },
              {
                  title: '总经办',
                  key: '0-1',
                  children: [{ title: 'leaf', key: '0-1-0',parent:"0-1",depart:"总经办" }],
                  parent:"0",
                  depart:"集团",
              },
              {
                  title: '门店',
                  key: '0-2',
                  parent:"0",
                  depart:"集团",
                  children: [
                      { title:"服务组", key: '0-2-0',depart:"门店",type:"公司",contact:"这是联系方式",site:"服务组地址",remark:"服务组备注",parent:"0-2"},
                      { title: "厨房", key: '0-2-1',depart:"门店",parent:"0-2"},
                      { title: '客厅', key: '0-2-2',depart:"门店",parent:"0-2" },
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
              parent:"1",
              depart:"DT组",
              children: [
                { title: 'leaf', key: '1-0-0',parent:"1-0" ,depart:"parent1", },
                { title: 'leaf', key: '1-0-1', parent:"1-0",depart:"parent1" },
              ],
            },
          ],
        },
      ]);
    const [rightdata,setRightdata]:any=useState({})//右边数据
    const [status1,setStatusv1]=useState(true)//上移
    const [status2,setStatusv2]=useState(true)//下移
    const [defaultkey,setDefaultkey]:any=useState([])//选中
    const [expandedKeys, setExpandedKeys]:any = useState([]);//展开
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [isModalVisible, setIsModalVisible]:any = useState(false);//展示对话框
    const [goback,setGoback]=useState({})//回填内容
    const [clicktyp,setClicktyp]=useState("")//当前点击的类型，是新增还是修改
    /* const [newdata,setNewdata]:any=useState({}) */

    const onSelect = (selectedKeys: React.Key[], info: any) => {
        onSelectchenge(selectedKeys,info)
    };

    const onSelectchenge=(selectedKeys:any,info:any)=>{
        console.log('selected', selectedKeys, info);
        if(selectedKeys.length>0){
            setRightdata(info.node)
            find(treeData, selectedKeys[0],"key")
            setDefaultkey(selectedKeys)
            
        }
        setGoback(info.node)
    }

    function find(cityData:any, id:any,keys:any) {
        
        for (let i = 0; i < cityData.length; i++) {
            if (cityData[i][keys] == id) {
                console.log("cityData",cityData);
                /* 控制上下移动的展示隐藏 */
                if(keys==="key"){
                    if(cityData.length>1){
                        if(cityData[0].key==id){
                            setStatusv1(false)
                            setStatusv2(true)
                        }else if(cityData[cityData.length-1].key==id){
                            setStatusv2(false)
                            setStatusv1(true)
                        }else{
                            setStatusv1(true)
                            setStatusv2(true)
                        }
                    }else{
                        setStatusv1(false)
                        setStatusv2(false)
                    }
                    
                }
                return
            }

            if (cityData[i].children && cityData[i].children.length > 0) {
                //console.log(cityData[i]);
                
                find(cityData[i].children, id,keys);
            }

        }
    }
    
    /* 将tree数据展开为一维数据 */
    const dataList:any = [];
    const generateList = (data: DataNode[]) => {
        for (let i = 0; i < data.length; i++) {
            const node = data[i];
            const { key,title,parent }:any = node;
            dataList.push({ key,parent:parent, title: title  });
            if (node.children) {
            generateList(node.children);
            }
        }
    };
    generateList(treeData);

    const getParentKey = (key: React.Key, tree: DataNode[]): React.Key => {
      let parentKey: React.Key;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key;
          } else if (getParentKey(key, node.children)) {
            parentKey = getParentKey(key, node.children);
          }
        }
      }
      return parentKey!;
    };
    
    /* 搜索 */
    const onSearch = (value: string) =>{
        const newExpandedKeys = dataList
          .map((item:any)=> {
            if (item.title.indexOf(value) > -1) {
              return getParentKey(item.key, treeData);
            }
            return null;
          })
          .filter((item:any, i:any, self:any) => item && self.indexOf(item) === i);
        setExpandedKeys(newExpandedKeys as React.Key[]);
        setSearchValue(value);
        setAutoExpandParent(true);
    } ;

    const onExpand = (newExpandedKeys: any) => {
        setExpandedKeys(newExpandedKeys);
    };

    const treeData1 = useMemo(() => {
        const loop = ((data:any) =>{
         return  data.map((item:any) => {
                const strTitle = item.title as string;
                const index = strTitle.indexOf(searchValue);
                const beforeStr = strTitle.substring(0, index);
                const afterStr = strTitle.slice(index + searchValue.length);
                const title =
                index > -1 ? (
                    <span>
                    {beforeStr}
                    <span className="site-tree-search-value">{searchValue}</span>
                    {afterStr}
                    </span>
                ) : (
                    <span>{strTitle}</span>
                );
                if (item.children) {
                    return { title, key: item.key,depart:item.depart,type:item.type,contact:item.contact,site:item.site,remark:item.remark, children: loop(item.children) };
                }
                return {
                    title,
                    key: item.key,
                    depart:item.depart,
                    type:item.type,
                    contact:item.contact,
                    site:item.site,
                    remark:item.remark
                };
            });
            
        });
        return loop(treeData)
    }, [searchValue,treeData]);

    /* 下移上移删除 */
    const downdata=(nodeData:any,doentype:any)=>{
        finde(treeData,nodeData.key,doentype)
    }
    function finde(cityData:any,id:any,doentype:any){
        for (let i = 0; i < cityData.length; i++) {
            if (cityData[i].key == id) {
                let arr
                let newarr=[...cityData]
                let partname
                for(let i = 0; i < cityData.length; i++){
                    if(doentype=="下移"){
                        if(cityData[i].key==id){
                            arr=cityData[i]
                            newarr[i]=newarr[i+1]
                            newarr[i+1]=arr
                        }
                    }else if(doentype=="上移"){
                        if(cityData[i].key==id){
                            arr=cityData[i]
                            newarr[i]=newarr[i-1]
                            newarr[i-1]=arr
                        }
                    }else if(doentype=="删除"){
                        if(cityData[i].key==id){
                            partname=newarr[0].parent
                            newarr.splice(i,1)
                        }
                    }
                }
                console.log("当前数据",newarr);
                let newtrredata:any=[...treeData]
                if(newarr.length>0){
                    if(newarr[0].parent){
                        moveuodown(newtrredata,newarr,newarr[0].parent)
                        setTreeData(newtrredata)
                        find(treeData, id,"key")
                    }else{
                        setTreeData(newarr)
                        find(newarr, id,"key")
                    } 
                }else{
                    moveuodown(newtrredata,newarr,partname)
                    setTreeData(newtrredata)
                    find(treeData, id,"key")
                }
            }
            if (cityData[i].children && cityData[i].children.length > 0) {
                finde(cityData[i].children,id,doentype);
            }
        }
    }

    const moveuodown=(treeData:any,newtreeData:any,key:any)=>{

        for (let i = 0; i < treeData.length; i++) {
            if(treeData[i].key==key){
                console.log(treeData[i]);
                treeData[i]["children"]=newtreeData
            }
            if (treeData[i].children && treeData[i].children.length > 0) {
                moveuodown(treeData[i].children,newtreeData,key);
            }
        }
    }

    /* 展示对话框 */
    const newadd=(nodeData:any)=>{
        setClicktyp("新增")
        setIsModalVisible(true)
    }
    /* 关闭对话框 */
    const handleCancel=()=>{
        setIsModalVisible(false)
    }

    /* 新增 */

    const addtreedata=(newdata:any)=>{
        /* console.log("新增数据",newdata); */
        findeadd(treeData,rightdata.key,newdata)
    }
    const findeadd=(treeData1:any,id:string,newdata:any)=>{
        let newtrredata:any=[...treeData]
        for (let i = 0; i < treeData1.length; i++) {
            if (treeData1[i].key == id) {
                console.log("新增数据",treeData1[i]);
                    if(treeData1[i]['children']){
                        let newarr=[...treeData1[i].children]
                        let newkey1=newarr[newarr.length-1].key.substring(0,newarr[newarr.length-1].key.length-1)
                        let newkey2=newarr[newarr.length-1].key[newarr[newarr.length-1].key.length-1]*1+1
                        newarr.push({
                            contact: newdata.contact,
                            depart: newdata.depart,
                            key: newkey1+newkey2,
                            parent: treeData1[i].key,
                            remark: newdata.remark,
                            site: newdata.site,
                            title: newdata.title,
                            type: newdata.type,
                        })
                        moveuodown(newtrredata,newarr,treeData1[i].key)
                        setTreeData(newtrredata)
                    }else{
                        let newarr:any=[...treeData1]
                        for(let i = 0; i < treeData1.length; i++){
                            if(treeData1[i].key==id){
                                newarr[i]["children"]=[{
                                    contact: newdata.contact,
                                    depart: newdata.depart,
                                    key: treeData1[i].key+"-"+0,
                                    parent: treeData1[i].key,
                                    remark: newdata.remark,
                                    site: newdata.site,
                                    title: newdata.title,
                                    type: newdata.type,
                                }]
                                moveuodown(newtrredata,newarr,treeData1[i].parent)
                                setTreeData(newtrredata)
                            }
                        }
                    }
                /* else{
                    console.log("没有",treeData1[i]);
                    let arr=[...treeData1]
                    let newkey1=arr[arr.length-1].key.substring(0,arr[arr.length-1].key.length-1)
                    let newkey2=arr[arr.length-1].key[arr[arr.length-1].key.length-1]*1+1
                    arr.push({
                        contact: newdata.contact,
                        depart: newdata.depart,
                        key: newkey1+newkey2,
                        parent: undefined,
                        remark: newdata.remark,
                        site: newdata.site,
                        title: newdata.title,
                        type: newdata.type,
                    })
                        console.log("没有修改后数据",arr);
                        moveuodown(newtrredata,arr,treeData1[i].parent)
                        console.log("没有修改后的总数据",newtrredata);
                        setTreeData(newtrredata)
                } */
                
            }
            if (treeData1[i].children && treeData1[i].children.length > 0) {
                findeadd(treeData1[i].children,id,newdata);
            }
        }
    }
    /* 修改 */
    const uodatedata=()=>{
        setClicktyp("修改")
        setIsModalVisible(true)
    }
    const update=(newdata:any)=>{
        console.log("修改",newdata);
        updatefind(treeData,rightdata.key,newdata)
        
    }
    const updatefind=(treeData1:any,id:string,newdata:any)=>{
        let newtrredata:any=[...treeData]
        for (let i = 0; i < treeData1.length; i++) {
            if (treeData1[i].key == id) {
                
                let arr=[...treeData1]
                for(let i = 0; i < treeData1.length; i++){
                    if(treeData1[i].key==id){
                        arr[i]["contact"]=newdata.contact
                        arr[i]["depart"]=newdata.depart
                        arr[i]["key"]=arr[i].key
                        arr[i]["parent"]=arr[i].parent
                        arr[i]["remark"]=newdata.remark
                        arr[i]["site"]=newdata.site
                        arr[i]["title"]=newdata.title
                        arr[i]["type"]=newdata.type
                    }
                }
                console.log("修改后数据",arr);
                moveuodown(newtrredata,arr,treeData1[i].parent)
                console.log("修改后的总数据",newtrredata);
                setTreeData(newtrredata)
            }


            if (treeData1[i].children && treeData1[i].children.length > 0) {
                updatefind(treeData1[i].children,id,newdata);
            }
        }
        
    }

    /* 添加一级 */
    const addfist=()=>{
        setClicktyp("新增一级")
        setIsModalVisible(true)
    }
    const newaddfist=(newdata:any)=>{
        console.log("新增一级",newdata);
        let arr=[...treeData]
        let newkey1=arr[arr.length-1].key.substring(0,arr[arr.length-1].key.length-1)
        let newkey2=arr[arr.length-1].key[arr[arr.length-1].key.length-1]*1+1
            arr.push({
                contact: newdata.contact,
                depart: newdata.depart,
                key: newkey1+newkey2,
                parent: undefined,
                remark: newdata.remark,
                site: newdata.site,
                title: newdata.title,
                type: newdata.type,
            })
            console.log("新增一级修改后数据",arr);
            setTreeData(arr)
    }

    
    return (
        <div className='tree'>
            <div className='tree_header'>组织架构管理</div>
            <div className='tree_count'>
                <div className='tree_left'>
                    <div className='tree_leftdiv'>
                        <span className='tree_leftspan1'>组织架构管理</span>
                        <span className='tree_leftspan2'onClick={addfist}>添加一级</span>
                    </div>
                    <Search placeholder="input search text" onSearch={onSearch} enterButton style={{marginBottom:"10px"}}/>
                    <Tree
                        showLine={true}
                        defaultExpandedKeys={["0-2"]}
                        selectedKeys={defaultkey}
                        onSelect={onSelect}
                        treeData={treeData1}
                        onExpand={onExpand}
                        expandedKeys={expandedKeys}
                        autoExpandParent={autoExpandParent}
                        titleRender={(nodeData:any)=>{
                            return(
                                <div className='tree_posit'>
                                    {nodeData.title}
                                    <div style={{height:"24px",display:`${defaultkey.includes(nodeData.key)?"block":"none"}`,marginLeft:"20px"}}>
                                        <Space size={8}>
                                            <EditOutlined onClick={uodatedata}/>
                                            <Popconfirm title="确定要删除该组织架构吗？" okText="确定" cancelText="取消" onConfirm={()=>{downdata(nodeData,"删除")}}>
                                                <MinusCircleOutlined  />
                                            </Popconfirm >
                                            <PlusCircleOutlined  onClick={()=>{newadd(nodeData)}}/>
                                            <UpCircleOutlined style={{display:`${status1?"block":"none"}`}} onClick={()=>{downdata(nodeData,"上移")}} />
                                            <DownCircleOutlined style={{display:`${status2?"block":"none"}`}} onClick={()=>{downdata(nodeData,"下移")}}/>
                                        </Space>
                                    </div> 
                                </div>
                            )
                            
                        }}
                    />
                    
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
            <Modallist 
                isModalVisible={isModalVisible} 
                handleCancele={handleCancel} 
                goback={goback} 
                addtreedata={addtreedata} 
                clicktyp={clicktyp} 
                update={update}
                newaddfist={newaddfist}
            />
        </div>
    );
};

export default Treedata;