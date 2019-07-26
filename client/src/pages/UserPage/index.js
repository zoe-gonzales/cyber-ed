import React, { useState, useEffect } from 'react';
import API from '../../utils/API';
import ActionPlan from '../../components/ActionPlan';
import './style.css';

const UserPage = (props) => {
  const [userName, setUserName] = useState('');
  const [nickName, setNickName] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    API.getUser(props.props.match.params.user)
      .then((response) => {
        console.log(response.data.nickname);
        setUserName(response.data.username);
        setNickName(response.data.nickname);
        setUserId(response.data._id);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="user-body">
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
