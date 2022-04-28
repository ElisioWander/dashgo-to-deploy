import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import { createContext, ReactNode, useContext, useEffect } from "react";

interface sidebarDrawerProviderProps {
  children: ReactNode;
}

//tipando os dados do contexto
type sidebarDrawerContextData = UseDisclosureReturn

//criando o contexto
const sidebarDrawerContext = createContext({} as sidebarDrawerContextData)

//criando a função que vai ter o provider do contexto
export function SidebarDrawerProvider({ children }: sidebarDrawerProviderProps) {
  const disclosure = useDisclosure()

  const router = useRouter()

  //todas as vezes que a rota for alterada, a sidebar irá fechar
  useEffect(() => {
    disclosure.onClose()
  }, [router.asPath])

  return (
    <sidebarDrawerContext.Provider value={disclosure} >
      { children }
    </sidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(sidebarDrawerContext)