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
    doctorName: z.string().min(1, "Doctor name is required"),
    medication: z.string().min(1, "Medication name is required"),
    dosage: z.string().min(1, "Dosage is required"),
    frequency: z.string().min(1, "Frequency is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    refills: z.number().min(0, "Refills must be 0 or greater"),
    notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function AddPrescriptionDialog() {
    const [open, setOpen] = useState(false);
    const utils = trpc.useUtils();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            doctorName: "",
            medication: "",
            dosage: "",
            frequency: "",
            startDate: "",
            endDate: "",
            refills: 0,
            notes: "",
        },
    });

    const { mutate: addPrescription } = trpc.user.addPrescription.useMutation({
        onSuccess: () => {
            toast.success("Prescription added successfully");
            setOpen(false);
            form.reset();
            void utils.user.getPrescriptions.invalidate();
        },
        onError: (error: TRPCClientErrorLike<any>) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: FormValues) {
        addPrescription({
            ...values,
            startDate: new Date(values.startDate),
            endDate: values.endDate ? new Date(values.endDate) : undefined,
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Prescription</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Prescription</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="doctorName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Doctor Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter doctor name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="medication"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medication</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter medication name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dosage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dosage</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter dosage" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="frequency"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Frequency</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter frequency" {...field} />
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
                            name="refills"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Refills</FormLabel>
                                    <FormControl>
                                        <Input type="number" min={0} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter notes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add Prescription</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 