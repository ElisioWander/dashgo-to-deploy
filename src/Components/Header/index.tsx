import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { Notification } from "./Notification";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {
  const { onOpen } = useSidebarDrawer()

  //definindo a base(mobile version) como true, e o large(desktop version) como false
  //wideVersion = versão desktop ou tablet
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          display="flex"
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          mr="2"
          onClick={onOpen}
        >

        </IconButton>
      )}

      <Logo />

      { isWideVersion && (
        <SearchBox />
      ) }
      
      <Flex align="center" ml="auto" >
        <Notification />
        <Profile showProfileData={isWideVersion} />
      </Flex>

    </Flex>
  )
}
