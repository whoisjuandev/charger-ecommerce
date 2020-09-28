import React from 'react';
import { Box, Typography} from '@material-ui/core';

export default function TabPanel({value, index, children}) {
    return value===index?(
        <div role="tabpanel" id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}>
            <Box p={3}>
                {children}
            </Box>
        </div>
    ):<></>;
}