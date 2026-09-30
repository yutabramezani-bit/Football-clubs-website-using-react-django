import AxiosInstance from "./Axios.jsx";
import {useState, useEffect} from "react";
import {Box, Button, Typography} from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextForm from "./Forms/TextForm.jsx";
import SelectForm from "./Forms/SelectForm.jsx";
import MultiSelectForm from "./Forms/MultiSelectform.jsx";
import DescriptionForm from "./Forms/DescriptionForm.jsx";
import {useFormik} from "formik";
import * as yup from "yup";
import MyMessage from "./Forms/Message.jsx";
import {useNavigate} from "react-router";

const Create = () => {

    const [country, setCountry] = useState([]);
    const [league, setLeague] = useState([]);
    const [characteristic, setCharacteristic] = useState([]);
    const [message, setMessage] = useState([]);
    const navigate = useNavigate();

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

    const validationSchema = yup.object({
        name: yup.string("The name must be Text").required("Name is required"),
        description: yup.string("The description must be Text").required("Description is required"),
        attendance: yup.number("The attendance must be a number").required("Attendance is required"),
        characteristic:yup.array().min(1,"Select at least one")
    })

    const formik = useFormik({
        initialValues: {
            name:"",
            description:"",
            country:"",
            // city:"",
            league:"",
            attendance:"",
            characteristic:[],
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            AxiosInstance.post('footballClub/', values).then(() => {
                setMessage(
                     <MyMessage
                    messageText={"Successfully created"}
                    messageColor={"green"}
                    />
                )
                setTimeout(() =>{
                    navigate('/')
                }, 2000)
            })
        }
    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <Box className={"TopBar"}>
                    <AddBoxIcon/>
                    <Typography sx={{marginLeft: '50px', fontWeight: 'bold'}} variant="subtitle2">
                        Create new club:
                    </Typography>
                </Box>

                {message}
                <Box className={"FormBox"}>
                    <Box className={'FormArea'}>
                        <TextForm
                            label={"Club Name"}
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <Box sx={{marginTop:"40px"}}>
                            <TextForm
                            label={"City"}
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
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
                            error={formik.touched.league && Boolean(formik.errors.league)}
                            helperText={formik.touched.league && formik.errors.league}
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
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                        />
                        <Box sx={{marginTop:"40px"}}>
                            <TextForm
                            label={"Attendance"}
                            name="attendance"
                            value={formik.values.attendance}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.attendance && Boolean(formik.errors.attendance)}
                            helperText={formik.touched.attendance && formik.errors.attendance}
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
                            error={formik.touched.characteristic && Boolean(formik.errors.characteristic)}
                            helperText={formik.touched.characteristic && formik.errors.characteristic}
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
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Box>
                </Box>
            </form>
        </div>
    )
}
export default Create;