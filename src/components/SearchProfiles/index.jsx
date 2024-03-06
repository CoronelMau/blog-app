import { useState } from 'react';
import Header from '../Header';

export default function SearchProfiles() {
  const [profiles, setProfiles] = useState([]);

  const searchInfo = (info) => {
    setProfiles(info);
  };

  return <Header handleInfo={searchInfo} />;
}
