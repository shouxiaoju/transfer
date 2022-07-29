import React, { useState } from 'react';
const list = [
  {
    id: '1',
    name: 'name1',
    value: '',
  },
  {
    id: '2',
    name: 'name2',
    value: '',
  },
  {
    id: '3',
    name: 'name3',
    value: '',
  },
];
const Keyindex= () => {
  const [data, setData] = useState(list);

  const deleteFirstHanlde = () => {
    const newdata = JSON.parse(JSON.stringify(data)).reverse();
    // newdata.shift();？
    setData(newdata);
  };

  return (
    <div>
      {data.map((item, index) => {
        return (
          <div key={index}>
            {item.name}
            <input type="value" />
          </div>
        );
      })}
      <div>
        <button onClick={deleteFirstHanlde}>删除第一项</button>
      </div>
    </div>
  );
};

export default Keyindex