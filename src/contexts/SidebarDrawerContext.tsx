import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

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

  return (
    <sidebarDrawerContext.Provider value={disclosure} >
      { children }
    </sidebarDrawerContext.Provider>
  )
}

export const useSidebarDrawer = () => useContext(sidebarDrawerContext)