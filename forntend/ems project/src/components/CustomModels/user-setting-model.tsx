"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Dialog, DialogTrigger, DialogContent, DialogPortal, DialogOverlay, DialogTitle, DialogClose } from "../ui/dialog";
import { Avatar } from "../ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import queryClient from "@/hooks/useQuery";
import useStore from "@/store/useStore";

const userSettingsSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    profileImg: z.any().optional(),
});

type UserSettingsFormData = z.infer<typeof userSettingsSchema>;
interface UserSettingsModal {
    open: boolean
    setOpen:// Type of setOpen
    React.Dispatch<React.SetStateAction<boolean>>;
}
const UserSettingsModal = ({ open, setOpen }: UserSettingsModal) => {
    const {user} = useStore();
    //@ts-expect-error due to any
    const photoUrlObj = user?.photo_url ?  JSON.parse(user?.photo_url) : null;
    const initialPhotoUrl = photoUrlObj?.secure_url || null;
    const [preview, setPreview] = React.useState<string | null>( initialPhotoUrl);
    const [pic, setPic] = React.useState<File | null>(null)
    const form = useForm<UserSettingsFormData>({
        resolver: zodResolver(userSettingsSchema),
        defaultValues: {
            firstName: user?.firstName || "",
            lastName: user?.lastName || "",
        },
    });

    const avatarFile = form.watch("profileImg");
    React.useEffect(() => {
        if (avatarFile && avatarFile[0]) {
            const file = avatarFile[0];
            setPic(file)
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    }, [avatarFile]);

    const updateUserData = async ({ firstName, lastName }: {
        firstName: string,
        lastName: string,
        
    }) => {
        const form = new FormData()
        form.append("firstName", firstName);
        form.append("lastName", lastName);
        if (pic) form.append("profileImg", pic)
        const response = await axios.patch(
            "http://localhost:8000/api/v1/user/update/me",
            form,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            }

        );

        return response.data;
    }
    const updateDetailMutate = useMutation(updateUserData, {
        onSuccess: () => {
            queryClient.invalidateQueries(["userData"]);
            alert("Update SuccessFully!")
            setOpen(false);
        },
        onError: (error) => {
            console.error("UpdateFailed failed:", error);
            alert("Something went wrong. Please try again.");
        }
    })
    const onSubmit = (data: UserSettingsFormData) => {
        console.log("Submitted Data:", data);
        updateDetailMutate.mutate(data);

    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Open User Settings</Button>
            </DialogTrigger>

            <DialogPortal>
                <DialogOverlay className="fixed inset-0 bg-black/50" />
                <DialogContent
                    className="fixed top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-md"
                >
                    <DialogTitle className="text-xl font-bold mb-4">User Settings</DialogTitle>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Avatar Upload */}
                            <FormField
                                name="profileImg"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <Label>Avatar</Label>
                                        <div className="flex items-center space-x-4">
                                            {preview ? (
                                                <Avatar
                                              
                                                >
                                                    <AvatarFallback>AV</AvatarFallback>
                                                    <AvatarImage src={preview || {...field.value}} alt="Avatar Preview" className="w-16 h-16 rounded-full object-cover" />
                                                </Avatar>
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                                    <UploadCloud className="w-6 h-6 text-gray-500" />
                                                </div>
                                            )}
                                            <FormControl>
                                                <Input
                                                    type="file"
                                                    name="profileImg"
                                                    onChange={(e) => field.onChange(e.target.files)
                                                    }
                                                />
                                            </FormControl>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            {/* First Name Input */}
                            <FormField
                                name="firstName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your first name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Last Name Input */}
                            <FormField
                                name="lastName"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your last name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={updateDetailMutate.isLoading}>
                                {updateDetailMutate.isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                            </Button>
                        </form>
                    </Form>

                    <DialogClose asChild>
                        <button className="absolute top-3 right-3">
                            <X className="w-5 h-5" />
                        </button>
                    </DialogClose>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
};

export default UserSettingsModal;
