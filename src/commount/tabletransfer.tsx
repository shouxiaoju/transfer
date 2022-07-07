import {  Table, Tag, Transfer } from 'antd';
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }:any) =>{ 

    return( 
        <Transfer {...restProps}>
            {
            
                ({
                    direction,
                    filteredItems,//左右两边的内容
                    onItemSelectAll,//全选
                    onItemSelect,//单个选择
                    selectedKeys: listSelectedKeys,
                }) => {
                    const columns = direction === 'left' ? leftColumns : rightColumns;//分配左右的数据
                    const rowSelection = {
                    onSelectAll(selected:any, selectedRows:any) {//	用户手动选择/取消选择所有行的回调
                        let arr:any=[]
                        if(selected){
                            selectedRows.map((item:any)=>{
                                arr.push(item.key)
                            })
                        }else{
                            arr=listSelectedKeys
                        }
                        
                        onItemSelectAll(arr, selected);
                    },
                    onSelect({ key }:any, selected:any) {//用户手动选择/取消选择某行的回调
                        onItemSelect(key, selected);
                    },
                    selectedRowKeys: listSelectedKeys,//指定选中项的 key 数组
                    };
                    return (
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={filteredItems}
                        />
                    );
                }}
        </Transfer>
    )
};

export default TableTransfer