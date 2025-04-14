import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Calculate age based on date of birth
 * @param dateOfBirth Date of birth
 * @returns Age in years
 */
export function calculateAge(dateOfBirth: Date): number {
	const today = new Date();
	let age = today.getFullYear() - dateOfBirth.getFullYear();
	const m = today.getMonth() - dateOfBirth.getMonth();

	// If birth month is after current month or
	// birth month is current month but birth day is after current day
	if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
		age--;
	}

	return age;
}
