import { Text, Link as ChakraLink, Icon } from "@chakra-ui/react"
import { ElementType } from "react"
import { RiDashboardLine } from "react-icons/ri"
import Link from "next/link"

import { ActiveLink } from "../ActiveLink"

interface NavLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ children, icon, href, ...rest } : NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  )
}