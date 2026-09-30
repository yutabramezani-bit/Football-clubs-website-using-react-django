import {React, useEffect, useMemo, useState} from "react";
import {Box, Typography} from "@mui/material";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
import {MaterialReactTable} from "material-react-table";
import AxiosInstance from "./Axios.jsx";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router";
import EditIcon from "@mui/icons-material/Edit";

const Home = () => {

    const [myData, setMyData] = useState([]);

    const GetData =() => {
        AxiosInstance.get("footballClub/").then((response) => {
            console.log(response);
            setMyData(response.data);
        })
    }

    useEffect(() => {
        GetData();
    },[])

    const columns = useMemo(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "country_details.name",
                header: "Country",
            },
            {
                accessorKey: "leagueDetails.name",
                header: "League",
            },
            {
                accessorKey: "city",
                header: "City",
            },
            {
                accessorKey: "attendance",
                header: "Attendance",
            },
            {
                accessorKey: "characteristics_name",
                header: "Characteristics",
                Cell:({cell}) => (
                    <div style={{display:"flex", gap:"8px", flexWrap:"wrap"}}>
                        {
                            cell.getValue()?.map((char, index) => {
                                return <Chip key={index} label={char} />
                            })
                        }
                    </div>
                )
            },

        ]
    )
    return (
        <div>
            <Box className={"TopBar"}>
                    <CalendarViewMonthIcon/>
                    <Typography sx={{marginLeft: '20px', fontWeight: 'bold'}} variant="subtitle2">
                        View all clubs:
                    </Typography>
            </Box>

            <MaterialReactTable
                columns={columns}
                data={myData}
                enableRowActions
                renderRowActions={({row})=>(
                    <Box sx={{display:"flex", flexWrap:"nowrap", gap:"8px"}}>
                        <IconButton color="primary" component={Link} to={`edit/${row.original.id}`}>
                            <EditIcon/>
                        </IconButton>
                    </Box>
                )}

            />
        </div>
    )
}
export default Home;