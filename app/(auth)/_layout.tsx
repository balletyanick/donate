import { Stack } from "expo-router";

const AuthLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen name="login"/>
        <Stack.Screen name="register"/>
        <Stack.Screen name="oubliepwd"/>
        <Stack.Screen name="validecode"/>
        <Stack.Screen name="newpwd"/>
      </Stack>
    </>
  );
};

export default AuthLayout;