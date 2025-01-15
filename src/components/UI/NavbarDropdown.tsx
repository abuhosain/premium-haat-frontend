import { protectedRoutes } from "@/src/constant";
import { useUser } from "@/src/context/user.provider";
import { logOut } from "@/src/services/Auth";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"; // Import Badge component
import { usePathname, useRouter } from "next/navigation";

export default function NavbarDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logOut();
    userLoading(true);

    if (protectedRoutes.some((route: any) => pathname.match(route))) {
      router.push("/");
    }
  };

  const handleNavigation = (pathname: string) => {
    const pathnames = pathname.toLowerCase();
    router.push(pathnames);
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center cursor-pointer relative">
          <Avatar src={user?.img} />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key={"user_role"}
          onClick={() => handleNavigation(`/${user?.role}`)}
        >
          Dashboard
        </DropdownItem>
        <DropdownItem
          key={"profile_settings"}
          onClick={() => handleNavigation("/profile/settings")}
        >
          Settings
        </DropdownItem>

        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={() => handleLogout()}
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
