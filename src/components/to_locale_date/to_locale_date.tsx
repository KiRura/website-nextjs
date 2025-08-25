"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";

export function FormatLocaleDate({ date }: { date: string }) {
	return <>{format(new Date(date), "yyyy/MM/dd HH:mm", { locale: ja })}</>;
}
