type User = {
    permissions: string[],
    roles: string[],
}

type ValidateUserPermissionsParams = {
    user: User;
    permissions?: string []
    roles?: string[]
}

export function validateUserPermissions({
    user, 
    permissions = [], 
    roles = [],
}: ValidateUserPermissionsParams){
    if(permissions.length > 0){
        const hasAllPermissions = permissions.every(permission => { //todas permissoes
            return user.permissions.includes(permission)
        })// so retorna true caso todas as  condições sejam satisfeitas
        if(!hasAllPermissions){
            return false
        }
    }

    if(roles.length > 0){
        const hasAllRoles = roles.some(role => { //somente um
            return user.roles.includes(role)
        })// so retorna true caso todas as  condições sejam satisfeitas
        if(!hasAllRoles){
            return false
        }
    }

    return true;

}