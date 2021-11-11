import React from 'react';

const admin = require('firebase-admin');
const listAllUsers = () => {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(1000)
    .then((listUsersResult) => {
      listUsersResult.users.forEach((userRecord) => {
        console.log('user', userRecord.toJSON());
      });
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
// Start listing users from the beginning, 1000 at a time.

export const User = () => {
  listAllUsers();
  return <div>HI</div>;
};
