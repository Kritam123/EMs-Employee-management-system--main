/// <reference types="vite/client" />
interface UserProfileProps {
    user:{
        id:string
        firstName:string,
        lastName:string,
        photo_url:string,
        organization:boolean
    }
    isLoading:boolean
    }

    interface SignUpProps {
        
            firstName:string,
            lastName:string,
            email:string,
            password:string,
        
    }
    interface CreateOrganization {
        orgName:string
    }

    interface Org {
        orgName:string,
        id:string
    }

    