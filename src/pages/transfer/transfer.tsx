import { Image, List,Space } from 'antd';
import React, { useState,useEffect } from 'react';
import TableTransfer from '@/commount/tabletransfer';
import './index.less'
import { request } from 'umi';
  
    

const Tran=()=>{
    const leftTableColumns = [
        {
            key:'name',
            dataIndex: 'name',
            title: '运营位图片',
            render: (text:any) =>{
              return  <List
                    itemLayout="horizontal"
                    dataSource={[text]}
                    renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image height={50} src={item.img}/>}
                            title={item.title}
                            description={item.link}
                        />
                    </List.Item>
                    )}
                />
                
            } 
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_:any, record:any) => {
                return (
                    <Space size="middle">
                        <span style={{color:"#1585FF"}}>修改</span>
                        <span onClick={()=>{deletedata(record)}} style={{color:"#1585FF"}}>删除</span>
                    </Space>
                )
            },
        },
    ];
    const rightTableColumns = [
        {
            key:'name',
            dataIndex: 'name',
            title: '运营位图片',
            render: (text:any) =>{
              return  <List
                    itemLayout="horizontal"
                    dataSource={[text]}
                    renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Image height={50} src={item.img}/>}
                            title={item.title}
                            description={item.link}
                        />
                    </List.Item>
                    )}
                />
                
            } 
        },
        {
            title: '操作',
            key: 'action',
            width: 200,
            render: (_:any, record:any) => {
                let up=false
                let dowm=false
                if(targetKeys[0]===record.key){
                    dowm=true
                    up=false
                }else if(targetKeys[targetKeys.length-1]===record.key){
                    up=true
                    dowm=false
                }else{
                    up=true
                    dowm=true
                }
                return (
                    <Space size="middle">
                        {up&&<span style={{color:"#1585FF"}} onClick={()=>{updata(record)}} >上移</span>}
                        {dowm&&<span style={{color:"#1585FF"}} onClick={()=>{downdata(record)}}>下移</span>}
                        <span style={{color:"#1585FF"}}>修改</span>
                        <span onClick={()=>{deletedata(record)}} style={{color:"#1585FF"}}>删除</span>
                    </Space>
                )
            },
        },
    ]

    const [mockData,setMockData] =useState([])
    const [targetKeys, setTargetKeys] = useState([3,5,6,8,10]);//右边数据

    /* 获取mock数据 */
    useEffect(()=>{
        request("/api/city").then(res=>{
          setMockData(res)
        })
    },[])
    /* 点击穿梭 */
    const onChange = (nextTargetKeys:any) => {
      setTargetKeys(nextTargetKeys);
    };

    /* 删除 */
    const deletedata=(record:any)=>{
        console.log("删除",record);
        setMockData((predata:any)=>{
            let arr=predata.filter((item:any)=>{
                return item.key!==record.key
            })
            return arr
        })
        setTargetKeys((predata:any)=>{
            let arr=predata.filter((item:any)=>{
                return item!==record.key
            })
            return arr
        })
    }
    /* 上移 */
    const updata=(record:any)=>{
        let arr=[...targetKeys]
        let num =arr.indexOf(record.key)
        let tex=arr[num]
        arr[num]=arr[num-1]
        arr[num-1]=tex
        setTargetKeys(arr)
    }
    /* 下移  */
    const downdata=(record:any)=>{
        let arr=[...targetKeys]
        let num =arr.indexOf(record.key)
        let tex=arr[num]
        arr[num]=arr[num+1]
        arr[num+1]=tex
        setTargetKeys(arr)
    }

    return (
        <div className='transfer'>
           <TableTransfer
                dataSource={mockData}//全部数据
                targetKeys={targetKeys}//显示在右侧框数据的 key 集合
                showSelectAll={false}
                onChange={onChange}
                leftColumns={leftTableColumns}//左边格式
                rightColumns={rightTableColumns}//右边格式
                titles={["未使用的","已使用的"]}
                
                
            />
        </div>
    )
}

export default Tran