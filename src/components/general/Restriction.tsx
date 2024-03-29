import React from "react"
import { UserRole } from "../../common/common.enum"
import { LoggedInRoleContext } from "./ReactContext"

type Props = {
    allowedRoles: UserRole[],
    children: React.ReactNode
}
export const RenderRestriction = (props: Props) => {
    return (
        <>
            <LoggedInRoleContext.Consumer>
                {({role}) => {
                    return props.allowedRoles.includes(role) && props.children
                }}
            </LoggedInRoleContext.Consumer>
        </>
    )
}
