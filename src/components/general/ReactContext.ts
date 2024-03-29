import React from "react";
import { UserRole } from "../../common/common.enum";

export const LoggedInRoleContext = React.createContext({
    role:UserRole.GUEST,
    setRole: (role: UserRole) => {}
});