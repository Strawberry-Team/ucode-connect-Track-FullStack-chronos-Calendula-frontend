import { LogOut } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar.tsx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/components/redux/actions/authActions.ts";
import { showErrorToasts, showSuccessToast } from "@/components/utils/ToastNotifications.tsx";
import { ToastStatusMessages } from "@/constants/toastStatusMessages.ts";

export function NavUser({
                          user,
                        }: {
  user: {
    fullName: string;
    email: string;
    profilePicture: string;
    country?: string;
    birthday?: string;
  };
}) {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCountryWithFlag = (country?: string): string => {
    if (!country) return "Not specified";
    switch (country) {
      case "Ukraine":
        return "🇺🇦 Ukraine";
      case "Finland":
        return "🇫🇮 Finland";
      case "Estonia":
        return "🇪🇪 Estonia";
      default:
        return country;
    }
  };

  const calculateAge = (birthday?: string): number | null => {
    if (!birthday) return null;

    const birthDate = new Date(birthday);
    const today = new Date();

    if (isNaN(birthDate.getTime())) return null;

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleLogout = async () => {
    const result = await logoutUser(dispatch);
    if (result.success) {
      navigate("/login");
      showSuccessToast(ToastStatusMessages.AUTH.LOGOUT_SUCCESS);
    } else {
      showErrorToasts(
          result.errors || ToastStatusMessages.AUTH.LOGOUT_FAILED
      );
    }
  };

  // Define the environment
  const isProduction = import.meta.env.PROD;

  // Configure the API URL based on the environment
  const BASE_AVATAR_URL = isProduction 
      ? '/profile-pictures/' // For production, use relative path
      : `${import.meta.env.VITE_API_BASE_URL}/profile-pictures/`; // For development

  return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <SidebarMenuButton
                  size="lg"
                  className="cursor-pointer py-2 px-7 gap-2 rounded-full data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage
                      src={BASE_AVATAR_URL + user.profilePicture}
                      alt={user.fullName}
                  />
                </Avatar>
                <div className="grid flex-1 text-left text-[16px] leading-tight">
                  <span className="truncate font-medium">{user.fullName}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="start"
                sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex flex-col gap-2 px-1 py-1.5 text-left text-sm">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                          src={BASE_AVATAR_URL + user.profilePicture}
                          alt={user.fullName}
                      />
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 leading-tight">
                    <span className="truncate font-medium block">
                      {user.fullName}
                    </span>
                      <span className="truncate text-xs py-1 block">
                      {user.email}
                    </span>
                    </div>
                  </div>
                  <div className="flex items-center ml-10 space-x-4 text-xs">
                    <span className="text-xs">{getCountryWithFlag(user.country)}</span>
                    <span className="text-xs">
                    {calculateAge(user.birthday) !== null
                        ? `${calculateAge(user.birthday)} years old`
                        : "Age not specified"}
                  </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
  );
}