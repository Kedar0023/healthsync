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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/tRPC/client/client";
import { toast } from "sonner";
import type { TRPCClientErrorLike } from "@trpc/client";
import { AddMedicationDialog } from "./AddMedicationDialog";

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    doctorName: z.string().min(1, "Doctor name is required"),
    medicationId: z.string().min(1, "Medication is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    refills: z.number().min(0, "Refills must be 0 or greater"),
    notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    when: string;
    isRestRequired: boolean;
}

export function AddPrescriptionDialog() {
    const [open, setOpen] = useState(false);
    const utils = trpc.useUtils();

    // Fetch available medications
    const { data: medications, isLoading: isMedicationsLoading } = trpc.user.getMedications.useQuery();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            doctorName: "",
            medicationId: "",
            startDate: "",
            endDate: "",
            refills: 0,
            notes: "",
        },
    });

    const { mutate: addPrescription, isPending } = trpc.user.addPrescription.useMutation({
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
        addPrescription(values);
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
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Prescription Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter a title for this prescription" {...field} />
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
                                        <Input placeholder="Enter doctor name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="medicationId"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between items-center">
                                        <FormLabel>Medication</FormLabel>
                                        <AddMedicationDialog />
                                    </div>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={isMedicationsLoading || !medications?.length}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select medication" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {medications?.map((medication: Medication) => (
                                                <SelectItem key={medication.id} value={medication.id}>
                                                    {medication.name} ({medication.dosage}, {medication.frequency})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {isMedicationsLoading && <p className="text-sm text-muted-foreground">Loading medications...</p>}
                                    {!isMedicationsLoading && !medications?.length && (
                                        <p className="text-sm text-muted-foreground">No medications available. Add one first.</p>
                                    )}
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
                                        <Input
                                            type="number"
                                            min={0}
                                            value={field.value !== undefined && field.value !== null ? String(field.value) : ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                field.onChange(value === '' ? 0 : +value);
                                            }}
                                        />
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
                        <Button type="submit" disabled={isPending || isMedicationsLoading || !medications?.length}>
                            {isPending ? "Adding Prescription..." : "Add Prescription"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 