import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/tRPC/client/client";
import { toast } from "sonner";
import type { TRPCClientErrorLike } from "@trpc/client";

// Define the UserData interface
interface UserData {
    id?: string;
    phone?: string | null;
    dateOfBirth?: string | null;
    gender?: string | null;
    bloodGroup?: string | null;
}

const formSchema = z.object({
    phone: z.string().optional(),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    bloodGroup: z.string().optional(),
});

export function UpdateHealthProfileDialog({ userData }: { userData?: UserData }) {
    const [open, setOpen] = useState(false);
    const utils = trpc.useUtils();

    // Format date to YYYY-MM-DD for input
    const formatDate = (date: string | null | undefined) => {
        if (!date) return "";
        return new Date(date).toISOString().split("T")[0];
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phone: userData?.phone || "",
            dateOfBirth: formatDate(userData?.dateOfBirth),
            gender: userData?.gender || "",
            bloodGroup: userData?.bloodGroup || "",
        },
    });

    const { mutate: updateProfile, isPending } = trpc.user.updateMedicalProfile.useMutation({
        onSuccess: () => {
            toast.success("Health profile updated successfully");
            setOpen(false);
            // Invalidate user data queries to refresh the UI
            void utils.getUserData.invalidate();
        },
        onError: (error: TRPCClientErrorLike<any>) => {
            toast.error(`Error updating health profile: ${error.message}`);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Properly handle the date conversion for the server
        let dateOfBirth: Date | undefined = undefined;

        if (values.dateOfBirth) {
            try {
                // Create a Date object from the string value
                dateOfBirth = new Date(values.dateOfBirth);

                // Check if the date is valid
                if (isNaN(dateOfBirth.getTime())) {
                    toast.error("Invalid date format");
                    return;
                }
            } catch (error) {
                toast.error("Error parsing date");
                return;
            }
        }

        updateProfile({
            bloodGroup: values.bloodGroup,
            gender: values.gender,
            phone: values.phone,
            dateOfBirth: dateOfBirth as Date
        });
    }

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const genders = ["Male", "Female", "Other", "Prefer not to say"];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={userData?.bloodGroup || userData?.gender ? "outline" : "default"}>
                    {userData?.bloodGroup || userData?.gender ? "Update Health Profile" : "Add Health Profile"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Health Profile Information</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your phone number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dateOfBirth"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gender</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select gender" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {genders.map((gender) => (
                                                    <SelectItem key={gender} value={gender}>
                                                        {gender}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bloodGroup"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Blood Group</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select blood group" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {bloodGroups.map((group) => (
                                                    <SelectItem key={group} value={group}>
                                                        {group}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Updating..." : "Update Health Profile"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 