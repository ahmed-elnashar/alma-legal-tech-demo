'use client';
import React, {useEffect, useState} from 'react';
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    TextField,
    Typography,
} from '@mui/material';
import CasinoTwoToneIcon from '@mui/icons-material/CasinoTwoTone';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import {purple} from "@mui/material/colors";
import * as yup from 'yup';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRouter} from 'next/navigation';
import AssessmentFormHeader from "@/app/components/AssessmentFormHeader";
import {VISA_CATEGORIES} from "@/app/utils/constants";

const schema: yup.ObjectSchema<FormData> = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    citizenship: yup.string().required('Citizenship is required'),
    websiteUrl: yup.string().required('Website URL is required'),
    visaCategories: yup.object({
        o1: yup.boolean().optional(),
        eb1a: yup.boolean().optional(),
        eb2niw: yup.boolean().optional(),
        dontKnow: yup.boolean().optional()
    }).test('atLeastOne', 'Please select at least one visa category', obj =>
        obj ? Object.values(obj).some(Boolean) : false
    ),
    message: yup.string().optional()
}).required();


type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    citizenship: string;
    websiteUrl: string;
    visaCategories: {
        o1?: boolean;
        eb1a?: boolean;
        eb2niw?: boolean;
        dontKnow?: boolean;
    };
    message?: string;
};


interface Country {
    "name": {
        "common": string,
        "official": string,
        "nativeName": {
            "cnr": {
                "official": string,
                "common": string
            }
        }
    }
}

export default function AssessmentForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        control
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            citizenship: '',
            websiteUrl: '',
            visaCategories: {
                o1: false,
                eb1a: false,
                eb2niw: false,
                dontKnow: false,
            },
            message: ''
        }
    });


    const [countries, setCountries] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
        try {
            console.log(data);
            router.push('/success');
        } catch (error) {
            console.error('Error submitting form:', error);
        }

    };


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/independent?status=true&fields=name');
                const data: Country[] = await response.json();

                const countries = data
                    .map(country => country.name.common);

                setCountries(countries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, []);

    return (
        <Container
            maxWidth="sm"
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1,
                pt: 6,
                mb: 10
            }}
        >
            <AssessmentFormHeader/>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{width: '100%'}}>
                <Box sx={{display: 'grid', gap: 3, mb: 4}}>
                    <TextField
                        {...register('firstName')}
                        label="First Name"
                        fullWidth
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        margin="normal"
                    />

                    <TextField
                        {...register('lastName')}
                        label="Last Name"
                        fullWidth
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        margin="normal"
                    />


                    <TextField
                        {...register('email')}
                        label="Email"
                        type="email"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        margin="normal"
                    />


                    <Autocomplete
                        options={countries}
                        loading={isLoading}
                        onChange={(_, value) => setValue('citizenship', value || '')}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                {...register('citizenship')}
                                label={isLoading ? 'Loading...' : 'Country of Citizenship'}
                                error={!!errors.citizenship}
                                helperText={errors.citizenship?.message}
                                margin="normal"
                            />
                        )}
                    />


                    <TextField
                        {...register('websiteUrl')}
                        fullWidth
                        label="LinkedIn / Personal Website URL"
                        name="websiteUrl"
                        error={!!errors.websiteUrl}
                        helperText={errors.websiteUrl?.message}
                    />

                    <Box sx={{textAlign: 'center'}}>
                        <CasinoTwoToneIcon sx={{color: purple[300], fontSize: 64}}/>
                        <Typography variant="h6" component="h3" sx={{mb: 0, fontWeight: '600'}}>
                            Visa categories of interest?
                        </Typography>
                    </Box>

                    <FormControl
                        component="fieldset"
                        error={!!errors.visaCategories}
                        sx={{width: '100%'}}
                    >
                        <FormGroup>
                            {VISA_CATEGORIES.map(({id, label}) => (
                                <FormControlLabel
                                    key={id}
                                    control={
                                        <Controller
                                            name={`visaCategories.${id}` as "visaCategories.o1" | "visaCategories.eb1a" | "visaCategories.eb2niw" | "visaCategories.dontKnow"}
                                            control={control}
                                            defaultValue={false}
                                            render={({field}) => (
                                                <Checkbox
                                                    {...field}
                                                    checked={field.value}
                                                    onChange={(e) => {
                                                        field.onChange(e.target.checked);
                                                    }}
                                                />
                                            )}
                                        />
                                    }
                                    label={label}
                                />
                            ))}
                        </FormGroup>
                        {errors.visaCategories && (
                            <FormHelperText error>
                                {errors.visaCategories.message}
                            </FormHelperText>
                        )}
                    </FormControl>


                    <Box>
                        <Box sx={{textAlign: 'center', mb: 2}}>
                            <FavoriteTwoToneIcon sx={{color: purple[300], fontSize: 64}}/>
                            <Typography variant="h6" component="h3" sx={{mb: 0, fontWeight: '600'}}>
                                How can we help you?
                            </Typography>
                        </Box>
                        <TextField
                            {...register('message')}
                            fullWidth
                            multiline
                            rows={4}
                            name="message"
                            placeholder="What is your current status and when does it expire?
                                What is your past immigration history?
                                Are you looking for long-term permanent residency or short-term employment visa or both?
                                Are there any timeline considerations?
                                "
                        />
                    </Box>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{py: 1.5, borderRadius: 3}}
                >
                    Submit
                </Button>
            </Box>
        </Container>
    );
}


