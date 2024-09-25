import { Stack } from "expo-router";

const ProfileLayout = () => {

  return (
    <>
      <Stack>
        <Stack.Screen name="avatar"/>
        <Stack.Screen name="compte"/>
        <Stack.Screen name="historique"/>
        <Stack.Screen name="mescagnotte"/>
      </Stack>
    </>
  );
};

export default ProfileLayout;