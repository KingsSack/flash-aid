"use client"

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import Link from 'next/link';

export function MainNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/posts">Posts</NavigationMenuLink>
                    {/* <Link href="/posts" legacyBehavior passHref>
                        <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>Posts</NavigationMenuTrigger>
                    </Link> */}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}