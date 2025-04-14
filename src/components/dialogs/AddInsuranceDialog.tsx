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
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/tRPC/client/client";
import { toast } from "sonner";
import type { TRPCClientErrorLike } from "@trpc/client";

const formSchema = z.object({
    provider: z.string().min(1, "Insurance provider is required"),
    policyNumber: z.string().min(1, "Policy number is required"),
    groupNumber: z.string().optional(),
    coverageType: z.string().min(1, "Coverage type is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    isActive: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddInsuranceDialog() {
    const [open, setOpen] = useState(false);
    const utils = trpc.useUtils();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            provider: "",
            policyNumber: "",
            groupNumber: "",
            coverageType: "",
            startDate: "",
            endDate: "",
            isActive: true,
        },
    });

    const { mutate: addInsurance } = trpc.user.addInsurance.useMutation({
        onSuccess: () => {
            toast.success("Insurance added successfully");
            setOpen(false);
            form.reset();
            void utils.user.getInsurances.invalidate();
        },
        onError: (error: TRPCClientErrorLike<any>) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: FormValues) {
        addInsurance({
            ...values,
            startDate: new Date(values.startDate),
            endDate: values.endDate ? new Date(values.endDate) : undefined,
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Insurance</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Insurance</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="provider"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Provider</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter insurance provider" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="policyNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Policy Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter policy number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="groupNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Group Number</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter group number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="coverageType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Coverage Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter coverage type" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isActive"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Active</FormLabel>
                                    <FormControl>
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            onChange={(e) => field.onChange(e.target.checked)}
                                            onBlur={field.onBlur}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add Insurance</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 