import axios from 'axios';
import UserDispatcher from '../dispatchers/UsersDispatcher';

jest.mock('axios');

test('test should create a new user', () => {
  const users = {
    firstName: 'Test',
    lastName: 'Jest',
    email: "test@jest.com",
    phone: '8889997754',
    password: 'Aasdsd11223!'
  };

  const resp = {
    firstName: 'Test',
    lastName: 'Jest',
    email: "test@jest.com",
    phone: '8889997754',
    password: 'Aasdsd11223!'
  };
  axios.post.mockResolvedValue(resp);

  return UserDispatcher.createAccount(users).then(data => expect(data).toEqual(users));

});

test('test should not create a new user/ missing parametes', () => {
  const users = {
    firstName: 'Test',
    lastName: 'Jest',
    phone: '8889997754',
    password: 'Aasdsd11223!'
  };

  const resp = {
    firstName: 'Test',
    lastName: 'Jest',
    email: "test@jest.com",
    phone: '8889997754',
    password: 'Aasdsd11223!'
  };
  axios.post.mockResolvedValue(resp);

  return UserDispatcher.createAccount(users).then(data => expect(data).not.toEqual(users));
});


test('should send a recovery link to user', () => {
  const email = {
    email: "tural.tech@gmail.com",
  };
  const respStatus = 200;
  axios.post.mockResolvedValue(respStatus);

  return UserDispatcher.forgotPassword(email).then(data => expect(data).toEqual(200));
});

test('cant send recovery email/ email not dfound ', () => {
  const email = {
    email: "tural.tech@gmail.com",
  };
  const respStatus = 409;
  axios.post.mockResolvedValue(respStatus);

  return UserDispatcher.forgotPassword(email).then(data =>
    expect(data).toEqual(409));
});

test('should successfully valiate recovery code ', () => {
  const recoveryCode = {
    recoveryCode: "fa2e38ca-9503-4dc2-ba8a-b5d635c312de",
  };
  const respStatus = 200;
  axios.post.mockResolvedValue(respStatus);

  return UserDispatcher.verifyPasswordRecoveryToken(recoveryCode).then(data => expect(data).toEqual(200));
});

test('can not valiate recovery code ', () => {
  const recoveryCode = {
    recoveryCode: "fa2e38ca-9503-4dc2-ba8a-b5d635c312de",
  };
  const respStatus = 409;
  axios.post.mockResolvedValue(respStatus);

  return UserDispatcher.verifyPasswordRecoveryToken(recoveryCode).then(data => expect(data).not.toEqual(200));
});

test('should change users password ', () => {
  const data = {
    recoveryCode: "fa2e38ca-9503-4dc2-ba8a-b5d635c312de",
    email: "tural.tech@gmail.com",
  };
  const respStatus = 200;
  axios.post.mockResolvedValue(respStatus);

  return UserDispatcher.changePassword(data).then(data => expect(data).toEqual(200));
});





