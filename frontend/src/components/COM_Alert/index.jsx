import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';

function COM_Alert({ type, title, content, props = {} }) {
    const arrType = ['success', 'info', 'warning', 'error'];
    if (!arrType.includes(type)) {
        type = 'success';
    }
    console.log('COM_Alert', content, type);
    const [open, setOpen] = React.useState('flex');
    return (
        <Stack style={{ display: open }} sx={{ width: '100%' }} spacing={2}>
            <Alert
                severity={type}
                {...props}
                onClose={() => {
                    console.log('close');
                    setOpen('none');
                }}
            >
                <AlertTitle>{title}</AlertTitle>
                {content}
            </Alert>
        </Stack>
    );
}

export default COM_Alert;
