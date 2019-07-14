import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import ActionPlan from '../../components/ActionPlan';
import './style.css';

const UserPage = ({ match }) => {
  const [userName, setUserName] = useState('');
  const [nickName, setNickName] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    API.getUserByUserName(match.params.user)
      .then(({ data }) => {
        setUserName(data[0].username);
        setNickName(data[0].nickname);
        setUserId(data[0]._id);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <div className="display-4 text-center welcome">
        Hi
        {` ${nickName}`}
        , your action plan is below:
      </div>
      <ActionPlan />
    </div>
  );
};

export default UserPage;
