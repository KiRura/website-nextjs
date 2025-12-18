import { format } from "date-fns";
import { ja } from "date-fns/locale";

export function FormatLocaleDate({
	date,
	formatStr,
}: {
	date: string;
	formatStr?: string;
}) {
	return (
		<>
			{format(new Date(date), formatStr ?? "yyyy/MM/dd HH:mm", { locale: ja })}
		</>
	);
}
