import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useState } from 'react';
import './home.css';
import { Button } from 'antd';
import logo from '../logo.svg';

function Home() {
  const [readonly, setReadoly] = useState(false);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={logo} className="profile-logo" alt="logo" />
        <div className="app-link">User Profile</div>
      </div>
      <ProForm
        submitter={readonly ? false : { resetButtonProps: false }}
        className="profile-form"
        onFinish={async () => {
          await setReadoly(true);
        }}>
        <ProFormText name="username" label="username" rules={[{ required: true }]} readonly={readonly} />
        <ProFormText name="email" label="email" rules={[{ required: true }, { type: 'email' }]} readonly={readonly} />
        <ProFormText name="phone" label="phone" rules={[{ required: true }]} readonly={readonly} />
        <ProFormRadio.Group
          label="gender"
          valueEnum={{
            1: 'Male',
            0: 'Female',
          }}
          name="gender"
          rules={[{ required: true }]}
          readonly={readonly}
        />
        <ProFormText name="address" label="address" rules={[{ required: true }]} readonly={readonly} />
      </ProForm>
      {readonly && (
        <Button type="primary" onClick={() => setReadoly(false)}>
          Edit
        </Button>
      )}
    </div>
  );
}

export default Home;
