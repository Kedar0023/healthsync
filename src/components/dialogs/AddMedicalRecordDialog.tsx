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
    recordType: z.string().min(1, "Record type is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    doctorName: z.string().optional(),
    hospitalName: z.string().optional(),
    fileUrl: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddMedicalRecordDialog() {
    const [open, setOpen] = useState(false);
    const utils = trpc.useUtils();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            recordType: "",
            title: "",
            description: "",
            date: "",
            doctorName: "",
            hospitalName: "",
            fileUrl: "",
        },
    });

    const { mutate: addMedicalRecord } = trpc.user.addMedicalRecord.useMutation({
        onSuccess: () => {
            toast.success("Medical record added successfully");
            setOpen(false);
            form.reset();
            void utils.user.getMedicalRecords.invalidate();
        },
        onError: (error: TRPCClientErrorLike<any>) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: FormValues) {
        addMedicalRecord({
            ...values,
            date: new Date(values.date),
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Medical Record</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Medical Record</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="recordType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Record Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Diagnosis, Lab Result" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Record title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Record description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Date</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="doctorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Doctor Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doctor's name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hospitalName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hospital Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Hospital name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fileUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="File URL (optional)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add Record</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 