import React from 'react';
import Table from '../Table';

const SKUTable = ({ data, columns }) => {
    return <Table columns={columns} data={data} />;
};

export default React.memo(SKUTable);
