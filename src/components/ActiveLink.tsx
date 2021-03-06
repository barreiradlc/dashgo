import { useRouter } from "next/dist/client/router";
import Link, { LinkProps } from "next/link";
import { ReactElement } from "react";
import { ReactNode } from "react";
import { cloneElement } from "react";

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  shouldMatchHref?: boolean;
}

export function ActiveLink({ children, shouldMatchHref = false, ...rest }: ActiveLinkProps) {
  const { asPath } = useRouter()
  let isActive = false

  if (shouldMatchHref && (asPath === rest.href || asPath === rest.as)){
    isActive = true
  }
  
  if (!shouldMatchHref && 
    ( asPath.startsWith(`${rest.href}`)) ||
    ( asPath.startsWith(`${rest.as}`))){
      isActive = true
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? "pink.400" : "gray.50"
      })}
    </Link>
  )
}