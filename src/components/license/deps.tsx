import deps from "@/app/license/licenses.json";
import { Table } from "@chakra-ui/react";

type DepData = {
	department: string;
	relatedTo: string;
	name: string;
	licensePeriod: string;
	material: string;
	licenseType: string;
	link: string;
	remoteVersion: string;
	installedVersion: string;
	definedVersion: string;
	author: string;
};

function ForInDepData(depData: DepData) {
	const data = [];

	for (const key in depData) {
		data.push({
			header: key,
			data: (depData as Record<string, string>)[key],
		});
	}

	return data;
}

export function DepsHeader() {
	return ForInDepData(deps[0]).map((data) => (
		<Table.ColumnHeader
			key={data.header}
			textAlign={data.header.match("Version") ? "right" : "left"}
		>
			{`${data.header.charAt(0).toUpperCase()}${data.header.replace(/([A-Z])/g, " $1").slice(1)}`}
		</Table.ColumnHeader>
	));
}

export function DepsBody() {
	return deps.map((dep) => (
		<Table.Row key={dep.name}>
			{ForInDepData(dep).map((data) => (
				<Table.Cell
					key={data.header}
					textAlign={data.header.match("Version") ? "right" : "left"}
				>
					{data.data}
				</Table.Cell>
			))}
		</Table.Row>
	));
}
