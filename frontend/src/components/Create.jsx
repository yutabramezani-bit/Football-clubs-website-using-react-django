import AxiosInstance from "./Axios.jsx";
import {useState, useEffect} from "react";
import {Box, Button, Typography} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from "./Forms/TextForm.jsx";
import SelectForm from "./Forms/SelectForm.jsx";
import MultiSelectForm from "./Forms/MultiSelectform.jsx";
import DescriptionForm from "./Forms/DescriptionForm.jsx";
import {useFormik} from "formik";

const Create = () => {

    const [country, setCountry] = useState([]);
    const [league, setLeague] = useState([]);
    const [characteristic, setCharacteristic] = useState([]);

    console.log("Country:",country);
    console.log("league:",league);
    console.log("characteristic:",characteristic);

    const GetData = () => {
        AxiosInstance.get('country/')
            .then((response) => {
            setCountry(response.data);
        })

        AxiosInstance.get('league/')
            .then((response) => {
            setLeague(response.data);
        })

        AxiosInstance.get('characteristic/')
            .then((response) => {
            setCharacteristic(response.data);
        })
    }

    useEffect(() => {
        GetData();
    }, [])

    const formik = useFormik({
        initialValues: {
            name:"",
            description:"",
            country:"",
            league:"",
            attendance:"",
            characteristic:[],
        },
        onSubmit: (values) => {
            AxiosInstance.post('footballClub/', values).then(() => {
                console.log("Successfully created");
            })
        }
    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box className={"TopBar"}>
                    <AddBoxIcon/>
                    <Typography sx={{marginLeft: '50px', fontWeight: 'bold'}} variant="subtitle2">
                        Create new country:
                    </Typography>
                </Box>
                <Box className={"FormBox"}>
                    <Box className={'FormArea'}>
                        <TextForm
                            label={"Club Name"}
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Box sx={{marginTop:"40px"}}>
                            <TextForm
                            label={"City"}
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </Box>

                        <Box sx={{marginTop:"40px"}}>
                            <SelectForm
                            label={"League"}
                            options={league}
                            name="league"
                            value={formik.values.league}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </Box>

                        <Box sx={{marginTop:"40px"}}>
                            <Button type="submit" variant="contained" fullWidth>Submit the Data</Button>
                        </Box>

                    </Box>
                    <Box className={'FormArea'}>
                        <SelectForm
                            label={"Country"}
                            options={country}
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <Box sx={{marginTop:"40px"}}>
                            <TextForm
                            label={"Attendance"}
                            name="attendance"
                            value={formik.values.attendance}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </Box>
                        <Box sx={{marginTop:"40px"}}>
                            <MultiSelectForm
                            label={"Characteristics"}
                            options={characteristic}
                            name="characteristic"
                            value={formik.values.characteristic}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </Box>
                    </Box>

                    <Box className={'FormArea'}>
                        <DescriptionForm
                            label={"Description"}
                            rows={9}
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Box>
                </Box>
            </form>
        </div>
    )
}
export default Create;