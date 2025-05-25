"use client"

import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

export function MainNav() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex gap-4">
                <NavigationMenuItem>
                    <NavigationMenuLink href="/">Home</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/posts">Posts</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/login" style="margin-left: auto">Log In/Sign Up</NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}