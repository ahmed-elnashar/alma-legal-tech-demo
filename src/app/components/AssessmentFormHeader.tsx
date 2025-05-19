import {Box, Typography,} from '@mui/material';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import {purple} from "@mui/material/colors";

export default function AssessmentFormHeader() {
    return (
        <Box sx={{textAlign: 'center', mb: 6}}>
            <InfoTwoToneIcon sx={{color: purple[300], fontSize: 64}}/>
            <Typography variant="h6" component="h3" sx={{mb: 2, fontWeight: '600'}}>
                Want to understand your visa options?
            </Typography>
            <Typography variant="body1" sx={{fontWeight: '500'}}>
                Submit the form below and our team of experienced attorneys will review your information
                and send a preliminary assessment of your case based on your goals.
            </Typography>
        </Box>
    )
}
