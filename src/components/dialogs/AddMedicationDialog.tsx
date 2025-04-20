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
import { Checkbox } from "@/components/ui/checkbox";
import { trpc } from "@/tRPC/client/client";
import { toast } from "sonner";
import type { TRPCClientErrorLike } from "@trpc/client";

const formSchema = z.object({
    name: z.string().min(1, "Medication name is required"),
    description: z.string().optional(),
    dosage: z.string().min(1, "Dosage is required"),
    frequency: z.string().min(1, "Frequency is required"),
    when: z.string().min(1, "Time of day is required"),
    sideEffects: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Options for dropdown fields
const DOSAGE_OPTIONS = [
    "5mg", "10mg", "20mg", "25mg", "50mg", "100mg", "200mg",
    "250mg", "500mg", "1g", "1 pill", "2 pills", "1 tablet",
    "1 tsp", "1 tbsp", "1 capsule", "2 capsules", "Custom"
];

const FREQUENCY_OPTIONS = [
    "Once daily", "Twice daily", "Three times daily", "Four times daily",
    "Every 4 hours", "Every 6 hours", "Every 8 hours", "Every 12 hours",
    "As needed", "Weekly", "Biweekly", "Monthly", "Custom"
];

const WHEN_OPTIONS = [
    "Morning", "Afternoon", "Evening", "Night",
    "Before meals", "With meals", "After meals",
    "Before breakfast", "After breakfast",
    "Before lunch", "After lunch",
    "Before dinner", "After dinner",
    "At bedtime", "Any time", "Custom"
];

export function AddMedicationDialog() {
    const [open, setOpen] = useState(false);
    const [customDosage, setCustomDosage] = useState(false);
    const [customFrequency, setCustomFrequency] = useState(false);
    const [customWhen, setCustomWhen] = useState(false);

    const utils = trpc.useUtils();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            dosage: "",
            frequency: "",
            when: "",
            sideEffects: "",
        },
    });

    const { mutate: addMedication, isPending } = trpc.user.addMedication.useMutation({
        onSuccess: () => {
            toast.success("Medication added successfully");
            setOpen(false);
            form.reset();
            void utils.user.getMedications.invalidate();
        },
        onError: (error: TRPCClientErrorLike<any>) => {
            toast.error(error.message);
        },
    });

    const handleDosageChange = (value: string) => {
        if (value === "Custom") {
            setCustomDosage(true);
            form.setValue("dosage", "");
        } else {
            setCustomDosage(false);
            form.setValue("dosage", value);
        }
    };

    const handleFrequencyChange = (value: string) => {
        if (value === "Custom") {
            setCustomFrequency(true);
            form.setValue("frequency", "");
        } else {
            setCustomFrequency(false);
            form.setValue("frequency", value);
        }
    };

    const handleWhenChange = (value: string) => {
        if (value === "Custom") {
            setCustomWhen(true);
            form.setValue("when", "");
        } else {
            setCustomWhen(false);
            form.setValue("when", value);
        }
    };

    function onSubmit(values: FormValues) {
        addMedication(values);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Add New Medication</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Medication</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Medication Name</FormLabel>
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
                                    {!customDosage ? (
                                        <Select
                                            onValueChange={handleDosageChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select dosage" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {DOSAGE_OPTIONS.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <FormControl>
                                            <Input placeholder="Enter custom dosage" {...field} />
                                        </FormControl>
                                    )}
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
                                    {!customFrequency ? (
                                        <Select
                                            onValueChange={handleFrequencyChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select frequency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {FREQUENCY_OPTIONS.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <FormControl>
                                            <Input placeholder="Enter custom frequency" {...field} />
                                        </FormControl>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="when"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>When to Take</FormLabel>
                                    {!customWhen ? (
                                        <Select
                                            onValueChange={handleWhenChange}
                                            value={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select time" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {WHEN_OPTIONS.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <FormControl>
                                            <Input placeholder="Enter custom time" {...field} />
                                        </FormControl>
                                    )}
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
                                        <Input placeholder="Enter description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sideEffects"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Side Effects</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter side effects" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Adding Medication..." : "Add Medication"}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}