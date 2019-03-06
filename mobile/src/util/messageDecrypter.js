import { RSA } from 'react-native-rsa-native';

export default messageDecrypter = async (text, privateKey) => {
  return await RSA.decrypt(text, privateKey);
} 