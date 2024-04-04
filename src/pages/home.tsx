import { ProForm, ProFormText } from '@ant-design/pro-components';
import logo from '../logo.svg';
import './home.css';

function Home() {
  return (
    <div className="profile-container">
      <img src={logo} className="app-logo" alt="logo" />
      <div className="app-link">User Profile</div>
      <ProForm className="profile-form">
        <ProFormText name="username" label="Username" />
        <ProFormText name="email" label="Email" />
        <ProFormText name="phone" label="Phone" />
      </ProForm>
    </div>
  );
}

export default Home;
