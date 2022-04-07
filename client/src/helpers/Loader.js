import { Spin, Space } from 'antd';

function Loader(){
    return(
      <Space size="middle" style={{  justifyContent: 'center',
        display: 'flex'}}>
        <Spin size="large" />
      </Space>
    )
}

export default Loader;