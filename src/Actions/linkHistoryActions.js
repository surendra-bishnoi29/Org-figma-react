import { type } from "@testing-library/user-event/dist/type";
import { deleteApiWrapper, getApiWrapper, postApiWrapper } from "./token-wrapper-function";

const base_url = 'http://127.0.0.1:4320'




export const getAllLinks = async (id) => {
    // const response = getData();
    //const response = await getApiWrapper(`${base_url}/get-user-files/${id}`);
    return(
        [
            {
                link: 'google.com',
                date_paid: '10-3-2024',
                Status: "Malicious",
                sender: 'AAA@AA.COM',
                reciever: 'AAA@AA.COM'
            },
            {
                link: 'google.com',
                date_paid: '10-3-2024',
                Status: "Malicious",
                sender: 'AAA@AA.COM',
                reciever: 'AAA@AA.COM'
            },
            {
                link: 'google.com',
                date_paid: '10-3-2024',
                Status: "Malicious",
                sender: 'AAA@AA.COM',
                reciever: 'AAA@AA.COM'
            },
            {
                link: 'google.com',
                date_paid: '10-3-2024',
                Status: "Malicious",
                sender: 'AAA@AA.COM',
                reciever: 'AAA@AA.COM'
            },
            {
                link: 'google.com',
                date_paid: '10-3-2024',
                Status: "Malicious",
                sender: 'AAA@AA.COM',
                reciever: 'AAA@AA.COM'
            },


        ]
    )
        ;
    //return Files;
};


