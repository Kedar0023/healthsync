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
    type: z.enum(["chronic", "allergy"]),
    name: z.string().min(1, "Name is required"),
    severity: z.string().optional(),
    notes: z.string().optional(),
    diagnosisDate: z.string().optional(),
    reaction: z.string().optional(),
});

export function AddHealthConditionDialog() {
    const [open, setOpen] = useState(false);
    const utils = trpc.useUtils();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: "chronic",
            name: "",
            severity: "",
            notes: "",
            diagnosisDate: "",
            reaction: "",
        },
    });

    const { mutate: addHealthCondition } = trpc.user.addChronicCondition.useMutation({
        onSuccess: () => {
            toast.success("Health condition added successfully");
            setOpen(false);
            form.reset();
            void utils.user.getChronicConditions.invalidate();
        },
        onError: (error: TRPCClientErrorLike<any>) => {
            toast.error(error.message);
        },
    });

    const { mutate: addAllergy } = trpc.user.addAllergy.useMutation({
        onSuccess: () => {
            toast.success("Allergy added successfully");
            setOpen(false);
            form.reset();
            void utils.user.getAllergies.invalidate();
        },
        onError: (error: TRPCClientErrorLike<any>) => {
            toast.error(error.message);
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.type === "chronic") {
            addHealthCondition({
                condition: values.name,
                severity: values.severity,
                notes: values.notes,
                diagnosisDate: values.diagnosisDate ? new Date(values.diagnosisDate) : undefined,
            });
        } else {
            addAllergy({
                type: "Medication", // You can make this dynamic based on user input
                name: values.name,
                severity: values.severity,
                reaction: values.reaction,
                notes: values.notes,
            });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Health Condition</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Health Condition</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <select
                                            className="w-full rounded-md border border-input bg-background px-3 py-2"
                                            {...field}
                                        >
                                            <option value="chronic">Chronic Condition</option>
                                            <option value="allergy">Allergy</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Condition or allergy name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="severity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Severity</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g., Mild, Moderate, Severe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {form.watch("type") === "chronic" && (
                            <FormField
                                control={form.control}
                                name="diagnosisDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Diagnosis Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {form.watch("type") === "allergy" && (
                            <FormField
                                control={form.control}
                                name="reaction"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Reaction</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Rash, Difficulty breathing" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="notes"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Additional notes" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Add Condition</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
} 