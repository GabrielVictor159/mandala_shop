import React, { ReactNode } from 'react';
import { useTable } from 'react-table';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './styles/CustomTable.module.scss';

interface TableProps<T> {
    data: T[];
    extraColumns?: any[];
    children?: ReactNode;
}

const getProperties = (obj: Record<string, unknown>) => {
    return Object.keys(obj).filter(
        (prop) => typeof obj[prop] === 'string' || typeof obj[prop] === 'number'
    ) as Array<keyof typeof obj>;
};

const CustomTable = <T extends object>({
    data,
    extraColumns = undefined,
    children,
}: TableProps<T>) => {
    const columns: any[] = React.useMemo(() => {
        if (data.length === 0) {
            return [];
        }

        const sampleObject: any = data[0];
        const properties = getProperties(sampleObject);

        return properties.map((prop) => ({
            Header: prop,
            accessor: prop,
            Cell: ({ value }: any) => {
                if (typeof value !== 'string') {
                    return JSON.stringify(value);
                }
                return value;
            },
        }));
    }, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable<T>({ columns, data });

    return (
        <div className={styles.tableWrapper}>
            <Table
                {...getTableProps()}
                striped
                bordered
                hover
                responsive
                className={styles.tableResizable}
            >
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                            {extraColumns != undefined && extraColumns.length != 0 ? (
                                extraColumns.map((value) =>
                                    value.nome != undefined ? <th key={value.nome}>{value.nome}</th> : null
                                )
                            ) : null}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                                {extraColumns != undefined && extraColumns.length != 0 ? (
                                    extraColumns.map((value) =>
                                        value.content != undefined ? (
                                            <td key={value.content[row.index]}>{value.content[row.index]}</td>
                                        ) : null
                                    )
                                ) : null}
                            </tr>
                        );
                    })}
                    {children}
                </tbody>
            </Table>
        </div>
    );
};

export default CustomTable;
