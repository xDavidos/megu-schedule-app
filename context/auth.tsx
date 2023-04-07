import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type selectGroupType = string | null;

interface AuthContextType {
  signIn: (selectGroup: selectGroupType) => void;
  signOut: () => void;
  selectGroup: selectGroupType;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const useAuthContext = useContext(AuthContext);

  if (!useAuthContext) {
    throw new Error(
      "useAuthContext has to be used within <AuthContext.Provider>"
    );
  }

  return useAuthContext;
}

function useProtectedRoute(selectGroup: selectGroupType) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (!selectGroup && !inAuthGroup) {
      router.replace("/sign-in");
    } else if (selectGroup && inAuthGroup) {
      router.replace("/app");
    }
  }, [selectGroup, segments]);
}

export function AuthProvider(props: any) {
  const { getItem, setItem, removeItem } = useAsyncStorage("SelectGroup");
  const [selectGroup, setSelectGroup] = useState<selectGroupType>(null);

  useEffect(() => {
    getItem().then((json) => {
      if (json !== null) {
        setSelectGroup(JSON.parse(json));
      } else {
        setSelectGroup(null);
      }
    });
  }, []);

  useProtectedRoute(selectGroup);

  return (
    <AuthContext.Provider
      value={{
        signIn: (selectGroup: selectGroupType) => {
          setSelectGroup(selectGroup);
          setItem(JSON.stringify(selectGroup));
        },
        signOut: () => {
          setSelectGroup(null);
          removeItem();
        },
        selectGroup,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
