import {
    Dialog,
    DialogContent,
   
    DialogTrigger,
} from "@/components/ui/dialog"
import CreateOrganization from "@/pages/create-organization"
import React from "react"

const CreateOrganizationModel = ({children}:{children:React.ReactNode}) => {
    return (
        <Dialog >
              <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="w-fit">
                <CreateOrganization/>
            </DialogContent>
        </Dialog>

    )
}

export default CreateOrganizationModel