import { useState } from 'react';

import {
  Form,
  SettingsPage,
  SettingsSection,
  Title,
  Input,
  Button,
  MainTitle,
} from '../../styles/Settings';
import Header from '../Header';

export default function Settings() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [image, setImage] = useState();

  const updateUsername = () => {
    const jwt = JSON.parse(localStorage.getItem('token'));
    const data = {
      username,
    };

    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:8000/user/update-username', config)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const updatePassword = () => {
    const jwt = JSON.parse(localStorage.getItem('token'));

    const data = {
      oldPwd: password,
      newPwd: newPassword,
    };

    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:8000/user/update-pwd', config)
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  };

  const updateImage = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'iuccxiw3');
    formData.append('api_key', '862423219721751');

    fetch('https://api.cloudinary.com/v1_1/dihivxkel/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        const data = {
          url: res.secure_url,
        };

        const jwt = JSON.parse(localStorage.getItem('token'));

        const config = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(data),
        };

        fetch('http://localhost:8000/user/update-profile-image', config)
          .then((res) => res.json())
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  return (
    <SettingsPage>
      <Header />

      <SettingsSection>
        <MainTitle>Settings</MainTitle>
        <Form>
          <Title>Change Username</Title>
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button onClick={updateUsername}>Submit</Button>
        </Form>
        <Form>
          <Title>Change Password</Title>
          <Input
            placeholder="Current Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="New Password"
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            placeholder="Repeat Password"
            type="password"
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <Button onClick={updatePassword}>Submit</Button>
        </Form>
        <Form>
          <Title>Change Profile Picture</Title>
          <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <Button onClick={updateImage}>Submit</Button>
        </Form>
      </SettingsSection>
    </SettingsPage>
  );
}
