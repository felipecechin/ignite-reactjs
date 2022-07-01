import { useContext } from "react";
import { useAuth } from "../contexts/AuthContext";
import { validateUserPermissions } from "../utils/validateUserPermissions";

type UserCanParams = {
  permissions?: string[];
  roles?: string[];
}

export function useCan({ permissions, roles }: UserCanParams) {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles
  })

  return userHasValidPermissions;
}