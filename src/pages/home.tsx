import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';
import './home.css';
import { Button, message } from 'antd';
import axios from 'axios';
import { User } from '@prisma/client';
import logo from '../logo.svg';

const USER_ID = 'userId';

function Home() {
  const [userId, setUserId] = useState(localStorage.getItem(USER_ID));
  const [readonly, setReadoly] = useState(!!userId);
  const [form] = ProForm.useForm();

  useEffect(() => {
    if (userId) {
      (async () => {
        const { data: user } = await axios.get<User>(`/api/user/${userId}`);
        form.setFieldsValue(user);
      })();
    }
  }, [userId, form]);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={logo} className="profile-logo" alt="logo" />
        <div className="app-link">User Profile</div>
      </div>
      <ProForm
        form={form}
        submitter={readonly ? false : { resetButtonProps: false }}
        className="profile-form"
        onFinish={async (values) => {
          try {
            if (userId) {
              await axios.put<User>(`/api/user/${userId}`, values);
            } else {
              const { data: user } = await axios.post<User>('/api/user', values);
              localStorage.setItem(USER_ID, String(user.id));
              setUserId(String(user.id));
            }
            message.success('success');
            await setReadoly(true);
          } catch (error) {
            message.error(error.response.data.errors.map((err: any) => <div>{err.msg}</div>));
          }
        }}>
        <ProFormText name="username" label="name" rules={[{ required: true }]} readonly={readonly} />
        <ProFormText name="email" label="email" rules={[{ required: true }]} readonly={readonly} />
        <ProFormText name="phone" label="phone" rules={[{ required: true }]} readonly={readonly} />
        <ProFormRadio.Group
          label="gender"
          valueEnum={{
            male: 'Male',
            female: 'Female',
          }}
          name="gender"
          rules={[{ required: true }]}
          readonly={readonly}
        />
        <ProFormText name="address" label="address" rules={[{ required: true }]} readonly={readonly} />
        {readonly && (
          <Button type="primary" onClick={() => setReadoly(false)}>
            Edit
          </Button>
        )}
      </ProForm>
    </div>
  );
}

export default Home;
