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
        setUserName(response.data[0].username);
        setNickName(response.data[0].nickname);
        setUserId(response.data[0]._id);
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
