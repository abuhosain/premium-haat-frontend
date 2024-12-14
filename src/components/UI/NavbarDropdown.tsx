"use client"; 
import { logOut } from "@/src/services/Auth";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useRouter } from "next/navigation";

const NavbarDropdown = () => {
  const router = useRouter();
  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };
  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Avatar className="cursor-pointer" name="Hosain" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem key="new">Dashboard</DropdownItem>
          <DropdownItem onClick={() => handleNavigation("/profile/settings")} key={"a"}>
            Settings
          </DropdownItem>

          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            onClick={() => logOut()}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropdown;
